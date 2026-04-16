// src/components/CampusCortex/FormationModules.js
import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Book, BarChart3, Users, FileText } from 'lucide-react';
import colors from '../../Styles/colors';
import { imagess } from '../../assets/imagess';

// ===================== STYLED COMPONENTS =====================
const Section = styled.section`
  padding: clamp(2rem, 5vw, 6rem) clamp(0.75rem, 2vw, 2rem);
  background: ${colors.bgSoft};
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

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(0.75rem, 2vw, 2rem);
  margin-bottom: clamp(1.5rem, 4vw, 4rem);
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModuleCard = styled(motion.div)`
  background: ${colors.bg};
  border-radius: clamp(12px, 2vw, 20px);
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(243, 111, 33, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    border-radius: 10px;
    margin: 0 0.25rem;
  }

  @media (max-width: 360px) {
    margin: 0;
  }
`;

const ModuleHeader = styled.div`
  background: linear-gradient(135deg, ${colors.accentGold}90 70%, ${colors.accentGold3} 50%);
  padding: clamp(1.25rem, 2.5vw, 2rem);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  flex-shrink: 0;
  min-height: 80px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    min-height: 70px;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.875rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    min-height: auto;
  }

  @media (max-width: 360px) {
    padding: 0.875rem 0.75rem;
  }
`;

const ModuleTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const ModuleTitle = styled.h3`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: inherit;
  flex: 1;
  min-width: 0;
  line-height: 1.3;

  /* Text truncation for very long titles */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 1rem;
    white-space: normal;
    line-height: 1.2;
  }

  @media (max-width: 360px) {
    font-size: 0.95rem;
  }
`;

const ModuleDuration = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: clamp(0.35rem, 1vw, 0.5rem) clamp(0.6rem, 1.25vw, 1rem);
  border-radius: 20px;
  font-size: clamp(0.75rem, 1.25vw, 0.9rem);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  text-align: center;

  @media (max-width: 480px) {
    align-self: center;
    padding: 0.3rem 0.75rem;
    font-size: 0.7rem;
  }

  @media (max-width: 360px) {
    padding: 0.25rem 0.6rem;
    font-size: 0.65rem;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ModuleContent = styled(motion.div)`
  overflow: hidden;
  flex-shrink: 0;
`;

const ModuleList = styled.ul`
  padding: clamp(1.25rem, 2.5vw, 2rem);
  list-style: none;
  margin: 0;

  @media (max-width: 480px) {
    padding: 1rem 0.875rem;
  }

  @media (max-width: 360px) {
    padding: 0.875rem 0.75rem;
  }
`;

const ModuleItem = styled.li`
  padding: clamp(0.6rem, 1.25vw, 1rem) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: ${colors.muted};
  line-height: 1.5;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: flex;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '▸';
    color: ${colors.accentGold};
    font-weight: bold;
    margin-right: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.1em;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
    padding: 0.5rem 0;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
  }
`;

const MethodologySection = styled(motion.div)`
  background: ${colors.bg1};
  padding: clamp(1.5rem, 3vw, 4rem);
  border-radius: clamp(12px, 2vw, 20px);
  text-align: center;
  margin-top: clamp(1.5rem, 3vw, 4rem);

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 10px;
  }

  @media (max-width: 360px) {
    padding: 1rem;
  }
`;

const MethodologyTitle = styled.h3`
  color: ${colors.accentGoldLight};
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: clamp(1rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1.25rem;
  }
`;

const MethodologyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: center;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const MethodologyText = styled.p`
  color: ${colors.muted};
  font-size: clamp(0.95rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  text-align: left;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: left;
  }

  @media (max-width: 360px) {
    font-size: 0.9rem;
  }
`;

const MethodologyImage = styled(motion.img)`
  width: 100%;
  max-width: min(350px, 100%);
  height: auto;
  border-radius: clamp(8px, 1.5vw, 15px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  justify-self: center;

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 480px) {
    max-width: 220px;
    border-radius: 8px;
  }
