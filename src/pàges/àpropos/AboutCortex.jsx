// src/pages/About.jsx
import React, { memo, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Star } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import SEO from "../../SEO";

/* ------------ Helper Cloudinary ------------ */
function cld(url, w = 1200) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

/* ---------------------- Anim & helpers ---------------------- */
const fadeUp = {
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
const fadeStagger = (i = 0) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
});
const gridDrift = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: 200px 120px, -200px -120px; }
`;
const shimmer = keyframes`
  0% { background-position: -180% 0; }
  100% { background-position: 180% 0; }
`;

/* ---------------------- SEO helpers ---------------------- */
const CANONICAL =
  typeof window !== "undefined"
    ? window.location.href
    : "https://institut-cortex.com/apropos";
const OG_IMAGE =
  imagess?.logoCortex2 || imagess?.logoCortex || "/img/cortex-logo.png";

/* ---------------------- Page shell ---------------------- */
const Page = styled.main`
  display: grid;
  gap: 18px;
  background: linear-gradient(180deg, #0c1524, #0e1a2b 40%, #0f223a);
  color: ${colors.text};
`;

/* ---------------------- Skeleton (Suspense-free loading) ---------------------- */
const Skeleton = styled.div`
  height: ${(p) => p.$h || "220px"};
  border-radius: 16px;
  border: 1px solid #1f2c44;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.04) 20%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.04) 60%
    ),
    #0f223a;
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease infinite;
  margin: clamp(12px, 2vw, 16px) auto;
  max-width: 1200px;
`;

/* ---------------------- Intersection wrapper ---------------------- */
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
    <div ref={ref}>{show ? children : <Skeleton $h={`${height}px`} />}</div>
  );
}

/* ---------------------- Hero ---------------------- */
const Hero = styled.header`
  position: relative;
  height: clamp(380px, 50vh, 560px);
  display: grid;
  align-items: end;
  isolation: isolate;
  background: radial-gradient(
      60% 80% at 75% 15%,
      #00000080 0%,
      #000000b0 60%,
      #000000cc 100%
    ),
    url(${(p) => cld(p.$cover, 1600)}) center/cover no-repeat;
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: repeating-linear-gradient(
        90deg,
        #ffffff08 0 1px,
        transparent 1px 40px
      ),
      repeating-linear-gradient(0deg, #ffffff06 0 1px, transparent 1px 40px);
    animation: ${gridDrift} 22s linear infinite;
    mix-blend-mode: soft-light;
  }
`;
const HeroInner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 28px;
  h1 {
    margin: 0 0 6px;
    font-size: clamp(26px, 5.4vw, 48px);
    letter-spacing: 0.4px;
  }
  p {
    margin: 0;
    font-size: clamp(14px, 2.4vw, 18px);
    max-width: 860px;
    color: ${colors.muted};
  }
  .ctaRow {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
  }
`;

const CTAGhost = styled(Link)`
  padding: 12px 16px;
  border-radius: 14px 0 14px 0;
  text-decoration: none;
  font-weight: 800;
  background: ${colors.accentGold};
  color: ${colors.bg1};
  box-shadow: 0 5px 2px ${colors.bg1};
  // border: 1px solid #d9b642;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    background: ${colors.accentGold}20;
    color: ${colors.accentGoldLight};

    transform: translateY(-1px);
    box-shadow: 0 5px 2px ${colors.accentGold};
  }
`;

/* ---------------------- Layout blocks ---------------------- */
const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 40px) 20px;
  display: grid;
  gap: clamp(16px, 2vw, 22px);
`;
const H2 = styled(motion.h2)`
  margin-bottom: 2rem;
  font-size: clamp(22px, 4vw, 32px);
  color: ${colors.accentGold};
`;
const Lead = styled(motion.p)`
  margin-bottom: 1rem;
  color: ${colors.text};
  max-width: 900px;
  font-size: clamp(15px, 2.4vw, 18px);
