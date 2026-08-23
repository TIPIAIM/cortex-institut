 // src/components/CampusCortex/ObjectivesSection.js
import React, { useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  TrendingUp,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import colors from "../../Styles/colors";

/* =========================
   Données statiques
========================= */

const OBJECTIVES = [
  {
    icon: Target,
    title: "Objectif général",
    value: "Insertion professionnelle",
    text: "Faciliter l’insertion professionnelle des jeunes diplômés sans emploi à travers un parcours intensif, concret et directement connecté aux besoins du marché.",
  },
  {
    icon: Users,
    title: "Formation intensive",
    value: "20 participants / cohorte",
    text: "Former un groupe restreint d’apprenants sélectionnés pour assurer un accompagnement de qualité, un meilleur suivi et une progression réellement encadrée.",
  },
  {
    icon: TrendingUp,
    title: "Impact attendu",
    value: "90% d’embauche visée",
    text: "Atteindre un taux d’employabilité élevé à la fin du programme grâce à une logique axée sur les compétences pratiques et l’immersion en entreprise.",
  },
];

const SELECTION_CRITERIA = [
  "Test d’admission obligatoire",
  "Seulement 20 participants par rentrée",
  "Programme réservé aux meilleurs diplômés",
];

const MINI_PROOFS = [
  "Sélection rigoureuse",
  "Accompagnement ciblé",
  "Forte orientation emploi",
];

/* =========================
   Composant
========================= */

const ObjectivesSection = () => {
  const objectives = useMemo(() => OBJECTIVES, []);
  const selectionCriteria = useMemo(() => SELECTION_CRITERIA, []);
  const miniProofs = useMemo(() => MINI_PROOFS, []);

  return (
    <Section id="objectifs">
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
            Des objectifs clairs pour produire un{" "}
            <TitleAccent>impact réel sur l’employabilité</TitleAccent>
          </Title>

          <Subtitle
            as={motion.p}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Campus Cortex ne se limite pas à former. Le programme est structuré
            pour sélectionner les meilleurs profils, développer des compétences
            utiles et maximiser les chances d’intégration professionnelle.
          </Subtitle>
        </Header>

        <StatsRow>
          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniStatValue>20</MiniStatValue>
            <MiniStatLabel>participants par cohorte</MiniStatLabel>
          </MiniStat>

          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniStatValue>90%</MiniStatValue>
            <MiniStatLabel>objectif d’employabilité</MiniStatLabel>
          </MiniStat>

          <MiniStat
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <MiniStatValue>1</MiniStatValue>
            <MiniStatLabel>processus de sélection rigoureux</MiniStatLabel>
          </MiniStat>
        </StatsRow>

        <ObjectivesGrid>
          {objectives.map((objective, index) => {
            const Icon = objective.icon;

            return (
              <ObjectiveCard
                key={index}
                as={motion.article}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover={{ y: -4 }}
              >
                <ObjectiveTop>
                  <IconWrapper>
                    <Icon size={22} />
                  </IconWrapper>

                  <ObjectiveHeader>
                    <CardTitle>{objective.title}</CardTitle>
                    <CardValue>{objective.value}</CardValue>
                  </ObjectiveHeader>
                </ObjectiveTop>

                <CardText>{objective.text}</CardText>

                <CardFooter>
                  <BadgeCheck size={15} />
                  <span>Orientation résultats</span>
                </CardFooter>
              </ObjectiveCard>
            );
          })}
        </ObjectivesGrid>

        <SelectionSection
          as={motion.section}
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.18 }}
        >
          <SelectionHeader>
            <SelectionKicker>
              <ShieldCheck size={16} />
              Critères de sélection
            </SelectionKicker>

            <SelectionTitle>
              Un programme réservé aux profils les plus engagés
            </SelectionTitle>

            <SelectionLead>
              L’entrée dans le Campus Cortex repose sur une sélection exigeante,
              afin de garantir une cohorte motivée, performante et prête à
              suivre un parcours intensif.
            </SelectionLead>
          </SelectionHeader>

          <SelectionList>
            {selectionCriteria.map((item, index) => (
              <SelectionItem key={index}>
                <SelectionBullet>
                  <BadgeCheck size={16} />
                </SelectionBullet>
                <span>{item}</span>
              </SelectionItem>
            ))}
          </SelectionList>

          <ProofsRow>
            {miniProofs.map((item, index) => (
              <ProofBadge key={index}>{item}</ProofBadge>
            ))}
          </ProofsRow>

          <SelectionAction href="#contact">
            Rejoindre le programme
            <ArrowRight size={16} />
          </SelectionAction>
        </SelectionSection>
      </Container>
    </Section>
  );
};

