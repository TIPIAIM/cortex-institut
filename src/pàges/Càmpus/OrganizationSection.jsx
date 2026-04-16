// src/components/CampusCortex/OrganizationSection.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Target,
  Sparkles,
  BadgeCheck,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import colors from "../../Styles/colors";

/* =========================
   Données statiques
========================= */

const ORGANIZATION_DATA = [
  {
    icon: Users,
    title: "Campus de l’Institut Cortex",
    text: "Un cadre structuré, moderne et orienté performance pour permettre un apprentissage sérieux, progressif et professionnalisant.",
  },
  {
    icon: Target,
    title: "Formateurs certifiés",
    text: "Des intervenants expérimentés, proches des réalités du terrain, capables d’accompagner les participants vers des compétences directement exploitables.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Entreprises partenaires",
    text: "Un réseau d’entreprises locales et internationales mobilisé pour accueillir les apprenants en stage et favoriser leur intégration professionnelle.",
  },
];

const MODALITES_DATA = [
  {
    icon: Clock,
    title: "Durée du programme",
    text: "12 mois au total : 6 mois de cours pratiques + 6 mois de stage en entreprise.",
  },
  {
    icon: Calendar,
    title: "Rentrées annuelles",
    text: "Deux rentrées prévues chaque année : Janvier et Juillet.",
  },
  {
    icon: Users,
    title: "Rythme de formation",
    text: "3 séances par semaine avec organisation adaptée aux profils des participants.",
  },
];

const SCHEDULE_DATA = [
  {
    label: "G1 Matin",
    time: "Lundi, mardi et mercredi",
    detail: "10h00 – 13h00",
  },
  {
    label: "G2 Soir",
    time: "Lundi, mardi et mercredi",
    detail: "16h00 – 19h00",
  },
];

const RESULTS_DATA = [
  { value: "20", label: "jeunes formés par promotion" },
  { value: "100%", label: "placés en stage" },
  { value: "100%", label: "insérés dans l’emploi" },
  { value: "90%+", label: "objectif d’embauche" },
];

/* =========================
   Composant
========================= */

