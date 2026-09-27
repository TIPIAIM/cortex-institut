import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookCheck,
  Building2,
  Network,
  Quote,
  BookCheck,
  Target,
} from "lucide-react";
import colors from "../../Styles/colors";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
};

function CortexHolding() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? { initial: false }
    : { ...reveal, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } };

  return (
    <Section id="cortex-holding" aria-labelledby="holding-title">
      <Grid aria-hidden="true" />
      <Glow aria-hidden="true" />

      <Container>
        <Header as={motion.header} {...motionProps}>
          <Eyebrow>
            <AnimatedIcon aria-hidden="true">
              <BookCheck size={15} />
            </AnimatedIcon>
            CORTEX HOLDING
          </Eyebrow>

          <Title id="holding-title">
            Une vision commune, <Accent>des expertises complémentaires.</Accent>
          </Title>

          <Intro>
            Une vision africaine de l'excellence, de l'innovation et de la
            croissance durable, portée par un groupe structuré autour de métiers
            complémentaires.
          </Intro>
        </Header>

        <PresentationCard as={motion.article} {...motionProps}>
          <CardTop>
            <IconBox as={motion.span} whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.06 }}>
              <Building2 size={23} />
            </IconBox>
            <div>
              <CardKicker>NOTRE VISION</CardKicker>
              <CardTitle>Structurer la croissance et l’excellence.</CardTitle>
            </div>
          </CardTop>

          <Paragraph>
            La croissance rapide de Cortex Holding et l’expansion de ses
            filiales, Institut Cortex et Innov Éditions, Campus Cortex et Tônôn,
            témoignent de la vision que nous portons : bâtir un groupe africain
            d’excellence, structuré, moderne et capable d’offrir des services
            conformes aux standards internationaux.
          </Paragraph>

          <Paragraph>
            Cette ambition ne saurait se concrétiser sans un cadre de gestion
            rigoureux, harmonisé et partagé par l’ensemble de nos équipes.
          </Paragraph>
        </PresentationCard>

        <ContentGrid>
          <ContentCard as={motion.article} {...motionProps}>
            <CardTop>
              <IconBox as={motion.span} whileHover={reduceMotion ? undefined : { y: -3, rotate: 5 }}>
                <Network size={22} />
              </IconBox>
              <div>
                <CardKicker>SYNERGIES</CardKicker>
                <CardTitle>Un réseau conçu pour mieux agir.</CardTitle>
              </div>
            </CardTop>

            <Paragraph>
              Notre réseau est conçu pour maximiser les synergies entre les
              différentes entités, permettant ainsi de répondre efficacement aux
              besoins variés de nos clients.
            </Paragraph>

            <Paragraph>
              Les filiales de Cortex Holding jouent un rôle crucial dans cette
              dynamique collaborative. Elles apportent chacune une expertise
              spécifique, renforçant ainsi notre capacité à offrir des solutions
              complètes et innovantes.
            </Paragraph>
          </ContentCard>

          <ContentCard as={motion.article} {...motionProps}>
            <CardTop>
              <IconBox as={motion.span} whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.06 }}>
                <BookCheck size={22} />
              </IconBox>
              <div>
                <CardKicker>OUVERTURE</CardKicker>
                <CardTitle>Partenariats & innovation.</CardTitle>
              </div>
            </CardTop>

            <Paragraph>
              De plus, nos partenariats externes nous permettent d’élargir notre
              champ d’action et de bénéficier de nouvelles compétences et
              technologies.
            </Paragraph>

            <HighlightBox>
              <ArrowUpRight size={18} />
              <span>
                Des expertises complémentaires pour construire des solutions
                complètes et innovantes.
              </span>
            </HighlightBox>
          </ContentCard>
        </ContentGrid>

        <StrategyCard as={motion.article} {...motionProps}>
          <StrategyHeader>
            <StrategyIcon as={motion.span} whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.06 }}>
              <Target size={24} />
            </StrategyIcon>

            <div>
              <StrategyKicker>PLAN QUINQUENNAL</StrategyKicker>
              <StrategyTitle>2026 — 2030</StrategyTitle>
            </div>
          </StrategyHeader>

          <StrategyGrid>
            <div>
              <StrategyText>
                Notre plan quinquennal 2026–2030 marque la troisième grande phase
                d’évolution de Cortex Holding SAS : la phase de consolidation et
                d’expansion stratégique.
              </StrategyText>

              <StrategyText>
                Il s’inscrit dans une logique de durabilité, d’innovation et
                d’impact à long terme, afin de positionner le groupe comme un
                acteur de référence en Afrique francophone dans la formation
                professionnelle, l’insertion, les microfinances et l’édition.
              </StrategyText>
            </div>

            <StrategicPillars>
              {["Durabilité", "Innovation", "Impact à long terme"].map((label, index) => (
                <Pillar key={label}>
                  <PillarNumber>0{index + 1}</PillarNumber>
                  <PillarText>{label}</PillarText>
                </Pillar>
              ))}
            </StrategicPillars>
          </StrategyGrid>
        </StrategyCard>

        <BottomGrid>
          <Positioning as={motion.div} {...motionProps}>
            <PositioningLabel>NOTRE AMBITION</PositioningLabel>
            <PositioningText>
              Positionner le groupe comme un acteur de référence en Afrique
              francophone dans la <strong>formation professionnelle</strong>,
              l’<strong>insertion</strong>, les <strong>microfinances</strong> et
              l’<strong>édition</strong>.
            </PositioningText>
          </Positioning>

          <QuoteCard as={motion.blockquote} {...motionProps}>
            <QuoteIcon>
              <Quote size={21} />
            </QuoteIcon>
            <QuoteText>
              « Bâtir un groupe africain d’excellence, structuré, moderne et
              capable d’offrir des services conformes aux standards
              internationaux. »
            </QuoteText>
            <Author>
              <AuthorLine />
              <div>
                <AuthorName>Jean-Baptiste Zebelamou</AuthorName>
                <AuthorRole>Président Directeur Général</AuthorRole>
                <AuthorCompany>Cortex Holding</AuthorCompany>
              </div>
            </Author>
          </QuoteCard>
        </BottomGrid>
      </Container>
    </Section>
  );
}

