import { useState } from "react";
import { Plus } from "lucide-react";
import { useContent } from "../i18n/translate";

export function FAQ({ items }: { items?: { q: string; a: string }[] }) {
  const content = useContent();
  const list = items ?? content.faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      {list.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <h3>
              <button
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden>
                  <Plus size={18} strokeWidth={1.6} />
                </span>
              </button>
            </h3>
            <div
              className="faq__a"
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
