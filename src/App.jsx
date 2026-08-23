import { Routes, Route } from "react-router-dom";
import Programmes from "./pàges/programmes/Programmes.jsx";

import AboutCortex from "./pàges/apropos/AboutCortex.jsx";
import ContactCortex from "./pàges/contact/Contact.jsx";
import HomeBase from "./pàges/accueil/HomeBase.jsx";
import Footer from "./pàges/accueil/Footer.jsx";
import Header from "./pàges/accueil/Bardenavigation.jsx";
import MonQRCode from "./MonQRCode.jsx";
import HeroCortexWebGL from "./pàges/programmes/HeroCortexCarouselhome1.jsx";
import CampusCortexPage from "./pàges/Campus/CampusCortex.jsx";
 
import CREDUCPage from "./pàges/cREDUCPage/CREDUCPage.jsx";
import GlobalStyle from "./Styles/GlobalStyles.js";
import InnovEditions from "./pàges/InnovEditions/InnovEditions.jsx";
export default function App() {
  return (
    <>
      <GlobalStyle />

      <Header />
      <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/apropos" element={<AboutCortex />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/contact" element={<ContactCortex />} />

        <Route path="/CreducPage" element={<CREDUCPage />} />
        <Route path="/innoveditions" element={<InnovEditions/>} />

        {/**en cours  MonQRCode  campuscortex 
        <Route 
         path="/realisations" element={<export default function HeroCortexWebGL({
 />} /> 
 */}
        <Route path="/realisations" element={<MonQRCode />} />
        <Route path="/realisation" element={<HeroCortexWebGL />} />
        <Route path="/campuscortex" element={<CampusCortexPage />} />
      </Routes>
      <Footer />
    </>
  );
}