export default memo(CortexHolding);

const floatSoft = keyframes`
  0%, 100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(0,-10px,0); }
`;

const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(72px, 9vw, 118px) 16px;
  background:
    radial-gradient(760px 520px at 8% 8%, rgba(243,111,33,.09), transparent 64%),
    radial-gradient(740px 520px at 92% 72%, rgba(42,75,124,.20), transparent 66%),
    linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 48%, ${colors.bg1});
  color: ${colors.text};
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  z-index: -3;
  opacity: .18;
  background:
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, #000, transparent 92%);
`;

const Glow = styled.div`
  position: absolute;
  z-index: -2;
  top: 8%;
  right: -190px;
  width: min(46vw, 580px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(243,111,33,.16), transparent 68%);
  filter: blur(14px);
  animation: ${floatSoft} 10s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: min(1280px, 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(20px, 2.6vw, 32px);
`;

const Header = styled.header`
  max-width: 860px;
  margin: 0 auto 8px;
  text-align: center;
`;

const Eyebrow = styled.div`
  width: fit-content;
  margin: 0 auto 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid rgba(243,111,33,.34);
  border-radius: 9px 0 9px 0;
  background: rgba(243,111,33,.08);
  color: ${colors.accentGold3};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .14em;
`;

const AnimatedIcon = styled.span`
  display: inline-grid;
  place-items: center;
  animation: ${floatSoft} 4.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(34px, 5.2vw, 64px);
  line-height: 1.02;
  letter-spacing: -.045em;
  font-weight: 950;
`;

const Accent = styled.span`
  color: ${colors.accentGold};
`;

const Intro = styled.p`
  max-width: 720px;
  margin: 18px auto 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.75;
`;

const BaseCard = styled.article`
   border-radius: 30px 0 30px 0;
  background: linear-gradient(145deg, rgba(7,23,39,.86), rgba(13,29,74,.62));
   backdrop-filter: blur(16px);
`;

const PresentationCard = styled(BaseCard)`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(22px, 4vw, 34px);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 18px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled(BaseCard)`
  padding: clamp(20px, 3vw, 30px);
`;

const CardTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const IconBox = styled.span`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 15px 0 15px 0;
  border: 1px solid rgba(243,111,33,.30);
  background: rgba(243,111,33,.10);
  color: ${colors.accentGold};
`;

const CardKicker = styled.div`
  margin-bottom: 4px;
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .15em;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(18px, 2vw, 23px);
  line-height: 1.25;
`;

const Paragraph = styled.p`
  margin: 0;
  color: ${colors.textSoft};
  font-size: 15px;
  line-height: 1.8;

  & + & { margin-top: 12px; }
`;

const HighlightBox = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
  padding: 13px 14px;
  border: 1px solid rgba(243,111,33,.28);
  border-radius: 16px 0 16px 0;
  background: rgba(243,111,33,.07);
  color: ${colors.accentGoldLight};

  svg { color: ${colors.accentGold}; }
`;

const StrategyCard = styled(BaseCard)`
  padding: clamp(22px, 4vw, 36px);
  background:
    radial-gradient(520px 280px at 94% 0%, rgba(243,111,33,.10), transparent 66%),
    linear-gradient(145deg, rgba(13,29,74,.88), rgba(14,26,43,.92));
`;

const StrategyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 20px;
`;

const StrategyIcon = styled.span`
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 16px 0 16px 0;
  background: ${colors.accentGold};
  color: ${colors.bg};
`;

const StrategyKicker = styled.div`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .15em;
`;

const StrategyTitle = styled.div`
  margin-top: 3px;
  color: ${colors.text};
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 950;
  letter-spacing: -.035em;
`;

const StrategyGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0,1.2fr) minmax(280px,.8fr);
  gap: clamp(20px, 4vw, 48px);
  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const StrategyText = styled.p`
  margin: 0;
  color: ${colors.textSoft};
  line-height: 1.8;

  & + & { margin-top: 13px; }
`;

