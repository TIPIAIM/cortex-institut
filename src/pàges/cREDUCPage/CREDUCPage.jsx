// src/pages/CREDUCPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  HandCoins,
  Clock3,
  BriefcaseBusiness,
  Percent,
  FileText,
  BadgeCheck,
  ShieldCheck,
  Users,
  Laptop2,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Layers,
} from "lucide-react";

import colors from "../../Styles/colors";

/**
 * Remplace ce lien par le vrai formulaire externe.
 */
 const FORM_EXTERNAL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScczD649VSuYIpBeyTyoJX7MuTjnBww9ipxxm0dbTKd6XqQlQ/viewform?usp=sharing&ouid=113486891856049656183";
/* =========================
   ANIMATIONS (soft premium)
========================= */
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatSoft = keyframes`
  0% { transform: translate3d(0,0,0); opacity: .75; }
  50% { transform: translate3d(0,-10px,0); opacity: .95; }
  100% { transform: translate3d(0,0,0); opacity: .75; }
`;

const CREDUCPage = () => {
  const prefersReducedMotion = useReducedMotion();

  const col = (key, fallback) =>
    colors && colors[key] ? colors[key] : fallback;

  const [showTop, setShowTop] = useState(false);
  const topRef = useRef(null);

  const content = useMemo(
    () => ({
      title: "CRÉDUC",
      subtitle:
        "Microcrédit éducatif interne réservé aux apprenants de l’Institut Cortex, pour financer une formation même lorsque les moyens ne sont pas immédiats.",
      highlights: [
        { icon: <HandCoins size={18} />, label: "Crédit éducatif ciblé" },
        { icon: <Users size={18} />, label: "Réservé aux apprenants Cortex" },
        { icon: <Clock3 size={18} />, label: "Remboursement progressif" },
        { icon: <TrendingUp size={18} />, label: "Orienté emploi & insertion" },
      ],
      kpis: [
        {
          icon: <HandCoins size={18} />,
          label: "Montant",
          value: "500 000 → 1 000 000 GNF",
          helper: "Selon profil et besoin",
        },
        {
          icon: <Clock3 size={18} />,
          label: "Durée",
          value: "1 → 12 mois",
          helper: "Flexible",
        },
        {
          icon: <Percent size={18} />,
          label: "Taux Fixe",
          value: "10% / an",
          helper: "Taux fixe, sans frais cachés",
        },
      ],
      sections: [
        {
          id: "financement",
          icon: <GraduationCap size={18} />,
          title: "Ce que CRÉDUC finance",
          items: [
            "Frais de formation à l’Institut Cortex",
            "Inscriptions aux programmes certifiants Cortex",
            "Parcours professionnels proposés par l’Institut",
            "Matériel pédagogique (ordinateur, livres, outils)",
          ],
        },
        {
          id: "public",
          icon: <BriefcaseBusiness size={18} />,
          title: "Public principalement concerné",
          items: [
            "Étudiants",
            "Jeunes professionnels",
            "Entrepreneurs débutants",
          ],
        },
      ],
      accordions: [
        {
          id: "docs",
          icon: <FileText size={18} />,
          title: "Conditions d’octroi — Documents requis",
          items: [
            "Carte d’identité",
            "Formulaire de demande",
            "Certificat d’inscription Institut Cortex",
            "Preuve de revenu (même modeste)",
            "Engagement de remboursement",
          ],
        },
        {
          id: "criteres",
          icon: <BadgeCheck size={18} />,
          title: "Conditions d’octroi — Critères d’évaluation",
          items: [
            "Motivation",
            "Assiduité",
            "Capacité de remboursement",
            "Projet professionnel",
            "Comportement financier antérieur (si déjà client)",
          ],
        },
        {
          id: "garanties",
          icon: <ShieldCheck size={18} />,
          title: "Garanties non financières acceptées",
          items: [
            "Lettre d’engagement du formateur référent",
            "Tuteur (parent, ami, employeur)",
            "Gage moral (contrat étudiant)",
            "Aucune immobilisation de biens requise",
          ],
        },
      ],
      benefits: [
        {
          icon: <CheckCircle2 size={18} />,
          text: "Accès immédiat à la formation",
        },
        {
          icon: <CheckCircle2 size={18} />,
          text: "Se former même sans fonds disponibles",
        },
        { icon: <CheckCircle2 size={18} />, text: "Flexibilité de paiement" },
        {
          icon: <Laptop2 size={18} />,
          text: "Accès à un ordinateur et outils de travail",
        },
        {
          icon: <CheckCircle2 size={18} />,
          text: "Historique financier utile pour futurs crédits",
        },
      ],
      steps: [
        {
          icon: <ExternalLink size={18} />,
          title: "Ouvrir le lien",
          text: "Clique sur le bouton pour accéder au formulaire externe.",
        },
        {
          icon: <FileText size={18} />,
          title: "Remplir",
          text: "Complète le formulaire directement sur la page externe.",
        },
        {
          icon: <CheckCircle2 size={18} />,
          title: "Valider",
          text: "Soumets ensuite la demande depuis le formulaire en ligne.",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const pageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: "easeOut" },
      };

  return (
    <Wrap
      ref={topRef}
      $bg={col("bg", "#071727")}
      $accent={col("accent", "#F36F21")}
      $blue={col("brandBlue", col("bg1", "#1C3F6E"))}
    >
      <AmbientGlow
        aria-hidden="true"
        $a={col("accent", "#F36F21")}
        $b={col("brandBlue", "#2A4B7C")}
      />

      <Shell>
        <HeroGrid as={motion.section} {...pageMotion}>
          <HeroCard $border={col("stroke", "rgba(255,255,255,.14)")}>
            <HeroHeader>
              <TitleRow>
                <BrandMark
                  aria-hidden="true"
                  $accent={col("accent", "#F36F21")}
                  $navy={col("brandNavy", col("bg2", "#0E2D4F"))}
                />
                <div>
                  <Kicker>Institut Cortex</Kicker>
                  <H1>
                    <GradientText
                      $a={col("brandNavy", col("bg2", "#0E2D4F"))}
                      $b={col("brandBlue", col("accent", "#F36F21"))}
                      $reduce={prefersReducedMotion}
                    >
                      {content.title}
                    </GradientText>
                  </H1>
                </div>
              </TitleRow>

              <Subtitle>{content.subtitle}</Subtitle>

              <Pills role="list" aria-label="Points clés">
                {content.highlights.map((h, idx) => (
                  <Pill
                    key={idx}
                    role="listitem"
                    $border={col("stroke", "rgba(255,255,255,.14)")}
                  >
                    <PillIcon $accent={col("accent", "#F36F21")}>
                      {h.icon}
                    </PillIcon>
                    <span>{h.label}</span>
                  </Pill>
                ))}
              </Pills>
            </HeroHeader>

            <KpiGrid aria-label="Informations principales">
              {content.kpis.map((k, idx) => (
                <KpiCard
                  key={idx}
                  $card={col("bgducàbinet1", "rgba(255,255,255,.06)")}
                  $border={col("stroke", "rgba(255,255,255,.14)")}
                >
                  <KpiHead>
                    <KpiIcon $accent={col("accent", "#F36F21")}>
                      {k.icon}
                    </KpiIcon>
                    <KpiLabel>{k.label}</KpiLabel>
                  </KpiHead>
                  <KpiValue>{k.value}</KpiValue>
                  <KpiHelper>{k.helper}</KpiHelper>
                </KpiCard>
              ))}
            </KpiGrid>
          </HeroCard>

          <SideCard
            $border={col("stroke", "rgba(255,255,255,.14)")}
            $card={col("bg1", "rgba(255,255,255,.06)")}
          >
            <SideHead>
              <SideTitle>
                <Layers size={18} /> Accès rapide
              </SideTitle>
              <SideDesc>Va directement aux sections importantes.</SideDesc>
            </SideHead>

            <TOC aria-label="Aller à">
              <TOCLink href="#financement">
                <ArrowUpRight size={16} /> Financement
              </TOCLink>
              <TOCLink href="#public">
                <ArrowUpRight size={16} /> Public concerné
              </TOCLink>
              <TOCLink href="#conditions">
                <ArrowUpRight size={16} /> Conditions & garanties
              </TOCLink>
              <TOCLink href="#avantages">
                <ArrowUpRight size={16} /> Avantages
              </TOCLink>
              <TOCLink href="#formulaire">
                <ArrowUpRight size={16} /> Formulaire
              </TOCLink>
            </TOC>

            <Divider />

            <SideHead>
              <SideTitle>
                <ExternalLink size={18} /> Formulaire
              </SideTitle>
              <SideDesc>
                Accède directement au formulaire d’inscription en ligne.
              </SideDesc>
            </SideHead>

            <CTAGroup>
              <PrimaryBtn
                href={FORM_EXTERNAL_URL}
                target="_blank"
                rel="noreferrer"
                $a={col("brandNavy", col("bg2", "#0E2D4F"))}
                $b={col("brandBlue", col("bg1", "#1C3F6E"))}
                $accent={col("accent", "#F36F21")}
                $reduce={prefersReducedMotion}
              >
                <ExternalLink size={18} />
                Ouvrir le formulaire
              </PrimaryBtn>

              <InfoHint>
                Le formulaire d’inscription s’ouvre au click.
              </InfoHint>
            </CTAGroup>
          </SideCard>
        </HeroGrid>

        <Section id="financement">
          <SectionCard
            as={motion.article}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                })}
            $card={col("bg1", "rgba(255,255,255,.06)")}
            $border={col("stroke", "rgba(255,255,255,.14)")}
          >
            <SectionHead>
              <SectionIcon $accent={col("accent", "#F36F21")}>
                {content.sections[0].icon}
              </SectionIcon>
              <SectionTitle>{content.sections[0].title}</SectionTitle>
            </SectionHead>

            <List>
              {content.sections[0].items.map((it, i) => (
                <Li key={i}>
                  <Dot $accent={col("accent", "#F36F21")} aria-hidden="true" />
                  <span>{it}</span>
                </Li>
              ))}
            </List>
          </SectionCard>
        </Section>

        <Section id="public">
          <SectionCard
            as={motion.article}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                })}
            $card={col("bg1", "rgba(255,255,255,.06)")}
            $border={col("stroke", "rgba(255,255,255,.14)")}
          >
            <SectionHead>
              <SectionIcon $accent={col("accent", "#F36F21")}>
                {content.sections[1].icon}
              </SectionIcon>
              <SectionTitle>{content.sections[1].title}</SectionTitle>
            </SectionHead>

            <List>
              {content.sections[1].items.map((it, i) => (
                <Li key={i}>
                  <Dot $accent={col("accent", "#F36F21")} aria-hidden="true" />
                  <span>{it}</span>
                </Li>
              ))}
            </List>
          </SectionCard>
        </Section>

        <Section id="conditions">
          <BlockTitle>
            <ShieldCheck size={18} /> Conditions & garanties
          </BlockTitle>

          <AccordionWrap>
            {content.accordions.map((a) => (
              <Details
                key={a.id}
                $card={col("bg1", "rgba(255,255,255,.06)")}
                $border={col("stroke", "rgba(255,255,255,.14)")}
              >
                <Summary>
                  <SummaryLeft>
                    <SummaryIcon $accent={col("accent", "#F36F21")}>
                      {a.icon}
                    </SummaryIcon>
                    <span>{a.title}</span>
                  </SummaryLeft>
                  <Chevron aria-hidden="true">⌄</Chevron>
                </Summary>

                <DetailsBody>
                  <List>
                    {a.items.map((it, i) => (
                      <Li key={i}>
                        <Dot
                          $accent={col("accent", "#F36F21")}
                          aria-hidden="true"
                        />
                        <span>{it}</span>
                      </Li>
                    ))}
                  </List>
                </DetailsBody>
              </Details>
            ))}
          </AccordionWrap>
        </Section>

        <Section id="avantages">
          <BenefitsCard
            as={motion.section}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                })}
            $card={col("bg1", "rgba(255,255,255,.06)")}
            $border={col("stroke", "rgba(255,255,255,.14)")}
          >
            <BenefitsHead>
              <BenefitsTitle>Avantages pour l’étudiant</BenefitsTitle>
              <MiniNote>Simple, rapide, orienté réussite.</MiniNote>
            </BenefitsHead>

            <BenefitsGrid>
              {content.benefits.map((b, idx) => (
                <BenefitItem
                  key={idx}
                  $soft={col("bg2", "rgba(255,255,255,.05)")}
                >
                  <BenefitIcon $accent={col("accent", "#F36F21")}>
                    {b.icon}
                  </BenefitIcon>
                  <span>{b.text}</span>
                </BenefitItem>
              ))}
            </BenefitsGrid>
          </BenefitsCard>
        </Section>

        <Section id="formulaire">
          <DownloadCard
            as={motion.section}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.25 },
                })}
            $card={col("bg1", "rgba(255,255,255,.06)")}
            $border={col("stroke", "rgba(255,255,255,.14)")}
          >
            <DownloadLeft>
              <DownloadTitle>Formulaire d’inscription</DownloadTitle>
              <DownloadText>
                Clique sur le bouton pour ouvrir le formulaire , remplis
                les informations demandées, puis valide directement en ligne.
              </DownloadText>

              <Steps>
                {content.steps.map((s, i) => (
                  <Step key={i}>
                    <StepIcon $accent={col("accent", "#F36F21")}>
                      {s.icon}
                    </StepIcon>
                    <div>
                      <StepTitle>{s.title}</StepTitle>
                      <StepText>{s.text}</StepText>
                    </div>
                  </Step>
                ))}
              </Steps>
            </DownloadLeft>

            <DownloadRight>
              <PrimaryBtn
                href={FORM_EXTERNAL_URL}
                target="_blank"
                rel="noreferrer"
                $a={col("brandNavy", col("bg2", "#0E2D4F"))}
                $b={col("brandBlue", col("bg1", "#1C3F6E"))}
                $accent={col("accent", "#F36F21")}
                $reduce={prefersReducedMotion}
              >
                <ExternalLink size={18} />
                Ouvrir le formulaire
              </PrimaryBtn>

              <InfoHint>
                Le formulaire sera rempli et validé sur une page.
              </InfoHint>
            </DownloadRight>
          </DownloadCard>
        </Section>

        <FooterNote
          aria-label="Note"
          $border={col("stroke", "rgba(255,255,255,.12)")}
          $soft={col("bg2", "rgba(255,255,255,.05)")}
        >
          <FooterBadge $accent={col("accent", "#F36F21")}>CRÉDUC</FooterBadge>
          <span>
            “Tu veux apprendre ? Nous finançons ta formation… chez Cortex.”
          </span>
        </FooterNote>
      </Shell>

      {/* Sticky CTA mobile */}
      <MobileDock
        aria-label="Actions rapides"
        $border={col("stroke", "rgba(255,255,255,.14)")}
        $card={col("bg1", "rgba(7, 23, 39, .72)")}
      >
        <DockInner>
          <DockLeft>
            <DockTitle>Formulaire CRÉDUC</DockTitle>
            <DockMeta>Accès direct au formulaire externe</DockMeta>
          </DockLeft>

          <DockRight>
            <DockBtn
              href={FORM_EXTERNAL_URL}
              target="_blank"
              rel="noreferrer"
              $a={col("brandNavy", col("bg2", "#0E2D4F"))}
              $b={col("brandBlue", col("bg1", "#1C3F6E"))}
              $accent={col("accent", "#F36F21")}
              $reduce={prefersReducedMotion}
            >
              <ExternalLink size={18} />
              Ouvrir
            </DockBtn>
          </DockRight>
        </DockInner>
      </MobileDock>

      {/* Back-to-top */}
      <TopBtn
        as={motion.button}
        type="button"
        onClick={scrollToTop}
        aria-label="Revenir en haut"
        $accent={col("accent", "#F36F21")}
        $show={showTop}
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: showTop ? 1 : 0, y: showTop ? 0 : 10 },
              transition: { duration: 0.2 },
            })}
      >
        <ArrowUpRight size={18} />
      </TopBtn>
    </Wrap>
  );
};

