import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { allPaths } from "./data/routes";
import "./styles/index.css";

const container = document.getElementById("root");

if (container) {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const prerendered = container.firstElementChild !== null && allPaths.includes(pathname);

  const tree = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

  // Only hydrate markup that was actually generated for this URL. Unknown paths are
  // served the prerendered /404 document, whose tree doesn't match the client route.
  if (prerendered) {
    hydrateRoot(container, tree);
  } else {
    container.replaceChildren();
    createRoot(container).render(tree);
  }
}
