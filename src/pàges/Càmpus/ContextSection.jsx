// src/components/CampusCortex/ContextSection.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${colors.bgSoft};
  position: relative;
`;

const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Content = styled.div`
  color: ${colors.text};
`;

const Title = styled.h2`
  font-size: 3rem;
  color: ${colors.accentGold};
  margin-bottom: 2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${colors.muted};
`;

const Highlight = styled.span`
  color: ${colors.accentGoldLight};
  font-weight: 600;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ContextSection = () => {
  return (
    <Section id="contexte">
      <Container>
        <Content>
          <Title>CONTEXTE</Title>
          <Text>
            Face au défi croissant du{" "}
            <Highlight>chômage des jeunes diplômés</Highlight> en Guinée,
            l'Institut Cortex lance le projet{" "}
            <Highlight>Campus Cortex</Highlight>, une initiative innovante
            conçue pour rapprocher l'univers académique des réalités
            professionnelles.
          </Text>
          <Text>
            Ce programme vise à offrir aux étudiants diplômés sans emploi une
            <Highlight> formation pratique de 6 mois</Highlight> suivie de
            <Highlight> 6 mois de stage en entreprise</Highlight>, avec pour
            finalité une meilleure insertion professionnelle et des opportunités
            d'embauche.
          </Text>
          <Text>
            Le Campus Cortex se distingue par son approche pragmatique et
            orientée résultats. Il combine un accompagnement académique de haut
            niveau et des mises en situation concrètes en entreprise.
          </Text>
        </Content>
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image src={imagess.khse} alt="Directeur Institut Cortex" />
        </ImageContainer>
      </Container>
    </Section>
  );
};

export default ContextSection;