const StrategicPillars = styled.div`
  display: grid;
  gap: 10px;
`;

const Pillar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
  padding: 13px;
   border-radius: 16px 0 16px 0;
  background: rgba(255,255,255,.035);
`;

const PillarNumber = styled.span`
  color: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .08em;
`;

const PillarText = styled.span`
  color: ${colors.text};
  font-weight: 800;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const Positioning = styled.div`
  padding: clamp(20px, 3vw, 28px);
  border-left: 3px solid ${colors.accentGold};
  border-radius: 0 24px 24px 0;
  background: linear-gradient(120deg, rgba(13,29,74,.72), rgba(17,35,59,.54));
`;

const PositioningLabel = styled.div`
  margin-bottom: 10px;
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .15em;
`;

const PositioningText = styled.p`
  margin: 0;
  color: ${colors.textSoft};
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.75;

  strong { color: ${colors.text}; }
`;

const QuoteCard = styled.blockquote`
  position: relative;
  margin: 0;
  padding: clamp(20px, 3vw, 28px);
   border-radius: 24px 0 24px 0;
  background: rgba(7,23,39,.72);
`;

const QuoteIcon = styled.span`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 12px 0 12px 0;
  background: rgba(243,111,33,.10);
  color: ${colors.accentGold};
`;

const QuoteText = styled.p`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.65;
  font-weight: 700;
`;

const Author = styled.footer`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 18px;
`;

const AuthorLine = styled.span`
  width: 28px;
  height: 2px;
  margin-top: 8px;
  background: ${colors.accentGold};
`;

const AuthorName = styled.div`
  color: ${colors.text};
  font-size: 13px;
  font-weight: 900;
`;

const AuthorRole = styled.div`
  margin-top: 3px;
  color: ${colors.muted};
  font-size: 11px;
`;

const AuthorCompany = styled.div`
  margin-top: 3px;
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .06em;
  text-transform: uppercase;
`;
