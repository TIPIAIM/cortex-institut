import { Routes, Route } from "react-router-dom";
import Programmes from "./pàges/progràmmes/Programmes.jsx";
import AboutCortex from "./pàges/àpropos/AboutCortex.jsx";
import ContactCortex from "./pàges/contàct/Contact.jsx";
import HomeBase from "./pàges/àccueil/HomeBase.jsx";
import Footer from "./pàges/àccueil/Footer.jsx";
import Header from "./pàges/àccueil/Bàrdenàvigçtion.jsx";
import MonQRCode from "./MonQRCode.jsx";
import HeroCortexWebGL from "./pàges/progràmmes/HeroCortexCarouselhome1.jsx";
import CampusCortexPage from "./pàges/Càmpus/CampusCortex.jsx";
import CREDUCPage from "./pàges/cREDUCPage/CREDUCPage.jsx";
import GlobalStyle from "./Styles/GlobalStyles.js";
 export default function App() {
  return (
    <>
      <GlobalStyle />

    
    <Header/>
       <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/apropos" element={<AboutCortex />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/contact" element={<ContactCortex />} />
   
        <Route path="/CreducPage" element={<CREDUCPage />} />


   {/**en cours  MonQRCode  campuscortex
        <Route 
         path="/realisations" element={<export default function HeroCortexWebGL({
 />} /> 
 */}
         <Route
         path="/realisations" element={<MonQRCode />} />
           <Route path="/realisation" element={<HeroCortexWebGL />} />
           <Route path="/campuscortex" element={<CampusCortexPage />} />

      </Routes>
      <Footer/>
  
    </>
  );
}