`;

// ===================== MAIN COMPONENT =====================
const FormationModules = () => {
  const [openModule, setOpenModule] = useState(null);

  // Optimize: Memoize modules data to prevent unnecessary re-renders
  const modules = useMemo(() => [
    {
      id: 1,
      title: "Management d'Entreprise",
      duration: "8 semaines / 72h",
      icon: <Users size={getIconSize()} />,
      items: [
        "Maîtriser les outils de gestion administrative et documentaire",
        "Comprendre et appliquer les bases de la comptabilité et de la gestion financière",
        "Développer des compétences en suivi budgétaire et trésorerie",
        "Utiliser les outils numériques (Word, Excel, logiciels de gestion)",
        "Renforcer la communication administrative et professionnelle"
      ]
    },
    {
      id: 2,
      title: "Gestion Commerciale",
      duration: "4 semaines / 35h",
      icon: <BarChart3 size={getIconSize()} />,
      items: [
        "Comprendre les principes fondamentaux de la gestion commerciale",
        "Développer des compétences en gestion de la relation client",
        "Structurer un processus commercial efficace",
        "Acquérir des outils pour optimiser les performances commerciales",
        "Analyser et ajuster une stratégie commerciale"
      ]
    },
    {
      id: 3,
      title: "Gestion de Projet",
      duration: "4 semaines / 35h",
      icon: <Book size={getIconSize()} />,
      items: [
        "Acquérir une méthodologie de conduite de projet",
        "Connaître les principaux outils nécessaires à chaque phase",
        "Développer une communication mobilisatrice",
        "Identifier et anticiper les résistances au changement"
      ]
    },
    {
      id: 4,
      title: "Excel Avancé",
      duration: "4 semaines / 45h",
      icon: <FileText size={getIconSize()} />,
      items: [
        "Développer des compétences avancées en Excel",
        "Construire des outils professionnels (tableaux de bord, reporting)",
        "Maîtriser les tableaux croisés dynamiques",
        "Initiation VBA et automatisation",
        "Projet pratique : tableau de bord financier"
      ]
    }
  ], []);

  // Optimize: Memoize the toggle function
  const toggleModule = useCallback((moduleId) => {
    setOpenModule(current => current === moduleId ? null : moduleId);
  }, []);

  // Animation variants for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: 'auto' }
  };

  return (
    <Section id="formation">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          MODULES DE FORMATION
        </Title>
        
        <ModulesGrid>
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-30px' }}
              layout
            >
              <ModuleHeader 
                onClick={() => toggleModule(module.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleModule(module.id)}
                aria-expanded={openModule === module.id}
              >
                <ModuleTitleWrapper>
                  <ModuleTitle>
                    {module.icon}
                    <span>{module.title}</span>
                  </ModuleTitle>
                </ModuleTitleWrapper>
                
                <HeaderControls>
                  <ModuleDuration>{module.duration}</ModuleDuration>
                  {openModule === module.id ? 
                    <ChevronUp size={getChevronSize()} /> : 
                    <ChevronDown size={getChevronSize()} />
                  }
                </HeaderControls>
              </ModuleHeader>
              
              <AnimatePresence initial={false}>
                {openModule === module.id && (
                  <ModuleContent
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    layout
                  >
                    <ModuleList>
                      {module.items.map((item, itemIndex) => (
                        <ModuleItem key={itemIndex}>
                          {item}
                        </ModuleItem>
                      ))}
                    </ModuleList>
                  </ModuleContent>
                )}
              </AnimatePresence>
            </ModuleCard>
          ))}
        </ModulesGrid>

        <MethodologySection
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          <MethodologyTitle>MÉTHODOLOGIE</MethodologyTitle>
          <MethodologyGrid>
            <MethodologyText>
              Le projet repose sur <strong>deux phases complémentaires</strong> :
              <br /><br />
              <strong>6 mois de formation pratique</strong> avec études de cas, simulations et ateliers pratiques
              <br /><br />
              <strong>6 mois de stage encadré</strong> en entreprise avec possibilité d'embauche immédiate
            </MethodologyText>
            <MethodologyImage
              src={imagess.lesclàssekortex2}
              alt="Méthodologie de formation"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              loading="lazy"
            />
          </MethodologyGrid>
        </MethodologySection>
      </Container>
    </Section>
  );
};

// Helper functions for responsive icon sizing
const getIconSize = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 480) return 18;
    if (width < 768) return 20;
    return 24;
  }
  return 20;
};

const getChevronSize = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 480) return 16;
    if (width < 768) return 18;
    return 20;
  }
  return 18;
};

// Optimize: Export as memoized component
export default React.memo(FormationModules);