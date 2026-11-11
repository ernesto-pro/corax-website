import { homeCopy } from "./home";
import { sistemaCopy } from "./sistema";
import { progettiCopy } from "./progetti";
import { projectDetailCopy } from "./projectDetail";
import { serviceDetailCopy } from "./serviceDetail";
import { mediaCopy } from "./media";
import { propertyDetailCopy } from "./propertyDetail";
import { talentCopy } from "./talent";
import { talentDetailCopy } from "./talentDetail";
import { clientiCopy } from "./clienti";
import { clientDetailCopy } from "./clientDetail";
import { chiSiamoCopy } from "./chiSiamo";
import { insightCopy } from "./insight";
import { newsDetailCopy } from "./newsDetail";
import { instagramCopy } from "./instagram";
import { esperienzaCopy } from "./esperienza";
import { contattiCopy } from "./contatti";
import { lavoraConNoiCopy } from "./lavoraConNoi";
import { privacyCopy } from "./privacy";
import { cookieCopy } from "./cookie";
import { notFoundCopy } from "./notFound";
import { sharedCopy } from "./shared";
import { growthScanCopy } from "./growthScan";

/**
 * One flat English dictionary keyed by the Italian source string.
 *
 * Page files stay separate so translations can be reviewed per page; the merge
 * keeps a single lookup table at runtime.
 */
export const copyEn: Record<string, string> = {
  ...sharedCopy,
  ...growthScanCopy,
  ...homeCopy,
  ...sistemaCopy,
  ...progettiCopy,
  ...projectDetailCopy,
  ...serviceDetailCopy,
  ...mediaCopy,
  ...propertyDetailCopy,
  ...talentCopy,
  ...talentDetailCopy,
  ...clientiCopy,
  ...clientDetailCopy,
  ...chiSiamoCopy,
  ...insightCopy,
  ...newsDetailCopy,
  ...instagramCopy,
  ...esperienzaCopy,
  ...contattiCopy,
  ...lavoraConNoiCopy,
  ...privacyCopy,
  ...cookieCopy,
  ...notFoundCopy,
};
