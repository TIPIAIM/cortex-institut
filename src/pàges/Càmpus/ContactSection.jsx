// src/components/CampusCortex/ContactSection.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Download } from "lucide-react";
import colors from "../../Styles/colors";

const Section = styled.section`
  padding: clamp(2rem, 5vw, 6rem) clamp(0.75rem, 2vw, 2rem);
  background: linear-gradient(135deg, ${colors.bgSoft} 0%, ${colors.bg} 100%);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: ${colors.accentGold};
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-weight: 700;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: ${colors.muted};
  margin-bottom: clamp(2rem, 4vw, 3rem);
  line-height: 1.4;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 1.3;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContactCard = styled(motion.div)`
  background: ${colors.bgSoft};
  padding: clamp(1.5rem, 2.5vw, 2rem);
  border-radius: clamp(12px, 2vw, 20px);
  text-align: center;
  border: 1px solid rgba(243, 111, 33, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 10px;
    margin: 0 0.25rem;
  }

  @media (max-width: 360px) {
    padding: 1rem;
    margin: 0;
  }
`;

const ContactIcon = styled.div`
  width: clamp(50px, 8vw, 60px);
  height: clamp(50px, 8vw, 60px);
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(0.75rem, 1.5vw, 1rem);
  color: white;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    margin-bottom: 0.875rem;
  }
`;

const ContactText = styled.p`
  color: ${colors.text};
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 0.9rem;
  }
`;

const DownloadLink = styled(motion.a)`
  background: linear-gradient(
    135deg,
    ${colors.accentGold}90 40%,
    ${colors.accentGold3}10 40%
  );
  border: none;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 2rem);
  border-radius: clamp(10px, 1.5vw, 15px);
  color: white;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
   text-decoration: none;

  &:hover {
    transform: translateY(-3px);
     color: white;
    text-decoration: none;
      background: linear-gradient(
    135deg,
    ${colors.accentGold} 40%,
    ${colors.accentGold}10 40%
  )
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const DownloadButton = styled(motion.button)`
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  border: none;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 2rem);
  border-radius: clamp(10px, 1.5vw, 15px);
  color: white;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  box-shadow: 0 8px 20px rgba(243, 111, 33, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(243, 111, 33, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const LogoSection = styled(motion.div)`
  margin: clamp(1.5rem, 3vw, 2rem) auto;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  height: clamp(60px, 10vw, 80px);
  width: auto;

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const DownloadSection = styled(motion.div)`
  margin: clamp(2rem, 4vw, 4rem) auto;
  text-align: center;
`;

const DownloadTitle = styled.h3`
  color: ${colors.accentGoldLight};
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  line-height: 1.3;
`;

const DownloadButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <MapPin size={getIconSize()} />,
      text: "Yattaya Mosquée - Conakry",
    },
    {
      icon: <Phone size={getIconSize()} />,
      text: "+224 612 68 41 43 / 628 44 56 47 / 623 21 19 74",
    },
    {
      icon: <Mail size={getIconSize()} />,
      text: "cortex.gn@gmail.com",
    },
    {
      icon: <Globe size={getIconSize()} />,
      text: "www.institut-cortex.com",
    },
  ];

 

  // Fichiers à télécharger - à adapter avec vos URLs réelles
  // Fichiers à télécharger - Remplacez par les URLs réelles de vos fichiers
  const downloadFiles = [
    {
      name: "Brochure Campus Cortex",
      file: "/docs/catalogue-Campus-Cortex2025-2026.pdf", // URL relative dans le dossier public
      icon: <Download size={getIconSize()} />,
    },
    {
      name: "Formulaire d'Inscription",
      file: "/docs/DC-2025-2026-inscription.pdf", // URL relative dans le dossier public
      icon: <Download size={getIconSize()} />,
    },
  ];
  return (
    <Section id="contact">
      <Container>
        {/* Nouvelle section pour les téléchargements */}
        <DownloadSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-30px" }}
        >
          <DownloadTitle>Téléchargez nos documents</DownloadTitle>
          <DownloadButtonsGrid>
            {downloadFiles.map((file, index) => (
              <DownloadLink
                key={index}
                href={file.file}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // Optionnel : spécifier un nom de fichier personnalisé
                // download={`mon-fichier-personnalise-${index}.pdf`}
              >
                {file.icon}
                {file.name}
              </DownloadLink>
            ))}
          </DownloadButtonsGrid>
        </DownloadSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-30px" }}
        >
          CONTACTEZ-NOUS
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-30px" }}
        >
          Rejoignez le Campus Cortex et transformez votre avenir professionnel
        </Subtitle>

        <ContactGrid>
          {contactInfo.map((contact, index) => (
            <ContactCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-30px" }}
            >
              <ContactIcon>{contact.icon}</ContactIcon>
              <ContactText>{contact.text}</ContactText>
            </ContactCard>
          ))}
        </ContactGrid>
      </Container>
    </Section>
  );
};

// Helper function for responsive icon sizing
const getIconSize = () => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 480) return 18;
    if (width < 768) return 20;
    return 24;
  }
  return 20;
};

export default React.memo(ContactSection);
