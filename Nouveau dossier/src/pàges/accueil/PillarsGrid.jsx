// src/components/home/PillarsGrid.jsx
import React, { useMemo, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Eye, 
  Heart, 
  Star, 
 
  Shield,
  BookOpen,
 
  Award,
  Clock,
  TrendingUp
} from "lucide-react";
import colors from "../../Styles/colors";

/* ===================== Effets & helpers ===================== */
const gridDrift = keyframes`
  0%   { background-position: 0 0, 0 0; opacity:.34; }
  50%  { background-position: 220px 140px, -220px -140px; opacity:.54; }
  100% { background-position: 0 0, 0 0; opacity:.34; }
`;

const float = keyframes`
  0% { transform: translateY(0) scale(1); opacity:.35; }
  50%{ transform: translateY(-12px) scale(1.04); opacity:.6; }
  100%{ transform: translateY(0) scale(1); opacity:.35; }
`;

const springy = { type: "spring", stiffness: 420, damping: 30, mass: 0.6 };

const fadeSlide = {
  initial: { opacity: 0, y: 10, filter: "blur(3px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(3px)" },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
};

const fadeStagger = (i = 0) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
});

/* ===================== Styles ===================== */
const Section = styled.section`
  position: relative;
  max-width: 80%;
  margin: 0 auto;
  padding: clamp(22px, 5vw, 44px) 20px;
  display: grid;
  gap: clamp(16px, 2vw, 22px);
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;

  /* fond grille subtil animé */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: repeating-linear-gradient(
        90deg,
        #ffffff0a 0 2px,
        transparent 1px 42px
      ),
      repeating-linear-gradient(0deg,rgba(9, 7, 138, 0.03) 0 1px, transparent 1px 42px);
    animation: ${gridDrift} 18s linear infinite;
    mix-blend-mode: soft-light;
  }

   @media (max-width: 480px) {
     max-width: 100%;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 6px;
  text-align: center;
  max-width: 100%;
`;

const H2 = styled(motion.h2)`
  margin: 0;
  font-size: clamp(22px, 4.4vw, 32px);
  color: ${colors.accentGold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  overflow-wrap: break-word;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 6px;
  }
`;
const Lead = styled(motion.p)`
  margin: 0;
  color: ${colors.text};
  max-width: 100%;
  font-size: clamp(14px, 2.3vw, 18px);
  margin: 0 auto;
  overflow-wrap: break-word;
`;

/* ---------- Tabs ---------- */
const Tabs = styled.div`
  margin-top: 6px;
  display: grid;
  gap: 12px;
  max-width: 100%;
`;

const TabList = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 8px;
  border: 1px solid #1f2c44;
  border-radius: 14px;
  background: linear-gradient(180deg, ${colors.bg1}, ${colors.bg2});
  padding: 6px;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
`;

const TabBtn = styled.button`
  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  color: ${colors.text};
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: transform 0.12s ease, color 0.2s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 1;
  box-sizing: border-box;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: translateY(-1px);
    color: ${colors.accentGoldLight};
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(42, 75, 124, 0.35) inset;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 12px 8px;
    gap: 6px;
    white-space: normal;
  }
`;

const Indicator = styled(motion.div)`
  position: absolute;
  top: 6px;
  bottom: 6px;
  border-radius: 10px;
  background: radial-gradient(
      400px 120px at 85% -10%,
      ${colors.bg1},
      transparent 60%
    ),
    linear-gradient(120deg, ${colors.accentGold},  ${colors.bg1} 60%);
  border: 1px solid #274066;
  box-shadow: inset 0 0 0 1px #1f2c44, 0 10px 28px rgba(10, 16, 28, 0.25);
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: 100%;
    top: auto;
    height: calc(100% / 3);
    transition: transform 0.3s ease;
    transform: translateY(${props => {
      const index = props.$activeIndex;
      return index * 100;
    }}%);
  }