export default CREDUCPage;

/* =========================
   STYLES
========================= */

const glass = css`
  background: linear-gradient(
    180deg,
    rgba(235, 221, 221, 0.01),
    rgba(255, 255, 255, 0.06)
  );
  backdrop-filter: blur(14px);
`;

const Wrap = styled.div`
  min-height: 100vh;
  background: radial-gradient(
      980px 520px at 18% 8%,
      rgba(4, 1, 24, 0.81),
      transparent 55%
    ),
    radial-gradient(900px 520px at 84% 18%, rgb(11, 0, 51), transparent 55%),
    linear-gradient(180deg, ${(p) => p.$bg} 0%, #06121e 100%);
  color: rgba(255, 255, 255, 0.92);
  overflow-x: hidden;
  position: relative;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: -90px -90px auto -90px;
  height: 280px;
  filter: blur(44px);
  opacity: 0.16;
  animation: ${floatSoft} 7s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Shell = styled.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 26px 16px 120px;

  @media (min-width: 900px) {
    padding: 34px 20px 120px;
  }
`;

const HeroGrid = styled(motion.div)`
  display: grid;
  gap: 12px;

  @media (min-width: 980px) {
    grid-template-columns: 1.65fr 0.95fr;
    align-items: start;
  }
`;

const HeroCard = styled.div`
  ${glass};
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.35);
  padding: 18px;

  @media (min-width: 900px) {
    padding: 22px;
  }
`;

