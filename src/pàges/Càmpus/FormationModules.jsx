// src/components/CampusCortex/FormationModules.js
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Book,
  BarChart3,
  Users,
  FileText,
  Sparkles,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* =========================
   Données statiques
========================= */

const MODULES = [
  {
    id: 1,
    title: "Management d'Entreprise",
    duration: "8 semaines / 72h",
    icon: Users,
    short:'',
     items: [
      "Maîtriser les outils de gestion administrative et documentaire",
      "Comprendre et appliquer les bases de la comptabilité et de la gestion financière",
      "Développer des compétences en suivi budgétaire et trésorerie",
      "Utiliser les outils numériques (Word, Excel, logiciels de gestion)",
      "Renforcer la communication administrative et professionnelle",
    ],
  },
  {
    id: 2,
    title: "Gestion Commerciale",
    duration: "4 semaines / 35h",
    icon: BarChart3,
    short:'',    items: [
      "Comprendre les principes fondamentaux de la gestion commerciale",
      "Développer des compétences en gestion de la relation client",
      "Structurer un processus commercial efficace",
      "Acquérir des outils pour optimiser les performances commerciales",
      "Analyser et ajuster une stratégie commerciale",
    ],
  },
  {
    id: 3,
    title: "Gestion de Projet",
    duration: "4 semaines / 35h",
    icon: Book,
    short:'',    items: [
      "Acquérir une méthodologie de conduite de projet",
      "Connaître les principaux outils nécessaires à chaque phase",
      "Développer une communication mobilisatrice",
      "Identifier et anticiper les résistances au changement",
    ],
  },
  {
    id: 4,
    title: "Excel Avancé",
    duration: "4 semaines / 45h",
    icon: FileText,
    short:'',    items: [
      "Développer des compétences avancées en Excel",
      "Construire des outils professionnels (tableaux de bord, reporting)",
      "Maîtriser les tableaux croisés dynamiques",
      "Initiation VBA et automatisation",
      "Projet pratique : tableau de bord financier",
    ],
  },
];

const METHODOLOGY_POINTS = [
  {
    icon: GraduationCap,
    title: "6 mois de formation pratique",
    text: "Études de cas, ateliers, simulations, exercices orientés terrain et montée en compétences progressive.",
  },
  {
    icon: BriefcaseBusiness,
    title: "6 mois de stage en entreprise",
    text: "Immersion encadrée dans un environnement professionnel réel avec possibilité d’embauche.",
  },
  {
    icon: BadgeCheck,
    title: "Approche orientée résultats",
    text: "Chaque étape vise l’employabilité, l’autonomie professionnelle et l’intégration rapide sur le marché.",
  },
];

/* =========================
   Composant
========================= */