`;

/* ---------------------- CORTEX: Mission / Vision / Piliers ---------------------- */
const TwoCols = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 1rem;
  color: ${colors.accentGoldLight};
  grid-template-columns: 1fr;
  @media (min-width: 960px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;
const Card = styled(motion.article)`
  background: linear-gradient(120deg, ${colors.bg2}80 60%, ${colors.bg1} 60%);
  border: 1px solid #1f2c44;
  border-radius: 0 24px 0 24px;
  padding: 16px;
  display: grid;
  gap: 10px;
`;
const Pillars = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const Pillar = styled(motion.div)`
  border: 1px solid #21375a;
  border-radius: 22px 0 22px 0;
  padding: 14px;
  background: linear-gradient(180deg, #0e1a2b, #0f223a);
  b {
    display: block;
    margin-bottom: 6px;
    color: ${colors.accentGold};
    font-size: 1.1rem;
  }
  span {
    color: ${colors.text};
    font-size: 0.95rem;
  }
`;

/* ---------------------- Focus NONI ---------------------- */
const NoniWrap = styled.div`
  display: grid;
  gap: 18px;
  color: ${colors.accentGoldLight};
  font-size: 1rem;
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Bullets = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${colors.accentGold};
  li {
    margin: 6px 0;
    color: ${colors.accentGoldLight};
  }
  small {
    color: ${colors.muted};
  }
`;
const Portraits = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 620px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
const Portrait = styled(motion.figure)`
  margin: 0;
  border-radius: 22px 0 22px 0;
  overflow: hidden;
  border: 1px solid #21375a;
  background: ${colors.bg1};
  position: relative;
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.45s ease;
  }
  figcaption {
    position: absolute;
    inset: auto 0 0 0;
    padding: 8px 10px;
    background: linear-gradient(
      180deg,
      transparent,
      ${colors.bg1} 40%,
      ${colors.bg1}
    );
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
  }
  &:hover img {
    transform: scale(1.06);
  }
`;

/* ---------------------- Timeline ---------------------- */
const Timeline = styled.div`
  position: relative;
  padding-left: 16px;
  border-left: 2px solid #21375a;
  display: grid;
  gap: 14px;
`;
const TItem = styled(motion.div)`
  position: relative;
  padding-left: 12px;
  &:before {
    content: "";
    position: absolute;
    left: -19px;
    top: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.accentGold};
    box-shadow: 0 0 0 4px rgba(242, 201, 76, 0.2);
  }
  b {
    color: ${colors.accentGoldLight};
  }
  p {
    margin: 4px 0 0;
    color: ${colors.muted};
  }
`;

/* ---------------------- Team (flip cards premium & responsive) ---------------------- */
const TeamGrid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const FlipCard = styled.article`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  min-height: 280px;
  border-radius: 16px;
  perspective: 1200px;
  outline: none;
`;
const CardInner = styled.div`
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  ${FlipCard}:hover &,
  ${FlipCard}:focus-within & {
    transform: rotateY(180deg);
  }
`;
const FaceBase = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid #1f2c44;
`;
const FaceFront = styled(FaceBase)`
  background: #0b1729;
`;
const FrontImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transform: translateZ(0);
`;
const FrontLegend = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 10px 12px;
  background: linear-gradient(
    180deg,
    transparent,
    ${colors.bg1} 40%,
    ${colors.bg2}
  );
  color: ${colors.text};
  text-align: center;
  h4 {
    margin: 0;
    font-size: clamp(15px, 1.9vw, 18px);
    color: ${colors.accentGold};
  }
  small {
    opacity: 0.9;
    font-size: clamp(12px, 1.6vw, 13px);
  }
`;
const FaceBack = styled(FaceBase)`
  transform: rotateY(180deg);
  background: linear-gradient(
    120deg,
    ${colors.semygsecondar} 64%,
    ${colors.bgSoft} 50%
  );
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 10px;
  padding: clamp(12px, 2.5vw, 18px);
  box-shadow: inset 0 0 0 1px #274066;
`;
const BackTitle = styled.h4`
  margin: 0;
  font-size: clamp(16px, 2vw, 20px);
  color: ${colors.accentGold};
  text-align: center;
`;
const BackRole = styled.div`
  text-align: center;
  color: #f7f9fc;
  font-weight: 600;
  font-size: clamp(13px, 1.8vw, 14px);
`;
const BackBio = styled.p`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(12.5px, 1.8vw, 14px);
  line-height: 1.55;
  text-align: center;
`;
const BackStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  opacity: 0.9;
  div {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${colors.text};
    font-size: 12px;
  }
