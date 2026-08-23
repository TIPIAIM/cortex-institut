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
  Sparkles,
} from "lucide-react";

import colors from "../../Styles/colors";

/* =========================================================
   CONFIGURATION
========================================================= */

const FORM_EXTERNAL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScczD649VSuYIpBeyTyoJX7MuTjnBww9ipxxm0dbTKd6XqQlQ/viewform?usp=sharing&ouid=113486891856049656183";

/* =========================================================
   ANIMATIONS
========================================================= */

const gradientShift = keyframes`
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

const floatSoft = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.5;
  }

  50% {
    transform: translate3d(0, -8px, 0);
    opacity: 0.8;
  }
`;

const pulseSoft = keyframes`
  0%,
  100% {
    transform: scale(1);
    opacity: 0.2;
  }

  50% {
    transform: scale(1.06);
    opacity: 0.35;
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

const CREDUCPage = () => {
  const prefersReducedMotion = useReducedMotion();

  const col = (key, fallback) =>
    colors && colors[key] ? colors[key] : fallback;

  const [showTop, setShowTop] = useState(false);
  const topRef = useRef(null);

  /* -------------------------------------------------------
     DONNÉES
  ------------------------------------------------------- */

  const content = useMemo(
    () => ({
      title: "TÔNÔN",

      subtitle:
        "Microcrédit éducatif interne réservé aux apprenants de l’Institut Cortex, pour financer une formation même lorsque les moyens ne sont pas immédiats.",

      highlights: [
        {
          icon: <HandCoins size={18} />,
          label: "Crédit éducatif ciblé",
        },
        {
          icon: <Users size={18} />,
          label: "Réservé aux apprenants Cortex",
        },
        {
          icon: <Clock3 size={18} />,
          label: "Remboursement progressif",
        },
        {
          icon: <TrendingUp size={18} />,
          label: "Orienté emploi & insertion",
        },
      ],

      kpis: [
        {
          icon: <HandCoins size={18} />,
          label: "Montant",
          value: "500 000 → 10 000 000 GNF",
          helper: "Selon profil et besoin",
        },
        {
          icon: <Clock3 size={18} />,
          label: "Durée",
          value: "1 → 6 mois",
          helper: "Flexible",
        },
        {
          icon: <Percent size={18} />,
          label: "Taux fixe",
          value: "10%",
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
        {
          icon: <CheckCircle2 size={18} />,
          text: "Flexibilité de paiement",
        },
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

  /* -------------------------------------------------------
     SCROLL
  ------------------------------------------------------- */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setShowTop(window.scrollY > 520);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  /* -------------------------------------------------------
     MOTION
  ------------------------------------------------------- */

  const pageMotion = prefersReducedMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 12,
        },
        animate: {
          opacity: 1,
          y: 0,
        },
        transition: {
          duration: 0.45,
          ease: "easeOut",
        },
      };

  const revealMotion = prefersReducedMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 12,
        },
        whileInView: {
          opacity: 1,
          y: 0,
        },
        viewport: {
          once: true,
          amount: 0.18,
        },
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      };

  /* =======================================================
     RENDER
  ======================================================= */

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

      <AmbientOrb
        aria-hidden="true"
        $accent={col("accent", "#F36F21")}
      />

      <Shell>
        {/* =================================================
            HERO
        ================================================= */}

        <HeroGrid as={motion.section} {...pageMotion}>
          <HeroCard
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
          >
            <HeroHeader>
              <TitleRow>
                <LogoBox
                  $navy={col(
                    "brandNavy",
                    col("bg2", "#0E2D4F")
                  )}
                  $accent={col(
                    "accent",
                    "#F36F21"
                  )}
                >
                  <BrandLogo
                    src="/img/tonon.jpeg"
                    alt="Logo TÔNÔN"
                    loading="eager"
                    decoding="async"
                  />
                </LogoBox>

                <TitleContent>
                  <Eyebrow>
                    <Sparkles size={13} />
                    Institut Cortex
                  </Eyebrow>

                  <H1>
                    <GradientText
                      $a={col(
                        "brandNavy",
                        col("bg2", "#0E2D4F")
                      )}
                      $b={col(
                        "brandBlue",
                        col("accent", "#F36F21")
                      )}
                      $reduce={prefersReducedMotion}
                    >
                      {content.title}
                    </GradientText>
                  </H1>
                </TitleContent>
              </TitleRow>

              <Subtitle>
                {content.subtitle}
              </Subtitle>

              <Pills
                role="list"
                aria-label="Points clés"
              >
                {content.highlights.map((h) => (
                  <Pill
                    key={h.label}
                    role="listitem"
                    $border={col(
                      "stroke",
                      "rgba(255,255,255,.14)"
                    )}
                  >
                    <PillIcon
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    >
                      {h.icon}
                    </PillIcon>

                    <span>{h.label}</span>
                  </Pill>
                ))}
              </Pills>
            </HeroHeader>

            <KpiGrid aria-label="Informations principales">
              {content.kpis.map((k) => (
                <KpiCard
                  key={k.label}
                  $card={col(
                    "bgducàbinet1",
                    "rgba(255,255,255,.06)"
                  )}
                  $border={col(
                    "stroke",
                    "rgba(255,255,255,.14)"
                  )}
                >
                  <KpiHead>
                    <KpiIcon
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    >
                      {k.icon}
                    </KpiIcon>

                    <KpiLabel>
                      {k.label}
                    </KpiLabel>
                  </KpiHead>

                  <KpiValue>
                    {k.value}
                  </KpiValue>

                  <KpiHelper>
                    {k.helper}
                  </KpiHelper>
                </KpiCard>
              ))}
            </KpiGrid>
          </HeroCard>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <SideCard
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
            $card={col(
              "bg1",
              "rgba(255,255,255,.06)"
            )}
          >
            <SideHead>
              <SideTitle>
                <Layers size={18} />
                Accès rapide
              </SideTitle>

              <SideDesc>
                Va directement aux sections importantes.
              </SideDesc>
            </SideHead>

            <TOC aria-label="Navigation rapide">
              <TOCLink href="#financement">
                <ArrowUpRight size={16} />
                Financement
              </TOCLink>

              <TOCLink href="#public">
                <ArrowUpRight size={16} />
                Public concerné
              </TOCLink>

              <TOCLink href="#conditions">
                <ArrowUpRight size={16} />
                Conditions & garanties
              </TOCLink>

              <TOCLink href="#avantages">
                <ArrowUpRight size={16} />
                Avantages
              </TOCLink>

              <TOCLink href="#formulaire">
                <ArrowUpRight size={16} />
                Formulaire
              </TOCLink>
            </TOC>

            <Divider />

            <SideHead>
              <SideTitle>
                <ExternalLink size={18} />
                Formulaire
              </SideTitle>

              <SideDesc>
                Accède directement au formulaire de
                demande de crédit en ligne.
              </SideDesc>
            </SideHead>

            <CTAGroup>
              <PrimaryBtn
                href={FORM_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                $a={col(
                  "brandNavy",
                  col("bg2", "#0E2D4F")
                )}
                $b={col(
                  "brandBlue",
                  col("bg1", "#1C3F6E")
                )}
                $accent={col(
                  "accent",
                  "#F36F21"
                )}
                $reduce={prefersReducedMotion}
              >
                <ExternalLink size={18} />
                Ouvrir le formulaire
                <ArrowUpRight size={16} />
              </PrimaryBtn>

              <InfoHint>
                Le formulaire s’ouvre dans un nouvel
                onglet.
              </InfoHint>
            </CTAGroup>
          </SideCard>
        </HeroGrid>

        {/* =================================================
            FINANCEMENT
        ================================================= */}

        <Section id="financement">
          <SectionCard
            as={motion.article}
            {...revealMotion}
            $card={col(
              "bg1",
              "rgba(255,255,255,.06)"
            )}
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
          >
            <SectionHead>
              <SectionIcon
                $accent={col(
                  "accent",
                  "#F36F21"
                )}
              >
                {content.sections[0].icon}
              </SectionIcon>

              <SectionTitle>
                {content.sections[0].title}
              </SectionTitle>
            </SectionHead>

            <List>
              {content.sections[0].items.map(
                (item) => (
                  <Li key={item}>
                    <Dot
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    />

                    <span>{item}</span>
                  </Li>
                )
              )}
            </List>
          </SectionCard>
        </Section>

        {/* =================================================
            PUBLIC
        ================================================= */}

        <Section id="public">
          <SectionCard
            as={motion.article}
            {...revealMotion}
            $card={col(
              "bg1",
              "rgba(255,255,255,.06)"
            )}
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
          >
            <SectionHead>
              <SectionIcon
                $accent={col(
                  "accent",
                  "#F36F21"
                )}
              >
                {content.sections[1].icon}
              </SectionIcon>

              <SectionTitle>
                {content.sections[1].title}
              </SectionTitle>
            </SectionHead>

            <List>
              {content.sections[1].items.map(
                (item) => (
                  <Li key={item}>
                    <Dot
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    />

                    <span>{item}</span>
                  </Li>
                )
              )}
            </List>
          </SectionCard>
        </Section>

        {/* =================================================
            CONDITIONS
        ================================================= */}

        <Section id="conditions">
          <BlockTitle>
            <ShieldCheck size={18} />
            Conditions & garanties
          </BlockTitle>

          <AccordionWrap>
            {content.accordions.map((accordion) => (
              <Details
                key={accordion.id}
                $card={col(
                  "bg1",
                  "rgba(255,255,255,.06)"
                )}
                $border={col(
                  "stroke",
                  "rgba(255,255,255,.14)"
                )}
              >
                <Summary>
                  <SummaryLeft>
                    <SummaryIcon
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    >
                      {accordion.icon}
                    </SummaryIcon>

                    <span>
                      {accordion.title}
                    </span>
                  </SummaryLeft>

                  <Chevron aria-hidden="true">
                    ⌄
                  </Chevron>
                </Summary>

                <DetailsBody>
                  <List>
                    {accordion.items.map(
                      (item) => (
                        <Li key={item}>
                          <Dot
                            $accent={col(
                              "accent",
                              "#F36F21"
                            )}
                          />

                          <span>{item}</span>
                        </Li>
                      )
                    )}
                  </List>
                </DetailsBody>
              </Details>
            ))}
          </AccordionWrap>
        </Section>

        {/* =================================================
            AVANTAGES
        ================================================= */}

        <Section id="avantages">
          <BenefitsCard
            as={motion.section}
            {...revealMotion}
            $card={col(
              "bg1",
              "rgba(255,255,255,.06)"
            )}
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
          >
            <BenefitsHead>
              <div>
                <BenefitsKicker>
                  <CheckCircle2 size={14} />
                  Pourquoi TÔNÔN ?
                </BenefitsKicker>

                <BenefitsTitle>
                  Avantages pour l’étudiant
                </BenefitsTitle>
              </div>

              <MiniNote>
                Simple, rapide, orienté réussite.
              </MiniNote>
            </BenefitsHead>

            <BenefitsGrid>
              {content.benefits.map(
                (benefit) => (
                  <BenefitItem
                    key={benefit.text}
                    $soft={col(
                      "bg2",
                      "rgba(255,255,255,.05)"
                    )}
                  >
                    <BenefitIcon
                      $accent={col(
                        "accent",
                        "#F36F21"
                      )}
                    >
                      {benefit.icon}
                    </BenefitIcon>

                    <span>
                      {benefit.text}
                    </span>
                  </BenefitItem>
                )
              )}
            </BenefitsGrid>
          </BenefitsCard>
        </Section>

        {/* =================================================
            FORMULAIRE
        ================================================= */}

        <Section id="formulaire">
          <DownloadCard
            as={motion.section}
            {...revealMotion}
            $card={col(
              "bg1",
              "rgba(255,255,255,.06)"
            )}
            $border={col(
              "stroke",
              "rgba(255,255,255,.14)"
            )}
          >
            <DownloadLeft>
              <DownloadKicker>
                <ExternalLink size={14} />
                DEMANDE EN LIGNE
              </DownloadKicker>

              <DownloadTitle>
                Formulaire de demande de crédit
              </DownloadTitle>

              <DownloadText>
                Clique sur le bouton pour ouvrir le
                formulaire externe, remplis les
                informations demandées, puis valide
                directement en ligne.
              </DownloadText>

              <Steps>
                {content.steps.map(
                  (step, index) => (
                    <Step key={step.title}>
                      <StepNumber>
                        0{index + 1}
                      </StepNumber>

                      <StepIcon
                        $accent={col(
                          "accent",
                          "#F36F21"
                        )}
                      >
                        {step.icon}
                      </StepIcon>

                      <div>
                        <StepTitle>
                          {step.title}
                        </StepTitle>

                        <StepText>
                          {step.text}
                        </StepText>
                      </div>
                    </Step>
                  )
                )}
              </Steps>
            </DownloadLeft>

            <DownloadRight>
              <FormVisual>
                <FormVisualIcon>
                  <FileText size={30} />
                </FormVisualIcon>

                <FormVisualTitle>
                  Votre demande
                </FormVisualTitle>

                <FormVisualText>
                  Remplissez le formulaire
                  directement en ligne.
                </FormVisualText>
              </FormVisual>

              <PrimaryBtn
                href={FORM_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                $a={col(
                  "brandNavy",
                  col("bg2", "#0E2D4F")
                )}
                $b={col(
                  "brandBlue",
                  col("bg1", "#1C3F6E")
                )}
                $accent={col(
                  "accent",
                  "#F36F21"
                )}
                $reduce={prefersReducedMotion}
              >
                <ExternalLink size={18} />
                Ouvrir le formulaire
                <ArrowUpRight size={16} />
              </PrimaryBtn>

              <InfoHint>
                Vous serez redirigé vers le formulaire
                externe dans un nouvel onglet.
              </InfoHint>
            </DownloadRight>
          </DownloadCard>
        </Section>

        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <FooterNote
          aria-label="Note TÔNÔN"
          $border={col(
            "stroke",
            "rgba(255,255,255,.12)"
          )}
          $soft={col(
            "bg2",
            "rgba(255,255,255,.05)"
          )}
        >
          <FooterBadge
            $accent={col(
              "accent",
              "#F36F21"
            )}
          >
            TÔNÔN
          </FooterBadge>

          <span>
            “Tu veux apprendre ? Nous finançons ta
            formation… chez Cortex.”
          </span>
        </FooterNote>
      </Shell>

      {/* ===================================================
          MOBILE CTA
      =================================================== */}

      <MobileDock
        aria-label="Actions rapides"
        $border={col(
          "stroke",
          "rgba(255,255,255,.14)"
        )}
        $card={col(
          "bg1",
          "rgba(7, 23, 39, .78)"
        )}
      >
        <DockInner>
          <DockLeft>
            <DockTitle>
              Formulaire TÔNÔN
            </DockTitle>

            <DockMeta>
              Accès direct au formulaire externe
            </DockMeta>
          </DockLeft>

          <DockRight>
            <DockBtn
              href={FORM_EXTERNAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              $a={col(
                "brandNavy",
                col("bg2", "#0E2D4F")
              )}
              $b={col(
                "brandBlue",
                col("bg1", "#1C3F6E")
              )}
              $accent={col(
                "accent",
                "#F36F21"
              )}
              $reduce={prefersReducedMotion}
            >
              <ExternalLink size={18} />
              Ouvrir
            </DockBtn>
          </DockRight>
        </DockInner>
      </MobileDock>

      {/* ===================================================
          BACK TO TOP
      =================================================== */}

      <TopBtn
        as={motion.button}
        type="button"
        onClick={scrollToTop}
        aria-label="Revenir en haut"
        $accent={col(
          "accent",
          "#F36F21"
        )}
        $show={showTop}
        {...(prefersReducedMotion
          ? {}
          : {
              initial: {
                opacity: 0,
                y: 10,
              },
              animate: {
                opacity: showTop ? 1 : 0,
                y: showTop ? 0 : 10,
              },
              transition: {
                duration: 0.2,
              },
            })}
      >
        <ArrowUpRight size={18} />
      </TopBtn>
    </Wrap>
  );
};

export default CREDUCPage;

/* =========================================================
   SHARED VISUAL SYSTEM
========================================================= */

const glass = css`
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.065),
      rgba(255, 255, 255, 0.025)
    );

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const Wrap = styled.div`
  min-height: 100vh;

  position: relative;

  overflow-x: clip;

  background:
    radial-gradient(
      850px 480px at 12% 4%,
      rgba(243, 111, 33, 0.09),
      transparent 55%
    ),
    radial-gradient(
      900px 500px at 88% 16%,
      rgba(28, 63, 110, 0.16),
      transparent 58%
    ),
    linear-gradient(
      180deg,
      ${(p) => p.$bg} 0%,
      #06121e 100%
    );

  color: rgba(255, 255, 255, 0.92);

  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const AmbientGlow = styled.div`
  position: absolute;

  top: -120px;
  left: -120px;

  width: 460px;
  height: 300px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    ${(p) => p.$a}33,
    ${(p) => p.$b}10,
    transparent 70%
  );

  filter: blur(30px);

  pointer-events: none;

  animation: ${floatSoft} 8s ease-in-out infinite;

  @media (max-width: 700px) {
    width: 300px;
    height: 220px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AmbientOrb = styled.div`
  position: absolute;

  right: -150px;
  top: 25%;

  width: 330px;
  height: 330px;

  border-radius: 50%;

  border: 1px solid
    ${(p) => p.$accent}18;

  box-shadow:
    inset 0 0 60px
      ${(p) => p.$accent}08;

  pointer-events: none;

  animation: ${pulseSoft} 9s ease-in-out infinite;

  @media (max-width: 700px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Shell = styled.div`
  position: relative;

  z-index: 2;

  width: min(1160px, 100%);

  margin: 0 auto;

  padding:
    28px
    clamp(14px, 3vw, 24px)
    120px;

  @media (min-width: 900px) {
    padding-top: 38px;
  }
`;

/* =========================================================
   HERO
========================================================= */

const HeroGrid = styled(motion.div)`
  display: grid;

  gap: 14px;

  @media (min-width: 980px) {
    grid-template-columns:
      minmax(0, 1.6fr)
      minmax(300px, 0.82fr);

    align-items: start;
  }
`;

const HeroCard = styled.div`
  ${glass};

  border-radius: 26px 0 26px 0;

  border: 1px solid ${(p) => p.$border};

  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.34);

  padding: clamp(18px, 3vw, 26px);

  contain: layout paint;
