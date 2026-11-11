# Corax — sito

Sito istituzionale, portfolio e hub editoriale di Corax (social media company).
React 19 + Vite 8 + TypeScript, con prerender statico di tutte le rotte.

## Demo

- **Anteprima cliente:** https://corax-media-preview.surge.sh
- **Repository:** https://github.com/ernesto-pro/corax-website

## Comandi

```bash
npm install
npm run dev        # sviluppo
npm run typecheck  # controllo TypeScript
npm run build      # client + SSR + prerender (dist/)
npm run preview    # anteprima del build su :4173
```

Il build genera una pagina HTML per ogni rotta in `src/data/routes.ts`, più
`sitemap.xml` e `robots.txt`. Le pagine sono idratate lato client con
`BrowserRouter`, quindi i link interni restano immediati.

### Performance

- Ogni rotta è prerenderizzata: il primo paint non dipende da React.
- `scripts/prerender.mjs` sposta il bundle in un loader che parte a pagina
  caricata (`requestIdleCallback`): HTML e CSS non aspettano l'idratazione.
- L'H1 non usa animazioni di opacità, così resta il candidato LCP e il
  contenuto è leggibile dal primo paint.
- L'hero ha una copertina responsive (`poster-800.webp` / `poster.webp`) e su
  mobile non scarica il poster grande del video.
- Sono precaricati solo i font usati sopra la piega (Medium + Instrument Serif
  Italic); gli altri arrivano via CSS con `font-display: swap`.
- Se il bundle tarda, un failsafe inline rende visibili le sezioni `.reveal`
  dopo 2 secondi.

## Corax Score e portfolio

- Il Corax Score (`src/components/GrowthScan.tsx`) ha tre stati: schermata di
  avvio, test live con punteggio parziale e risultato con gauge, scala livelli,
  radar del profilo, mix per unit, tre mosse e condivisione. La scala e il
  livello avanzano in tempo reale durante il test.
- Risposte da tastiera con `1`–`4` / `A`–`D`, `Invio` per avanzare, `←` o
  `Backspace` per tornare indietro.
- Le domande, i livelli e i profili delle unit sono in
  `src/data/growthScan.ts`. Le soglie dei livelli (25, 50, 70, 85) guidano
  barra live, prossimo livello e radar a quattro assi.
- Nel risultato la scala dei livelli vive nella rail viola su desktop e passa
  nel pannello sotto i 900px: una sola copia resta visibile (e leggibile dagli
  screen reader) per volta.
- Il portfolio (`src/components/ProjectExplorer.tsx`) ha due viste: griglia con
  card in evidenza e indice con anteprima sticky. La vista è condivisibile via
  `?view=indice`; categoria e ricerca restano nei parametri URL.
- Le card progetto mostrano i risultati reali presenti in
  `src/data/projects.ts`: nessuna metrica inventata. Il portfolio conta 27 casi,
  compresi gli 8 nati dalle iniziative del sistema.

## Instagram e iniziative

- `/instagram` è costruita come quartier generale del sistema: pulse con numeri
  reali, stories viewer, feed filtrabile per formato (Post, Reel, Carosello) con
  prima tile in evidenza, metodo editoriale e archivio a card.
- Ogni iniziativa in `src/data/instagram.ts` ha un campo `project`: tutte le 17
  iniziative aprono un caso portfolio con cover, categoria, data e due
  risultati reali.
- Il dettaglio progetto include una sezione “Su Instagram” con i contenuti
  collegati e il link all'account, per chiudere il cerchio tra feed e caso.
- Le stories restano un archivio editoriale curato, indipendente dalla
  sincronizzazione del feed.

## Esperienza 3D — La Vela

- `/esperienza` è l'atrio immersivo del sistema: un core centrale, quattro isole-unità
  (Agency, Media House, Talent, Tech), particelle e una camera orbitale. Si entra
  trascinando, si passa sulle isole e si apre una unit dal dock o dalla scena.
- La scena WebGL è in `src/components/experience/VelaScene.tsx` (three.js) ed è
  caricata solo su questa rotta con `React.lazy`: il chunk 3D non pesa sul bundle
  delle altre pagine.
- I contenuti vengono da `src/data/experience.ts`, derivato da unit, servizi,
  progetti e talenti: metriche, capabilities, casi e roster sono dati reali del
  sito, non testi inventati per la scena.
- Il pannello unit mostra numeri, capabilities, casi collegati e, per Talent, una
  selezione del roster. Ha `role="dialog"`, `aria-modal`, focus trap, chiusura con
  `Esc` e ripristino del focus sul controllo che l'ha aperto.
- Il dock delle quattro unit e le card mobile sono la navigazione accessibile da
  tastiera; le etichette proiettate sulla scena sono solo potenziamento visivo.
- Con `prefers-reduced-motion` la scena resta ferma e le transizioni CSS sono
  disattivate. Senza WebGL o senza JavaScript restano H1, dock, atlante completo e
  roster: nessun contenuto dipende dalla scena.
