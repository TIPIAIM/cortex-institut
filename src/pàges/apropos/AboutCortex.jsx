import React, { memo, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Briefcase,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UsersRound,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import SEO from "../../SEO";
import CortexHolding from "../CortexHolding/CortexHolding";
import { openProgrammeContactModal } from "../programmes/programmeContact.js";

const CANONICAL = "https://www.institut-cortex.com/apropos";
const OG_IMAGE = imagess?.logoCortex2 || imagess?.logoCortex || "/img/cortex-logo.png";

function cld(url, w = 1200) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}f_auto&q_auto&w=${w}`;
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
};

function AboutPage() {
  const reduceMotion = useReducedMotion();
  const heroCover =
    imagess?.àutàbleàu || imagess?.DirecteurInstitutCortex1 || imagess?.loreàt;

  const team = useMemo(
    () => [
      {
        img: imagess?.DirecteurInstitutCortex2 || imagess?.DirecteurInstitutCortex1,
        name: "Directeur CORTEX",
        role: "Pilotage académique & innovation",
        bio: "Conduit la R&D, la qualité pédagogique et les partenariats.",
      },
      {
        img:
          imagess?.ResponsableadministrativeetFinancière2 ||
          imagess?.ResponsableadministrativeetFinancière,
        name: "Administration & Finances",
        role: "Gouvernance & conformité",
        bio: "Fiabilise la gestion, la conformité et la transparence.",
      },
      {
        img: imagess?.Responsablecommercialegroupe4 || imagess?.Responsablecommercialegroupe2,
        name: "Dév. commercial",
        role: "Relation & croissance",
        bio: "Déploie les offres, anime le réseau et la satisfaction client.",
      },
      {
        img: imagess?.DirecteurduGroupe5 || imagess?.DirecteurduGroupe1,
        name: "Directeur de NONI",
        role: "Stratégie & Développement",
        bio: "Structure la croissance et la performance du Groupe.",
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const preload = () => {
      [team[0]?.img, team[1]?.img].filter(Boolean).forEach((src) => {
        const img = new Image();
        img.src = cld(src, 900);
      });
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(preload, 350);
    return () => window.clearTimeout(id);
  }, [team]);

  const motionProps = reduceMotion
    ? { initial: false }
    : {
        ...fadeUp,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  const schemas = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "À propos — Institut Cortex & Cortex Holding",
        url: CANONICAL,
        inLanguage: "fr",
        about: {
          "@id": "https://www.institut-cortex.com/#organization",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.institut-cortex.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "À propos",
            item: CANONICAL,
          },
        ],
      },
    ],
    []
  );

  const pillars = [
    {
      icon: Lightbulb,
      title: "Innovation",
      text: "Pédagogies actives & projets concrets.",
    },
    {
      icon: Star,
      title: "Excellence",
      text: "Exigence académique et applicabilité terrain.",
    },
    {
      icon: Target,
      title: "Impact",
      text: "Compétences utiles, employabilité, performance.",
    },
    {
      icon: ShieldCheck,
      title: "Éthique",
      text: "Qualité, transparence, responsabilité sociale.",
    },
  ];

  return (
    <Page>
      <SEO
        title="À propos | Institut Cortex & Cortex Holding"
        description="Découvrez la vision, les engagements, les activités et l’équipe de l’Institut Cortex et de Cortex Holding à Conakry."
        image={OG_IMAGE}
        imageAlt="Institut Cortex et Cortex Holding"
        url={CANONICAL}
        siteName="Institut Cortex"
        keywords={[
          "Institut Cortex",
          "Cortex Holding",
          "formation professionnelle Guinée",
          "Grandes Écoles Conakry",
          "innovation pédagogique",
          "employabilité",
          "formation cadres Guinée",
        ]}
        schemas={schemas}
      >
        {heroCover && (
          <link
            rel="preload"
            as="image"
            href={cld(heroCover, 1600)}
            imageSrcSet={`${cld(heroCover, 800)} 800w, ${cld(heroCover, 1200)} 1200w, ${cld(heroCover, 1600)} 1600w`}
            fetchPriority="high"
          />
        )}
      </SEO>

      <Hero aria-labelledby="about-title">
        <HeroGrid aria-hidden="true" />
        <HeroGlow aria-hidden="true" />

        <HeroInner>
          <HeroContent as={motion.div} {...motionProps}>
            <Eyebrow>
              <Sparkles size={14} /> INSTITUT CORTEX · CORTEX HOLDING
            </Eyebrow>

            <HeroTitle id="about-title">
              Former, structurer et <Accent>faire grandir l’impact.</Accent>
            </HeroTitle>

            <HeroLead>
              CORTEX développe des programmes de formation continue, des
              certifications, de la recherche appliquée et du conseil avec une
              ambition commune : rendre les compétences immédiatement utiles au
              terrain.
            </HeroLead>
 
          </HeroContent>

          <HeroPoster as={motion.figure} {...motionProps}>
            <PosterMedia>
              <PosterImage
                src={cld(heroCover, 1400)}
                srcSet={`${cld(heroCover, 800)} 800w, ${cld(heroCover, 1100)} 1100w, ${cld(heroCover, 1400)} 1400w`}
                sizes="(max-width: 980px) 100vw, 44vw"
                alt="Équipe et environnement Institut Cortex"
                loading="eager"
                decoding="async"
              />
              <PosterShade />
              <PosterSeal aria-hidden="true">
                <Compass size={23} />
              </PosterSeal>
            </PosterMedia>

            <PosterBody>
              <PosterKicker>NOTRE POSITIONNEMENT</PosterKicker>
              <PosterTitle>Excellence · Innovation · Impact</PosterTitle>
              <PosterText>
                Une organisation pensée pour relier apprentissage, pratique,
                accompagnement et développement durable.
              </PosterText>
            </PosterBody>
          </HeroPoster>
        </HeroInner>
      </Hero>

      <QuickNav aria-label="Navigation de la page À propos">
        <QuickNavInner>
          <a href="#cortex-holding">Holding</a>
          <a href="#mission">Mission</a>
          <a href="#principes">Principes</a>
          <a href="#dynamique">Dynamique</a>
          <a href="#equipe">Équipe</a>
        </QuickNavInner>
      </QuickNav>

      <CortexHolding />

      <Section id="mission" aria-labelledby="mission-title">
        <SectionHeading as={motion.div} {...motionProps}>
          <SectionKicker>
            <BookOpenCheck size={15} /> NOTRE ADN
          </SectionKicker>
          <H2 id="mission-title">Mission, vision & piliers</H2>
          <Lead>
            CORTEX développe des programmes de formation continue, des
            certifications, de la recherche appliquée et du conseil en gestion &
            développement durable, dans une logique d’innovation et d’impact.
          </Lead>
        </SectionHeading>

        <TwoCols>
          <GlassCard as={motion.article} {...motionProps}>
            <CardIcon><Compass size={21} /></CardIcon>
            <CardTitle>Notre philosophie</CardTitle>
            <CardText>
              Innover utile, professionnaliser par la pratique et accompagner les
              organisations vers l’excellence à travers les formations
              certifiantes, ateliers, séminaires et projets encadrés.
            </CardText>
            <CardNote>
              Activités : formation continue, recherche appliquée, certifications
              et conseil.
            </CardNote>
          </GlassCard>

          <GlassCard as={motion.article} {...motionProps}>
            <CardIcon><Briefcase size={21} /></CardIcon>
            <CardTitle>Domaines CORTEX</CardTitle>
            <CardText>
              Management & Business, Logistique & Supply Chain, Digital, Technologie
              & IA, Industrie, Mines & Opérations, Agri-Business & Économie Verte,
              Projet, Conseil & Employabilité / Transformation, Finance, Comptabilité
              & Banque.
            </CardText>
          </GlassCard>
        </TwoCols>

        <Pillars>
          {pillars.map(({ icon: Icon, title, text }, index) => (
            <Pillar
              key={title}
              as={motion.article}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
            >
              <PillarIcon as={motion.span} whileHover={reduceMotion ? undefined : { rotate: -7, scale: 1.08 }}>
                <Icon size={19} />
              </PillarIcon>
              <div>
                <b>{title}</b>
                <span>{text}</span>
              </div>
            </Pillar>
          ))}
        </Pillars>
      </Section>

      <Section id="principes" aria-labelledby="principes-title">
        <SectionHeading as={motion.div} {...motionProps}>
          <SectionKicker>
            <HeartHandshake size={15} /> CULTURE & ENGAGEMENT
          </SectionKicker>
          <H2 id="principes-title">Objectif & principes de fonctionnement</H2>
        </SectionHeading>

        <NoniGrid>
          <GlassCard as={motion.article} {...motionProps}>
            <CardIcon><Target size={21} /></CardIcon>
            <CardTitle>Objectif & vision</CardTitle>
            <CardText>
              Promouvoir un développement économique pleinement humain et
              respectueux de l’environnement, en s’appuyant sur les talents,
              notamment des jeunes, l’excellence de la performance économique et
              un management qui valorise les compétences et la qualité des
              relations humaines.
            </CardText>

            <PrinciplesList>
              <li><strong>Esprit d’équipe</strong><span>Co-construction, confiance, solidarité.</span></li>
              <li><strong>Satisfaction client</strong><span>Qualité des services et des résultats.</span></li>
              <li><strong>Innovation</strong><span>Solutions et pratiques technologiques utiles.</span></li>
              <li><strong>Responsabilité & ouverture</strong><span>Éthique, égalité, inclusion & formation.</span></li>
            </PrinciplesList>

            <CardNote>
              Principes du code de conduite : écoute active & équité client,
              protection des informations, respect & sécurité au travail,
              collaboration, engagement & incubation des talents.
            </CardNote>
          </GlassCard>

          <RightColumn>
            <GlassCard as={motion.article} {...motionProps}>
              <CardIcon><UsersRound size={21} /></CardIcon>
              <CardTitle>Domaines & réseau</CardTitle>
              <CardText>
                Réseau de filiales et partenaires pour maximiser les synergies :
                édition & contenus (Innov’Éditions), CORTEX (formation, R&D,
                conseil), et collaborations académiques & technologiques.
              </CardText>
            </GlassCard>

            <Portraits>
              {[
                { img: imagess?.Responsablecommercialegroupe3, name: "Resp Commerciale" },
                { img: imagess?.DirecteurInstitutCortex2, name: "Direction CORTEX" },
                { img: imagess?.DirecteurduGroupe4, name: "Direction Cortex Holding" },
              ].map((person, index) => (
                <Portrait
                  key={`${person.name}-${index}`}
                  as={motion.figure}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : index * 0.05 }}
                >
                  <img src={cld(person.img, 800)} alt={person.name} loading="lazy" decoding="async" />
                  <figcaption>{person.name}</figcaption>
                </Portrait>
              ))}
            </Portraits>
          </RightColumn>
        </NoniGrid>
      </Section>

      <Section id="dynamique" aria-labelledby="dynamique-title">
        <SectionHeading as={motion.div} {...motionProps}>
          <SectionKicker><Sparkles size={15} /> TRAJECTOIRE</SectionKicker>
          <H2 id="dynamique-title">Étapes & dynamiques</H2>
        </SectionHeading>

        <Timeline>
          {[
            [
              "Plan stratégique 2024-2029",
              "Croissance rentable, innovation commerciale, structuration inclusive et ambitieuse.",
            ],
            [
              "Partenariats académiques internationaux",
              "CCL (MA), ASC Annecy (FR), Master Learn (UK) : masters & DBA en ligne, double diplomation.",
            ],
            [
              "Réseau & synergies filiales/partenaires",
              "Alliance de compétences pour des solutions complètes, innovantes et durables.",
            ],
          ].map(([title, text], index) => (
            <TimelineItem
              key={title}
              as={motion.article}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : index * 0.05 }}
            >
              <TimelineIndex>0{index + 1}</TimelineIndex>
              <div>
                <b>{title}</b>
                <p>{text}</p>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section id="equipe" aria-labelledby="equipe-title">
        <SectionHeading as={motion.div} {...motionProps}>
          <SectionKicker><UsersRound size={15} /> ÉQUIPE</SectionKicker>
          <H2 id="equipe-title">Les personnes derrière CORTEX</H2>
          <Lead>
            Une équipe réunissant direction académique, gestion, finances et
            développement.
          </Lead>
        </SectionHeading>

        <TeamGrid>
          {team.map((member, index) => (
            <TeamCard
              key={`${member.name}-${index}`}
              as={motion.article}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : index * 0.05 }}
            >
              <TeamImageWrap>
                <TeamImage src={cld(member.img, 1000)} alt={member.name} loading="lazy" decoding="async" />
                <TeamShade />
              </TeamImageWrap>
              <TeamBody>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <TeamBio>{member.bio}</TeamBio>
                <TeamMeta>
                  <span><Briefcase size={14} /> Expérience</span>
                  <span><Star size={14} /> Expertise</span>
                </TeamMeta>
              </TeamBody>
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>
 
    </Page>
  );
}

export default memo(AboutPage);

const floatSoft = keyframes`
  0%, 100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(0,-8px,0); }
