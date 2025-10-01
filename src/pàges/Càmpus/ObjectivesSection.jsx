// src/components/CampusCortex/ObjectivesSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp } from 'lucide-react';
import colors from '../../Styles/colors';

const Section = styled.section`
  padding: clamp(2rem, 5vw, 6rem) clamp(1rem, 3vw, 2rem);
  background: linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg} 100%);
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
  margin-bottom: clamp(2rem, 4vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  margin-bottom: clamp(2rem, 4vw, 4rem);
  width: 100%;
`;

const ObjectiveCard = styled(motion.div)`
  background: ${colors.bgSoft};
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: clamp(15px, 2vw, 20px);
  text-align: center;
  border-left: 4px solid ${colors.accentGold};
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    border-left: none;
    border-top: 4px solid ${colors.accentGold};
  }

  @media (max-width: 360px) {
    padding: 1.25rem;
  }
`;

const IconWrapper = styled.div`
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
  }
`;

const CardTitle = styled.h3`
  color: ${colors.accentGoldLight};
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  font-weight: 600;
  line-height: 1.3;
`;

const CardText = styled.p`
  color: ${colors.muted};
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  margin: 0;
`;

const SelectionSection = styled(motion.div)`
  background: ${colors.accentGold}90;
  padding: clamp(1.5rem, 3vw, 3rem);
  border-radius: clamp(15px, 2vw, 20px);
  text-align: center;
  color: white;
  margin-top: clamp(1.5rem, 3vw, 2rem);
`;

const SelectionTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.2;
`;

const SelectionList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: clamp(0.75rem, 1.5vw, 1rem);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SelectionItem = styled.li`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  padding: clamp(0.75rem, 1.5vw, 1rem);
  background: rgba(255, 255, 255, 0.1);
  border-radius: clamp(8px, 1.5vw, 10px);
  backdrop-filter: blur(10px);
  line-height: 1.4;
`;

const ObjectivesSection = () => {
  const objectives = [
    {
      icon: <Target size={clampValue(24, 32)} />,
      title: "Objectif Général",
      text: "Faciliter l'insertion professionnelle des jeunes diplômés sans emploi."
    },
    {
      icon: <Users size={clampValue(24, 32)} />,
      title: "Formation Intensive",
      text: "Former 20 étudiants par cohorte sur des compétences pratiques et opérationnelles."
    },
    {
      icon: <TrendingUp size={clampValue(24, 32)} />,
      title: "Taux d'Embauche",
      text: "Atteindre un taux d'embauche de 90% minimum à la fin du projet."
    }
  ];

  const selectionCriteria = [
    "Test d'admission obligatoire",
    "Seulement 20 participants par rentrée",
    "Programme réservé aux meilleurs diplômés"
  ];

  return (
    <Section id="objectifs">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          OBJECTIFS
        </Title>
        
        <ObjectivesGrid>
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <IconWrapper>
                {objective.icon}
              </IconWrapper>
              <CardTitle>{objective.title}</CardTitle>
              <CardText>{objective.text}</CardText>
            </ObjectiveCard>
          ))}
        </ObjectivesGrid>

        <SelectionSection
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <SelectionTitle>CRITÈRES DE SÉLECTION</SelectionTitle>
          <SelectionList>
            {selectionCriteria.map((item, index) => (
              <SelectionItem key={index}>
                {item}
              </SelectionItem>
            ))}
          </SelectionList>
        </SelectionSection>
      </Container>
    </Section>
  );
};

// Helper function for responsive icon sizing
const clampValue = (min, max) => {
  return `clamp(${min}px, 2vw, ${max}px)`;
};

export default React.memo(ObjectivesSection);