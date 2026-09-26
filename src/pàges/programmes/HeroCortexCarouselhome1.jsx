import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import {
  ArrowDown,
  ArrowRight,
  Book,
  BriefcaseBusiness,
  GraduationCap,
  PenBox,
  
  UsersRound,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { catalogues } from "./filieres.data";
import { openProgrammeContactModal } from "./programmeContact";

const academyIcons = {
  etudiant: GraduationCap,
  junior: UsersRound,
  executive: BriefcaseBusiness,
};

const visualByCatalogue = {
  etudiant: () =>
    imagess?.loreàt || "/img/cortex-logo.png",
  junior: () =>
    imagess?.ResponsableadministrativeetFinancière ||
     imagess?.loreàt ||
    "/img/cortex-logo.png",
  executive: () =>
    imagess?.DirecteurduGroupe1 ||
     "/img/cortex-logo.png",
};

function getVisual(id) {
  return visualByCatalogue[id]?.() || imagess?.loreàt || "/img/cortex-logo.png";
}

export default function HeroCortexCatalogue({
  activeCatalogueId = catalogues[0]?.id,
  onSelectCatalogue,
  onExplore,
}) {
  const reduceMotion = useReducedMotion();
  const active =
    catalogues.find((catalogue) => catalogue.id === activeCatalogueId) ||
    catalogues[0];
  const ActiveIcon = academyIcons[active?.id] || GraduationCap;

  return (
    <Hero aria-labelledby="programmes-hero-title">
      <Grid aria-hidden="true" />
      <Glow aria-hidden="true" $top="-160px" $left="-130px" />
      <Glow
        aria-hidden="true"
        $bottom="-210px"
        $right="-120px"
        $secondary
      />

      <Inner>
        <ContentPanel
          as={motion.div}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.52 }}
        >
          <Eyebrow>
            <PenBox size={14} /> INSTITUT CORTEX · GRANDES ÉCOLES
          </Eyebrow>

          <Title id="programmes-hero-title">
            Choisissez un parcours qui vous rend
            <Accent> opérationnel.</Accent>
          </Title>

          <HeroLead>
            Trois catalogues, une navigation simple : choisissez votre profil,
            explorez les Grandes Écoles, puis ouvrez les blocs, parcours et
            modules qui vous concernent.
          </HeroLead>

          <ProfileSwitch aria-label="Choisir son profil de formation">
            {catalogues.map((catalogue) => {
              const Icon = academyIcons[catalogue.id] || GraduationCap;
              const isActive = catalogue.id === active?.id;

              return (
                <ProfileButton
                  key={catalogue.id}
                  type="button"
                  $active={isActive}
                  aria-pressed={isActive}
                  onClick={() => onSelectCatalogue?.(catalogue.id)}
                >
                  <MotionIcon
                    as={motion.span}
                    whileHover={reduceMotion ? undefined : { rotate: -7, scale: 1.08 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  >
                    <Icon size={18} />
                  </MotionIcon>
                  <span>
                    <b>{catalogue.shortLabel}</b>
                    <small>{catalogue.audience}</small>
                  </span>
                </ProfileButton>
              );
            })}
          </ProfileSwitch>

          <Actions>
            <Primary
              type="button"
              onClick={() => onExplore?.(active?.id)}
              as={motion.button}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              Explorer {active?.shortLabel}
              <ArrowDown size={18} />
            </Primary>

            <Secondary
              type="button"
              onClick={() =>
                openProgrammeContactModal({
                  catalogueId: active?.id,
                  intent: "inscription",
                  source: "hero-programmes",
                })
              }
            >
              Démarrer mon inscription
              <ArrowRight size={17} />
            </Secondary>
          </Actions>
        </ContentPanel>

        <VisualColumn aria-live="polite">
          <AnimatePresence mode="wait">
            <Poster
              key={active?.id}
              as={motion.article}
              initial={reduceMotion ? false : { opacity: 0, x: 16, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -10, scale: 0.99 }}
              transition={{ duration: reduceMotion ? 0 : 0.34 }}
            >
              <PosterMedia>
                <PosterImage
                  src={getVisual(active?.id)}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  decoding="async"
                />
                <PosterShade />
                <FloatingSeal aria-hidden="true">
                  <ActiveIcon size={23} />
                </FloatingSeal>
              </PosterMedia>

              <PosterBody>
                <PosterTop>
                  <PosterKicker>{active?.shortLabel}</PosterKicker>
                  <PosterBrand>{active?.brand || "Institut Cortex"}</PosterBrand>
                </PosterTop>

                <PosterTitle>{active?.title}</PosterTitle>
                <PosterAudience>{active?.audience}</PosterAudience>

                <PosterStats>
                  {(active?.stats || []).map((stat) => (
                    <PosterStat key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </PosterStat>
                  ))}
                </PosterStats>
              </PosterBody>
            </Poster>
          </AnimatePresence>
        </VisualColumn>
      </Inner>

      <ScrollHint href="#catalogue-programmes" aria-label="Aller aux catalogues">
        <span>Découvrir</span>
        <ArrowDown size={15} />
      </ScrollHint>
    </Hero>
  );
}

const drift = keyframes`
  0%, 100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(0,-8px,0); }
`;

const Hero = styled.section`
  position: relative;
  isolation: isolate;
  min-height: min(860px, 94vh);
  display: grid;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(900px 560px at 78% 12%, rgba(42, 75, 124, 0.22), transparent 64%),
    linear-gradient(118deg, rgba(13, 29, 74, 0.99), rgba(14, 26, 43, 0.99) 56%, rgba(17, 35, 59, 0.99)),
    ${colors.bg};
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  z-index: -3;
  opacity: 0.22;
  background:
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, #000, transparent 94%);
`;

const Glow = styled.div`
  position: absolute;
  width: min(48vw, 620px);
  aspect-ratio: 1;
  border-radius: 50%;
  top: ${({ $top }) => $top || "auto"};
  bottom: ${({ $bottom }) => $bottom || "auto"};
  left: ${({ $left }) => $left || "auto"};
  right: ${({ $right }) => $right || "auto"};
  z-index: -2;
  background: ${({ $secondary }) =>
    $secondary
      ? "radial-gradient(circle, rgba(42,75,124,.38), transparent 68%)"
      : "radial-gradient(circle, rgba(243,111,33,.2), transparent 68%)"};
  filter: blur(14px);
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(90px, 9vw, 130px) 0 clamp(70px, 8vw, 96px);
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(360px, .94fr);
  gap: clamp(32px, 5vw, 76px);
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ContentPanel = styled.div`
  position: relative;
  z-index: 5;
  max-width: 760px;
  padding: clamp(20px, 3vw, 34px);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 32px 0 32px 0;
  background: linear-gradient(145deg, rgba(7,23,39,.84), rgba(13,29,74,.62));
  box-shadow: 0 30px 80px rgba(0,0,0,.24);
  backdrop-filter: blur(18px);
`;

const Eyebrow = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 11px;
  border: 1px solid rgba(243, 111, 33, 0.34);
  border-radius: 9px 0 9px 0;
  color: ${colors.accentGold3};
  background: rgba(243, 111, 33, 0.08);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.14em;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 0;
  color: ${colors.text};
  font-size: clamp(39px, 6vw, 76px);
  line-height: 0.98;
  letter-spacing: -0.052em;
  font-weight: 950;
`;

const Accent = styled.span`
  color: ${colors.accentGold};
`;

const HeroLead = styled.p`
  max-width: 700px;
  margin: 20px 0 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(15px, 1.7vw, 18px);
  line-height: 1.7;
`;

const ProfileSwitch = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin-top: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileButton = styled.button`
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  padding: 11px;
  border: 1px solid ${({ $active }) =>
    $active ? "rgba(243,111,33,.55)" : "rgba(255,255,255,.09)"};
  border-radius: 16px 0 16px 0;
  color: ${colors.text};
  background: ${({ $active }) =>
    $active ? "rgba(243,111,33,.11)" : "rgba(255,255,255,.035)"};
  cursor: pointer;
  text-align: left;
  transition: border-color .18s ease, background .18s ease, transform .18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(243,111,33,.48);
    outline: none;
  }

  b {
    display: block;
    color: ${({ $active }) => ($active ? colors.accentGold : colors.text)};
    font-size: 13px;
  }

  small {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 3px;
    color: ${colors.muted};
    font-size: 10px;
    line-height: 1.35;
  }
`;

const MotionIcon = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 12px 0 12px 0;
  color: ${colors.accentGold};
  background: rgba(243,111,33,.09);
  border: 1px solid rgba(243,111,33,.2);
`;

const Actions = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
`;

const Primary = styled.button`
  position: relative;
  z-index: 11;
  appearance: none;
  border: 1px solid rgba(243,111,33,.85);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 17px;
  border-radius: 18px 0 18px 0;
  background: ${colors.accentGold};
  color: ${colors.bg};
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 14px 38px rgba(243,111,33,.25);
`;

const Secondary = styled.button`
  appearance: none;
  cursor: pointer;
  position: relative;
  z-index: 11;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 17px;
  border-radius: 18px 0 18px 0;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.045);
  color: ${colors.text};
  font-weight: 850;
  transition: border-color .18s ease, transform .18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(243,111,33,.4);
    outline: none;
  }
`;

const VisualColumn = styled.div`
  position: relative;
  z-index: 3;
  min-width: 0;
`;

const Poster = styled.article`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.11);
  border-radius: 36px 0 36px 0;
  background: ${colors.bgSoft};
  box-shadow: 0 38px 90px rgba(0,0,0,.38);
`;

const PosterMedia = styled.div`
  position: relative;
  height: clamp(280px, 42vw, 470px);
  overflow: hidden;
  background: ${colors.bg1};
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  filter: saturate(.95) contrast(1.02);
`;

const PosterShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, transparent 52%, rgba(4,9,18,.76)),
    linear-gradient(115deg, rgba(13,29,74,.22), transparent 55%);