const OrganizationSection = () => {
  return (
    <Section id="organisation">
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
            Une organisation pensée pour assurer une{" "}
            <TitleAccent>mise en œuvre solide et crédible</TitleAccent>
          </Title>

          <Subtitle
            as={motion.p}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Campus Cortex repose sur une structuration claire : un cadre de
            formation adapté, des encadrants qualifiés, un réseau d’entreprises
            partenaires et des modalités conçues pour maximiser l’impact du
            programme sur l’employabilité.
          </Subtitle>
        </Header>

        <QuickStats>
          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniValue>12 mois</MiniValue>
            <MiniLabel>parcours complet</MiniLabel>
          </MiniStat>

          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniValue>2</MiniValue>
            <MiniLabel>rentrées par an</MiniLabel>
          </MiniStat>

          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniValue>3 fois</MiniValue>
            <MiniLabel>par semaine</MiniLabel>
          </MiniStat>
        </QuickStats>

        <OrganizationGrid>
          {ORGANIZATION_DATA.map((item, index) => {
            const Icon = item.icon;

            return (
              <OrganizationCard
                key={index}
                as={motion.article}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover={{ y: -4 }}
              >
                <OrganizationTop>
                  <OrganizationIcon>
                    <Icon size={22} />
                  </OrganizationIcon>

                  <OrganizationHeader>
                    <OrganizationTitle>{item.title}</OrganizationTitle>
                  </OrganizationHeader>
                </OrganizationTop>

                <OrganizationText>{item.text}</OrganizationText>

                <OrganizationFooter>
                  <BadgeCheck size={15} />
                  <span>Structure orientée résultats</span>
                </OrganizationFooter>
              </OrganizationCard>
            );
          })}
        </OrganizationGrid>

        <ModalitesSection
          as={motion.section}
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.18 }}
        >
          <ModalitesHeader>
            <ModalitesKicker>
              <BadgeCheck size={16} />
              Modalités du programme
            </ModalitesKicker>

            <ModalitesTitle>
              Un format structuré pour faciliter l’apprentissage et
              l’organisation des participants
            </ModalitesTitle>

            <ModalitesLead>
              Le rythme, la durée et les créneaux de formation ont été pensés
              pour créer un équilibre entre intensité pédagogique, rigueur et
              accessibilité.
            </ModalitesLead>
          </ModalitesHeader>

          <ModalitesGrid>
            {MODALITES_DATA.map((item, index) => {
              const Icon = item.icon;

              return (
                <ModaliteItem key={index}>
                  <ModaliteIcon>
                    <Icon size={20} />
                  </ModaliteIcon>

                  <ModaliteBody>
                    <ModaliteTitle>{item.title}</ModaliteTitle>
                    <ModaliteText>{item.text}</ModaliteText>
                  </ModaliteBody>
                </ModaliteItem>
              );
            })}
          </ModalitesGrid>

          <PriceCard>
            <PriceLabel>Tarif du programme</PriceLabel>
            <PriceValue>6.990.000 GNF</PriceValue>
            <PriceHint>
              Un investissement structuré pour une montée en compétences et une
              insertion professionnelle accélérée.
            </PriceHint>
          </PriceCard>

          <ScheduleWrap>
            {SCHEDULE_DATA.map((item, index) => (
              <ScheduleCard key={index}>
                <ScheduleBadge>{item.label}</ScheduleBadge>
                <ScheduleText>{item.time}</ScheduleText>
                <ScheduleTime>{item.detail}</ScheduleTime>
              </ScheduleCard>
            ))}
          </ScheduleWrap>
        </ModalitesSection>

        <ResultsSection
          as={motion.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.18 }}
        >
          <ResultsHeader>
            <ResultsTitle>Résultats attendus</ResultsTitle>
            <ResultsText>
              L’organisation du programme est construite pour produire des
              résultats visibles sur la formation, le stage et l’employabilité.
            </ResultsText>
          </ResultsHeader>

          <ResultsGrid>
            {RESULTS_DATA.map((result, index) => (
              <ResultItem
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.15 }}
              >
                <ResultValue>{result.value}</ResultValue>
                <ResultLabel>{result.label}</ResultLabel>
              </ResultItem>
            ))}
          </ResultsGrid>

          <ResultsAction href="#contact">
            Demander plus d’informations
            <ArrowRight size={16} />
          </ResultsAction>
        </ResultsSection>
      </Container>
    </Section>
  );
};

export default React.memo(OrganizationSection);

/* =========================
   Styles
========================= */

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 6vw, 6rem) clamp(1rem, 2.6vw, 2rem);
  background: linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg1} 100%);
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
    rgba(243, 111, 33, 0.13) 0%,
    rgba(243, 111, 33, 0.05) 36%,
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
  gap: clamp(1.5rem, 3vw, 2.4rem);
`;

const Header = styled.div`
  display: grid;
  gap: 0.85rem;
  text-align: center;
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
  font-size: clamp(2rem, 4.5vw, 3.45rem);
  color: ${colors.text};
  line-height: 1.12;
  font-weight: 800;
`;

const TitleAccent = styled.span`
  color: ${colors.accentGold};
`;

const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 780px;
  color: ${colors.muted};
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.72;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const MiniStat = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(243, 111, 33, 0.12);
  border-radius: 18px 0 18px 0;
  padding: 1rem 1rem;
  text-align: center;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.14);
`;

const MiniValue = styled.div`
  color: ${colors.accentGold};
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  font-weight: 800;
  line-height: 1.2;
`;

const MiniLabel = styled.div`
  margin-top: 0.3rem;
  color: ${colors.muted};
  font-size: 0.94rem;
  line-height: 1.5;
`;

const OrganizationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
`;

const OrganizationCard = styled.article`
  background: ${colors.bgSoft};
  padding: clamp(1.2rem, 2.4vw, 1.5rem);
  border-radius: 22px 0 22px 0;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(243, 111, 33, 0.12);
  display: grid;
  gap: 1rem;
`;

const OrganizationTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
`;

const OrganizationIcon = styled.div`
  width: 54px;
  height: 54px;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  border-radius: 16px 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const OrganizationHeader = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const OrganizationTitle = styled.h3`
  color: ${colors.accentGoldLight};
  font-size: clamp(1.08rem, 1.8vw, 1.35rem);
  margin: 0;
  font-weight: 700;
  line-height: 1.3;
