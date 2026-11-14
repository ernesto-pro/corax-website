import { useState } from "react";
import { getBrandLogo } from "../data/clients";
import { optSrc, optSrcSet } from "../lib/img";

/** "Politecnico di Milano" → "PM", "Numero Diez" → "ND". */
function monogramFor(name: string): string {
  const words = name.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export function BrandLogo({
  name,
  monogram,
  className = "",
  plain = false,
  decorative = false,
  eager = false,
}: {
  name: string;
  monogram?: string;
  className?: string;
  /** Drop the paper plate, for logo walls on a paper background. */
  plain?: boolean;
  /** The brand name is already announced nearby. */
  decorative?: boolean;
  eager?: boolean;
}) {
  const logo = getBrandLogo(name);
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span
        className={`brand-logo brand-logo--fallback ${plain ? "brand-logo--plain" : ""} ${className}`}
        aria-hidden={decorative || undefined}
      >
        <span className="brand-logo__mono">{monogram ?? monogramFor(name)}</span>
      </span>
    );
  }

  return (
    <span
      className={`brand-logo ${plain ? "brand-logo--plain" : ""} ${className}`}
      aria-hidden={decorative || undefined}
    >
      <img
        src={optSrc(logo.src)}
        srcSet={optSrcSet(logo.src)}
        alt={decorative ? "" : name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={logo.invert ? "is-invert" : undefined}
        style={logo.multiply ? { mixBlendMode: "multiply" } : undefined}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
