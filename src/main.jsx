import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import App from "./App.jsx";

/*
 * Pas d'import global de `swiper/css` : si un futur composant utilise Swiper,
 * importer son CSS localement dans ce composant afin de ne pas le charger partout.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
