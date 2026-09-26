import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import HomeBase from "./pàges/accueil/HomeBase.jsx";
import Header from "./pàges/accueil/Bardenavigation.jsx";
import Footer from "./pàges/accueil/Footer.jsx";
import GlobalStyle from "./Styles/GlobalStyles.js";
import ContactModalHost from "./pàges/programmes/ContactModalHost.jsx";
import colors from "./Styles/colors.js";

/*
 * L'accueil reste chargé immédiatement pour préserver le LCP.
 * Les autres pages deviennent des chunks de route téléchargés à la demande.
 */
const AboutCortex = lazy(() => import("./pàges/apropos/AboutCortex.jsx"));
const Programmes = lazy(() => import("./pàges/programmes/Programmes.jsx"));
const ContactCortex = lazy(() => import("./pàges/contact/Contact.jsx"));
const CampusCortexPage = lazy(() => import("./pàges/Campus/CampusCortex.jsx"));
const CREDUCPage = lazy(() => import("./pàges/cREDUCPage/CREDUCPage.jsx"));
const InnovEditions = lazy(() => import("./pàges/InnovEditions/InnovEditions.jsx"));
const MonQRCode = lazy(() => import("./MonQRCode.jsx"));
const HeroCortexWebGL = lazy(() =>
  import("./pàges/programmes/HeroCortexCarouselhome1.jsx")
);

const pulse = keyframes`
  0%, 100% { opacity: .45; transform: scaleX(.72); }
  50% { opacity: 1; transform: scaleX(1); }
`;

const RouteFallback = styled.div`
  min-height: 42vh;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft});
  color: ${colors.text};

  > div {
    width: min(340px, calc(100% - 40px));
    display: grid;
    justify-items: center;
    gap: 12px;
  }

  span {
    width: 86px;
    height: 3px;
    border-radius: 99px;
    transform-origin: center;
    background: ${colors.accentGold};
    animation: ${pulse} .9s ease-in-out infinite;
  }

  small {
    color: ${colors.muted};
    font-weight: 700;
    letter-spacing: .02em;
  }

  @media (prefers-reduced-motion: reduce) {
    span { animation: none; opacity: .8; }
  }
`;

function LoadingRoute() {
  return (
    <RouteFallback role="status" aria-live="polite">
      <div>
        <span aria-hidden="true" />
        <small>Chargement de l’espace CORTEX…</small>
      </div>
    </RouteFallback>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />

      {/* Le vrai formulaire n'est téléchargé qu'au premier clic Contact/Postuler. */}
      <ContactModalHost />

      <Suspense fallback={<LoadingRoute />}>
        <Routes>
          <Route path="/" element={<HomeBase />} />
          <Route path="/apropos" element={<AboutCortex />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/contact" element={<ContactCortex />} />
          <Route path="/CreducPage" element={<CREDUCPage />} />
          <Route path="/innoveditions" element={<InnovEditions />} />
          <Route path="/realisations" element={<MonQRCode />} />
          <Route path="/realisation" element={<HeroCortexWebGL />} />
          <Route path="/campuscortex" element={<CampusCortexPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
