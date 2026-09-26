// src/components/home/ShowcaseSection.jsx
import React from "react";
import styled from "styled-components";
import colors from "../../Styles/colors";
import CasesShowcase from "./CasesShowcase";
import TestimonialsWall from "./Temoignàge";
import { openProgrammeContactModal } from "../programmes/programmeContact.js";

const Wrap = styled.section`
  background: linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 55%, #0f223a);
  padding: clamp(10px, 2vw, 16px) 0;
`;

const FooterCTA = styled.div`
  max-width:1200px; margin:0 auto; padding: 10px 20px 34px;
  display:grid; place-items:center; gap:10px;
  button{
    appearance:none; cursor:pointer; display:inline-block; text-decoration:none; font-weight:800;
    padding:12px 16px; border-radius:14px 0 14px 0;
    background:${colors.accentGold}; color:#0e1a2b; border:1px solid #d9b642;
    box-shadow:0 10px 28px rgba(242,201,76,.28);
  }
`;

export default function ShowcaseSection(){
  return (
    <Wrap>
      <CasesShowcase />
      <TestimonialsWall />
      <FooterCTA>
        <button
          type="button"
          onClick={() =>
            openProgrammeContactModal({
              intent: "partenariat",
              source: "realisations-project-cta",
            })
          }
        >
          Discuter d’un futur projet avec CORTEX+
        </button>
      </FooterCTA>
    </Wrap>
  );
}