`;

const Page = styled.main`
  min-height: 100vh;
  overflow-x: clip;
  background:
    radial-gradient(920px 560px at 10% 0%, rgba(243,111,33,.07), transparent 64%),
    linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 50%, ${colors.bg1});
  color: ${colors.text};
`;

const Hero = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: min(820px, 92vh);
  display: grid;
  align-items: center;
  border-bottom: 1px solid ${colors.stroke};
  background:
    radial-gradient(900px 560px at 78% 12%, rgba(42,75,124,.22), transparent 64%),
    linear-gradient(118deg, rgba(13,29,74,.99), rgba(14,26,43,.99) 56%, rgba(17,35,59,.99));
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  z-index: -3;
  opacity: .22;
  background:
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, #000, transparent 94%);
`;

const HeroGlow = styled.div`
  position: absolute;
  z-index: -2;
  left: -160px;
  bottom: -210px;
  width: min(48vw, 620px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(243,111,33,.19), transparent 68%);
  filter: blur(14px);
  animation: ${floatSoft} 9s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const HeroInner = styled.div`
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(88px, 9vw, 126px) 0 clamp(70px, 8vw, 96px);
  display: grid;
  grid-template-columns: minmax(0,1.05fr) minmax(360px,.95fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  padding: clamp(20px, 3vw, 34px);
   border-radius: 32px 0 32px 0;
  background: linear-gradient(145deg, rgba(7,23,39,.86), rgba(13,29,74,.63));
  box-shadow: -10px 0px 0px 0px ${colors.accentGold};
  backdrop-filter: blur(18px);
`;

const Eyebrow = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 11px;
   border-radius: 9px 0 9px 0;
  background: rgba(243,111,33,.08);
  color: ${colors.accentGold3};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .13em;
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(40px, 6vw, 74px);
  line-height: .99;
  letter-spacing: -.052em;
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
  line-height: 1.72;
`;

 
 
const HeroPoster = styled.figure`
  margin: 0;
  overflow: hidden;
   border-radius: 32px 0 32px 0;
  background: rgba(7,23,39,.78);
   box-shadow:0px -10px 0px 0px ${colors.accentGold};

  `;

const PosterMedia = styled.div`
  position: relative;
  min-height: 360px;
  overflow: hidden;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  object-position: center top;
`;

const PosterShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 34%, rgba(7,23,39,.30) 62%, rgba(7,23,39,.90));
`;

const PosterSeal = styled.span`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(243,111,33,.38);
  border-radius: 17px 0 17px 0;
  background: rgba(7,23,39,.74);
  color: ${colors.accentGold};
  backdrop-filter: blur(12px);
  animation: ${floatSoft} 4.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const PosterBody = styled.div`
  padding: 18px 20px 22px;
`;

