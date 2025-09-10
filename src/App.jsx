import { Routes, Route } from "react-router-dom";
//import ResponsiveNavbar from "./pàges/àccueil/Pàge-nàvigàtion.jsx"; 
import Programmes from "./pàges/progràmmes/Programmes.jsx";
import AboutCortex from "./pàges/àpropos/AboutCortex.jsx";
import ContactCortex from "./pàges/contàct/Contact.jsx";
//import RealisationsEtPartenaires from "./pàges/reàlisàtions/RealisationsEtPartenaires.jsx";
import HomeBase from "./pàges/àccueil/HomeBase.jsx";
import Footer from "./pàges/àccueil/Footer.jsx";
 
export default function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/apropos" element={<AboutCortex />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/contact" element={<ContactCortex />} />
   
   {/**en cours 
        <Route path="/realisations" element={<RealisationsEtPartenaires />} />
 */}
      </Routes>
      <Footer/>
    </>
  );
}