`;

const HeroHeader = styled.div`
  display: grid;

  gap: 12px;
`;

const TitleRow = styled.div`
  display: flex;

  align-items: center;

  gap: 14px;
`;

const TitleContent = styled.div`
  min-width: 0;
`;

const LogoBox = styled.div`
  width: 62px;
  height: 62px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  overflow: hidden;

  padding: 5px;

  border-radius: 18px 0 18px 0;

  background:
    linear-gradient(
      135deg,
      ${(p) => p.$navy}24,
      ${(p) => p.$accent}1c
    );

  border: 1px solid
    rgba(255, 255, 255, 0.14);

  box-shadow:
    0 15px 36px rgba(0, 0, 0, 0.28);

  @media (max-width: 560px) {
    width: 54px;
    height: 54px;
  }
`;

const BrandLogo = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const Eyebrow = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 5px;

  margin-bottom: 3px;

  color: rgba(255, 255, 255, 0.58);

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.13em;

  text-transform: uppercase;

  svg {
    color: #f36f21;
  }
`;

const H1 = styled.h1`
  margin: 0;

  font-size: clamp(2rem, 5vw, 3.2rem);

  line-height: 0.98;

  letter-spacing: -0.045em;

  font-weight: 950;
`;

const GradientText = styled.span`
  display: inline-block;

  background:
    linear-gradient(
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
          ${gradientShift} 8s ease-in-out infinite
        `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Subtitle = styled.p`
  max-width: 76ch;

  margin: 0;

  color: rgba(255, 255, 255, 0.72);

  font-size: 14px;

  line-height: 1.72;
`;