const PosterKicker = styled.div`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .14em;
`;

const PosterTitle = styled.h2`
  margin: 6px 0 0;
  color: ${colors.text};
  font-size: clamp(21px, 2.6vw, 30px);
`;

const PosterText = styled.p`
  margin: 9px 0 0;
  color: ${colors.muted};
  line-height: 1.65;
`;

const QuickNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 45;
   background: rgba(14,26,43,.86);
  backdrop-filter: blur(16px);
`;

const QuickNavInner = styled.div`
  width: min(1280px, calc(100% - 24px));
  margin: 0 auto;
  padding: 9px 0;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  a {
    flex: 0 0 auto;
    padding: 9px 12px;
    border: 1px solid ${colors.accentGold};
    border-radius: 12px 0 12px 0;
    color: ${colors.accentGold};
    font-size: 12px;
    font-weight: 800;
    transition: color .18s ease, border-color .18s ease, background .18s ease;
  }

  a:hover {
    color: ${colors.text};
    border-color: rgba(243,111,33,.38);
    background: rgba(243,111,33,.07);
  }
`;

const Section = styled.section`
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(64px, 8vw, 108px) 0;
  scroll-margin-top: 78px;
`;

const SectionHeading = styled.div`
  max-width: 860px;
  margin-bottom: 28px;