const FormationModules = () => {
  const [openModule, setOpenModule] = useState(1);

  const toggleModule = useCallback((moduleId) => {
    setOpenModule((current) => (current === moduleId ? null : moduleId));
  }, []);

  const summaryStats = useMemo(
    () => [
      { label: "Modules clés", value: "4" },
      { label: "Formation pratique", value: "6 mois" },
      { label: "Stage encadré", value: "6 mois" },
      { label: "Objectif final", value: "Emploi" },
    ],
    []
  );

  return (
    <Section id="formation">
      <AmbientGlow aria-hidden="true" />

      <Container>
        <Header>
          <Eyebrow
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Sparkles size={15} />
            Campus Cortex
          </Eyebrow>

          <Title
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Des modules conçus pour rendre les diplômés{" "}
            <TitleAccent>immédiatement opérationnels</TitleAccent>
          </Title>

          <Subtitle
            as={motion.p}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Le parcours Campus Cortex combine acquisition de compétences,
            mises en situation concrètes et immersion professionnelle pour
            rapprocher durablement la formation du marché de l’emploi.
          </Subtitle>
        </Header>

        <StatsRow>
          {summaryStats.map((item, index) => (
            <StatCard
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <StatValue>{item.value}</StatValue>
              <StatLabel>{item.label}</StatLabel>
            </StatCard>
          ))}
        </StatsRow>

        <ModulesIntro>
          <SectionMiniTitle>
            <Book size={18} />
            Modules de formation
          </SectionMiniTitle>
          <SectionMiniText>
            Chaque module répond à un besoin concret d’employabilité et de
            professionnalisation.
          </SectionMiniText>
        </ModulesIntro>

        <ModulesGrid>
          {MODULES.map((module, index) => {
            const Icon = module.icon;
            const isOpen = openModule === module.id;

            return (
              <ModuleCard
                key={module.id}
                as={motion.article}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.15 }}
                layout
              >
                <ModuleHeader
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  aria-expanded={isOpen}
                  aria-controls={`module-panel-${module.id}`}
                >
                  <ModuleHeaderLeft>
                    <ModuleIcon>
                      <Icon size={20} />
                    </ModuleIcon>

                    <ModuleTitleBlock>
                      <ModuleTitle>{module.title}</ModuleTitle>
                      <ModuleExcerpt>{module.short}</ModuleExcerpt>
                    </ModuleTitleBlock>
                  </ModuleHeaderLeft>

                  <ModuleHeaderRight>
                    <ModuleDuration>{module.duration}</ModuleDuration>
                    <ChevronWrap aria-hidden="true">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </ChevronWrap>
                  </ModuleHeaderRight>
                </ModuleHeader>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <ModuleContent
                      id={`module-panel-${module.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <ModuleContentInner>
                        <ModuleList>
                          {module.items.map((item, itemIndex) => (
                            <ModuleItem key={itemIndex}>
                              <BadgeCheck size={15} />
                              <span>{item}</span>
                            </ModuleItem>
                          ))}
                        </ModuleList>

                        <ModuleFooter>
                          <ModuleTag>Compétences pratiques</ModuleTag>
                          <ModuleTag>Application terrain</ModuleTag>
                          <ModuleTag>Employabilité</ModuleTag>
                        </ModuleFooter>
                      </ModuleContentInner>
                    </ModuleContent>
                  )}
                </AnimatePresence>
              </ModuleCard>
            );
          })}
        </ModulesGrid>

        <MethodologySection
          as={motion.section}
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.18 }}
        >
          <MethodologyHeader>
            <MethodologyKicker>
              <Sparkles size={15} />
              Méthodologie
            </MethodologyKicker>

            <MethodologyTitle>
              Une progression pensée pour passer de la théorie à l’intégration professionnelle
            </MethodologyTitle>

            <MethodologyLead>
              Le programme repose sur deux phases complémentaires : consolidation
              des compétences, puis immersion encadrée dans le monde du travail.
            </MethodologyLead>
          </MethodologyHeader>

          <MethodologyGrid>
            <MethodologyContent>
              {METHODOLOGY_POINTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <MethodologyPoint key={index}>
                    <MethodologyPointIcon>
                      <Icon size={18} />
                    </MethodologyPointIcon>

                    <MethodologyPointBody>
                      <MethodologyPointTitle>{item.title}</MethodologyPointTitle>
                      <MethodologyPointText>{item.text}</MethodologyPointText>
                    </MethodologyPointBody>
                  </MethodologyPoint>
                );
              })}

              <Timeline>
                <TimelineStep>
                  <TimelineNumber>01</TimelineNumber>
                  <TimelineText>
                    <strong>Former</strong> sur des compétences directement mobilisables.
                  </TimelineText>
                </TimelineStep>

                <TimelineStep>
                  <TimelineNumber>02</TimelineNumber>
                  <TimelineText>
                    <strong>Exposer</strong> les participants à des cas concrets et à des outils professionnels.
                  </TimelineText>
                </TimelineStep>

                <TimelineStep>
                  <TimelineNumber>03</TimelineNumber>
                  <TimelineText>
                    <strong>Insérer</strong> les diplômés dans un environnement d’entreprise réel.
                  </TimelineText>
                </TimelineStep>
              </Timeline>

              <MethodologyAction href="#contact">
                Demander des informations
                <ArrowRight size={16} />
              </MethodologyAction>
            </MethodologyContent>

            <MethodologyVisual>
              <MethodologyImage
                src={imagess.lesclàssekortex2}
                alt="Méthodologie de formation Campus Cortex"
                loading="lazy"
                decoding="async"
              />

              <VisualBadge>
                <VisualMini>Campus Cortex</VisualMini>
                <VisualTitle>6 mois + 6 mois</VisualTitle>
                <VisualText>
                  Formation pratique suivie d’une immersion professionnelle encadrée.
                </VisualText>
              </VisualBadge>
            </MethodologyVisual>
          </MethodologyGrid>
        </MethodologySection>
      </Container>
    </Section>
  );
};

export default React.memo(FormationModules);

/* =========================
   Styles
========================= */

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 6vw, 6rem) clamp(0.9rem, 2.5vw, 2rem);
  background: ${colors.bgSoft};
  overflow: hidden;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: -120px auto auto -100px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(243, 111, 33, 0.14) 80%,
    rgba(243, 111, 33, 0.05) 30%,
    transparent 72%
  );
  filter: blur(14px);
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: clamp(1.6rem, 3vw, 2.5rem);
`;

const Header = styled.div`
  text-align: center;
  display: grid;
  gap: 0.85rem;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  padding: 0.6rem 0.95rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.12);
  border: 1px solid rgba(243, 111, 33, 0.22);
  color: ${colors.accentGold};
  font-weight: 700;
  font-size: 0.92rem;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  color: ${colors.text};
  font-weight: 800;
  line-height: 1.12;
`;

const TitleAccent = styled.span`
  color: ${colors.accentGold};
`;

const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 760px;
  text-align: center;
  color: ${colors.muted};
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.72;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${colors.bg};
  border: 1px solid rgba(243, 111, 33, 0.12);
  border-radius: 18px 0 18px 0;
  padding: 1rem 1rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  text-align: center;
`;

const StatValue = styled.div`
  color: ${colors.accentGold};
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  font-weight: 800;
  line-height: 1.2;
`;

const StatLabel = styled.div`
  margin-top: 0.25rem;
  color: ${colors.muted};
  font-size: 0.93rem;
  line-height: 1.45;
`;

const ModulesIntro = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const SectionMiniTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: ${colors.accentGold};
  font-weight: 800;
  font-size: 1rem;
`;

const SectionMiniText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.6;
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(0.9rem, 2vw, 1.4rem);
`;

const ModuleCard = styled(motion.article)`
  background: ${colors.bg};
  border-radius: 20px 0 20px 0;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(243, 111, 33, 0.1);
`;

const ModuleHeader = styled.button`
  width: 100%;
  border: none;
  background: linear-gradient(
    135deg,
    ${colors.accentGold}95 70%,
    ${colors.accentGold3} 30%
  );
  color: white;
  cursor: pointer;
  padding: 1rem 1rem;
  display: grid;
  gap: 0.9rem;
  text-align: left;

  @media (min-width: 680px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
`;

const ModuleHeaderLeft = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  min-width: 0;
`;

const ModuleIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px 0 14px 0;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ModuleTitleBlock = styled.div`
  display: grid;
  gap: 0.3rem;
  min-width: 0;
`;

const ModuleTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  font-weight: 700;
  line-height: 1.25;
`;

const ModuleExcerpt = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
`;

const ModuleHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;

  @media (min-width: 680px) {
    justify-content: flex-end;
  }
`;

const ModuleDuration = styled.div`
  background: rgba(255, 255, 255, 0.18);
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
`;

const ChevronWrap = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ModuleContent = styled(motion.div)`
  overflow: hidden;
`;

const ModuleContentInner = styled.div`
  padding: 1rem 1rem 1.05rem;
  display: grid;
  gap: 1rem;
`;

const ModuleList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.8rem;
`;

const ModuleItem = styled.li`
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  color: ${colors.muted};
  line-height: 1.6;
  font-size: 0.96rem;

  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
    margin-top: 0.15rem;
  }

  span {
    min-width: 0;
  }
`;

const ModuleFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

const ModuleTag = styled.span`
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.1);
  color: ${colors.accentGold};
  font-size: 0.84rem;
  font-weight: 700;
  border: 1px solid rgba(243, 111, 33, 0.14);
`;

const MethodologySection = styled.section`
  background: linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg} 100%);
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: 24px 0 24px 0;
  display: grid;
  gap: 1.4rem;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.18);
`;

const MethodologyHeader = styled.div`
  display: grid;
  gap: 0.65rem;
  text-align: center;
`;

const MethodologyKicker = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  color: ${colors.accentGoldLight};
  font-weight: 800;
  font-size: 0.92rem;
`;

const MethodologyTitle = styled.h3`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.18;
`;

const MethodologyLead = styled.p`
  margin: 0 auto;
  max-width: 760px;
  color: ${colors.muted};
  font-size: clamp(0.98rem, 1.5vw, 1.1rem);
  line-height: 1.7;
`;

const MethodologyGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.4rem, 3vw, 2.4rem);
  align-items: center;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const MethodologyContent = styled.div`
  display: grid;
  gap: 1rem;
`;

const MethodologyPoint = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  align-items: start;
  padding: 0.95rem 1rem;
  border-radius: 18px 0 18px 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(243, 111, 33, 0.1);
`;

const MethodologyPointIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px 0 14px 0;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MethodologyPointBody = styled.div`
  display: grid;
  gap: 0.28rem;
`;

const MethodologyPointTitle = styled.h4`
  margin: 0;
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.35;
`;

const MethodologyPointText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.65;
  font-size: 0.95rem;
`;

const Timeline = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-top: 0.2rem;
`;

const TimelineStep = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
`;

const TimelineNumber = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.14);
  color: ${colors.accentGold};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.82rem;
`;

const TimelineText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.6;
  font-size: 0.95rem;

  strong {
    color: ${colors.text};
  }
`;

const MethodologyAction = styled.a`
  width: fit-content;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.92rem 1.15rem;
  border-radius: 18px 0 18px 0;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(243, 111, 33, 0.24);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(243, 111, 33, 0.3);
  }
`;

const MethodologyVisual = styled.div`
  position: relative;
  min-width: 0;
`;

const MethodologyImage = styled.img`
  width: 100%;
  max-width: min(430px, 100%);
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 20px 0 20px 0;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
`;

const VisualBadge = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  padding: 0.95rem 1rem;
  border-radius: 18px 0 18px 0;
  background: rgba(10, 22, 39, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
`;

const VisualMini = styled.div`
  color: ${colors.accentGoldLight};
  font-size: 0.83rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const VisualTitle = styled.h4`
  margin: 0.2rem 0 0.28rem;
  color: white;
  font-size: 1.15rem;
  line-height: 1.25;
`;

const VisualText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.55;
  font-size: 0.92rem;
`;