const Pills = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 8px;

  margin-top: 3px;
`;

const Pill = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 8px;

  min-height: 38px;

  padding: 6px 10px;

  border-radius: 999px;

  border: 1px solid ${(p) => p.$border};

  background: rgba(0, 0, 0, 0.13);

  color: rgba(255, 255, 255, 0.82);

  font-size: 12px;

  line-height: 1.3;
`;

const PillIcon = styled.span`
  width: 28px;
  height: 28px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 50%;

  color: ${(p) => p.$accent};

  background: rgba(243, 111, 33, 0.11);
`;

const KpiGrid = styled.div`
  display: grid;

  gap: 10px;

  margin-top: 16px;

  @media (min-width: 700px) {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }
`;

const KpiCard = styled.div`
  min-width: 0;

  padding: 14px;

  border-radius: 18px 0 18px 0;

  border: 1px solid ${(p) => p.$border};

  background: ${(p) => p.$card};

  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.18);

  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-3px);

    border-color:
      rgba(243, 111, 33, 0.3);

    box-shadow:
      0 18px 40px rgba(0, 0, 0, 0.25);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const KpiHead = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;
`;

const KpiIcon = styled.div`
  width: 34px;
  height: 34px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 11px 0 11px 0;

  color: ${(p) => p.$accent};

  background: rgba(243, 111, 33, 0.11);
`;

