// src/components/CampusCortex/OrganizationSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Target } from 'lucide-react';
import colors from '../../Styles/colors';

const Section = styled.section`
  padding: clamp(2rem, 5vw, 6rem) clamp(0.75rem, 2vw, 2rem);
  background: linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg1} 100%);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: ${colors.accentGold};
  margin-bottom: clamp(1.5rem, 4vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
`;

const OrganizationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(1rem, 2vw, 3rem);
  margin-bottom: clamp(1.5rem, 4vw, 4rem);
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OrganizationCard = styled(motion.div)`
  background: ${colors.bgSoft};
  padding: clamp(1.5rem, 2.5vw, 2.5rem);
  border-radius: clamp(12px, 2vw, 20px);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

const OrganizationIcon = styled.div`
  width: clamp(60px, 10vw, 80px);
  height: clamp(60px, 10vw, 80px);
  background: linear-gradient(135deg, ${colors.accentGold}, ${colors.accentGold3});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(1rem, 2vw, 1.5rem);
  color: white;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-bottom: 0.875rem;
  }
`;

const OrganizationTitle = styled.h3`
  color: ${colors.accentGoldLight};
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const OrganizationText = styled.p`
  color: ${colors.muted};
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ModalitesSection = styled.div`
  background: ${colors.accentGold}10;
  padding: clamp(1.5rem, 3vw, 3rem);
  border-radius: clamp(12px, 2vw, 20px);
  margin-bottom: clamp(1.5rem, 4vw, 4rem);

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 10px;
    margin: 0 0.25rem 2rem;
  }

  @media (max-width: 360px) {
    padding: 1rem;
    margin: 0 0 1.5rem;
  }
`;

const ModalitesTitle = styled.h3`
  color: white;
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin-bottom: clamp(1rem, 2vw, 2rem);
  text-align: center;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }
`;

const ModalitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
`;

const ModaliteItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border-radius: clamp(8px, 1.5vw, 15px);
  color: white;
  text-align: center;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    padding: 1rem 0.875rem;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.875rem 0.75rem;
  }
`;

const ModaliteIcon = styled.div`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const ModaliteText = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  margin: 0;
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

const Price = styled.div`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: ${colors.accentGoldLight};
  text-align: center;
  font-weight: 700;
  margin: clamp(1.5rem, 2vw, 2rem) 0;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin: 1.25rem 0;
  }
`;

const ScheduleInfo = styled.div`
  color: white;
  text-align: center;
  margin-top: clamp(0.75rem, 1.5vw, 1rem);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.5;

  p {
    margin: 0.5rem 0;

    @media (max-width: 480px) {
      margin: 0.4rem 0;
      font-size: 0.9rem;
    }

    @media (max-width: 360px) {
      font-size: 0.85rem;
    }
  }
`;

const ResultsSection = styled(motion.div)`
  background: ${colors.bgSoft};
  padding: clamp(1.5rem, 3vw, 4rem);
  border-radius: clamp(12px, 2vw, 20px);
  text-align: center;

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

const ResultsTitle = styled.h3`
  color: ${colors.accentGold};
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  margin-bottom: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1.25rem;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const ResultItem = styled.div`
  padding: clamp(1.25rem, 2vw, 2rem);
  background: ${colors.bg};
  border-radius: clamp(10px, 1.5vw, 15px);
  border-left: 4px solid ${colors.accentGold};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    padding: 1rem 0.875rem;
    border-radius: 8px;
    border-left: 3px solid ${colors.accentGold};
  }

  @media (max-width: 360px) {
    padding: 0.875rem 0.75rem;
  }
`;

const ResultValue = styled.div`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: ${colors.accentGoldLight};
  font-weight: 700;
  margin-bottom: clamp(0.25rem, 0.5vw, 0.5rem);
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 0.25rem;
  }
`;

const ResultLabel = styled.div`
  color: ${colors.muted};
  font-size: clamp(0.8rem, 1.25vw, 1rem);
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
`;

const OrganizationSection = () => {
  const organizationData = [
    {
      icon: <Users size={getIconSize()} />,
      title: "Campus de l'Institut Cortex",
      text: "Infrastructure moderne et équipements de pointe pour un apprentissage optimal"
    },
    {
      icon: <Target size={getIconSize()} />,
      title: "Formateurs Certifiés",
      text: "Mentors professionnels avec une expertise terrain solide"
    },
    {
      icon: <Calendar size={getIconSize()} />,
      title: "Entreprises Partenaires",
      text: "Réseau d'entreprises locales et internationales pour l'accueil en stage"
    }
  ];

  const modalitesData = [
    {
      icon: <Clock size={getIconSize()} />,
      text: "Durée : 12 mois (6 mois cours + 6 mois stage)"
    },
    {
      icon: <Calendar size={getIconSize()} />,
      text: "Deux rentrées par an : Janvier et Juillet"
    },
    {
      icon: <Users size={getIconSize()} />,
      text: "Fréquence : 3 fois par semaine"
    }
  ];

  const resultsData = [
    { value: "20", label: "Jeunes formés par promotion" },
    { value: "100%", label: "Placés en stage" },
    { value: "100%", label: "Insérés dans l'emploi" },
    { value: "90%+", label: "Taux d'embauche garanti" }
  ];

  return (
    <Section id="organisation">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          ORGANISATION ET MISE EN ŒUVRE
        </Title>
        
        <OrganizationGrid>
          {organizationData.map((item, index) => (
            <OrganizationCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: '-30px' }}
            >
              <OrganizationIcon>
                {item.icon}
              </OrganizationIcon>
              <OrganizationTitle>{item.title}</OrganizationTitle>
              <OrganizationText>{item.text}</OrganizationText>
            </OrganizationCard>
          ))}
        </OrganizationGrid>

        <ModalitesSection>
          <ModalitesTitle>MODALITÉS</ModalitesTitle>
          <ModalitesGrid>
            {modalitesData.map((item, index) => (
              <ModaliteItem key={index}>
                <ModaliteIcon>{item.icon}</ModaliteIcon>
                <ModaliteText>{item.text}</ModaliteText>
              </ModaliteItem>
            ))}
          </ModalitesGrid>
          
          <Price>Tarif : 6.990.000 GNF</Price>
          
          <ScheduleInfo>
            <p>G1 Matin: Lundi, mardi et mercredi de 10h-13h</p>
            <p>G2 Soir: Lundi, mardi et mercredi de 16h-19h</p>
          </ScheduleInfo>
        </ModalitesSection>

        <ResultsSection
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          <ResultsTitle>RÉSULTATS ATTENDUS</ResultsTitle>
          <ResultsGrid>
            {resultsData.map((result, index) => (
              <ResultItem key={index}>
                <ResultValue>{result.value}</ResultValue>
                <ResultLabel>{result.label}</ResultLabel>
              </ResultItem>
            ))}
          </ResultsGrid>
        </ResultsSection>
      </Container>
    </Section>
  );
};

// Helper function for responsive icon sizing
const getIconSize = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 480) return 20;
    if (width < 768) return 24;
    return 32;
  }
  return 24;
};

export default React.memo(OrganizationSection);