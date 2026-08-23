// src/pages/CortexHolding.jsx
import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import {
  Building2,
  Network,
  Sparkles,
  Target,
  ArrowUpRight,
  Quote,
} from "lucide-react";

import colors from "../../Styles/colors";

/* =========================================================
   ANIMATIONS
========================================================= */

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

const floatOrb = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -14px, 0);
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

function CortexHolding() {
  return (
    <Section id="cortex-holding">
      <BackgroundOrb
        $accent={colors.accentGold || "#F2C94C"}
        aria-hidden="true"
      />

      <Container>
        {/* =================================================
            HEADER
        ================================================= */}

        <Header>
          <Eyebrow>
            <Sparkles size={14} />
            CORTEX HOLDING
          </Eyebrow>

          <Title>
            <GradientTitle>
              Cortex Holding
            </GradientTitle>
          </Title>

          <Intro>
            Une vision africaine de l'excellence, de
            l'innovation et de la croissance durable.
          </Intro>
        </Header>

        {/* =================================================
            PRESENTATION
        ================================================= */}

        <PresentationCard>
          <CardTop>
            <IconBox>
              <Building2 size={24} />
            </IconBox>

            <CardLabel>
              NOTRE VISION
            </CardLabel>
          </CardTop>

          <Paragraph>
            La croissance rapide de Cortex Holding et
            l’expansion de ses filiales, Institut Cortex
            et Innov Éditions, Campus Cortex et Tônôn,
            témoignent de la vision que nous portons :
            bâtir un groupe africain d’excellence,
            structuré, moderne et capable d’offrir des
            services conformes aux standards
            internationaux.
          </Paragraph>

          <Paragraph>
            Cette ambition ne saurait se concrétiser sans
            un cadre de gestion rigoureux, harmonisé et
            partagé par l’ensemble de nos équipes.
          </Paragraph>
        </PresentationCard>

        {/* =================================================
            SYNERGIES
        ================================================= */}

        <ContentGrid>
          <ContentCard>
            <CardTop>
              <IconBox>
                <Network size={23} />
              </IconBox>

              <CardLabel>
                UN RÉSEAU DE SYNERGIES
              </CardLabel>
            </CardTop>

            <Paragraph>
              Notre réseau est conçu pour maximiser les
              synergies entre les différentes entités,
              permettant ainsi de répondre efficacement
              aux besoins variés de nos clients.
            </Paragraph>

            <Paragraph>
              Les filiales de Cortex Holding jouent un rôle
              crucial dans cette dynamique collaborative.
              Elles apportent chacune une expertise
              spécifique, renforçant ainsi notre capacité
              à offrir des solutions complètes et
              innovantes.
            </Paragraph>
          </ContentCard>

          <ContentCard>
            <CardTop>
              <IconBox>
                <Sparkles size={23} />
              </IconBox>

              <CardLabel>
                PARTENARIATS & INNOVATION
              </CardLabel>
            </CardTop>

            <Paragraph>
              De plus, nos partenariats externes nous
              permettent d’élargir notre champ d’action
              et de bénéficier de nouvelles compétences
              et technologies.
            </Paragraph>

            <HighlightBox>
              <ArrowUpRight size={18} />

              <span>
                Des expertises complémentaires pour
                construire des solutions complètes et
                innovantes.
              </span>
            </HighlightBox>
          </ContentCard>
        </ContentGrid>

        {/* =================================================
            PLAN 2026 - 2030
        ================================================= */}

        <StrategyCard>
          <StrategyHeader>
            <StrategyIcon>
              <Target size={25} />
            </StrategyIcon>

            <div>
              <StrategyKicker>
                PLAN QUINQUENNAL
              </StrategyKicker>

              <StrategyTitle>
                2026 — 2030
              </StrategyTitle>
            </div>
          </StrategyHeader>

          <StrategyText>
            Notre plan quinquennal 2026–2030 marque la
            troisième grande phase d’évolution de Cortex
            Holding SAS : la phase de consolidation et
            d’expansion stratégique.
          </StrategyText>

          <StrategyText>
            Il s’inscrit dans une logique de durabilité,
            d’innovation et d’impact à long terme, afin de
            positionner le groupe comme un acteur de
            référence en Afrique francophone dans la
            formation professionnelle, l’insertion, les
            microfinances et l’édition.
          </StrategyText>

          <StrategicPillars>
            <Pillar>
              <PillarNumber>01</PillarNumber>
              <PillarText>
                Durabilité
              </PillarText>
            </Pillar>

            <Pillar>
              <PillarNumber>02</PillarNumber>
              <PillarText>
                Innovation
              </PillarText>
            </Pillar>

            <Pillar>
              <PillarNumber>03</PillarNumber>
              <PillarText>
                Impact à long terme
              </PillarText>
            </Pillar>
          </StrategicPillars>
        </StrategyCard>

        {/* =================================================
            POSITIONNEMENT
        ================================================= */}

        <Positioning>
          <PositioningLine />

          <PositioningContent>
            <PositioningLabel>
              NOTRE AMBITION
            </PositioningLabel>

            <PositioningText>
              Positionner le groupe comme un acteur de
              référence en Afrique francophone dans la
              <strong> formation professionnelle</strong>,
              l’<strong>insertion</strong>, les
              <strong> microfinances</strong> et
              l’<strong>édition</strong>.
            </PositioningText>
          </PositioningContent>
        </Positioning>

        {/* =================================================
            MESSAGE DU PDG
        ================================================= */}

        <QuoteCard>
          <QuoteIcon>
            <Quote size={22} />
          </QuoteIcon>

          <QuoteText>
            « Bâtir un groupe africain d’excellence,
            structuré, moderne et capable d’offrir des
            services conformes aux standards
            internationaux. »
          </QuoteText>

          <Author>
            <AuthorLine />

            <div>
              <AuthorName>
                Jean-Baptiste Zebelamou
              </AuthorName>

              <AuthorRole>
                Président Directeur Général
              </AuthorRole>

              <AuthorCompany>
                Cortex Holding
              </AuthorCompany>
            </div>
          </Author>
        </QuoteCard>
      </Container>
    </Section>
  );
}