const KpiLabel = styled.div`
  color: rgba(255, 255, 255, 0.62);

  font-size: 12px;

  font-weight: 700;
`;

const KpiValue = styled.div`
  margin-top: 9px;

  color: #fff;

  font-size: clamp(15px, 2vw, 18px);

  line-height: 1.3;

  font-weight: 900;

  letter-spacing: -0.01em;
`;

const KpiHelper = styled.div`
  margin-top: 4px;

  color: rgba(255, 255, 255, 0.48);

  font-size: 11px;
`;

/* =========================================================
   SIDEBAR
========================================================= */

const SideCard = styled.aside`
  ${glass};

  border-radius: 24px 0 24px 0;

  border: 1px solid ${(p) => p.$border};

  box-shadow:
    0 18px 55px rgba(0, 0, 0, 0.27);

  padding: 16px;

  @media (min-width: 980px) {
    position: sticky;

    top: 18px;
  }
`;

const SideHead = styled.div`
  display: grid;

  gap: 5px;
`;

const SideTitle = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 8px;

  color: #fff;

  font-size: 14px;

  font-weight: 900;

  svg {
    color: #f36f21;
  }
`;

const SideDesc = styled.div`
  color: rgba(255, 255, 255, 0.55);

  font-size: 12px;

  line-height: 1.5;
