// src/components/home/HeroIntro.jsx
import React, { useMemo, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Award, Users, BookOpen } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ---------- Helper Cloudinary ---------- */
function cld(url, w = 2000) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}f_auto&q_auto&w=${w}`;
}

/* ---------- Keyframes décor (légers & GPU-friendly) ---------- */
const gridDrift3D = keyframes`
  0% { background-position: 0 0, 0 0; transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
  50% { background-position: 240px 150px, -240px -150px; transform: perspective(1000px) rotateX(.8deg) rotateY(.8deg); }
  100%{ background-position: 0 0, 0 0; transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
`;
const floatSoft = keyframes`
  0% { transform: translateY(0) scale(1); opacity:.34; }
  50%{ transform: translateY(-10px) scale(1.04); opacity:.6; }
  100%{ transform: translateY(0) scale(1); opacity:.34; }
`;
const textShine = keyframes`
  0% { background-position: -120% 0; }
  100%{ background-position: 220% 0; }
`;

/* ---------- Scène ---------- */
const Hero = styled(motion.header)`
  position: relative;
  height: clamp(520px, 64vh, 780px);
  min-height: 500px;
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
  isolation: isolate;
  perspective: 1200px;
  transform-style: preserve-3d;
  background: radial-gradient(
      60% 80% at 75% 15%,
      #00000060 0%,
      rgba(1, 7, 19, 0.8) 60%,
      #000000c0 0%
    ),
    url(${(p) => cld(p.$cover, 2000)}) center/cover no-repeat;

  /* Grille flottante subtile */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
        90deg,
        #ffffff0a 0 1px,
        transparent 1px 42px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.23) 0 1px,
        transparent 1px 42px
      );
    animation: ${gridDrift3D} 22s linear infinite;
    mix-blend-mode: soft-light;
    transform: translateZ(-40px);
    will-change: transform, background-position, opacity;
  }

  /* Spotlight dynamique contrôlé par variables CSS */
  &::after {
    content: "";
    position: absolute;
    inset: -8% -8%;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(
      560px 360px at var(--mx, 50%) var(--my, 50%),
      ${colors.accentGold} 0%,
      ${colors.bg1} 10%,
      transparent 50%
    );
    mix-blend-mode: soft-light;
    transition: opacity 0.25s ease;
  }
`;

const Halos = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  .halo {
    position: absolute;
    width: 46vw;
    max-width: 560px;
    aspect-ratio: 1/1;
    border-radius: 999px;
    filter: blur(42px);
    animation: ${floatSoft} var(--dur, 12s) ease-in-out infinite;
    will-change: transform, opacity;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  transform-style: preserve-3d;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(22px, 4.6vw, 34px) 20px clamp(28px, 4.6vw, 38px);
  text-align: center;
`;

const Title = styled(motion.h1)`
  margin: 0 0 12px;
  font-size: clamp(20px, 5.8vw, 40px);
  line-height: 1.05;
  font-weight: 900;
  color: transparent;
  background-image: linear-gradient(
    120deg,
    ${colors.accentGoldLight} 18%,
      

    ${colors.accentGoldLight} 48%,  white
  );
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 220% auto;
  text-shadow: 0 10px 38px rgba(242, 201, 76, 0.16),
    0 2px 12px rgba(10, 16, 28, 0.45);
  animation: ${textShine} 4.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
`;

const Lead = styled(motion.p)`
  margin: 0 auto 16px;
  max-width: 880px;
  color: ${colors.accentGoldLight};
  font-size: clamp(14px, 2.3vw, 19px);
  opacity: 0.96;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
`;

/* CTAs brandés (palette CORTEX) */
const CTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 14px 0 14px 0;
  text-decoration: none;
  font-weight: 800;
  
  font-size: 16px;
  background: ${colors.accentGold};
  color: #0e1a2b;
   box-shadow: 0 12px 30px rgba(242, 201, 76, 0.3);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  will-change: transform;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(242, 201, 76, 0.38);
  }
`;

const GhostCTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 14px 0 14px 0;
  text-decoration: none;
  font-weight: 800;
  font-size: 16px;
  background: linear-gradient(180deg, #0e1a2b, #102844);
  color: ${colors.accentGoldLight};
  border: 1px solid #274066;
  box-shadow: 0 10px 24px rgba(10, 16, 28, 0.35);
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  will-change: transform;
  &:hover {
    transform: translateY(-2px);
    border-color: ${colors.semygsecondar};
    box-shadow: 0 12px 28px rgba(10, 16, 28, 0.46);
  }
`;

/* Icônes flottantes (lite) */
const FloatingBadges = styled(motion.div)`
  position: absolute;
  //left: 50%;
  bottom: 88px;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;
  z-index: 3;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 22px 22px 0 0;
    color: ${colors.accentGoldLight};
    font-weight: 700;
    font-size: 13px;
    background: rgba(15, 25, 45, 0.8);
    border: 1px solid rgba(200, 170, 110, 0.22);
    backdrop-filter: blur(8px);
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

/* Stats (désactivées mobile pour sobriété) */
const StatsBar = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: rgba(15, 25, 45, 0.66);
  border-top: 1px solid rgba(200, 170, 110, 0.22);
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .number {
    font-size: 22px;
    font-weight: 900;
    color: ${colors.accentGold};
  }
  .label {
    font-size: 11px;
    color: ${colors.accentGoldLight};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  @media (max-width: 540px) {
    display: none;
  }
`;