- L'atlante sotto la scena replica in forma testuale tutte le unit, i numeri, le
  capabilities e i casi; title, description, canonical e JSON-LD (`WebPage`,
  `ItemList`, `Person`) sono generati in `src/seo/head.ts` e prerenderizzati.
- Le miniature dei casi nell'atlante e nel pannello usano le WebP da 320px in
  `public/img/covers/thumbs/` (`coverThumb()` in `src/data/experience.ts`):
  alleggeriscono la pagina di oltre 500 KB rispetto alle copertine intere. Se
  aggiungi una copertina, rigenera le miniature con:

  ```bash
  for f in public/img/covers/*.jpg; do
    b=$(basename "$f" .jpg)
    cwebp -quiet -q 74 -resize 320 0 "$f" -o "public/img/covers/thumbs/$b.webp"
  done
  ```

## Dove si aggiorna il contenuto

| Cosa | File |
| --- | --- |
| News e comunicati | `src/data/news.ts` + copertine in `src/data/newsCovers.ts` |
| Stories, feed e iniziative | `src/data/instagram.ts` |
| Progetti / property | `src/data/projects.ts`, `src/data/properties.ts` |
| Clienti e talenti | `src/data/clients.ts`, `src/data/talents.ts` |
| Navigazione, contatti, numeri | `src/data/site.ts`, `src/data/company.ts` |
| SEO, title, JSON-LD | `src/seo/head.ts` |
| Dati della scena 3D | `src/data/experience.ts` |
| Scena WebGL e materiali | `src/components/experience/VelaScene.tsx` |
| Traduzioni dei dati (EN) | `src/i18n/en/*.ts` |
| Copy di interfaccia (EN) | `src/i18n/en/copy/*.ts` |
| Mapping URL e hreflang | `src/i18n/routes.ts`, `src/i18n/lang.ts` |

Per aggiungere una news servono: slug, data ISO, data leggibile, categoria,
estratti, corpo, fonte e una copertina. La rotta `/insight/<slug>` è generata
automaticamente nel build.

## Instagram live

La sezione `/instagram` funziona in due modalità.

1. **Editoriale (default)**: stories, feed e archivio sono curati in
   `src/data/instagram.ts`. Nessuna dipendenza esterna, nessun widget fragile.
2. **Sincronizzata**: uno script scarica gli ultimi post dal profilo
   `@coraxcompany` tramite Instagram Graph API, salva le immagini in
   `public/img/instagram/` e scrive `src/data/instagram.generated.json`.
   Se il file contiene post, il sito usa quelli al posto del feed editoriale;
   stories e archivio restano curati.

### Attivare la sincronizzazione

Serve un account Instagram Business/Creator collegato a una Pagina Facebook e
un token Graph API con permesso `instagram_basic`.

```bash
cp .env.example .env
# compila INSTAGRAM_TOKEN (e, se serve, INSTAGRAM_USER_ID)
npm run sync:instagram
npm run build
```

Senza token lo script esce senza modificare nulla. Il token va rigenerato
periodicamente: se la sincronizzazione non gira, il sito continua a mostrare
l'ultimo feed valido (o quello editoriale).

## Multilingua (IT / EN)

Il sito è bilingue completo: italiano alla radice, inglese sotto `/en`. Le due
versioni condividono componenti, dati e stili; cambiano solo lingua dei
contenuti, degli URL e dei metadati.

### Rotte

- Italiano: `/`, `/sistema`, `/progetti`, `/progetti/<slug>`, `/servizi/<slug>`,
  `/media`, `/media/<slug>`, `/talent`, `/talent/<slug>`, `/clienti`,
  `/clienti/<slug>`, `/chi-siamo`, `/insight`, `/insight/<slug>`, `/instagram`,
  `/esperienza`, `/contatti`, `/lavora-con-noi`, `/privacy`, `/cookie`.
- Inglese: le sezioni sono tradotte (`/en/system`, `/en/projects`,
  `/en/properties`, `/en/clients`, `/en/about`, `/en/insights`,
  `/en/experience`, `/en/contact`, `/en/careers`, `/en/privacy`,
  `/en/cookies`); gli slug dei dettagli restano identici
  (`/en/projects/poretcast`, `/en/talent/giacomo-poretti`).
- La mappa URL è una sola, in `src/i18n/routes.ts`: `localizePath(path, lang)`
  traduce un path canonico italiano, `itPathOf(path)` fa il percorso inverso e
  `alternates(path)` restituisce le tre varianti hreflang.

### hreflang e SEO

