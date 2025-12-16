import { Routes, Route } from "react-router-dom";
 import Programmes from "./pàges/progràmmes/Programmes.jsx";
import AboutCortex from "./pàges/àpropos/AboutCortex.jsx";
import ContactCortex from "./pàges/contàct/Contact.jsx";
//import RealisationsEtPartenaires from "./pàges/reàlisàtions/RealisationsEtPartenaires.jsx";
import HomeBase from "./pàges/àccueil/HomeBase.jsx";
import Footer from "./pàges/àccueil/Footer.jsx";
import Header from "./pàges/àccueil/Bàrdenàvigçtion.jsx";
import MonQRCode from "./MonQRCode.jsx";
import HeroCortexWebGL from "./pàges/progràmmes/HeroCortexCarouselhome1.jsx";
import CampusCortexPage from "./pàges/Càmpus/CampusCortex.jsx";
 
export default function App() {
  return (
    <>
    <Header/>
       <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/apropos" element={<AboutCortex />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/contact" element={<ContactCortex />} />
   
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
