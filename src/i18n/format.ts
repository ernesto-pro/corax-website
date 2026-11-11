import type { Lang } from "./lang";

const MONTHS_IT = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Deterministic date, no time zone: the same string on server and client.
 * Italian uses the lowercase month, English the capitalised one.
 */
export function formatDate(iso: string, lang: Lang): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return iso;
  const months = lang === "en" ? MONTHS_EN : MONTHS_IT;
  return `${day} ${months[month - 1]} ${year}`;
}