const HeroHeader = styled.div`
  display: grid;
  gap: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandMark = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px 0 12px 0;
  background: linear-gradient(
    135deg,
    ${(p) => p.$navy}20 50%,
    ${(p) => p.$accent}20 50%
  );
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;

const Kicker = styled.div`
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.85;
`;

const H1 = styled.h1`
  margin: 2px 0 0;
  font-size: 28px;
  line-height: 1.05;

  @media (min-width: 900px) {
    font-size: 34px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    90deg,
    ${(p) => p.$a},
    ${(p) => p.$b},
    ${(p) => p.$a}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${(p) =>
    p.$reduce
      ? "none"
      : css`
          ${gradientShift} 7s ease-in-out infinite
        `};
`;

const Subtitle = styled.p`
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 78ch;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  border: 1px solid ${(p) => p.$border};
  background: rgba(0, 0, 0, 0.14);
  padding: 9px 12px;
  font-size: 13px;
`;

const PillIcon = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(243, 111, 33, 0.12);
  color: ${(p) => p.$accent};
`;

const KpiGrid = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const KpiCard = styled.div`
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  padding: 12px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const KpiHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const KpiIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(243, 111, 33, 0.12);
  color: ${(p) => p.$accent};
  display: grid;
  place-items: center;
`;

const KpiLabel = styled.div`
  font-size: 13px;
  opacity: 0.85;
`;

const KpiValue = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const KpiHelper = styled.div`
  margin-top: 4px;
  font-size: 13px;
  opacity: 0.78;
`;

const SideCard = styled.aside`
  ${glass};
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.28);
  padding: 14px;
  position: relative;

  @media (min-width: 980px) {
    position: sticky;
    top: 16px;
  }
`;

const SideHead = styled.div`
  display: grid;
  gap: 4px;
`;

const SideTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  font-size: 14px;
`;

const SideDesc = styled.div`
  font-size: 13px;
  opacity: 0.82;
  line-height: 1.45;
`;

const TOC = styled.nav`
  margin-top: 10px;
  display: grid;
  gap: 8px;
`;

const TOCLink = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.92);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.14);
  transition: transform 140ms ease, box-shadow 140ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid rgba(243, 111, 33, 0.7);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Divider = styled.div`
  margin: 12px 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
`;

const CTAGroup = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 10px;
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 12px 0 12px 0;
  padding: 12px 14px;
  font-weight: 900;
  font-size: 14px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: linear-gradient(90deg, ${(p) => p.$a}, ${(p) => p.$b});
  background-size: 200% 200%;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  transition: transform 160ms ease, box-shadow 160ms ease;
  animation: ${(p) =>
    p.$reduce
      ? "none"
      : css`
          ${gradientShift} 7s ease-in-out infinite
        `};

  &:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);
  }

  &:active {
    transform: translateY(0) scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.$accent};
    outline-offset: 2px;
  }
`;

const InfoHint = styled.div`
  font-size: 12px;
  opacity: 0.78;
  line-height: 1.45;
`;

const Section = styled.section`
  margin-top: 14px;
  scroll-margin-top: 90px;
`;

const SectionCard = styled.article`
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  ${glass};
  padding: 14px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.25);
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(243, 111, 33, 0.14);
  color: ${(p) => p.$accent};
  display: grid;
  place-items: center;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 15px;
  line-height: 1.2;
`;

const BlockTitle = styled.h2`
  margin: 18px 0 10px;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const List = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
`;

const Li = styled.li`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.55;
  opacity: 0.92;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  margin-top: 7px;
  border-radius: 999px;
  background: ${(p) => p.$accent};
  box-shadow: 0 0 0 4px rgba(243, 111, 33, 0.14);
  flex: 0 0 auto;
`;

const AccordionWrap = styled.div`
  display: grid;
  gap: 10px;
`;

const Details = styled.details`
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  ${glass};
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &[open] summary > span:last-child {
    transform: rotate(180deg);
  }
`;

const Summary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(243, 111, 33, 0.7);
    outline-offset: 2px;
  }