`;

const TOC = styled.nav`
  display: grid;

  gap: 7px;

  margin-top: 12px;
`;

const TOCLink = styled.a`
  display: flex;

  align-items: center;

  gap: 8px;

  min-height: 42px;

  padding: 9px 10px;

  border-radius: 13px 0 13px 0;

  border: 1px solid
    rgba(255, 255, 255, 0.08);

  background: rgba(0, 0, 0, 0.12);

  color: rgba(255, 255, 255, 0.78);

  text-decoration: none;

  font-size: 12px;

  font-weight: 700;

  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;

  svg {
    color: #f36f21;
  }

  &:hover {
    transform: translateX(3px);

    background: rgba(243, 111, 33, 0.07);

    border-color:
      rgba(243, 111, 33, 0.2);

    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid
      rgba(243, 111, 33, 0.7);

    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const Divider = styled.div`
  height: 1px;

  margin: 15px 0;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
`;

const CTAGroup = styled.div`
  display: grid;

  gap: 9px;

  margin-top: 10px;
`;

const PrimaryBtn = styled.a`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  min-height: 48px;

  padding: 11px 14px;

  border-radius: 15px 0 15px 0;

  border: 1px solid
    rgba(255, 255, 255, 0.14);

  color: #fff;

  background:
    linear-gradient(
      100deg,
      ${(p) => p.$a},
      ${(p) => p.$b},
      ${(p) => p.$a}
    );

  background-size: 200% 200%;

  box-shadow:
    0 15px 38px rgba(0, 0, 0, 0.28);

  text-decoration: none;

  font-size: 13px;

  font-weight: 900;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;

  animation: ${(p) =>
    p.$reduce
      ? "none"
      : css`
          ${gradientShift} 9s ease-in-out infinite
        `};

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 20px 48px rgba(0, 0, 0, 0.36);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.$accent};

    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const InfoHint = styled.div`
  color: rgba(255, 255, 255, 0.45);

  font-size: 11px;

  line-height: 1.5;
`;

/* =========================================================
   SECTIONS
========================================================= */

const Section = styled.section`
  margin-top: 16px;

  scroll-margin-top: 85px;
`;

const SectionCard = styled.article`
  ${glass};

  padding: clamp(16px, 3vw, 22px);

  border-radius: 22px 0 22px 0;

  border: 1px solid ${(p) => p.$border};

  box-shadow:
    0 15px 42px rgba(0, 0, 0, 0.2);
`;

const SectionHead = styled.div`
  display: flex;

  align-items: center;

  gap: 11px;
`;

const SectionIcon = styled.div`
  width: 42px;
  height: 42px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 13px 0 13px 0;

  color: ${(p) => p.$accent};

  background:
    linear-gradient(
      135deg,
      rgba(243, 111, 33, 0.16),
      rgba(243, 111, 33, 0.05)
    );

  border: 1px solid
    rgba(243, 111, 33, 0.12);
`;

const SectionTitle = styled.h2`
  margin: 0;

  color: #fff;

  font-size: clamp(1rem, 2vw, 1.15rem);

  line-height: 1.3;

  font-weight: 900;
`;

const BlockTitle = styled.h2`
  display: inline-flex;

  align-items: center;

  gap: 8px;

  margin: 22px 0 10px;

  color: #fff;

  font-size: 15px;

  font-weight: 900;

  svg {
    color: #f36f21;
  }
`;

const List = styled.ul`
  display: grid;

  gap: 9px;

  margin: 15px 0 0;

  padding: 0;

  list-style: none;
`;

const Li = styled.li`
  display: flex;

  align-items: flex-start;

  gap: 11px;

  color: rgba(255, 255, 255, 0.7);

  font-size: 13px;

  line-height: 1.65;
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;

  flex: 0 0 auto;

  margin-top: 7px;

  border-radius: 50%;

  background: ${(p) => p.$accent};

  box-shadow:
    0 0 0 4px
      rgba(243, 111, 33, 0.1);
`;

/* =========================================================
   ACCORDION
========================================================= */

const AccordionWrap = styled.div`
  display: grid;
  gap: 9px;
`;

const Chevron = styled.span`
  flex: 0 0 auto;

  color: rgba(255, 255, 255, 0.55);

  font-size: 18px;

  transition: transform 180ms ease;
`;

const Details = styled.details`
  overflow: hidden;

  border-radius: 17px 0 17px 0;

  border: 1px solid ${(p) => p.$border};

  background: ${(p) => p.$card};

  ${glass};

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.16);

  &[open] {
    border-color: rgba(243, 111, 33, 0.2);
  }

  &[open] ${Chevron} {
    transform: rotate(180deg);
  }