`;

const FloatingSeal = styled.span`
  position: absolute;
  right: 18px;
  top: 18px;
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 20px 0 20px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 16px 34px rgba(0,0,0,.25);
  animation: ${drift} 4.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PosterBody = styled.div`
  position: relative;
  z-index: 2;
  padding: clamp(20px, 3vw, 30px);
  background: linear-gradient(145deg, rgba(13,29,74,.96), rgba(7,23,39,.98));
`;

const PosterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const PosterKicker = styled.span`
  color: ${colors.accentGold};
  font-size: 11px;
  font-weight: 950;
  letter-spacing: .13em;
  text-transform: uppercase;
`;

const PosterBrand = styled.span`
  color: ${colors.muted};
  font-size: 11px;
  font-weight: 800;
`;

const PosterTitle = styled.h2`
  margin: 12px 0 0;
  color: ${colors.text};
  font-size: clamp(23px, 3vw, 36px);
  line-height: 1.05;
  letter-spacing: -.03em;
`;

const PosterAudience = styled.p`
  margin: 10px 0 0;
  color: ${colors.accentGoldLight};
  font-size: 14px;
  line-height: 1.55;
`;

const PosterStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`;

const PosterStat = styled.span`
  display: inline-grid;
  gap: 2px;
  min-width: 88px;
  padding: 9px 11px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.04);

  strong {
    color: ${colors.accentGold};
    font-size: 18px;
  }

  span {
    color: ${colors.muted};
    font-size: 10px;
  }
`;

const ScrollHint = styled.a`
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: ${colors.muted};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;

  @media (max-width: 1000px) {
    display: none;
  }
`;