`;

const SummaryLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.25;
  font-weight: 800;
`;

const SummaryIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(243, 111, 33, 0.14);
  color: ${(p) => p.$accent};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

const Chevron = styled.span`
  font-size: 16px;
  opacity: 0.85;
  transition: transform 200ms ease;
`;

const DetailsBody = styled.div`
  padding: 0 14px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BenefitsCard = styled.section`
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  ${glass};
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.25);
  padding: 14px;
`;

const BenefitsHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const BenefitsTitle = styled.h2`
  margin: 0;
  font-size: 15px;
`;

const MiniNote = styled.div`
  font-size: 13px;
  opacity: 0.85;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.12);
`;

const BenefitsGrid = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-radius: 12px 0 12px 0;
  padding: 12px;
  background: ${(p) => p.$soft};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const BenefitIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(243, 111, 33, 0.14);
  color: ${(p) => p.$accent};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

const DownloadCard = styled.section`
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  ${glass};
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.25);
  padding: 14px;
  display: grid;
  gap: 12px;

  @media (min-width: 900px) {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: start;
  }
`;

const DownloadLeft = styled.div``;

const DownloadTitle = styled.h2`
  margin: 0;
  font-size: 15px;
`;

const DownloadText = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.88;
`;

const Steps = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.12);
  border-radius: 12px 0 12px 0;
  padding: 12px;