`;

const Summary = styled.summary`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  min-height: 58px;

  padding: 9px 13px;

  cursor: pointer;

  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(243, 111, 33, 0.65);
    outline-offset: -2px;
  }
`;

const SummaryLeft = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  min-width: 0;

  color: rgba(255, 255, 255, 0.84);

  font-size: 13px;

  line-height: 1.4;

  font-weight: 800;
`;

const SummaryIcon = styled.div`
  width: 36px;
  height: 36px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 11px 0 11px 0;

  color: ${(p) => p.$accent};

  background: rgba(243, 111, 33, 0.11);
`;

const DetailsBody = styled.div`
  padding: 0 15px 15px;

  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;
/* =========================================================
   BENEFITS
========================================================= */

const BenefitsCard = styled.section`
  ${glass};

  padding: clamp(16px, 3vw, 22px);

  border-radius: 22px 0 22px 0;

  border: 1px solid ${(p) => p.$border};

  box-shadow:
    0 15px 42px rgba(0, 0, 0, 0.2);
`;

const BenefitsHead = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 14px;

  flex-wrap: wrap;
`;

const BenefitsKicker = styled.div`
  display: flex;

  align-items: center;

  gap: 5px;

  margin-bottom: 4px;

  color: #f36f21;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`;

const BenefitsTitle = styled.h2`
  margin: 0;

  color: #fff;

  font-size: 17px;

  font-weight: 900;
`;

