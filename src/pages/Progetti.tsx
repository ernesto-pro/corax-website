import { PageHero, CTABand } from "../components/PageHero";
import { ProjectExplorer } from "../components/ProjectExplorer";
import { useContent, useT } from "../i18n/translate";

export function Progetti() {
  const content = useContent();
  const t = useT();
  const count = content.projects.length;

  return (
    <>
      <PageHero
        index="01"
        label={t("Progetti")}
        title={
          <>
            {t("Non abbiamo un portfolio.")}
            <br />
            <em>{t("Abbiamo delle prove.")}</em>
          </>
        }
        lede={`${count} ${t(
          "casi selezionati, zero riempitivi. Campagne, format, podcast e piattaforme che hanno spostato un numero, non solo un'estetica. Scegli il terreno: sotto trovi cosa succede quando media, talenti e produzione lavorano nella stessa stanza.",
        )}`}
        meta={[
          { label: t("Casi selezionati"), value: `${count}` },
          { label: t("Competenze"), value: "6" },
          { label: t("Unit coinvolte"), value: "4" },
        ]}
      />

      <section className="section section--dark portfolio">
        <ProjectExplorer />
      </section>

      <CTABand
        kicker={t("Il prossimo progetto")}
        title={t("Porta un problema. Noi portiamo il sistema.")}
        text={t(
          "Raccontaci cosa vuoi ottenere: costruiremo la squadra giusta tra agenzia, produzione, talenti e tecnologia.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Il sistema"), to: "/sistema" }}
      />
    </>
  );
}