`;

const SectionKicker = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .15em;
`;

const H2 = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(30px, 4.5vw, 52px);
  line-height: 1.05;
  letter-spacing: -.035em;
`;

const Lead = styled.p`
  max-width: 820px;
  margin: 14px 0 0;
  color: ${colors.textSoft};
  font-size: clamp(15px, 1.7vw, 18px);
  line-height: 1.75;
`;

const TwoCols = styled.div`
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 18px;

  @media (max-width: 850px) { grid-template-columns: 1fr; }
`;

const GlassCard = styled.article`
  padding: clamp(20px, 3vw, 30px);
   border-radius: 26px 0 26px 0;
  background: linear-gradient(145deg, rgba(7,23,39,.84), rgba(13,29,74,.58));
  box-shadow: 0 24px 64px rgba(0,0,0,.20);
  backdrop-filter: blur(14px);
`;

const CardIcon = styled.span`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border: 1px solid rgba(243,111,33,.30);
  border-radius: 14px 0 14px 0;
  background: rgba(243,111,33,.09);
  color: ${colors.accentGold};
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(19px, 2vw, 24px);
`;

const CardText = styled.p`
  margin: 10px 0 0;
  color: ${colors.textSoft};
  line-height: 1.76;
`;

const CardNote = styled.p`
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid ${colors.stroke};
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.65;
`;

const Pillars = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 12px;
  margin-top: 18px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const Pillar = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 16px;
   border-radius: 18px 0 18px 0;
  background: rgba(255,255,255,.03);

  b {
    display: block;
    color: ${colors.text};
    font-size: 14px;
  }

  span:not(:first-child) {
    display: block;
    margin-top: 4px;
    color: ${colors.muted};
    font-size: 13px;
    line-height: 1.55;
  }
`;