/* Particules légères, positions mémorisées */
const ParticleDot = styled.div`
  position: absolute;
  border-radius: 50%;
  width: var(--s);
  height: var(--s);
  background: var(--c);
  opacity: 0.85;
  transform: translate3d(var(--x), var(--y), var(--z));
  will-change: transform, opacity;
  filter: drop-shadow(0 0 10px var(--c));
`;

/* ---------- Variants (cascade escalier) ---------- */
const containerV = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemV = {
  initial: { opacity: 0, y: 18, scale: 0.985, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =================================================================== */
export default function HeroIntro({
  title = "Institut CORTEX — Formations, Certifications, R&D & Conseil",
  lead = "Centre d’excellence orienté impact : management, finance, RH, QHSE, ingénierie & SI, santé, génie civil, supply chain.",
  cover = imagess.DirecteurduGroupe2 ||
    imagess.DirecteurInstitutCortex1 ||
    imagess.loreàt,
}) {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();

  /* Parallax fluide sur tout le bloc */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const smoothY = useSpring(y, { stiffness: 260, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 260, damping: 30 });

  /* Spotlight: variables CSS --mx/--my mises à jour au move (pas de re-render) */
  const onPointerMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${px}%`);
    el.style.setProperty("--my", `${py}%`);
  };
  const onPointerLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  };

  /* Particules pré-calculées & stables (pas de Math.random en render) */
  const particles = useMemo(() => {
    const N = reduced ? 12 : 30;
    const palette = [
      "rgba(200,170,110,.75)", // or (accent)
      "rgba(42,75,124,.60)", // bleu médian
      "rgba(255,255,255,.45)", // blanc doux
    ];
    const arr = [];
    for (let i = 0; i < N; i++) {
      arr.push({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        z: `${(Math.random() * 50 - 25).toFixed(1)}px`,
        s: `${(2 + Math.random() * 4).toFixed(1)}px`,
        c: palette[(Math.random() * palette.length) | 0],
      });
    }
    return arr;
  }, [reduced]);

  return (
    <Hero
      ref={heroRef}
      $cover={cover}
      style={{ y: smoothY, opacity: smoothOpacity }}
      role="banner"
      aria-label="Section d’introduction CORTEX"
      onMouseMove={reduced ? undefined : onPointerMove}
      onMouseLeave={reduced ? undefined : onPointerLeave}
    >
      {/* Halos brandés (palette CORTEX) */}
      {!reduced && (
        <Halos>
          <span
            className="halo"
            style={{
              left: "-10%",
              top: "10%",
              background: `radial-gradient(closest-side, ${colors.semygsecondar}44, transparent 72%)`,
              ["--dur"]: "14s",
            }}
          />
          <span
            className="halo"
            style={{
              right: "-12%",
              bottom: "-18%",
              background: `radial-gradient(closest-side, ${colors.semygprimar}44, transparent 72%)`,
              ["--dur"]: "11s",
            }}
          />
          <span
            className="halo"
            style={{
              left: "58%",
              top: "-12%",
              background:
                "radial-gradient(closest-side, #3a6ea833, transparent 72%)",
              ["--dur"]: "16s",
            }}
          />
        </Halos>
      )}

      {/* Particules légères */}
      {!reduced &&
        particles.map((p) => (
          <ParticleDot
            key={p.id}
            style={{
              left: p.x,
              top: p.y,
              ["--x"]: p.x,
              ["--y"]: p.y,
              ["--z"]: p.z,
              ["--s"]: p.s,
              ["--c"]: p.c,
            }}
          />
        ))}

      {/* Contenu en “escalier” (stagger fluide) */}
      <Content variants={containerV} initial="initial" animate="animate">
        <Title variants={itemV}>{title}</Title>
        <Lead variants={itemV}>{lead}</Lead>
        <CtaRow variants={itemV}>
          <CTA
            to="/contact"
            whileTap={{ scale: 0.98 }}
            aria-label="Parler à un conseiller"
          >
            <Users size={18} />
            Parler à un conseiller
            <ArrowRight size={16} />
          </CTA>
          <GhostCTA
            to="/programmes"
            whileTap={{ scale: 0.98 }}
            aria-label="Découvrir les programmes"
          >
            <BookOpen size={18} />
            Découvrir les programmes
          </GhostCTA>
        </CtaRow>
      </Content>

      {/* Badges flottants (légers) */}
      <FloatingBadges
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div>
          <Award size={14} /> Certifications
        </div>
        <div>
          <Star size={14} /> Pédagogie active
        </div>
        <div>
          <Play size={14} /> Formats hybrides
        </div>
      </FloatingBadges>

      {/* Stats (desktop) */}
      <StatsBar
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.7 }}
      >
        <div className="stat">
          <div className="number">500+</div>
          <div className="label">Étudiants</div>
        </div>
        <div className="stat">
          <div className="number">98%</div>
          <div className="label">Réussite</div>
        </div>
        <div className="stat">
          <div className="number">25+</div>
          <div className="label">Programmes</div>
        </div>
        <div className="stat">
          <div className="number">15+</div>
          <div className="label">Partenaires</div>
        </div>
      </StatsBar>
    </Hero>
  );
}