export default memo(CortexHolding);

/* =========================================================
   STYLES
========================================================= */

const Section = styled.section`
  position: relative;

  overflow: hidden;

  padding:
    clamp(60px, 8vw, 110px)
    16px;

  background:
    radial-gradient(
      700px 400px at 8% 10%,
      rgba(0, 102, 153, 0.12),
      transparent 65%
    ),
    radial-gradient(
      600px 400px at 90% 65%,
      rgba(242, 201, 76, 0.07),
      transparent 65%
    ),
    linear-gradient(
      180deg,
      ${colors.bgSoft || "#0A1828"},
      ${colors.bg1 || "#071727"}
    );

  color: ${colors.text || "#FFFFFF"};

  isolation: isolate;
`;

const BackgroundOrb = styled.div`
  position: absolute;

  top: 8%;
  right: -180px;

  width: 420px;
  height: 420px;

  border-radius: 50%;

  border: 1px solid
    ${(p) => p.$accent}14;

  box-shadow:
    inset 0 0 80px
      ${(p) => p.$accent}08;

  pointer-events: none;

  animation: ${floatOrb} 9s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 700px) {
    width: 280px;
    height: 280px;

    right: -150px;
  }
`;

const Container = styled.div`
  position: relative;

  z-index: 2;

  width: min(1180px, 100%);

  margin: 0 auto;
`;

const Header = styled.header`
  max-width: 850px;

  margin: 0 auto 38px;

  text-align: center;
`;

const Eyebrow = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  margin-bottom: 12px;

  color: ${colors.accentGold || "#F2C94C"};

  font-size: 11px;

  font-weight: 900;

  letter-spacing: 0.16em;

  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
`;

const GradientTitle = styled.span`
  display: inline-block;

  background:
    linear-gradient(
      90deg,
      ${colors.brandNavy || "#0E2D4F"},
      ${colors.brandBlue || "#006699"},
      ${colors.accentGold || "#F2C94C"},
      ${colors.brandBlue || "#006699"},
      ${colors.brandNavy || "#0E2D4F"}
    );

  background-size: 250% 100%;

  -webkit-background-clip: text;
  background-clip: text;

  color: transparent;

  font-size: clamp(2.3rem, 6vw, 4.5rem);

  line-height: 1;

  font-weight: 950;

  letter-spacing: -0.055em;

  animation: ${gradientMove} 10s ease infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Intro = styled.p`
  max-width: 650px;

  margin: 18px auto 0;

  color: ${colors.muted || "rgba(255,255,255,.62)"};

  font-size: clamp(14px, 2vw, 17px);

  line-height: 1.7;
`;

/* =========================================================
   CARDS
========================================================= */

const BaseCard = styled.div`
  position: relative;

  padding: clamp(20px, 4vw, 32px);

  border: 1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 24px 0 24px 0;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.055),
      rgba(255, 255, 255, 0.018)
    );

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 22px 60px rgba(0, 0, 0, 0.22);
`;

