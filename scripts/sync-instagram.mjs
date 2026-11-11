#!/usr/bin/env node
/**
 * Sincronizza il feed Instagram di @coraxcompany dentro il sito.
 *
 * Uso:
 *   INSTAGRAM_TOKEN=xxx npm run sync:instagram
 *   INSTAGRAM_TOKEN=xxx INSTAGRAM_USER_ID=1784140... npm run sync:instagram
 *
 * Senza token, lo script esce senza modificare nulla: il sito continua a usare
 * il feed editoriale curato in src/data/instagram.ts.
 *
 * Richiede un token Graph API con permesso instagram_basic +
 * instagram_content_publish (solo lettura per il feed) e un account Business/Creator
 * collegato a una Pagina Facebook. Il token va rigenerato periodicamente.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const OUT_JSON = path.join(ROOT, "src/data/instagram.generated.json");
const IMAGE_DIR = path.join(ROOT, "public/img/instagram");
const API_VERSION = "v23.0";
const LIMIT = Number(process.env.INSTAGRAM_LIMIT ?? 24);
const USER_ID = process.env.INSTAGRAM_USER_ID || "me";
const TOKEN = process.env.INSTAGRAM_TOKEN;

const log = (message) => console.log(`[instagram] ${message}`);

function fields() {
  return [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");
}

async function graph(url) {
  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) {
    const message = payload?.error?.message ?? `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

async function fetchMedia() {
  const url =
    `https://graph.facebook.com/${API_VERSION}/${USER_ID}/media` +
    `?fields=${encodeURIComponent(fields())}` +
    `&limit=${LIMIT}` +
    `&access_token=${encodeURIComponent(TOKEN)}`;
  const payload = await graph(url);
  return Array.isArray(payload.data) ? payload.data : [];
}

async function fetchCarouselCover(id) {
  const url =
    `https://graph.facebook.com/${API_VERSION}/${id}/children` +
    `?fields=${encodeURIComponent("media_type,media_url,thumbnail_url")}` +
    `&access_token=${encodeURIComponent(TOKEN)}`;
  const payload = await graph(url);
  const first = Array.isArray(payload.data) ? payload.data[0] : undefined;
  if (!first) return null;
  return first.media_type === "VIDEO" ? first.thumbnail_url : first.media_url;
}

function extensionFor(contentType, sourceUrl) {
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) return ".jpg";
  const match = /\.(jpe?g|png|webp|gif)(?:\?|$)/i.exec(sourceUrl ?? "");
  return match ? `.${match[1].toLowerCase()}` : ".jpg";
}

async function download(id, sourceUrl) {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`download ${response.status}`);
  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) throw new Error(`non è un'immagine: ${type}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength < 1024) throw new Error("immagine troppo piccola");
  const file = `${id}${extensionFor(type, sourceUrl)}`;
  await writeFile(path.join(IMAGE_DIR, file), buffer);
  return `/img/instagram/${file}`;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT_JSON, "utf8"));
  } catch {
    return { updatedAt: null, account: "coraxcompany", posts: [] };
  }
}

async function main() {
  if (!TOKEN) {
    log("INSTAGRAM_TOKEN non impostato: uso il feed editoriale, nessuna modifica.");
    log("Per attivare la sincronizzazione: INSTAGRAM_TOKEN=... npm run sync:instagram");
    return;
  }

  if (!existsSync(IMAGE_DIR)) await mkdir(IMAGE_DIR, { recursive: true });

  const media = await fetchMedia();
  if (media.length === 0) {
    log("Nessun media restituito dall'API: mantengo il feed attuale.");
    return;
  }

  log(`Trovati ${media.length} media. Scarico le copertine…`);
  const previous = await readExisting();
  const previousById = new Map((previous.posts ?? []).map((post) => [post.id, post]));

  const posts = [];
  for (const item of media) {
    let source =
      item.media_type === "VIDEO"
        ? item.thumbnail_url
        : item.media_url;

    if (!source && item.media_type === "CAROUSEL_ALBUM") {
      try {
        source = await fetchCarouselCover(item.id);
      } catch (error) {
        log(`Carosello ${item.id} saltato: ${error.message}`);
      }
    }

    if (!source) {
      log(`Media ${item.id} senza immagine, saltato.`);
      continue;
    }

    let image;
    try {
      image = await download(item.id, source);
    } catch (error) {
      const cached = previousById.get(item.id);
      if (cached?.image) {
        log(`Download ${item.id} fallito (${error.message}): uso la copia locale.`);
        image = cached.image;
      } else {
        log(`Download ${item.id} fallito (${error.message}): saltato.`);
        continue;
      }
    }

    posts.push({
      id: item.id,
      caption: item.caption ?? "",
      mediaType: item.media_type ?? "IMAGE",
      image,
      permalink: item.permalink ?? "https://www.instagram.com/coraxcompany/",
      timestamp: item.timestamp ?? new Date().toISOString(),
    });
  }

  if (posts.length === 0) {
    log("Nessun post valido: mantengo il feed attuale.");
    return;
  }

  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  await writeFile(
    OUT_JSON,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        account: "coraxcompany",
        posts,
      },
      null,
      2,
    )}\n`,
  );

  log(`Fatto: ${posts.length} post salvati in src/data/instagram.generated.json.`);
  log("Ora esegui `npm run build` per rigenerare le pagine statiche.");
}

main().catch((error) => {
  console.error(`[instagram] Errore: ${error.message}`);
  process.exitCode = 1;
});
