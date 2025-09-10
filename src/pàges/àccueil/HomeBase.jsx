// src/pages/HomeBase.jsx
import React, { memo, lazy, Suspense, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import SEO from "../../SEO";

/* === Au-dessus de la ligne de flottaison : on garde non-lazy === */
import HeroIntro from "./HeroIntro";

/* === Below the fold : lazy === */
const PillarsGrid = lazy(() => import("./PillarsGrid"));
const ProgramsRail = lazy(() => import("./ProgramsRail"));
const PartnersStrip = lazy(() => import("./PartnersStrip"));
const TestimonialsWall = lazy(() => import("./Temoignàge"));
const RealisationsZigzag = lazy(() => import("./RealisationsZigzag"));
const FinalBandCTA = lazy(() => import("./FinalBandCTA"));

/* ===================== FX légers ===================== */
const shimmer = keyframes`
  0% { background-position: -180% 0; }
  100% { background-position: 180% 0; }
`;

const Page = styled.main`
  position: relative;
  background: linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 55%, #0f223a);
  color: ${colors.text};
  isolation: isolate;
`;

/* Skeleton sobre pour Suspense */
const Skeleton = styled.div`
  height: ${(p) => p.$h || "220px"};
  border-radius: 16px;
  border: 1px solid #1f2c44;
  background: linear-gradient(
      100deg,
      rgba(255,255,255,0.04) 20%,
      rgba(255,255,255,0.08) 40%,
      rgba(255,255,255,0.04) 60%
    ),
    #0f223a;
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease infinite;
  margin: clamp(12px, 2vw, 16px) auto;
  max-width: 1200px;
`;

/* Section conteneur compactée (évite les <div> inutiles) */
const SectionWrap = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(18px, 4.5vw, 36px) 12px;
`;

/* ===================== Intersection wrapper ===================== */
function DeferInView({ children, height = 280 }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    let obs;
    if (ref.current && !show) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setShow(true);
              obs?.disconnect();
            }
          });
        },
        { root: null, rootMargin: "240px 0px", threshold: 0.01 }
      );
      obs.observe(ref.current);
    }
    return () => obs?.disconnect();
  }, [show]);

  return (
    <div ref={ref}>
      {show ? children : <Skeleton $h={`${height}px`} aria-hidden />}
    </div>
  );
}

/* ===================== Préchargement idle ===================== */
function useWarmChunks() {
  useEffect(() => {
    const ric =
      window.requestIdleCallback ||
      function (cb) {
        const id = setTimeout(cb, 350);
        return { id, cancel: () => clearTimeout(id) };
      };

    const handle = ric(async () => {
      // On déclenche les imports (ils seront déjà en cache au scroll)
      const tasks = [
        import("./PillarsGrid"),
        import("./ProgramsRail"),
        import("./PartnersStrip"),
        import("./Temoignàge"),
        import("./RealisationsZigzag"),
        import("./FinalBandCTA"),
      ];
      try {
        await Promise.allSettled(tasks);
      } catch {
        /* silencieux */
      }
    });

    return () => {
      if ("cancelIdleCallback" in window && handle) {
        // @ts-ignore
        window.cancelIdleCallback(handle);
      }
    };
  }, []);
}

/* ===================== Page ===================== */
function HomeBase() {
  useWarmChunks();

  const canonical =
    typeof window !== "undefined" ? window.location.href : "https://institut-cortex.com/";
  const ogImage =
    imagess?.logoCortex2 || imagess?.logoCortex || "/img/cortex-logo.png";

  return (
    <Page>
      {/* SEO pour la page d’accueil */}
      <SEO
        title="Institut Cortex — Formations, Masters & Certifications en ligne"
        description="CORTEX (Conakry) : formations certifiantes, Masters 100% en ligne, recherche appliquée et conseil. Filières : Management, Ingénierie, Finance, Santé, Génie civil, QHSE, Supply Chain."
        image={ogImage}
        url={canonical}
        type="website"
        siteName="Institut Cortex"
        keywords={[
          "Institut Cortex",
          "Institut-Cortex",
          "cortex",
          "CCL",
          "Masters en ligne",
          "Formation continue",
          "Certifications",
          "Management",
          "Ingénierie",
          "Finance",
          "QHSE",
          "Santé",
          "Génie civil",
          "Supply Chain",
          "Guinée Conakry",
        ]}
      />

      {/* Above the fold, non-lazy */}
      <HeroIntro />

      {/* Below the fold : monté à l’apparition + lazy + suspense */}
      <SectionWrap as="section" aria-label="Pourquoi CORTEX">
        <DeferInView height={340}>
          <Suspense fallback={<Skeleton $h="340px" aria-hidden />}>
            <PillarsGrid />
          </Suspense>
        </DeferInView>
      </SectionWrap>

      <SectionWrap as="section" aria-label="Programmes phares">
        <DeferInView height={320}>
          <Suspense fallback={<Skeleton $h="320px" aria-hidden />}>
            <ProgramsRail />
          </Suspense>
        </DeferInView>
      </SectionWrap>

      <SectionWrap as="section" aria-label="Partenaires">
        <DeferInView height={220}>
          <Suspense fallback={<Skeleton $h="220px" aria-hidden />}>
            <PartnersStrip />
          </Suspense>
        </DeferInView>
      </SectionWrap>

      <SectionWrap as="section" aria-label="Témoignages">
        <DeferInView height={420}>
          <Suspense fallback={<Skeleton $h="420px" aria-hidden />}>
            <TestimonialsWall />
          </Suspense>
        </DeferInView>
      </SectionWrap>

      <SectionWrap as="section" aria-label="Nos réalisations">
        <DeferInView height={480}>
          <Suspense fallback={<Skeleton $h="480px" aria-hidden />}>
            <RealisationsZigzag />
          </Suspense>
        </DeferInView>
      </SectionWrap>

      <SectionWrap as="section" aria-label="Passer à l’action">
        <DeferInView height={180}>
          <Suspense fallback={<Skeleton $h="180px" aria-hidden />}>
            <FinalBandCTA />
          </Suspense>
        </DeferInView>
      </SectionWrap>
    </Page>
  );
}

export default memo(HomeBase);