`;

/* ---------- Panel ---------- */
const Panel = styled(motion.div)`
  //border: 1px solid #1f2c44;
  border-radius: 18px;
  background: linear-gradient(120deg, ${colors.accentGold}5 70% ,${colors.bg1} 40%);
  padding: clamp(14px, 3vw, 18px);
  display: grid;
  gap: 16px;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  
  p {
    margin: 0;
    color: ${colors.accentGoldLight};
    line-height: 1.6;
    overflow-wrap: break-word;
  }
  
  ul {
    margin: 6px 0 0;
    padding-left: 18px;
    color: ${colors.text};
    
    li {
      margin: 8px 0;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      overflow-wrap: break-word;
      
      &:before {
        content: "•";
        color: ${colors.accentGold};
        font-weight: bold;
        margin-right: 4px;
      }
    }
  }
`;

const PanelImage = styled(motion.div)`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  }
  
  @media (max-width: 480px) {
    height: 160px;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
`;

/* ---------- Grid (Piliers) ---------- */
const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Item = styled(motion.article)`
  --tilt: 6px;
  border: 1px solid #21375a;
  border-radius: 22px 0 22px 0;
  padding: 20px;
  background: linear-gradient(180deg, #0e1a2b, #0f223a);
  display: grid;
  gap: 12px;
  align-content: start;
  transform: perspective(900px) translateZ(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${colors.accentGold}, ${colors.semygsecondar});
    opacity: 0.7;
  }

  &:hover {
    transform: perspective(900px) rotateX(2deg) rotateY(-2deg) translateZ(6px);
    border-color: ${colors.semygsecondar};
    box-shadow: 0 14px 28px rgba(10, 16, 28, 0.45);
  }

  b {
    color: ${colors.accentGoldLight};
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-wrap: break-word;
    
    @media (max-width: 480px) {
      flex-direction: column;
      text-align: center;
      gap: 8px;
    }
  }
  
  p {
    margin: 0;
    color: ${colors.muted};
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center;
    overflow-wrap: break-word;
    
    @media (max-width: 480px) {
      text-align: center;
    }
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${colors.accentGold}22, ${colors.semygsecondar}22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accentGold};
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const Halo = styled.span`
  position: absolute;
  width: 44vw;
  max-width: 540px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: radial-gradient(closest-side, ${(p) => p.$c}44, transparent 72%);
  filter: blur(38px);
  animation: ${float} ${(p) => p.$dur || 12}s ease-in-out infinite;
  top: ${(p) => p.$top || "auto"};
  bottom: ${(p) => p.$bottom || "auto"};
  left: ${(p) => p.$left || "auto"};
  right: ${(p) => p.$right || "auto"};
  z-index: -1;
`;

/* ===================== Component ===================== */
export default function PillarsGrid({
  title = "Pourquoi CORTEX ?",
  lead = "Approche terrain + académique : excellence et valeur d'usage immédiate.",
  items = [
    {
      t: "Excellence & impact",
      d: "Compétences mesurables, résultats visibles.",
      icon: Award
    },
    { 
      t: "Pédagogies actives", 
      d: "Projets réels, études de cas, ateliers.",
      icon: BookOpen
    },
    { 
      t: "Qualité & éthique", 
      d: "Transparence, exigence, RSE.",
      icon: Shield
    },
    { 
      t: "Parcours flexibles", 
      d: "Masters, certifs, séminaires, sur-mesure.",
      icon: Clock
    },
  ],
  mission = {
    title: "Notre mission",
    text: "Former et accompagner des professionnels capables d'agir vite et bien — avec des compétences immédiatement utiles pour les organisations et la société.",
    bullets: [
      "Programmes ancrés dans les réalités terrain.",
      "Encadrement par des praticiens et enseignants-chercheurs.",
      "Mesure de l'impact (compétences, employabilité, performance).",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    icon: Target
  },
  vision = {
    title: "Notre vision",
    text: "Devenir un pôle de référence africain, reconnu pour l'excellence, l'innovation et la responsabilité, reliant académique et résultats opérationnels.",
    bullets: [
      "Référentiels d'excellence et qualité continue.",
      "Partenariats académiques & industriels ouverts.",
      "Diffusion des meilleures pratiques et de la recherche appliquée.",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    icon: Eye
  },
  valeurs = {
    title: "Nos valeurs",
    text: "Exigence, éthique, esprit d'équipe et sens de l'impact : des principes vivants qui guident nos choix pédagogiques et nos collaborations.",
    bullets: [
      "Responsabilité et transparence.",
      "Apprentissage par la pratique, bienveillance exigeante.",
      "Ouverture, inclusion et progression des talents.",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    icon: Heart
  },
}) {
  const tabs = useMemo(
    () => [
      { key: "mission", label: "Notre mission", data: mission },
      { key: "vision", label: "Notre vision", data: vision },
      { key: "valeurs", label: "Nos valeurs", data: valeurs },
    ],
    [mission, vision, valeurs]
  );
  const [active, setActive] = useState("mission");
  const listRef = useRef(null);
  
  const activeIndex = tabs.findIndex(t => t.key === active);

  const onKey = (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const idx = tabs.findIndex((t) => t.key === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    setActive(tabs[next].key);
    const btns = listRef.current?.querySelectorAll("[role='tab']");
    btns?.[next]?.focus();
  };

  return (
    <Section>
      {/* Effets d'arrière-plan */}
      <Halo $c={colors.semygsecondar} $left="-8%" $top="6%" $dur={14} />
      <Halo $c={colors.semygprimar} $right="-10%" $bottom="-16%" $dur={12} />
      <Halo $c={"#3a6ea833"} $left="60%" $top="-12%" $dur={16} />
      
      <Header>
        <H2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <TrendingUp size={32} />
          {title}
        </H2>
        <Lead
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {lead}
        </Lead>
      </Header>


      {/* Grille des piliers (améliorée) */}
      <Grid>
        {items.map((x, i) => (
          <Item key={i} {...fadeStagger(i)} whileHover={{ y: -2 }}>
            <b>
              <IconContainer>
                {x.icon ? <x.icon size={24} /> : <Star size={24} />}
              </IconContainer>
              {x.t}
            </b>
            <p>{x.d}</p>
          </Item>
        ))}
      </Grid>

      {/* Tabs */}
      <Tabs>
        <TabList
          role="tablist"
          aria-label="Mission, Vision, Valeurs"
          onKeyDown={onKey}
          ref={listRef}
        >
          {/* indicator calculé via position */}
          <Indicator
            layout
            layoutId="tab-indicator"
            $activeIndex={activeIndex}
            style={{
              left: `${
                (activeIndex * 100) / tabs.length
              }%`,
              width: `${100 / tabs.length}%`,
            }}
            transition={springy}
            aria-hidden
          />
          {tabs.map((t) => (
            <TabBtn
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              aria-controls={`panel-${t.key}`}
              id={`tab-${t.key}`}
              onClick={() => setActive(t.key)}
            >
              {t.data.icon && <t.data.icon size={18} />}
              {t.label}
            </TabBtn>
          ))}
        </TabList>

        {/* Panel animé */}
        <AnimatePresence mode="wait">
          {tabs.map(
            (t) =>
              active === t.key && (
                <Panel
                  key={t.key}
                  role="tabpanel"
                  id={`panel-${t.key}`}
                  aria-labelledby={`tab-${t.key}`}
                  {...fadeSlide}
                >
                  {t.data.image && (
                    <PanelImage
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img src={t.data.image} alt={t.data.title} />
                    </PanelImage>
                  )}
                  
                  <PanelHeader>
                    {t.data.icon && (
                      <IconContainer>
                        <t.data.icon size={24} />
                      </IconContainer>
                    )}
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        margin: 0,
                        color: colors.accentGold,
                        fontSize: "1.25rem",
                      }}
                    >
                      {t.data.title}
                    </motion.h3>
                  </PanelHeader>
                  
                  <p>{t.data.text}</p>
                  {Array.isArray(t.data.bullets) &&
                    t.data.bullets.length > 0 && (
                      <ul>
                        {t.data.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                </Panel>
              )
          )}
        </AnimatePresence>
      </Tabs>

    </Section>
  );
}