`;

/* ---------------------- Actions ---------------------- */
const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

/* ---------------------- Page Component ---------------------- */
function AboutPage() {
  const heroCover =
    imagess.àutàbleàu || imagess.DirecteurInstitutCortex1 || imagess.loreàt;

  // Contenu équipe (useMemo pour éviter recalculs)
  const team = useMemo(
    () => [
      {
        img:
          imagess.DirecteurInstitutCortex2 || imagess.DirecteurInstitutCortex1,
        name: "Direction CORTEX",
        role: "Pilotage académique & innovation",
        bio: "Conduit la R&D, la qualité pédagogique et les partenariats.",
      },
      {
        img:
          imagess.ResponsableadministrativeetFinancière2 ||
          imagess.ResponsableadministrativeetFinancière,
        name: "Administration & Finances",
        role: "Gouvernance & conformité",
        bio: "Fiabilise la gestion, la conformité et la transparence.",
      },
      
      {
        img:
          imagess.Responsablecommercialegroupe4 ||
          imagess.Responsablecommercialegroupe2,
        name: "Dév. commercial",
        role: "Relation & croissance",
        bio: "Déploie les offres, anime le réseau et la satisfaction client.",
      },
      {
        img: imagess.DirecteurduGroupe5 || imagess.DirecteurduGroupe1,
        name: "Directeur de NONI",
        role: "Stratégie & Développement",
        bio: "Structure la croissance et la performance du Groupe.",
      },
    ],
    []
  );


  // Pré-chargement images (idle) pour réduire LCP des sections suivantes
  useEffect(() => {
    const ric =
      window.requestIdleCallback ||
      function (cb) {
        const id = setTimeout(cb, 300);
        return { id, cancel: () => clearTimeout(id) };
      };
    const h = ric(() => {
      [team[0]?.img, team[1]?.img].forEach((src) => {
        if (!src) return;
        const i = new Image();
        i.src = cld(src, 900);
      });
    });
    return () => {
      if ("cancelIdleCallback" in window && h) {
        // @ts-ignore
        window.cancelIdleCallback(h);
      }
    };
  }, [team]);

  return (
    <Page>
      <SEO
        title="À propos — Institut CORTEX & Groupe NONI"
        description="Institut CORTEX : centre d’excellence (formations, masters, certifications, recherche appliquée & conseil) porté par le Groupe NONI. Vision, valeurs, équipe & engagements."
        image={OG_IMAGE}
        url={CANONICAL}
        siteName="Institut CORTEX"
        keywords={[
          "Institut Cortex",
          "Groupe NONI",
          "À propos",
          "Formation continue",
          "Certifications",
          "Masters en ligne",
          "Recherche appliquée",
          "Conseil",
          "Management",
          "Ingénierie",
          "Finance",
          "QHSE",
          "Guinée Conakry",
        ]}
      >
        {/* On précharge le visuel héros (LCP) */}
        <link
          rel="preload"
          as="image"
          href={cld(heroCover, 1600)}
          imagesrcset={`${cld(heroCover, 800)} 800w, ${cld(
            heroCover,
            1200
          )} 1200w, ${cld(heroCover, 1600)} 1600w`}
          fetchpriority="high"
        />
      </SEO>

      {/* Hero */}
      <Hero $cover={heroCover}>
        <HeroInner {...fadeUp}>
          <h1>À propos — Institut CORTEX & Groupe NONI</h1>
          <p>
            CORTEX : centre d’excellence en formation, recherche appliquée et
            conseil. Porté par le Groupe NONI, engagé pour une performance
            durable, humaine et innovante.
          </p>
          <div className="ctaRow">
            <CTAGhost to="/programmes">Voir les programmes</CTAGhost>
            <CTAGhost to="/contact">Contact</CTAGhost>
          </div>
        </HeroInner>
      </Hero>

      {/* CORTEX */}
      <Section aria-label="CORTEX — Mission, Vision & Piliers">
        <DeferInView height={320}>
          <H2 {...fadeUp}>CORTEX — Mission, Vision & Piliers</H2>
          <Lead {...fadeUp}>
            CORTEX développe des programmes de formation continue, des
            certifications, de la recherche appliquée et du conseil en gestion &
            développement durable (centre d’excellence orienté innovation et
            impact).
          </Lead>
          <TwoCols>
            <Card {...fadeUp}>
              <b>Notre philosophie</b>
              <p>
                Innover utile, professionnaliser par la pratique et accompagner
                les organisations vers l’excellence (formations certifiantes,
                ateliers, séminaires, projets encadrés).
              </p>
              <small style={{ color: colors.muted }}>
                Extraits officiels : activités de formation continue, recherche
                appliquée, certifications et conseil.
              </small>
            </Card>
            <Card {...fadeUp}>
              <b>Domaines CORTEX</b>
              <p style={{ margin: 0 }}>
                Management & Leadership, Finance & Contrôle, RH, QHSE,
                Ingénierie & SI, Santé, Génie Civil, Supply Chain.
              </p>
            </Card>
          </TwoCols>

          <Pillars>
            {[
              ["Innovation", "Pédagogies actives & projets concrets."],
              ["Excellence", "Exigence académique et applicabilité terrain."],
              ["Impact", "Compétences utiles, employabilité, performance."],
              ["Éthique", "Qualité, transparence, responsabilité sociale."],
            ].map(([t, d], i) => (
              <Pillar key={t} {...fadeStagger(i)}>
                <b>{t}</b>
                <span>{d}</span>
              </Pillar>
            ))}
          </Pillars>
        </DeferInView>
      </Section>

      {/* NONI */}
      <Section aria-label="Groupe NONI — Objectif & Principes">
        <DeferInView height={360}>
          <H2 {...fadeUp}>Groupe NONI — Objectif & Principes</H2>
          <NoniWrap>
            <Card {...fadeUp}>
              <b>Objectif & vision</b>
              <p>
                Promouvoir un développement économique pleinement humain et
                respectueux de l’environnement, en s’appuyant sur les talents
                (notamment des jeunes), l’excellence de la performance
                économique et un management qui valorise les compétences et la
                qualité des relations humaines.
              </p>
              <Bullets style={{ marginTop: 6 }}>
                <li>
                  <b>Esprit d’équipe</b> – co-construction, confiance,
                  solidarité.
                </li>
                <li>
                  <b>Satisfaction client</b> – qualité des services et des
                  résultats.
                </li>
                <li>
                  <b>Innovation</b> – solutions et pratiques technologiques
                  utiles.
                </li>
                <li>
                  <b>Responsabilité & ouverture</b> – éthique, égalité,
                  inclusion & formation.
                </li>
              </Bullets>
              <small style={{ color: colors.muted }}>
                Principes du code de conduite : écoute active & équité client,
                protection des informations, respect & sécurité au travail,
                collaboration, engagement & incubation des talents.
              </small>
            </Card>

            <div style={{ display: "grid", gap: 12 }}>
              <Card {...fadeUp}>
                <b>Domaines & réseau</b>
                <p>
                  Réseau de filiales et partenaires pour maximiser les synergies
                  : édition & contenus (Innov’Éditions), CORTEX (formation, R&D,
                  conseil), et collaborations académiques & technologiques.
                </p>
              </Card>
              <Portraits>
                {[
                  {
                    img: imagess.Responsablecommercialegroupe3,
                    name: "Resp Commerciale",
                  },
                  {
                    img: imagess.DirecteurInstitutCortex2,
                    name: "Direction CORTEX",
                  },
                  {
                    img: imagess.DirecteurduGroupe4,
                    name: "Direction Groupe NONI",
                  },
                ].map((p, i) => (
                  <Portrait key={i} {...fadeStagger(i)}>
                    <img
                      src={cld(p.img, 900)}
                      srcSet={`${cld(p.img, 600)} 600w, ${cld(
                        p.img,
                        900
                      )} 900w`}
                      sizes="(max-width: 620px) 50vw, 33vw"
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{p.name}</figcaption>
                  </Portrait>
                ))}
              </Portraits>
            </div>
          </NoniWrap>
        </DeferInView>
      </Section>

      {/* Timeline */}
      <Section aria-label="Étapes & dynamiques">
        <DeferInView height={280}>
          <H2 {...fadeUp}>Étapes & dynamiques</H2>
          <Timeline>
            <TItem {...fadeStagger(0)}>
              <b>Plan stratégique 2024-2029</b>
              <p>
                Croissance rentable, innovation commerciale, structuration
                inclusive et ambitieuse.
              </p>
            </TItem>
            <TItem {...fadeStagger(1)}>
              <b>Partenariats académiques internationaux</b>
              <p>
                CCL (MA), ASC Annecy (FR), Master Learn (UK) : masters & DBA en
                ligne, double diplomation.
              </p>
            </TItem>
            <TItem {...fadeStagger(2)}>
              <b>Réseau & synergies filiales/partenaires</b>
              <p>
                Alliance de compétences pour des solutions complètes, innovantes
                et durables.
              </p>
            </TItem>
          </Timeline>
        </DeferInView>
      </Section>

      {/* Team flip cards */}
      <Section aria-label="L’équipe CORTEX">
        <DeferInView height={480}>
          <H2 {...fadeUp}>L’équipe CORTEX</H2>
          <Lead {...fadeUp}>
            Une équipe mixant direction académique, gestion, finances et
            développement.
          </Lead>
          <TeamGrid>
            {team.map((m, i) => (
              <FlipCard
                key={i}
                tabIndex={0}
                aria-label={`${m.name} — ${m.role}`}
              >
                <CardInner>
                  <FaceFront>
                    <FrontImage
                      src={cld(m.img, 1200)}
                      srcSet={`${cld(m.img, 600)} 600w, ${cld(
                        m.img,
                        900
                      )} 900w, ${cld(m.img, 1200)} 1200w`}
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <FrontLegend>
                      <h4>{m.name}</h4>
                      <small>{m.role}</small>
                    </FrontLegend>
                  </FaceFront>

                  <FaceBack>
                    <BackTitle>{m.name}</BackTitle>
                    <BackRole>{m.role}</BackRole>
                    <BackBio>{m.bio}</BackBio>
                    <BackStats>
                      <div>
                        <Briefcase size={14} />
                        <span>Expérience</span>
                      </div>
                      <div>
                        <Star size={14} />
                        <span>Expertise</span>
                      </div>
                    </BackStats>
                  </FaceBack>
                </CardInner>
              </FlipCard>
            ))}
          </TeamGrid>
        </DeferInView>
      </Section>

      {/* Actions */}
      <Section aria-label="Passer à l’action">
        <DeferInView height={160}>
          <Actions>
            <CTAGhost to="/programmes">Explorer les programmes</CTAGhost>
            <CTAGhost to="/contact">Parler à un conseiller</CTAGhost>
          </Actions>
        </DeferInView>
      </Section>
    </Page>
  );
}

export default memo(AboutPage);
