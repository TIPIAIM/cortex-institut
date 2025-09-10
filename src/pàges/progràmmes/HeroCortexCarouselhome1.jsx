// src/components/hero/HeroCortexWebGL.jsx
import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled, { keyframes } from "styled-components";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* Cloudinary helper pour textures */
function cld(url, w = 1600) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

/* Slides / données par défaut */
const defaultSlides = [
  {
    title: "Institut CORTEX",
    subtitle: "Masters & Formations professionnalisantes orientées impact",
    image: imagess?.DirecteurInstitutCortex1 || imagess?.loreàt,
    ctaLabel: "Voir les programmes",
    ctaHref: "",
  },

  {
    title: "Compétences clés",
    subtitle:
      "Management, Finance, RH, QHSE, Ingénierie & SI, Santé, BTP, Supply",
    image:
      imagess?.Responsablecommercialegroupe5 || imagess?.Responsablecommercialegroupe2,
    ctaLabel: "Télécharger les catalogues",
    ctaHref: "",//"/catalogues",
  },
  {
    title: "Réussites & Lauréats",
    subtitle: "Apprendre par des projets concrets, encadrés par des experts",
    image: imagess?.loreàt || imagess?.DirecteurInstitutCortex2,
    ctaLabel: "S’inscrire",
    ctaHref: "/inscription",
  },
  {
    title: "Compétences clés",
    subtitle:
      "Management, Finance, RH, QHSE, Ingénierie & SI, Santé, BTP, Supply",
    image:
      imagess?.ResponsableadministrativeetFinancière ||
      imagess?.DirecteurduGroupe1,
    ctaLabel: "Télécharger les catalogues",
    ctaHref: "/catalogues",
  },
  {
    title: "Compétences clés",
    subtitle:
      "Management, Finance, RH, QHSE, Ingénierie & SI, Santé, BTP, Supply",
    image: imagess?.DirecteurduGroupe1 || imagess?.DirecteurInstitutCortex3,
    ctaLabel: "Télécharger les catalogues",
    ctaHref: "/catalogues",
  },

];

/* ======================= 3D LAYER ======================= */

/** Un panneau texturé avec léger wobble 3D
 *  -> on forward la ref vers le mesh pour pouvoir le recycler dans le FlowGroup
 */
const Panel = forwardRef(function Panel(
  { texture, width, height, x, phase = 0 },
  ref
) {
  const meshRef = useRef();
  useImperativeHandle(ref, () => meshRef.current, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + phase;
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(t * 0.4) * THREE.MathUtils.degToRad(1.6);
      meshRef.current.rotation.x =
        Math.cos(t * 0.3) * THREE.MathUtils.degToRad(1.2);
    }
  });

  return (
    <mesh ref={meshRef} position={[x, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
});

/** Groupe qui scrolle : défilement uniforme + boucle parfaite */
function FlowGroup({ urls, speed = 0.06 }) {
  const { viewport, gl } = useThree();
  const { width: vw, height: vh } = viewport;
  const gap = vw * 0.03;
  const panelH = vh * 0.7;
  const panelW = panelH * 1.6; // ratio visuel approx 16:10
  const totalW = (panelW + gap) * urls.length;
  const visibleSpan = vw * 2 + totalW;

  const texUrls = useMemo(() => urls.map((u) => cld(u, 1400)), [urls]);
  const textures = useTexture(texUrls);
  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.needsUpdate = true;
    });
  }, [textures, gl]);

  // dupliquer la séquence pour boucler sans couture
  const seq = useMemo(
    () => [...textures, ...textures, ...textures],
    [textures]
  );
  const phases = useMemo(
    () => seq.map((_, i) => Math.random() * 10 + i * 0.37),
    [seq]
  );

  const positions = useMemo(() => {
    const arr = [];
    const startX = -visibleSpan / 2;
    let x = startX;
    for (let i = 0; i < seq.length; i++) {
      arr.push(x + panelW / 2);
      x += panelW + gap;
    }
    return arr;
  }, [seq, gap, panelW, visibleSpan]);

  const meshes = useRef([]);
  const groupRef = useRef();
  const pausedRef = useRef(false);

  useFrame((_, delta) => {
    if (pausedRef.current) return;
    const dx = speed * vw * delta;
    meshes.current.forEach((m) => {
      if (!m) return;
      m.position.x -= dx;
      if (m.position.x < -visibleSpan / 2 - panelW) {
        // recycle à droite
        let maxX = -Infinity;
        meshes.current.forEach((m2) => {
          if (m2) maxX = Math.max(maxX, m2.position.x);
        });
        m.position.x = maxX + panelW + gap;
      }
    });
  });

  // exposer pause/reprise
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.__pause = () => (pausedRef.current = true);
    groupRef.current.__resume = () => (pausedRef.current = false);
  }, []);

  return (
    <group ref={groupRef}>
      {seq.map((tex, i) => (
        <Panel
          key={i}
          texture={tex}
          width={panelW}
          height={panelH}
          x={positions[i]}
          phase={phases[i]}
          ref={(el) => (meshes.current[i] = el)}
        />
      ))}
    </group>
  );
}

