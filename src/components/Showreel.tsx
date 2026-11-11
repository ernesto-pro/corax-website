import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { site } from "../data/site";
import { useT } from "../i18n/translate";
import { useLockBody } from "./UI";

export function Showreel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useT();
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => videoRef.current?.play().catch(() => undefined), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="reel" role="dialog" aria-modal="true" aria-label={t("Corax showreel")}>
      <button
        className="reel__backdrop"
        onClick={onClose}
        aria-label={t("Chiudi video")}
        tabIndex={-1}
      />
      <div className="reel__panel">
        <div className="reel__head">
          <span>Corax — Showreel 2026</span>
          <button onClick={onClose} className="reel__close" aria-label={t("Chiudi")}>
            <X size={20} />
          </button>
        </div>
        <video
          ref={videoRef}
          className="reel__video"
          src={site.video.src}
          poster={site.video.poster}
          controls
          playsInline
          preload="metadata"
        />
        <p className="reel__foot">
          {t("Produzioni, format, talenti e campagne. Un estratto dal sistema Corax.")}
        </p>
      </div>
    </div>
  );
}