`;

const OrganizationText = styled.p`
  color: ${colors.muted};
  line-height: 1.7;
  font-size: 0.96rem;
  margin: 0;
`;

const OrganizationFooter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.1);
  border: 1px solid rgba(243, 111, 33, 0.12);
  color: ${colors.accentGold};
  font-size: 0.84rem;
  font-weight: 700;
`;

const ModalitesSection = styled.section`
  background: linear-gradient(
    135deg,
    ${colors.accentGold}16 0%,
    ${colors.bgSoft} 100%
  );
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: 24px 0 24px 0;
  display: grid;
  gap: 1.25rem;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.14);
`;

const ModalitesHeader = styled.div`
  display: grid;
  gap: 0.55rem;
  text-align: center;
`;

const ModalitesKicker = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 800;
  color: ${colors.accentGold};
`;

const ModalitesTitle = styled.h3`
  color: ${colors.text};
  font-size: clamp(1.45rem, 3vw, 2.1rem);
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
`;

const ModalitesLead = styled.p`
  margin: 0 auto;
  max-width: 760px;
  line-height: 1.7;
  font-size: clamp(0.98rem, 1.5vw, 1.08rem);
  color: ${colors.muted};
`;

const ModalitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ModaliteItem = styled.div`
  background: ${colors.bg};
  padding: 1rem 1rem;
  border-radius: 18px 0 18px 0;
  border: 1px solid rgba(243, 111, 33, 0.12);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
`;

const ModaliteIcon = styled.div`
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

const ModaliteBody = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const ModaliteTitle = styled.h4`
  margin: 0;
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.35;
`;

const ModaliteText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const PriceCard = styled.div`
  background: linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg} 100%);
  border-radius: 22px 0 22px 0;
  padding: 1.2rem 1rem;
  text-align: center;
  border: 1px solid rgba(243, 111, 33, 0.14);
`;

const PriceLabel = styled.div`
  color: ${colors.muted};
  font-size: 0.92rem;
  font-weight: 700;
`;

const PriceValue = styled.div`
  margin-top: 0.3rem;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: ${colors.accentGold};
  font-weight: 800;
  line-height: 1.15;
`;

const PriceHint = styled.p`
  margin: 0.45rem auto 0;
  max-width: 620px;
  color: ${colors.muted};
  line-height: 1.6;
  font-size: 0.94rem;
`;

const ScheduleWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 1rem;
`;

const ScheduleCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(243, 111, 33, 0.12);
  border-radius: 18px 0 18px 0;
  padding: 1rem 1rem;
  text-align: center;
`;

const ScheduleBadge = styled.div`
  width: fit-content;
  margin: 0 auto 0.55rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.12);
  color: ${colors.accentGold};
  font-size: 0.84rem;
  font-weight: 800;
`;

const ScheduleText = styled.p`
  margin: 0;
  color: ${colors.text};
  line-height: 1.5;
  font-size: 0.95rem;
  font-weight: 600;
`;

const ScheduleTime = styled.div`
  margin-top: 0.35rem;
  color: ${colors.muted};
  font-size: 0.92rem;
  line-height: 1.45;
`;

const ResultsSection = styled.section`
  background: ${colors.bgSoft};
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: 24px 0 24px 0;
  text-align: center;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.16);
`;

const ResultsHeader = styled.div`
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1.2rem;
`;

const ResultsTitle = styled.h3`
  color: ${colors.accentGold};
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
`;

const ResultsText = styled.p`
  margin: 0 auto;
  max-width: 700px;
  color: ${colors.muted};
  line-height: 1.7;
  font-size: 1rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 1rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const ResultItem = styled.div`
  padding: 1.15rem 1rem;
  background: ${colors.bg};
  border-radius: 18px 0 18px 0;
  border: 1px solid rgba(243, 111, 33, 0.12);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
`;

const ResultValue = styled.div`
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  color: ${colors.accentGoldLight};
  font-weight: 800;
  margin-bottom: 0.3rem;
  line-height: 1;
`;

const ResultLabel = styled.div`
  color: ${colors.muted};
  font-size: 0.92rem;
  line-height: 1.45;
`;

const ResultsAction = styled.a`
  width: fit-content;
  margin: 1.25rem auto 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.2rem;
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