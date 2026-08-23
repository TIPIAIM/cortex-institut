// src/components/CampusCortex/CampusCortexPage.js
import React, { useRef } from "react";
import styled from "styled-components";
import HeroSection from "./HeroSection";
import ContextSection from "./ContextSection";
import ObjectivesSection from "./ObjectivesSection";
import FormationModules from "./FormationModules";
import OrganizationSection from "./OrganizationSection";
import ContactSection from "./ContactSection";

const PageContainer = styled.div`
  scroll-behavior: smooth;
`;

const CampusCortexPage = () => {
  const contextRef = useRef(null);
  const objectivesRef = useRef(null);
  const formationRef = useRef(null);
  const organizationRef = useRef(null);
  const contactRef = useRef(null);

  const handleScrollClick = () => {
    contextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageContainer>
      <HeroSection onScrollClick={handleScrollClick} />
      <div >
        <ContextSection />
      </div>
     <div ref={objectivesRef}>
        <ObjectivesSection />
      </div>
      <div ref={formationRef}>
        <FormationModules />
      </div>
    <div ref={organizationRef}>
        <OrganizationSection />
      </div>
     <div ref={contactRef}>
        <ContactSection />
      </div>  {/*   */}
    </PageContainer>
  );
};

export default CampusCortexPage;