export default React.memo(ObjectivesSection);

/* =========================
   Styles
========================= */

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 6vw, 6rem) clamp(1rem, 2.6vw, 2rem);
  background: linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg} 100%);
  overflow: hidden;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: auto -120px -140px auto;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(243, 111, 33, 0.14) 0%,
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
  max-width: 760px;
  color: ${colors.muted};
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.72;
`;

const StatsRow = styled.div`
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

const MiniStatValue = styled.div`
  color: ${colors.accentGold};
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  font-weight: 800;
  line-height: 1.2;
`;

const MiniStatLabel = styled.div`
  margin-top: 0.3rem;
  color: ${colors.muted};
  font-size: 0.94rem;
  line-height: 1.5;
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
`;

const ObjectiveCard = styled.article`
  background: ${colors.bgSoft};
  padding: clamp(1.25rem, 2.5vw, 1.6rem);
  border-radius: 22px 0 22px 0;
  border: 1px solid rgba(243, 111, 33, 0.14);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  display: grid;
  gap: 1rem;
`;

const ObjectiveTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
`;

const IconWrapper = styled.div`
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

const ObjectiveHeader = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(1.08rem, 1.8vw, 1.35rem);
  font-weight: 700;
  line-height: 1.3;
`;

const CardValue = styled.div`
  color: ${colors.text};
  font-size: 0.96rem;
  font-weight: 700;
  opacity: 0.95;
`;

const CardText = styled.p`
  color: ${colors.muted};
  line-height: 1.7;
  font-size: 0.96rem;
  margin: 0;
`;

const CardFooter = styled.div`
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

const SelectionSection = styled.section`
  background: linear-gradient(
    135deg,
    ${colors.accentGold}88 0%,
    ${colors.accentGold3} 100%
  );
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: 24px 0 24px 0;
  color: white;
  box-shadow: 0 18px 34px rgba(243, 111, 33, 0.18);
  display: grid;
  gap: 1.2rem;
`;

const SelectionHeader = styled.div`
  display: grid;
  gap: 0.55rem;
  text-align: center;
`;

const SelectionKicker = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
`;

const SelectionTitle = styled.h3`
  font-size: clamp(1.45rem, 3vw, 2.1rem);
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
`;

const SelectionLead = styled.p`
  margin: 0 auto;
  max-width: 760px;
  line-height: 1.7;
  font-size: clamp(0.98rem, 1.5vw, 1.08rem);
  color: rgba(255, 255, 255, 0.94);
`;

const SelectionList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 0.9rem;
  margin: 0;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const SelectionItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
  padding: 1rem 1rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px 0 18px 0;
  backdrop-filter: blur(10px);
  line-height: 1.55;
  font-size: 0.97rem;
`;

const SelectionBullet = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ProofsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
`;

const ProofBadge = styled.span`
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.88rem;
  font-weight: 700;
`;

const SelectionAction = styled.a`
  width: fit-content;
  margin: 0 auto;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.2rem;
  border-radius: 18px 0 18px 0;
  background: rgba(10, 22, 39, 0.86);
  color: white;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(10, 22, 39, 0.2);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(10, 22, 39, 0.28);
  }
`;