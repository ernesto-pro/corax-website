import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LanguageProvider } from "./i18n/LanguageContext";
import { langFromPath } from "./i18n/routes";
import { Home } from "./pages/Home";
import { Sistema } from "./pages/Sistema";
import { Progetti } from "./pages/Progetti";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Media } from "./pages/Media";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Talent } from "./pages/Talent";
import { TalentDetail } from "./pages/TalentDetail";
import { Clienti } from "./pages/Clienti";
import { ClientDetail } from "./pages/ClientDetail";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Insight } from "./pages/Insight";
import { InstagramPage } from "./pages/Instagram";
import { Esperienza } from "./pages/Esperienza";
import { NewsDetail } from "./pages/NewsDetail";
import { Contatti } from "./pages/Contatti";
import { LavoraConNoi } from "./pages/LavoraConNoi";
import { Privacy } from "./pages/Privacy";
import { Cookie } from "./pages/Cookie";
import { NotFound } from "./pages/NotFound";

export function App() {
  const { pathname } = useLocation();

  return (
    <LanguageProvider lang={langFromPath(pathname)}>
      <Routes>
        <Route element={<Layout />}>
          {/* Italiano — lingua di default, URL alla radice. */}
          <Route path="/" element={<Home />} />
          <Route path="/sistema" element={<Sistema />} />
          <Route path="/servizi/:slug" element={<ServiceDetail />} />
          <Route path="/progetti" element={<Progetti />} />
          <Route path="/progetti/:slug" element={<ProjectDetail />} />
          <Route path="/media" element={<Media />} />
          <Route path="/media/:slug" element={<PropertyDetail />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/talent/:slug" element={<TalentDetail />} />
          <Route path="/clienti" element={<Clienti />} />
          <Route path="/clienti/:slug" element={<ClientDetail />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/esperienza" element={<Esperienza />} />
          <Route path="/insight/:slug" element={<NewsDetail />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/lavora-con-noi" element={<LavoraConNoi />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie" element={<Cookie />} />

          {/* English — stessa esperienza, URL sotto /en. */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/system" element={<Sistema />} />
          <Route path="/en/services/:slug" element={<ServiceDetail />} />
          <Route path="/en/projects" element={<Progetti />} />
          <Route path="/en/projects/:slug" element={<ProjectDetail />} />
          <Route path="/en/media" element={<Media />} />
          <Route path="/en/media/:slug" element={<PropertyDetail />} />
          <Route path="/en/talent" element={<Talent />} />
          <Route path="/en/talent/:slug" element={<TalentDetail />} />
          <Route path="/en/clients" element={<Clienti />} />
          <Route path="/en/clients/:slug" element={<ClientDetail />} />
          <Route path="/en/about" element={<ChiSiamo />} />
          <Route path="/en/insights" element={<Insight />} />
          <Route path="/en/insights/:slug" element={<NewsDetail />} />
          <Route path="/en/instagram" element={<InstagramPage />} />
          <Route path="/en/experience" element={<Esperienza />} />
          <Route path="/en/contact" element={<Contatti />} />
          <Route path="/en/careers" element={<LavoraConNoi />} />
          <Route path="/en/privacy" element={<Privacy />} />
          <Route path="/en/cookies" element={<Cookie />} />
          <Route path="/en/404" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