/* Wrapper <group> simple (au lieu de styled.group qui casse) */
const SceneWrapper = forwardRef(function SceneWrapper(props, ref) {
  return <group ref={ref} {...props} />;
});

/* ======================= HERO WRAPPER ======================= */

export default function HeroCortexWebGL({
  slides = defaultSlides,
  align = "left",
  speed = 0.04, // vitesse uniforme
  title = "Institut CORTEX",
  subtitle = "Professionnalisez votre parcours : Management, Finance, RH, QHSE, Ingénierie & SI, Santé, BTP, Supply…",
  primaryCta = { label: "Nous joindre", href: "/contact" },
}) {
  const wrapRef = useRef(null);
  const flowRef = useRef(null);

  const items = useMemo(
    () =>
      (slides || [])
        .filter(Boolean)
        .map((s, i) => ({ ...s, image: s?.image || imagess?.loreàt })),
    [slides]
  );
  const urls = useMemo(() => items.map((it) => it.image), [items]);

  const onEnter = useCallback(() => {
    const g = flowRef.current;
    if (g && g.__pause) g.__pause();
  }, []);
  const onLeave = useCallback(() => {
    const g = flowRef.current;
    if (g && g.__resume) g.__resume();
  }, []);

  return (
    <HeroWrap
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="region"
      aria-label="Section d’introduction — défilement 3D uniforme"
    >
      {/* LAYER 3D */}
      <Canvas
        orthographic
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <OrthographicCamera makeDefault position={[0, 0, 10]} />
        <SceneWrapper ref={flowRef}>
          <FlowGroup urls={urls} speed={speed} />
        </SceneWrapper>
        <Preload all />
      </Canvas>

      {/* Overlays lisibilité */}
      <Shade />
      <BlackGlass />

      {/* CONTENU */}
      <Inner $align={align}>
        <Title
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </Title>

        {!!subtitle && (
          <Sub
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {subtitle}
          </Sub>
        )}

        <CTAGroup>
          {!!primaryCta?.href && !!primaryCta?.label && (
            <CTA
              href={primaryCta.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              {primaryCta.label}
            </CTA>
          )}
        </CTAGroup>
      </Inner>
    </HeroWrap>
  );
}

/* ============================== styles ============================== */

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const HeroWrap = styled.section`
  position: relative;
  height: 80vh;
  min-height: 320px;
  max-height: 720px;
  overflow: hidden;
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(120deg, ${colors.bg} 50%, ${colors.bgSoft} 50%),
    linear-gradient(180deg, rgba(28, 10, 11, 0.18), rgba(28, 10, 11, 0.58));
  mix-blend-mode: soft-light;
`;

const BlackGlass = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    120deg,
    ${colors.accentGoldLight}00 97%,
    ${colors.accentGold} 2%
  );
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 24px) 20px;
  display: grid;
  gap: 10px;
  align-content: end;
  height: 100%;
  color: ${colors.text};
  text-align: ${({ $align }) => ($align === "center" ? "center" : "left")};
  justify-items: ${({ $align }) => ($align === "center" ? "center" : "start")};
`;

const Title = styled(motion.h1)`
  margin: 0;
  font-size: clamp(50px, 5vw, 44px);
  letter-spacing: 0.2px;
  color: transparent;
  background-image: linear-gradient(
    120deg,
    ${colors.accentGold},
    ${colors.accentGoldLight} 55%,
    rgb(0, 3, 26) 65%,
    ${colors.bg}
  );
  background-size: 20% auto;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${gradientShift} 6s linear infinite;
  text-shadow: 0 4px 22px rgba(242, 201, 76, 0.18),
    0 1px 10px rgba(42, 75, 124, 0.22);
`;

const Sub = styled(motion.p)`
  margin: 0;
  font-size: clamp(20px, 2.2vw, 30px);
  color: ${colors.accentGold}2;
  font-weight: 900;
  max-width: 900px;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.28);
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const CTA = styled(motion.a)`
  align-self: start;
  width: fit-content;
  background: ${colors.accentGold};
  color: #0e1a2b;
  border: 1px solid #d9b642;
  padding: 12px 16px;
  border-radius: 18px 0px 18px 0px;
  font-weight: 800;
  margin-bottom: 3rem;
  box-shadow: 0 10px 28px rgba(242, 201, 76, 0.28);
  transition: box-shadow 0.15s ease;
  &:hover {
    background: ${colors.accentGold}70;

    box-shadow: 0 12px 12px rgba(242, 201, 76, 0.36);
  }
`;

const Ghost = styled(motion.a)`
  align-self: start;
  width: fit-content;
  color: ${colors.text};
  background: ${colors.bgSoft};
  padding: 12px 16px;
  border-radius: 18px 0px 18px 0px;
  font-weight: 800;
  transition: border-color 0.2s ease;
  &:hover {
    background: ${colors.bgSoft}70;

    border-color: #2a4b7c;
  }
`;