const PillarIcon = styled.span`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px 0 12px 0;
  background: rgba(243,111,33,.09);
  color: ${colors.accentGold};
`;

const NoniGrid = styled.div`
  display: grid;
  grid-template-columns: 1.02fr .98fr;
  gap: 18px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const PrinciplesList = styled.ul`
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 9px;

  li {
    padding: 11px 12px;
    border-left: 2px solid ${colors.accentGold};
    background: rgba(255,255,255,.025);
  }

  strong {
    display: block;
    color: ${colors.text};
    font-size: 13px;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${colors.muted};
    font-size: 12px;
  }
`;

const RightColumn = styled.div`
  display: grid;
  gap: 14px;
`;

const Portraits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 10px;

  @media (max-width: 560px) { grid-template-columns: 1fr 1fr; }
`;

const Portrait = styled.figure`
  position: relative;
  min-height: 180px;
  margin: 0;
  overflow: hidden;
   border-radius: 18px 0 18px 0;
  background: ${colors.bg1};

  img {
    width: 100%;
    height: 100%;
    min-height: 180px;
    object-fit: cover;
    object-position: center top;
    transition: transform .38s ease;
  }

  &:hover img { transform: scale(1.04); }

  figcaption {
    position: absolute;
    inset: auto 0 0;
    padding: 28px 10px 10px;
    background: linear-gradient(180deg, transparent, rgba(7,23,39,.92));
    color: ${colors.text};
    font-size: 11px;
    font-weight: 800;
  }
`;

const Timeline = styled.div`
  display: grid;
  gap: 10px;
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  padding: 16px;
   border-radius: 18px 0 18px 0;
  background: rgba(255,255,255,.028);

  b { color: ${colors.text}; }
  p { margin: 5px 0 0; color: ${colors.muted}; line-height: 1.62; }
`;

const TimelineIndex = styled.span`
  color: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .08em;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 16px;

  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const TeamCard = styled.article`
  overflow: hidden;
  border: 1px solid ${colors.stroke};
  border-radius: 24px 0 24px 0;
  background: linear-gradient(145deg, rgba(7,23,39,.88), rgba(13,29,74,.54));
  box-shadow: 0 20px 52px rgba(0,0,0,.18);
  transition: transform .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(243,111,33,.34);
  }
`;

const TeamImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 4.3;
  overflow: hidden;
`;

const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const TeamShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 56%, rgba(7,23,39,.74));
`;

const TeamBody = styled.div`
  padding: 15px 15px 17px;
`;

const TeamName = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: 16px;
`;

const TeamRole = styled.div`
  margin-top: 4px;
  color: ${colors.accentGold3};
  font-size: 12px;
  font-weight: 800;
`;

const TeamBio = styled.p`
  margin: 10px 0 0;
  color: ${colors.muted};
  font-size: 13px;
  line-height: 1.6;
`;

const TeamMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 8px;
    border: 1px solid ${colors.stroke};
    border-radius: 9px 0 9px 0;
    color: ${colors.textSoft};
    font-size: 10px;
    font-weight: 800;
  }

  svg { color: ${colors.accentGold}; }
`;

 
  