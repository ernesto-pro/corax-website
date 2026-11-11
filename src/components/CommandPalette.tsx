import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { SearchItem } from "../data/routes";
import { searchIndexFor } from "../i18n/search";
import { chrome } from "../i18n/chrome";
import { useLang } from "../i18n/LanguageContext";
import { useLockBody } from "./UI";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const lang = useLang();
  const c = chrome[lang];
  const searchIndex = searchIndexFor(lang);

  useLockBody(open);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const closeWithFocus = () => {
    const target =
      previousFocus.current && previousFocus.current !== document.body
        ? previousFocus.current
        : document.querySelector<HTMLElement>(".cmdk-trigger");
    onClose();
    window.setTimeout(() => target?.focus(), 20);
  };

  const q = query.trim().toLowerCase();
  const results = q
    ? searchIndex.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.hint.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      )
    : searchIndex.filter((item) => item.group === "Pagine" || item.group === "Servizi");

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    acc[item.group] = acc[item.group] ?? [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const flat = Object.values(grouped).flat();

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeWithFocus();
      }
      if (e.key === "Tab") {
        const nodes = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("input, button, a[href]") ?? [],
        ).filter((el) => el.getClientRects().length > 0);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((v) => (flat.length ? (v + 1) % flat.length : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((v) => (flat.length ? (v - 1 + flat.length) % flat.length : 0));
      }
      if (e.key === "Enter") {
        const item = flat[active];
        if (item) {
          e.preventDefault();
          onClose();
          navigate(item.href);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, active, navigate, onClose]);

  useEffect(() => {
    if (!open) return;
    const current = panelRef.current?.querySelector<HTMLElement>(".cmdk__item.is-active");
    current?.scrollIntoView({ block: "nearest" });
  }, [active, open, query]);

  if (!open) return null;

  let counter = -1;

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label={c.cmdkLabel}>
      <button className="cmdk__backdrop" onClick={closeWithFocus} aria-label={c.cmdkClose} tabIndex={-1} />
      <div className="cmdk__panel" ref={panelRef}>
        <div className="cmdk__search">
          <Search size={20} strokeWidth={1.6} aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.cmdkPlaceholder}
            aria-label={c.cmdkLabel}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="cmdk__close" onClick={closeWithFocus} aria-label={c.cmdkCloseShort}>
            <X size={16} />
          </button>
        </div>

        <div className="cmdk__results">
          {flat.length === 0 && (
            <p className="cmdk__empty">
              {c.cmdkEmpty} “{query}”. {c.cmdkEmptyHint}
            </p>
          )}
          {Object.entries(grouped).map(([group, items]) => (
            <div className="cmdk__group" key={group}>
              <p className="cmdk__group-title">
                {c.groups[group as keyof typeof c.groups] ?? group}
              </p>
              {items.map((item) => {
                counter += 1;
                const index = counter;
                return (
                  <button
                    key={`${group}-${item.href}`}
                    className={`cmdk__item ${index === active ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      onClose();
                      navigate(item.href);
                    }}
                  >
                    <span className="cmdk__item-main">
                      <span className="cmdk__item-label">{item.label}</span>
                      <span className="cmdk__item-hint">{item.hint}</span>
                    </span>
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmdk__foot">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> {c.cmdkNav}
          </span>
          <span>
            <kbd>↵</kbd> {c.cmdkOpen}
          </span>
          <span>
            <kbd>esc</kbd> {c.cmdkCloseKey}
          </span>
        </div>
      </div>
    </div>
  );
}
