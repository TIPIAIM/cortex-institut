// InnovEditions
// src/components/InnovEditions/InnovEditionsSection.jsx

import React from "react";
import styled, { keyframes } from "styled-components";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Layers3,
  Library,
  Mail,
  PenLine,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";
import colors from "../../Styles/colors";

/* =========================================================
   DONNÉES INNOV ÉDITIONS
========================================================= */

const ACTIVITIES = [
  {
    icon: BookOpen,
    title: "Éditions",
    text: "Production de contenus éducatifs et informatifs, notamment des livres, des manuels scolaires, des supports de formation et des publications numériques.",
  },
  {
    icon: Layers3,
    title: "Diffusion",
    text: "Mise en valeur et diffusion de ressources de qualité destinées à répondre aux besoins des apprenants et des professionnels.",
  },
  {
    icon: Truck,
    title: "Distribution",
    text: "Contribution à l’accès aux publications et aux ressources produites par Innov Éditions en Guinée et au-delà.",
  },
];

const MAIN_ACTIVITIES = [
  {
    icon: GraduationCap,
    title: "Manuels scolaires et universitaires",
    text: "Édition de manuels scolaires et universitaires adaptés aux besoins des apprenants.",
  },
  {
    icon: FileText,
    title: "Livres professionnels et techniques",
    text: "Publication de livres professionnels et techniques destinés aux professionnels et aux différents publics concernés.",
  },
  {
    icon: Library,
    title: "Supports de formation numérique",
    text: "Développement de supports de formation numérique pour accompagner les nouveaux usages de l’apprentissage.",
  },
  {
    icon: Sparkles,
    title: "Événements littéraires et éducatifs",
    text: "Organisation d’événements littéraires et éducatifs pour promouvoir l’éducation et la culture.",
  },
];

const PROCESS = [
  {
    number: "01",
    icon: Send,
    title: "Envoi du manuscrit",
    text: "Envoyez votre manuscrit par mail à l’adresse contactinnoveditions@gmail.com.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Évaluation",
    text: "Le manuscrit est évalué par le comité de lecture d’Innov Éditions.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Retour par mail",
    text: "La décision du comité de lecture vous est communiquée par mail.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Contrat d’édition",
    text: "Si votre manuscrit est validé, une proposition de contrat d’édition vous est adressée.",
  },
];

const PUBLICATIONS = [
  {
    title: "Romans",
    values: [16, 19, 22],
    total: 57,
  },
  {
    title: "Essais",
    values: [6, 2, 1],
    total: 9,
  },
  {
    title: "Jeunesse",
    values: [0, 2, 1],
    total: 3,
  },
  {
    title: "Autres",
    values: [2, 1, 1],
    total: 4,
  },
];

const TOTAL_PUBLICATIONS = PUBLICATIONS.reduce(
  (total, publication) => total + publication.total,
  0
);

/* =========================================================
   ANIMATIONS
========================================================= */

const float = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -8px, 0);
  }
`;

const pulse = keyframes`
  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.06);
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

