// src/components/CampusCortex/ContextSection.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  TrendingUp,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

const HIGHLIGHTS = [
  {
    icon: <GraduationCap size={18} />,
    title: "6 mois de formation",
    text: "Un parcours intensif, concret et professionnalisant.",
  },
  {
    icon: <BriefcaseBusiness size={18} />,
    title: "6 mois de stage",
    text: "Une immersion réelle en entreprise avec accompagnement.",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Insertion accélérée",
    text: "Un programme pensé pour favoriser l’employabilité immédiate.",
  },
];

const PROOFS = [
  "Approche orientée terrain",
  "Compétences directement applicables",
  "Accompagnement vers l’emploi",
];

const ContextSection = () => {
  return (
    <Section id="contexte">
      <AmbientGlow aria-hidden="true" />

      <Container>
        <Content
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Eyebrow>
            <Sparkles size={16} />
            Campus Cortex
          </Eyebrow>

          <Title>
            Un programme pensé pour transformer le diplôme en{" "}
            <TitleAccent>opportunité réelle</TitleAccent>
          </Title>

          <Lead>
            Face à la montée du <Highlight>chômage des jeunes diplômés</Highlight>{" "}
            en Guinée, l’Institut Cortex déploie <Highlight>Campus Cortex</Highlight>,
            un dispositif structuré pour rapprocher durablement la formation et
            les besoins concrets des entreprises.
          </Lead>

          <TextBlock>
            <Text>
              L’ambition est claire : offrir à des diplômés sans emploi un
              parcours de montée en compétences à forte valeur ajoutée, avec
              une <Highlight>formation pratique de 6 mois</Highlight>, suivie
              de <Highlight>6 mois de stage encadré</Highlight> en entreprise.
            </Text>

            <Text>
              Au-delà d’un simple apprentissage, Campus Cortex crée un
              environnement où les participants développent des réflexes
              professionnels, gagnent en confiance et se positionnent plus
              rapidement sur le marché du travail.
            </Text>
          </TextBlock>

          <QuickStats>
            {HIGHLIGHTS.map((item, index) => (
              <StatCard
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <StatIcon>{item.icon}</StatIcon>
                <StatContent>
                  <StatTitle>{item.title}</StatTitle>
                  <StatText>{item.text}</StatText>
                </StatContent>
              </StatCard>
            ))}
          </QuickStats>

          <Proofs>
            {PROOFS.map((item, index) => (
              <ProofItem key={index}>
                <BadgeCheck size={16} />
                <span>{item}</span>
              </ProofItem>
            ))}
          </Proofs>

          <CtaRow>
            <PrimaryAction href="#objectifs">
              Découvrir les objectifs
              <ArrowRight size={16} />
            </PrimaryAction>

            <SecondaryAction href="#contact">
              Nous contacter
            </SecondaryAction>
          </CtaRow>
        </Content>

        <Visual
          as={motion.div}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ImageShell>
            <Image
              src={imagess.lesclàssekortex3}
              alt="Campus Cortex - formation et accompagnement professionnel"
              loading="lazy"
              decoding="async"
            />
            <ImageOverlay />

            <FloatingBadge>
              <FloatingTop>
                <FloatingMini>Campus Cortex</FloatingMini>
                <FloatingTitle>6 mois + 6 mois</FloatingTitle>
              </FloatingTop>
              <FloatingText>
                Formation pratique suivie d’un stage encadré en entreprise.
              </FloatingText>
            </FloatingBadge>
          </ImageShell>
        </Visual>
      </Container>
    </Section>
  );
};

export default React.memo(ContextSection);

/* =========================
   Styles
========================= */

const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 7vw, 7rem) clamp(1rem, 3vw, 2rem);
  background: linear-gradient(135deg, ${colors.bgSoft} 0%, ${colors.bg1} 100%);
  overflow: hidden;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: auto -120px -80px auto;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(243, 111, 33, 0.14) 0%,
    rgba(243, 111, 33, 0.05) 35%,
    transparent 70%
  );
  filter: blur(16px);
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  color: ${colors.text};
  display: grid;
  gap: 1.2rem;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  width: fit-content;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.12);
  border: 1px solid rgba(243, 111, 33, 0.22);
  color: ${colors.accentGold};
  font-weight: 700;
  font-size: 0.95rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 5vw, 0.6rem);
  line-height: 0.9;
  color: ${colors.text};
  font-weight: 800;
 // max-width: 20ch;
`;

const TitleAccent = styled.span`
  color: ${colors.accentGold};
`;

const Lead = styled.p`
  margin: 0;
  font-size: clamp(1.02rem, 1.8vw, 1.18rem);
  line-height: 1.8;
  color: ${colors.text};
  opacity: 0.96;
  max-width: 62ch;
`;

const TextBlock = styled.div`
  display: grid;
  gap: 1rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.85;
  color: ${colors.muted};
`;

const Highlight = styled.span`
  color: ${colors.accentGoldLight};
  font-weight: 700;
`;

const QuickStats = styled.div`
  display: grid;
  gap: 0.95rem;
  margin-top: 0.5rem;
`;

const StatCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: 1rem 1rem;
  border-radius: 18px 0 18px 0;
  background: linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgSoft} 100%);
  border: 1px solid rgba(243, 111, 33, 0.12);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
`;

const StatIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px 0 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  flex-shrink: 0;
`;

const StatContent = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const StatTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${colors.text};
  font-weight: 700;
`;

const StatText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${colors.muted};
  line-height: 1.6;
`;

const Proofs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.25rem;
`;

const ProofItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(243, 111, 33, 0.12);
  color: ${colors.text};
  font-size: 0.92rem;
  font-weight: 600;

  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 0.35rem;
`;

const ActionBase = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.2rem;
  border-radius: 18px 0 18px 0;
  font-weight: 700;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryAction = styled(ActionBase)`
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  box-shadow: 0 12px 26px rgba(243, 111, 33, 0.28);

  &:hover {
    box-shadow: 0 16px 30px rgba(243, 111, 33, 0.34);
  }
`;

const SecondaryAction = styled(ActionBase)`
  background: transparent;
  color: ${colors.text};
  border: 1px solid rgba(243, 111, 33, 0.24);

  &:hover {
    border-color: ${colors.accentGold};
    background: rgba(243, 111, 33, 0.06);
  }
`;

const Visual = styled.div`
  position: relative;
`;

const ImageShell = styled.div`
  position: relative;
  border-radius: 24px 0 24px 0;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
  min-height: 460px;
  border: 1px solid rgba(243, 111, 33, 0.12);

  @media (max-width: 968px) {
    min-height: 380px;
  }

  @media (max-width: 640px) {
    min-height: 320px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 460px;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;

  ${ImageShell}:hover & {
    transform: scale(1.04);
  }

  @media (max-width: 968px) {
    min-height: 380px;
  }

  @media (max-width: 640px) {
    min-height: 320px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 17, 31, 0.08), rgba(8, 17, 31, 0.68)),
    linear-gradient(135deg, rgba(243, 111, 33, 0.08), transparent 45%);
`;

const FloatingBadge = styled.div`
  position: absolute;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.1rem;
  padding: 1rem 1rem;
  border-radius: 18px 0 18px 0;
  background: rgba(10, 22, 39, 0.78);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
`;

const FloatingTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.45rem;
`;

const FloatingMini = styled.span`
  color: ${colors.accentGoldLight};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const FloatingTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 800;
`;

const FloatingText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.6;
  font-size: 0.95rem;
`;