const MiniNote = styled.div`
  padding: 7px 10px;

  border-radius: 999px;

  border: 1px solid
    rgba(255, 255, 255, 0.09);

  background: rgba(0, 0, 0, 0.1);

  color: rgba(255, 255, 255, 0.55);

  font-size: 11px;
`;

const BenefitsGrid = styled.div`
  display: grid;

  gap: 9px;

  margin-top: 15px;

  @media (min-width: 760px) {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
`;

const BenefitItem = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 10px;

  min-height: 58px;

  padding: 11px;

  border-radius: 15px 0 15px 0;

  background: ${(p) => p.$soft};

  border: 1px solid
    rgba(255, 255, 255, 0.07);

  color: rgba(255, 255, 255, 0.72);

  font-size: 13px;

  line-height: 1.5;

  transition:
    transform 160ms ease,
    border-color 160ms ease;

  &:hover {
    transform: translateY(-2px);

    border-color:
      rgba(243, 111, 33, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const BenefitIcon = styled.div`
  width: 34px;
  height: 34px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px 0 10px 0;

  color: ${(p) => p.$accent};

  background:
    rgba(243, 111, 33, 0.11);
`;

/* =========================================================
   FORMULAIRE
========================================================= */

const DownloadCard = styled.section`
  ${glass};

  display: grid;

  gap: 18px;

  padding: clamp(17px, 3vw, 25px);

  border-radius: 25px 0 25px 0;

  border: 1px solid ${(p) => p.$border};

  box-shadow:
    0 20px 55px rgba(0, 0, 0, 0.25);

  @media (min-width: 900px) {
    grid-template-columns:
      minmax(0, 1.25fr)
      minmax(280px, 0.75fr);

    align-items: center;
  }
`;

const DownloadLeft = styled.div`
  min-width: 0;
`;

const DownloadKicker = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 5px;

  margin-bottom: 7px;

  color: #f36f21;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`;

const DownloadTitle = styled.h2`
  margin: 0;

  color: #fff;

  font-size: clamp(1.3rem, 3vw, 1.8rem);

  line-height: 1.15;

  font-weight: 900;

  letter-spacing: -0.025em;
`;

const DownloadText = styled.p`
  max-width: 66ch;

  margin: 8px 0 0;

  color: rgba(255, 255, 255, 0.63);

  font-size: 13px;

  line-height: 1.7;
`;

const Steps = styled.div`
  display: grid;

  gap: 8px;

  margin-top: 16px;
`;

const Step = styled.div`
  display: grid;

  grid-template-columns:
    auto
    auto
    1fr;

  align-items: center;

  gap: 9px;

  padding: 10px;

  border-radius: 14px 0 14px 0;

  border: 1px solid
    rgba(255, 255, 255, 0.07);

  background: rgba(0, 0, 0, 0.11);
`;

const StepNumber = styled.div`
  color: #f36f21;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.04em;
`;

const StepIcon = styled.div`
  width: 34px;
  height: 34px;

  display: grid;
  place-items: center;

  border-radius: 10px 0 10px 0;

  color: ${(p) => p.$accent};

  background:
    rgba(243, 111, 33, 0.11);
`;

const StepTitle = styled.div`
  color: rgba(255, 255, 255, 0.88);

  font-size: 12px;

  font-weight: 900;
`;

const StepText = styled.div`
  margin-top: 2px;

  color: rgba(255, 255, 255, 0.48);

  font-size: 11px;

  line-height: 1.45;
`;

const DownloadRight = styled.div`
  display: grid;

  gap: 11px;

  @media (min-width: 900px) {
    justify-items: stretch;
  }
`;

const FormVisual = styled.div`
  position: relative;

  overflow: hidden;

  padding: 20px;

  border-radius: 20px 0 20px 0;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(243, 111, 33, 0.16),
      transparent 45%
    ),
    rgba(0, 0, 0, 0.14);

  border: 1px solid
    rgba(243, 111, 33, 0.12);
`;

const FormVisualIcon = styled.div`
  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  margin-bottom: 12px;

  border-radius: 15px 0 15px 0;

  color: #f36f21;

  background:
    rgba(243, 111, 33, 0.11);
`;

const FormVisualTitle = styled.div`
  color: #fff;

  font-size: 16px;

  font-weight: 900;
`;

const FormVisualText = styled.div`
  margin-top: 4px;

  color: rgba(255, 255, 255, 0.48);

  font-size: 12px;

  line-height: 1.5;
`;

/* =========================================================
   FOOTER
========================================================= */

const FooterNote = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  margin-top: 14px;

  padding: 13px 15px;

  border-radius: 17px 0 17px 0;

  border: 1px solid ${(p) => p.$border};

  background: ${(p) => p.$soft};

  color: rgba(255, 255, 255, 0.62);

  font-size: 12px;

  line-height: 1.5;

  @media (max-width: 560px) {
    align-items: flex-start;
  }
`;

const FooterBadge = styled.span`
  flex: 0 0 auto;

  padding: 6px 9px;

  border-radius: 999px;

  border: 1px solid
    rgba(243, 111, 33, 0.18);

  background:
    rgba(243, 111, 33, 0.1);

  color: ${(p) => p.$accent};

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.08em;
`;

/* =========================================================
   MOBILE DOCK
========================================================= */

const MobileDock = styled.div`
  position: fixed;

  left: 12px;
  right: 12px;
  bottom: 12px;

  z-index: 50;

  border-radius: 17px 0 17px 0;

  border: 1px solid ${(p) => p.$border};

  background: ${(p) => p.$card};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-shadow:
    0 20px 70px rgba(0, 0, 0, 0.45);

  @media (min-width: 980px) {
    display: none;
  }
`;

const DockInner = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto;

  gap: 10px;

  align-items: center;

  padding: 10px;
`;

const DockLeft = styled.div`
  min-width: 0;

  display: grid;

  gap: 2px;
`;

const DockTitle = styled.div`
  overflow: hidden;

  color: #fff;

  font-size: 12px;

  font-weight: 900;

  text-overflow: ellipsis;

  white-space: nowrap;
`;

const DockMeta = styled.div`
  overflow: hidden;

  color: rgba(255, 255, 255, 0.45);

  font-size: 10px;

  text-overflow: ellipsis;

  white-space: nowrap;
`;

const DockRight = styled.div`
  flex: 0 0 auto;
`;

const DockBtn = styled(PrimaryBtn)`
  min-height: 42px;

  padding:
    9px
    11px;

  border-radius: 13px 0 13px 0;

  font-size: 11px;

  white-space: nowrap;
`;

/* =========================================================
   BACK TO TOP
========================================================= */

const TopBtn = styled.button`
  position: fixed;

  right: 15px;
  bottom: 90px;

  z-index: 55;

  width: 44px;
  height: 44px;

  display: grid;
  place-items: center;

  border-radius: 13px 0 13px 0;

  border: 1px solid
    rgba(255, 255, 255, 0.13);

  background: rgba(0, 0, 0, 0.34);

  color: rgba(255, 255, 255, 0.9);

  cursor: pointer;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.32);

  opacity: ${(p) =>
    p.$show ? 1 : 0};

  pointer-events: ${(p) =>
    p.$show ? "auto" : "none"};

  transition:
    opacity 180ms ease,
    transform 180ms ease;

  &:hover {
    transform: translateY(-2px);

    background:
      rgba(243, 111, 33, 0.18);
  }

  &:focus-visible {
    outline: 2px solid
      ${(p) => p.$accent};

    outline-offset: 3px;
  }

  @media (min-width: 980px) {
    bottom: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;