const InnovEditionsSection = () => {
  return (
    <Section id="innov-editions">
      <BackgroundGlow aria-hidden="true" />
      <BackgroundOrb aria-hidden="true" />

      <Container>
        {/* =================================================
            HERO
        ================================================= */}

        <Hero>
          <HeroContent>
            <Eyebrow>
              <Sparkles size={15} aria-hidden="true" />
              INNOV ÉDITIONS
            </Eyebrow>

            <HeroTitle>
              Éditions, diffusion <HeroAccent>et distribution.</HeroAccent>
            </HeroTitle>

            <HeroDescription>
              Innov Éditions est une filiale dédiée à la production et à la
              diffusion de contenus éducatifs et informatifs. Elle se concentre
              sur l’édition de livres, de manuels scolaires, de supports de
              formation et de publications numériques.
            </HeroDescription>

            <HeroMission>
              <MissionIcon>
                <BookOpen size={20} aria-hidden="true" />
              </MissionIcon>

              <MissionText>
                <strong>Notre objectif</strong>

                <span>
                  Promouvoir l’éducation et la culture en Guinée et au-delà, en
                  fournissant des ressources de haute qualité adaptées aux
                  besoins des apprenants et des professionnels.
                </span>
              </MissionText>
            </HeroMission>

            <HeroActions>
              <PrimaryButton href="mailto:contactinnoveditions@gmail.com?subject=Soumission%20de%20manuscrit">
                <PenLine size={17} aria-hidden="true" />
                Soumettre un manuscrit
                <ArrowRight size={16} aria-hidden="true" />
              </PrimaryButton>

              <SecondaryButton href="#innov-process">
                Découvrir le processus
                <ArrowRight size={16} aria-hidden="true" />
              </SecondaryButton>
            </HeroActions>
          </HeroContent>

          <HeroVisual>
            <VisualCard>
              <VisualTop>
                <VisualBadge>
                  <BookOpen size={15} aria-hidden="true" />
                  INNOV ÉDITIONS
                </VisualBadge>

                <VisualLabel>Éducation · Culture</VisualLabel>
              </VisualTop>

              <VisualBook>
                <BookCover>
                  <BookCoverSmall>INNOV</BookCoverSmall>

                  <BookCoverTitle>Éditions</BookCoverTitle>

                  <BookCoverLine />

                  <BookCoverText>
                    Livres
                    <br />
                    Formation
                    <br />
                    Éducation
                  </BookCoverText>
                </BookCover>

                <BookShadow />
              </VisualBook>

              <VisualBottom>
                <VisualBottomNumber>{TOTAL_PUBLICATIONS}</VisualBottomNumber>

                <VisualBottomText>
                  publications réalisées
                  <br />
                  sur la période 2023–2025
                </VisualBottomText>
              </VisualBottom>
            </VisualCard>

            <FloatingCard>
              <Clock3 size={19} aria-hidden="true" />

              <div>
                <FloatingNumber>45 jours</FloatingNumber>

                <FloatingText>
                  pour passer du rêve
                  <br />à la réalité
                </FloatingText>
              </div>
            </FloatingCard>
          </HeroVisual>
        </Hero>

        {/* =================================================
            ACTIVITÉS
        ================================================= */}

        <SectionHeader>
          <SectionKicker>
            <Sparkles size={15} aria-hidden="true" />
            Nos activités
          </SectionKicker>

          <SectionTitle>
            Trois domaines au service <TitleAccent>du savoir</TitleAccent>
          </SectionTitle>

          <SectionDescription>
            Innov Éditions intervient dans l’édition, la diffusion et la
            distribution de contenus éducatifs et informatifs.
          </SectionDescription>
        </SectionHeader>

        <ActivitiesGrid>
          {ACTIVITIES.map(({ icon: Icon, title, text }) => (
            <ActivityCard key={title}>
              <ActivityIcon>
                <Icon size={23} aria-hidden="true" />
              </ActivityIcon>

              <ActivityTitle>{title}</ActivityTitle>

              <ActivityText>{text}</ActivityText>

              <ActivityLine />
            </ActivityCard>
          ))}
        </ActivitiesGrid>

        {/* =================================================
            PRINCIPALES ACTIVITÉS
        ================================================= */}

        <MainActivities>
          <MainActivitiesHeader>
            <SectionKicker>
              <Library size={15} aria-hidden="true" />
              Principales activités
            </SectionKicker>

            <SectionTitle>
              Des contenus conçus pour{" "}
              <TitleAccent>transmettre et valoriser</TitleAccent>
            </SectionTitle>
          </MainActivitiesHeader>

          <MainActivitiesGrid>
            {MAIN_ACTIVITIES.map(({ icon: Icon, title, text }) => (
              <MainActivityCard key={title}>
                <MainActivityIcon>
                  <Icon size={20} aria-hidden="true" />
                </MainActivityIcon>

                <div>
                  <MainActivityTitle>{title}</MainActivityTitle>

                  <MainActivityText>{text}</MainActivityText>
                </div>
              </MainActivityCard>
            ))}
          </MainActivitiesGrid>
        </MainActivities>

        {/* =================================================
            PROCESSUS D'ÉDITION
        ================================================= */}

        <ProcessSection id="innov-process">
          <ProcessHeader>
            <ProcessKicker>
              <Clock3 size={16} aria-hidden="true" />
              Délais d’édition
            </ProcessKicker>

            <ProcessTitle>
              <DeadlineAccent>45 jours</DeadlineAccent> pour passer du rêve à la
              réalité.
            </ProcessTitle>

            <ProcessDescription>
              Le processus d’édition d’Innov Éditions repose sur quatre étapes
              clairement définies, depuis l’envoi du manuscrit jusqu’à la
              proposition d’un contrat d’édition.
            </ProcessDescription>
          </ProcessHeader>

          <ProcessTimeline>
            {PROCESS.map(({ number, icon: Icon, title, text }, index) => (
              <ProcessItem key={number}>
                <ProcessNumber>{number}</ProcessNumber>

                <ProcessIcon>
                  <Icon size={19} aria-hidden="true" />
                </ProcessIcon>

                <ProcessItemTitle>{title}</ProcessItemTitle>

                <ProcessItemText>{text}</ProcessItemText>

                {index < PROCESS.length - 1 && (
                  <ProcessConnector aria-hidden="true" />
                )}
              </ProcessItem>
            ))}
          </ProcessTimeline>

          <DeadlineCard>
            <DeadlineIcon>
              <Clock3 size={25} aria-hidden="true" />
            </DeadlineIcon>

            <DeadlineContent>
              <DeadlineSmall>DÉLAI D’ÉDITION</DeadlineSmall>

              <DeadlineTitle>
                45 jours pour passer du rêve à la réalité.
              </DeadlineTitle>

              <DeadlineText>
                Un délai clairement annoncé pour accompagner votre projet
                éditorial.
              </DeadlineText>
            </DeadlineContent>
          </DeadlineCard>
        </ProcessSection>

        {/* =================================================
            PUBLICATIONS
        ================================================= */}

        <PublicationsSection>
          <PublicationsHeader>
            <SectionKicker>
              <BarChart3 size={15} aria-hidden="true" />
              Publications réalisées
            </SectionKicker>

            <SectionTitle>
              Une production éditoriale{" "}
              <TitleAccent>en progression</TitleAccent>
            </SectionTitle>

            <SectionDescription>
              Publications réalisées par genre sur les années 2023, 2024 et
              2025.
            </SectionDescription>
          </PublicationsHeader>

          <PublicationStats>
            <PublicationTotal>
              <PublicationTotalNumber>
                {TOTAL_PUBLICATIONS}
              </PublicationTotalNumber>

              <PublicationTotalLabel>
                publications réalisées
              </PublicationTotalLabel>

              <PublicationPeriod>2023 — 2025</PublicationPeriod>
            </PublicationTotal>

            <PublicationMiniStats>
              {PUBLICATIONS.map((publication) => (
                <MiniPublication key={publication.title}>
                  <MiniNumber>{publication.total}</MiniNumber>

                  <MiniLabel>{publication.title}</MiniLabel>
                </MiniPublication>
              ))}
            </PublicationMiniStats>
          </PublicationStats>

          <TableWrapper>
            <PublicationTable>
              <thead>
                <tr>
                  <th>Genre</th>
                  <th>2023</th>
                  <th>2024</th>
                  <th>2025</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {PUBLICATIONS.map((publication) => (
                  <tr key={publication.title}>
                    <td>{publication.title}</td>

                    <td>{publication.values[0]}</td>

                    <td>{publication.values[1]}</td>

                    <td>{publication.values[2]}</td>

                    <td>
                      <TableTotal>{publication.total}</TableTotal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </PublicationTable>
          </TableWrapper>
        </PublicationsSection>

        {/* =================================================
            CTA FINAL
        ================================================= */}

        <FinalCTA>
          <CTAContent>
            <CTAKicker>
              <PenLine size={16} aria-hidden="true" />
              Vous avez un manuscrit ?
            </CTAKicker>

            <CTATitle>
              Faites-nous parvenir{" "}
              <CTATitleAccent>votre manuscrit.</CTATitleAccent>
            </CTATitle>

            <CTAText>
              La première étape du processus d’édition consiste à envoyer votre
              manuscrit par mail. Celui-ci sera ensuite évalué par le comité de
              lecture.
            </CTAText>

            <CTAEmail>
              <Mail size={17} aria-hidden="true" />
              contac@institut-cortex.com
            </CTAEmail>

            <CTAButton href="mailto:contac@institut-cortex.com?subject=Soumission%20de%20manuscrit">
              Envoyer mon manuscrit
              <ArrowRight size={17} aria-hidden="true" />
            </CTAButton>
          </CTAContent>

          <CTAVisual>
            <CTAIcon>
              <BookOpen size={48} aria-hidden="true" />
            </CTAIcon>
          </CTAVisual>
        </FinalCTA>
      </Container>
    </Section>
  );
};

export default React.memo(InnovEditionsSection);

/* =========================================================
   STYLES
========================================================= */

const Section = styled.section`
  position: relative;
  overflow: hidden;

  padding: clamp(4rem, 7vw, 7rem) clamp(1rem, 3vw, 2rem);

  background: radial-gradient(
      circle at 85% 10%,
      rgba(243, 111, 33, 0.08),
      transparent 28%
    ),
    linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgSoft} 100%);

  scroll-margin-top: 90px;
`;

const BackgroundGlow = styled.div`
  position: absolute;

  width: 420px;
  height: 420px;

  top: -180px;
  left: -180px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(243, 111, 33, 0.14),
    transparent 68%
  );

  filter: blur(10px);

  pointer-events: none;

  animation: ${pulse} 8s ease-in-out infinite;
`;

const BackgroundOrb = styled.div`
  position: absolute;

  width: 260px;
  height: 260px;

  right: -100px;
  bottom: 8%;

  border-radius: 50%;

  border: 1px solid rgba(243, 111, 33, 0.12);

  pointer-events: none;

  animation: ${float} 8s ease-in-out infinite;
`;

const Container = styled.div`
  position: relative;
  z-index: 2;

  width: min(1200px, 100%);

  margin: 0 auto;

  display: grid;

  gap: clamp(4rem, 7vw, 7rem);
`;

const Hero = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.05fr)
    minmax(360px, 0.95fr);

  gap: clamp(2.5rem, 5vw, 5rem);

  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  max-width: 720px;
`;

const Eyebrow = styled.div`
  width: fit-content;

  display: inline-flex;
  align-items: center;

  gap: 0.5rem;

  padding: 0.6rem 0.95rem;

  margin-bottom: 1.1rem;

  border-radius: 999px;

  background: rgba(243, 111, 33, 0.1);

  border: 1px solid rgba(243, 111, 33, 0.18);

  color: ${colors.accentGold};

  font-size: 0.88rem;
  font-weight: 800;
`;

const HeroTitle = styled.h2`
  margin: 0;

  color: ${colors.text};

  font-size: clamp(2.6rem, 6vw, 5rem);

  line-height: 1.02;

  letter-spacing: -0.045em;

  font-weight: 900;
`;

const HeroAccent = styled.span`
  color: ${colors.accentGold};
`;

const HeroDescription = styled.p`
  max-width: 680px;

  margin: 1.4rem 0 0;

  color: ${colors.muted};

  font-size: clamp(1rem, 1.8vw, 1.18rem);

  line-height: 1.8;
`;

const HeroMission = styled.div`
  display: grid;

  grid-template-columns: auto 1fr;

  gap: 0.9rem;

  margin-top: 1.4rem;

  padding: 1rem;

  border-radius: 18px 0 18px 0;

  background: rgba(243, 111, 33, 0.06);

  border: 1px solid rgba(243, 111, 33, 0.1);
`;

const MissionIcon = styled.div`
  width: 44px;
  height: 44px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 13px 0 13px 0;

  color: #fff;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
`;

const MissionText = styled.div`
  display: grid;

  gap: 0.25rem;

  color: ${colors.muted};

  font-size: 0.92rem;

  line-height: 1.6;

  strong {
    color: ${colors.text};
  }
`;

const HeroActions = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 0.8rem;

  margin-top: 1.7rem;
`;

const ButtonBase = styled.a`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 0.55rem;

  min-height: 48px;

  padding: 0.85rem 1.15rem;

  border-radius: 16px 0 16px 0;

  text-decoration: none;

  font-weight: 800;

  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(243, 111, 33, 0.35);

    outline-offset: 3px;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  color: #fff;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );

  box-shadow: 0 12px 30px rgba(243, 111, 33, 0.24);
`;

const SecondaryButton = styled(ButtonBase)`
  color: ${colors.text};

  border: 1px solid rgba(243, 111, 33, 0.2);

  background: rgba(255, 255, 255, 0.03);
`;

const HeroVisual = styled.div`
  position: relative;

  min-height: 500px;

  display: flex;

  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    min-height: 430px;
  }

  @media (max-width: 520px) {
    min-height: 370px;
  }
`;

const VisualCard = styled.div`
  width: min(440px, 90%);

  padding: 1.1rem;

  border-radius: 28px 0 28px 0;

  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.025)
  );

  border: 1px solid rgba(243, 111, 33, 0.16);

  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);

  backdrop-filter: blur(14px);
`;

const VisualTop = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;
`;

const VisualBadge = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 0.45rem;

  color: ${colors.accentGold};

  font-size: 0.78rem;

  font-weight: 900;

  letter-spacing: 0.06em;
`;

const VisualLabel = styled.span`
  color: ${colors.muted};

  font-size: 0.75rem;

  font-weight: 700;
`;

const VisualBook = styled.div`
  position: relative;

  display: flex;

  justify-content: center;

  padding: 2.3rem 0 2rem;
`;

const BookCover = styled.div`
  position: relative;

  width: 210px;
  height: 290px;

  padding: 1.5rem;

  border-radius: 8px 3px 3px 8px;

  background: linear-gradient(
    145deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );

  color: #fff;

  box-shadow: -8px 0 0 rgba(0, 0, 0, 0.12), 20px 25px 40px rgba(0, 0, 0, 0.28);

  transform: rotate(-3deg);
`;

const BookCoverSmall = styled.div`
  font-size: 0.72rem;

  font-weight: 900;

  letter-spacing: 0.16em;
`;

const BookCoverTitle = styled.div`
  margin-top: 1.8rem;

  font-size: 2rem;

  line-height: 0.95;

  font-weight: 900;
`;

const BookCoverLine = styled.div`
  width: 55px;
  height: 3px;

  margin-top: 1.3rem;

  background: rgba(255, 255, 255, 0.8);
`;

const BookCoverText = styled.div`
  position: absolute;

  left: 1.5rem;
  bottom: 1.5rem;

  font-size: 0.82rem;

  line-height: 1.6;

  font-weight: 700;

  opacity: 0.9;
`;

const BookShadow = styled.div`
  position: absolute;

  width: 210px;
  height: 35px;

  bottom: 20px;

  border-radius: 50%;

  background: rgba(0, 0, 0, 0.35);

  filter: blur(16px);
`;

const VisualBottom = styled.div`
  display: flex;

  align-items: center;

  gap: 0.8rem;

  padding: 0.9rem;

  border-radius: 16px 0 16px 0;

  background: rgba(255, 255, 255, 0.04);
`;

const VisualBottomNumber = styled.div`
  color: ${colors.accentGold};

  font-size: 2rem;

  line-height: 1;

  font-weight: 900;
`;

const VisualBottomText = styled.div`
  color: ${colors.muted};

  font-size: 0.86rem;

  line-height: 1.5;
`;

const FloatingCard = styled.div`
  position: absolute;

  right: 0;

  bottom: 7%;

  display: flex;

  align-items: center;

  gap: 0.7rem;

  padding: 0.9rem 1rem;

  border-radius: 18px 0 18px 0;

  background: rgba(8, 19, 34, 0.92);

  border: 1px solid rgba(243, 111, 33, 0.2);

  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.3);

  animation: ${float} 6s ease-in-out infinite;

  svg {
    color: ${colors.accentGold};
  }
`;

const FloatingNumber = styled.div`
  color: ${colors.accentGold};

  font-size: 1.05rem;

  font-weight: 900;
`;

const FloatingText = styled.div`
  margin-top: 0.15rem;

  color: ${colors.muted};

  font-size: 0.75rem;

  line-height: 1.35;
`;

const SectionHeader = styled.div`
  max-width: 760px;

  margin: 0 auto;

  text-align: center;

  display: grid;

  gap: 0.7rem;
`;

const SectionKicker = styled.div`
  width: fit-content;

  margin: 0 auto;

  display: inline-flex;

  align-items: center;

  gap: 0.45rem;

  color: ${colors.accentGold};

  font-size: 0.88rem;

  font-weight: 900;
`;

const SectionTitle = styled.h3`
  margin: 0;

  color: ${colors.text};

  font-size: clamp(2rem, 4vw, 3.2rem);

  line-height: 1.08;

  font-weight: 900;
`;

const TitleAccent = styled.span`
  color: ${colors.accentGold};
`;

const SectionDescription = styled.p`
  margin: 0 auto;

  color: ${colors.muted};

  line-height: 1.75;

  font-size: 1rem;
`;

const ActivitiesGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 1rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityCard = styled.article`
  position: relative;

  overflow: hidden;

  padding: 1.5rem;

  border-radius: 22px 0 22px 0;

  background: ${colors.bgSoft};

  border: 1px solid rgba(243, 111, 33, 0.12);

  box-shadow: 0 15px 32px rgba(0, 0, 0, 0.16);

  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    border-color: rgba(243, 111, 33, 0.4);

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  }
`;

const ActivityIcon = styled.div`
  width: 52px;
  height: 52px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 15px 0 15px 0;

  color: #fff;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
`;

const ActivityTitle = styled.h4`
  margin: 1.1rem 0 0.5rem;

  color: ${colors.text};

  font-size: 1.25rem;
`;

const ActivityText = styled.p`
  margin: 0;

  color: ${colors.muted};

  line-height: 1.7;

  font-size: 0.95rem;
`;

const ActivityLine = styled.div`
  width: 40px;
  height: 3px;

  margin-top: 1.3rem;

  border-radius: 999px;

  background: ${colors.accentGold};
`;

const MainActivities = styled.section`
  display: grid;

  gap: 1.5rem;
`;

const MainActivitiesHeader = styled.div`
  display: grid;

  gap: 0.6rem;

  text-align: center;
`;

const MainActivitiesGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const MainActivityCard = styled.article`
  display: grid;

  grid-template-columns: auto 1fr;

  gap: 1rem;

  padding: 1.2rem;

  border-radius: 18px 0 18px 0;

  background: rgba(255, 255, 255, 0.035);

  border: 1px solid rgba(243, 111, 33, 0.1);

  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-3px);

    background: rgba(255, 255, 255, 0.055);
  }
`;

const MainActivityIcon = styled.div`
  width: 44px;
  height: 44px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 13px 0 13px 0;

  color: ${colors.accentGold};

  background: rgba(243, 111, 33, 0.1);
`;

const MainActivityTitle = styled.h4`
  margin: 0 0 0.35rem;

  color: ${colors.text};

  font-size: 1rem;
`;

const MainActivityText = styled.p`
  margin: 0;

  color: ${colors.muted};

  font-size: 0.9rem;

  line-height: 1.6;
`;

const ProcessSection = styled.section`
  padding: clamp(1.5rem, 3vw, 2.5rem);

  border-radius: 26px 0 26px 0;

  background: radial-gradient(
      circle at 90% 20%,
      rgba(243, 111, 33, 0.12),
      transparent 30%
    ),
    linear-gradient(135deg, ${colors.bg1}, ${colors.bgSoft});

  border: 1px solid rgba(243, 111, 33, 0.12);
`;

const ProcessHeader = styled.div`
  max-width: 760px;

  margin: 0 auto 2rem;

  text-align: center;

  display: grid;

  gap: 0.65rem;
`;

const ProcessKicker = styled.div`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.45rem;

  color: ${colors.accentGold};

  font-size: 0.88rem;

  font-weight: 900;
`;

const ProcessTitle = styled.h3`
  margin: 0;

  color: ${colors.text};

  font-size: clamp(1.9rem, 4vw, 3rem);

  line-height: 1.1;
`;

const DeadlineAccent = styled.span`
  color: ${colors.accentGold};
`;

const ProcessDescription = styled.p`
  margin: 0;

  color: ${colors.muted};

  line-height: 1.7;
`;

const ProcessTimeline = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessItem = styled.div`
  position: relative;

  padding: 1.1rem;

  border-radius: 18px 0 18px 0;

  background: rgba(255, 255, 255, 0.035);

  border: 1px solid rgba(243, 111, 33, 0.1);
`;

const ProcessNumber = styled.div`
  color: ${colors.accentGold};

  font-size: 0.78rem;

  font-weight: 900;
`;

const ProcessIcon = styled.div`
  width: 44px;
  height: 44px;

  margin: 0.7rem 0;

  border-radius: 13px 0 13px 0;

  display: flex;

  align-items: center;
  justify-content: center;

  color: #fff;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
`;

const ProcessItemTitle = styled.h4`
  margin: 0 0 0.4rem;

  color: ${colors.text};

  font-size: 1rem;
`;

const ProcessItemText = styled.p`
  margin: 0;

  color: ${colors.muted};

  font-size: 0.9rem;

  line-height: 1.6;
`;

const ProcessConnector = styled.div`
  display: none;

  @media (min-width: 901px) {
    display: block;

    position: absolute;

    top: 92px;

    right: -0.6rem;

    width: 1.2rem;

    height: 1px;

    background: rgba(243, 111, 33, 0.3);
  }
`;

const DeadlineCard = styled.div`
  display: grid;

  grid-template-columns: auto 1fr;

  gap: 1rem;

  align-items: center;

  margin-top: 1.5rem;

  padding: 1.2rem;

  border-radius: 20px 0 20px 0;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );

  color: #fff;

  box-shadow: 0 18px 35px rgba(243, 111, 33, 0.2);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const DeadlineIcon = styled.div`
  width: 54px;
  height: 54px;

  border-radius: 15px 0 15px 0;

  display: flex;

  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.16);
`;

const DeadlineContent = styled.div``;

const DeadlineSmall = styled.div`
  font-size: 0.72rem;

  font-weight: 900;

  letter-spacing: 0.12em;

  opacity: 0.85;
`;

const DeadlineTitle = styled.h4`
  margin: 0.25rem 0;

  font-size: clamp(1.2rem, 2.5vw, 1.65rem);
`;

const DeadlineText = styled.p`
  margin: 0;

  font-size: 0.9rem;

  line-height: 1.55;

  opacity: 0.9;
`;

const PublicationsSection = styled.section`
  display: grid;

  gap: 1.6rem;
`;

const PublicationsHeader = styled.div`
  max-width: 760px;

  margin: 0 auto;

  text-align: center;

  display: grid;

  gap: 0.65rem;
`;

const PublicationStats = styled.div`
  display: grid;

  grid-template-columns:
    minmax(220px, 0.65fr)
    1.35fr;

  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PublicationTotal = styled.div`
  padding: 1.5rem;

  border-radius: 22px 0 22px 0;

  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );

  color: #fff;

  text-align: center;
`;

const PublicationTotalNumber = styled.div`
  font-size: clamp(3rem, 7vw, 5rem);

  line-height: 0.9;

  font-weight: 900;
`;

const PublicationTotalLabel = styled.div`
  margin-top: 0.7rem;

  font-size: 0.92rem;

  font-weight: 700;

  opacity: 0.9;
`;

const PublicationPeriod = styled.div`
  margin-top: 0.35rem;

  font-size: 0.78rem;

  font-weight: 800;

  opacity: 0.72;
`;

const PublicationMiniStats = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 0.8rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MiniPublication = styled.div`
  padding: 1rem;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  border-radius: 18px 0 18px 0;

  background: ${colors.bgSoft};

  border: 1px solid rgba(243, 111, 33, 0.12);

  text-align: center;
`;

const MiniNumber = styled.div`
  color: ${colors.accentGold};

  font-size: 1.7rem;

  font-weight: 900;
`;

const MiniLabel = styled.div`
  margin-top: 0.25rem;

  color: ${colors.muted};

  font-size: 0.84rem;
`;

const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  border-radius: 20px 0 20px 0;

  border: 1px solid rgba(243, 111, 33, 0.12);
`;

const PublicationTable = styled.table`
  width: 100%;

  min-width: 620px;

  border-collapse: collapse;

  background: ${colors.bgSoft};

  th,
  td {
    padding: 1rem;

    text-align: center;

    border-bottom: 1px solid rgba(243, 111, 33, 0.08);
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th {
    color: ${colors.accentGold};

    font-size: 0.82rem;

    text-transform: uppercase;

    letter-spacing: 0.06em;
  }

  td {
    color: ${colors.muted};

    font-size: 0.94rem;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: rgba(243, 111, 33, 0.04);
  }
`;

const TableTotal = styled.strong`
  color: ${colors.text};
`;

const FinalCTA = styled.section`
  position: relative;

  overflow: hidden;

  display: grid;

  grid-template-columns: 1fr auto;

  gap: 2rem;

  align-items: center;

  padding: clamp(1.6rem, 4vw, 3rem);

  border-radius: 28px 0 28px 0;

  background: linear-gradient(
    90deg,
    ${colors.bg1}10 80%,
    ${colors.accentGold3} 40%
  );

  //box-shadow: 0 25px 50px rgba(243, 111, 33, 0.22);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const CTAContent = styled.div`
  max-width: 720px;
`;

const CTAKicker = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 0.45rem;

  font-size: 0.88rem;

  font-weight: 900;

  color: rgba(255, 255, 255, 0.9);
`;

const CTATitle = styled.h3`
  margin: 0.5rem 0 0;

  color: #fff;

  font-size: clamp(1.9rem, 4vw, 3.3rem);

  line-height: 1.08;

  font-weight: 900;
`;

const CTATitleAccent = styled.span`
  color:  ${colors.accentGold3} ;
`;

const CTAText = styled.p`
  max-width: 650px;

  margin: 0.9rem 0 0;

  color: rgba(255, 255, 255, 0.9);

  line-height: 1.7;
`;

const CTAEmail = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 0.5rem;

  margin-top: 1rem;

  color: #fff;

  font-weight: 800;

  font-size: 0.92rem;

  word-break: break-word;
`;

const CTAButton = styled(ButtonBase)`
  width: fit-content;

  margin-top: 1.2rem;

  background: rgba(8, 19, 34, 0.9);

  color: #fff;

  box-shadow: 0 12px 25px rgba(8, 19, 34, 0.2);
`;

const CTAVisual = styled.div`
  display: flex;

  justify-content: center;
`;

const CTAIcon = styled.div`
  width: 130px;
  height: 130px;

  border-radius: 40px 0 40px 0;

  display: flex;

  align-items: center;
  justify-content: center;

  color: #fff;

  background: rgba(255, 255, 255, 0.12);

  border: 1px solid rgba(255, 255, 255, 0.18);

  transform: rotate(5deg);

  animation: ${float} 7s ease-in-out infinite;

  @media (max-width: 720px) {
    width: 100px;
    height: 100px;
  }
`; //Soumettre un manuscrit