- Ogni coppia IT/EN dichiara `it-IT`, `en` e `x-default` (che punta
  all'italiano). Le annotazioni sono nel `<head>` prerenderizzato, aggiornate
  lato client da `src/components/Seo.tsx` e ripetute nella sitemap con
  `xhtml:link`.
- Canonical, `og:locale` (`it_IT` / `en_US`), `og:locale:alternate`, title,
  description, breadcrumb e JSON-LD sono generati per lingua in
  `src/seo/head.ts`; i metadati statici inglesi stanno in
  `src/i18n/en/meta.ts`.
- Le pagine 404 non hanno canonical né hreflang: sono uno stato, non una pagina.
- `<html lang>` è `it-IT` o `en`, sia nell'HTML statico sia dopo una navigazione
  client.

### Come funziona la traduzione

Tre livelli, tutti con fallback automatico all'italiano:

1. **Dati** — i file in `src/i18n/en/*.ts` (`projects`, `services`,
   `properties`, `clients`, `talents`, `news`, `instagram`, `company`,
   `faqs`, `scan`, `site`) contengono solo i campi tradotti, uniti sopra i dati
   italiani da `src/i18n/content.ts`. Nessuna duplicazione dei dati: slug,
   immagini, numeri, date e link restano una sola fonte.
2. **Copy di interfaccia** — `src/i18n/en/copy/*.ts`, un dizionario piatto
   indicizzato sulla stringa italiana esatta. `useT()` traduce, e se una chiave
   manca restituisce l'italiano invece di una chiave vuota.
3. **Contenuti derivati** — `useContent()` restituisce l'intero dataset già
   localizzato, compresa la scena 3D (`src/i18n/experience.ts`, `buildVela`).

Nelle pagine si usa sempre lo stesso schema:

```tsx
const content = useContent();
const t = useT();
const lang = useLang();
const to = (path: string) => localizePath(path, lang);
```

`ArrowLink`, `Button`, `CTABand`, `SectionHead` e `Breadcrumbs` localizzano da
sé i path: a loro si passa il path canonico italiano.

### Aggiungere o correggere una traduzione

1. Aggiungi la stringa italiana in `t("…")` nel componente.
2. Aggiungi la stessa chiave nel file `src/i18n/en/copy/<pagina>.ts`
   corrispondente (o in `shared.ts` se è condivisa).
3. Per i contenuti, aggiungi il campo nel file `src/i18n/en/<dominio>.ts`
   rispettando ordine e lunghezza degli array.

### Aggiungere una terza lingua

1. Crea `src/i18n/<lang>/` con gli stessi file (dati, copy, meta).
2. Estendi `Lang` in `src/i18n/lang.ts` e `src/i18n/routes.ts` con il prefisso
   URL e le etichette hreflang.
3. Aggiungi il ramo in `contentFor()` e il blocco di rotte in `src/App.tsx`;
   `src/data/routes.ts` e il prerender generano le pagine automaticamente.
4. Aggiungi la voce al language switcher in `src/components/Header.tsx`.

### Verifica

```bash
npm run typecheck
npm run build     # 185 rotte prerenderizzate + 404, sitemap bilingue
```

Dopo il build puoi controllare che ogni pagina `/en/*` non contenga link
interni alla versione italiana (unico link IT ammesso: il selettore lingua) e
che ogni coppia abbia le tre annotazioni hreflang.

## UX e accessibilità

- Ogni pagina ha skip link, un solo `h1`, landmark espliciti e focus visibile ad
  alto contrasto su sfondi chiari e scuri.
- Il menu mobile ha focus trap, chiusura con `Esc`, ripristino del focus sul
  pulsante di apertura, stato attivo della pagina e blocco dello scroll.
- La palette di ricerca (`⌘K` / `/`) ha focus trap, ripristino del focus,
  navigazione con frecce e `Invio`, e risultati sempre visibili nella lista.
- La cronologia ripristina la posizione di scroll quando si torna indietro con
  il browser (o si ricarica la pagina); i link con hash rispettano l'offset
  dell'header.
- Con `prefers-reduced-motion` si disattivano smooth scroll, reveal, marquee e
  animazioni della scena 3D; i contenuti restano tutti leggibili.
- I form mostrano errori inline, focus sul riepilogo dopo l'invio e precompila
  il brief con il risultato del Corax Score.

## Deploy

Il progetto è pronto per Netlify: `netlify.toml` imposta build
(`npm run build`), publish (`dist`), Node 22, header di sicurezza e cache
immutabile per asset e font. Le pagine sono prerenderizzate, quindi ogni URL
risponde già con il proprio HTML; le URL inesistenti usano `404.html`.

Prima di pubblicare: `npm ci && npm run typecheck && npm run build`. L'anteprima
cliente è su Surge (`corax-media-preview.surge.sh`); per aggiornarla:
`npx surge ./dist https://corax-media-preview.surge.sh`.

## Note

- Contatti: `info@corax.business` e `+39 02 0000 0000` sono ancora segnaposto.
- Il form contatti apre un brief precompilato via `mailto:` lato client.
- Canonical host: `https://corax.it`.
- In produzione il server deve restituire `404.html` con status 404 per le URL
  inesistenti (l'anteprima locale risponde 200 perché fa fallback sulla SPA).