`;

const StepIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px 0 12px 0;
  background: rgba(243, 111, 33, 0.14);
  color: ${(p) => p.$accent};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

const StepTitle = styled.div`
  font-weight: 900;
  font-size: 13px;
`;

const StepText = styled.div`
  margin-top: 2px;
  font-size: 13px;
  opacity: 0.85;
  line-height: 1.45;
`;

const DownloadRight = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 900px) {
    align-content: start;
    justify-items: end;
    text-align: right;
  }
`;

const FooterNote = styled.div`
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$soft};
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  opacity: 0.92;
`;

const FooterBadge = styled.span`
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(243, 111, 33, 0.14);
  color: ${(p) => p.$accent};
`;

/* ===== Mobile Dock CTA ===== */
const MobileDock = styled.div`
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 50;
  border-radius: 12px 0 12px 0;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$card};
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.45);

  @media (min-width: 980px) {
    display: none;
  }
`;

const DockInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
`;

const DockLeft = styled.div`
  display: grid;
  gap: 2px;
`;

const DockTitle = styled.div`
  font-weight: 900;
  font-size: 13px;
`;

const DockMeta = styled.div`
  font-size: 12px;
  opacity: 0.78;
`;

const DockRight = styled.div``;

const DockBtn = styled(PrimaryBtn)`
  padding: 11px 12px;
  font-size: 13px;
  border-radius: 12px 0 12px 0;
`;

/* ===== Back to top ===== */
const TopBtn = styled.button`
  position: fixed;
  right: 14px;
  bottom: 92px;
  z-index: 55;
  width: 44px;
  height: 44px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.92);
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);

  opacity: ${(p) => (p.$show ? 1 : 0)};
  pointer-events: ${(p) => (p.$show ? "auto" : "none")};

  &:focus-visible {
    outline: 2px solid ${(p) => p.$accent};
    outline-offset: 2px;
  }

  @media (min-width: 980px) {
    bottom: 16px;
  }
`;