const PresentationCard = styled(BaseCard)`
  max-width: 1000px;

  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 14px;

  margin-top: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled(BaseCard)`
  min-height: 100%;

  transition:
    transform 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-3px);

    border-color:
      rgba(242, 201, 76, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const CardTop = styled.div`
  display: flex;

  align-items: center;

  gap: 11px;

  margin-bottom: 17px;
`;

const IconBox = styled.div`
  width: 42px;
  height: 42px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 13px 0 13px 0;

  color: ${colors.accentGold || "#F2C94C"};

  background:
    rgba(242, 201, 76, 0.1);

  border: 1px solid
    rgba(242, 201, 76, 0.12);
`;

const CardLabel = styled.span`
  color: rgba(255, 255, 255, 0.52);

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.13em;
`;

const Paragraph = styled.p`
  margin: 0;

  & + & {
    margin-top: 15px;
  }

  color: rgba(255, 255, 255, 0.69);

  font-size: 14px;

  line-height: 1.8;
`;

const HighlightBox = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 9px;

  margin-top: 20px;

  padding: 13px;

  border-radius: 14px 0 14px 0;

  border: 1px solid
    rgba(242, 201, 76, 0.12);

  background:
    rgba(242, 201, 76, 0.05);

  color: rgba(255, 255, 255, 0.62);

  font-size: 12px;

  line-height: 1.55;

  svg {
    flex: 0 0 auto;

    color: ${colors.accentGold || "#F2C94C"};
  }
`;

/* =========================================================
   STRATEGY
========================================================= */

const StrategyCard = styled(BaseCard)`
  margin-top: 14px;

  overflow: hidden;

  background:
    radial-gradient(
      500px 280px at 100% 0%,
      rgba(242, 201, 76, 0.08),
      transparent 65%
    ),
    linear-gradient(
      145deg,
      rgba(0, 102, 153, 0.08),
      rgba(255, 255, 255, 0.025)
    );
`;

const StrategyHeader = styled.div`
  display: flex;

  align-items: center;

  gap: 13px;
`;

const StrategyIcon = styled.div`
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  flex: 0 0 auto;

  border-radius: 15px 0 15px 0;

  color: ${colors.accentGold || "#F2C94C"};

  background:
    rgba(242, 201, 76, 0.1);

  border: 1px solid
    rgba(242, 201, 76, 0.14);
`;

const StrategyKicker = styled.div`
  color: rgba(255, 255, 255, 0.45);

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.13em;
`;

const StrategyTitle = styled.div`
  margin-top: 3px;

  color: #fff;

  font-size: clamp(1.5rem, 4vw, 2.2rem);

  font-weight: 950;

  letter-spacing: -0.035em;
`;

const StrategyText = styled.p`
  max-width: 900px;

  margin: 22px 0 0;

  color: rgba(255, 255, 255, 0.69);

  font-size: 14px;

  line-height: 1.8;

  & + & {
    margin-top: 14px;
  }
`;

const StrategicPillars = styled.div`
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 9px;

  margin-top: 24px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Pillar = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  padding: 12px;

  border-radius: 14px 0 14px 0;

  border: 1px solid
    rgba(255, 255, 255, 0.08);

  background:
    rgba(0, 0, 0, 0.12);
`;

const PillarNumber = styled.span`
  color: ${colors.accentGold || "#F2C94C"};

  font-size: 10px;

  font-weight: 900;
`;

const PillarText = styled.span`
  color: rgba(255, 255, 255, 0.7);

  font-size: 12px;

  font-weight: 800;
`;

/* =========================================================
   POSITIONNEMENT
========================================================= */

const Positioning = styled.div`
  display: grid;

  grid-template-columns: 4px 1fr;

  gap: 18px;

  max-width: 900px;

  margin: 45px auto;

  padding: 0 8px;
`;

const PositioningLine = styled.div`
  border-radius: 999px;

  background:
    linear-gradient(
      180deg,
      ${colors.accentGold || "#F2C94C"},
      ${colors.brandBlue || "#006699"}
    );
`;

const PositioningContent = styled.div``;

const PositioningLabel = styled.div`
  margin-bottom: 8px;

  color: ${colors.accentGold || "#F2C94C"};

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.14em;
`;

const PositioningText = styled.p`
  margin: 0;

  color: rgba(255, 255, 255, 0.74);

  font-size: clamp(16px, 2.5vw, 22px);

  line-height: 1.55;

  font-weight: 500;

  strong {
    color: #fff;

    font-weight: 850;
  }
`;

/* =========================================================
   PDG
========================================================= */

const QuoteCard = styled(BaseCard)`
  max-width: 920px;

  margin: 0 auto;

  text-align: center;

  background:
    radial-gradient(
      500px 300px at 50% 0%,
      rgba(0, 102, 153, 0.12),
      transparent 65%
    ),
    rgba(255, 255, 255, 0.025);
`;

const QuoteIcon = styled.div`
  width: 48px;
  height: 48px;

  margin: 0 auto 18px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  color: ${colors.accentGold || "#F2C94C"};

  background:
    rgba(242, 201, 76, 0.09);

  border: 1px solid
    rgba(242, 201, 76, 0.14);
`;

const QuoteText = styled.blockquote`
  max-width: 760px;

  margin: 0 auto;

  color: rgba(255, 255, 255, 0.84);

  font-size: clamp(17px, 3vw, 25px);

  line-height: 1.55;

  font-weight: 600;

  letter-spacing: -0.015em;
`;

const Author = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  margin-top: 25px;

  text-align: left;
`;

const AuthorLine = styled.span`
  width: 32px;
  height: 2px;

  flex: 0 0 auto;

  border-radius: 999px;

  background:
    ${colors.accentGold || "#F2C94C"};
`;

const AuthorName = styled.div`
  color: #fff;

  font-size: 13px;

  font-weight: 900;
`;

const AuthorRole = styled.div`
  margin-top: 2px;

  color: rgba(255, 255, 255, 0.48);

  font-size: 11px;
`;

const AuthorCompany = styled.div`
  margin-top: 2px;

  color: ${colors.accentGold || "#F2C94C"};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.06em;

  text-transform: uppercase;
`;