 import { createRoot } from 'react-dom/client'
 import React from 'react';
  import { BrowserRouter } from "react-router-dom";
 import App from './App';
 import { HelmetProvider } from '@dr.pogodin/react-helmet'
 //import "bootstrap/dist/css/bootstrap.min.css"; //css du bootst
 //import "slick-carousel/slick/slick.css";
 //import "slick-carousel/slick/slick-theme.css";
 import 'swiper/css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HelmetProvider>
 <BrowserRouter> 
    <App />
  
  </BrowserRouter>
  </HelmetProvider>
</React.StrictMode>,
)
