import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Landmark,
  Layers3,
  Route,
  BookCheck,
  Send,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import ProModal from "./ProModal";
import { openProgrammeContactModal } from "./programmeContact";

const cleanTitle = (value = "") => value.replace(/^\d{1,2}\.\s*/i, "");

const visualMap = {
  "management-business": () => imagess?.mànegem || imagess?.DirecteurInstitutCortex1,
  "logistique-supply-chain": () =>
    imagess?.loreàt || imagess?.Responsablecommercialegroupe2,
  "digital-technologie-ia": () => imagess?.ingénierie || imagess?.àutàbleàu,
  "industrie-mines-operations": () => imagess?.bàtiment || imagess?.DirecteurduGroupe4,
  "agribusiness-economie-verte": () => imagess?.loreàt || imagess?.DirecteurInstitutCortex2,
  "projet-conseil": () => imagess?.àutàbleàu || imagess?.Responsablecommercialegroupe2,
  "finance-comptabilite-banque": () => imagess?.finànce || imagess?.DirecteurduGroupe4,
  "finance-management-public": () => imagess?.finànce || imagess?.DirecteurduGroupe1,
};

function visualFor(school) {
  return visualMap[school?.slug]?.() || imagess?.loreàt || "/img/cortex-logo.png";
}

function ProgramContent({ program, reduceMotion, catalogue, school }) {
  return (
    <ProgramCard
      as={motion.article}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : .28 }}
    >
      <ProgramHead>
        <div>
          <ProgramLabel>PARCOURS</ProgramLabel>
          <ProgramTitle>{program.title}</ProgramTitle>
        </div>
        {program.duration && (
          <Duration>
            <Clock3 size={14} /> {program.duration}
          </Duration>
        )}
      </ProgramHead>

      {!!program.sections?.length && (
        <SectionStack>
          {program.sections.map((section) => (
            <SubSection key={section.title}>
              <SubTitle>{section.title}</SubTitle>
              <ModuleGrid>
                {section.modules.map((item) => (
                  <Module key={item}>
                    <CheckIcon>
                      <CheckCircle2 size={13} />
                    </CheckIcon>
                    <span>{item}</span>
                  </Module>
                ))}
              </ModuleGrid>
            </SubSection>
          ))}
        </SectionStack>
      )}

      {!!program.modules?.length && (
        <ModuleGrid>
          {program.modules.map((module) => (
            <Module key={module}>
              <CheckIcon>
                <CheckCircle2 size={13} />
              </CheckIcon>
              <span>{module}</span>
            </Module>
          ))}
        </ModuleGrid>
      )}

      <ProgramAction
        type="button"
        onClick={() =>
          openProgrammeContactModal({
            catalogueId: catalogue?.id,
            schoolSlug: school?.slug,
            programTitle: program.title,
            intent: "inscription",
            source: "filiere-program-card",
          })
        }
      >
        <Send size={15} />
        Démarrer l'inscription sur ce parcours
      </ProgramAction>
    </ProgramCard>
  );
}

export default function FiliereModal({ open, onClose, catalogue, school }) {
  const reduceMotion = useReducedMotion();

  if (!catalogue || !school) return null;

  const programCount = (school.blocks || []).reduce(
    (sum, block) => sum + (block.programs?.length || 0),
    0
  );

  const totalPathways = programCount || school.pathways?.length || 0;

  return (
    <ProModal
      open={open}
      onClose={onClose}
      fullScreen
      title={`Explorer le programme · ${catalogue.shortLabel}`}
      labelledById="school-modal-title"
      describedById="school-modal-content"
    >
      <Shell>
        <Hero>
          <HeroCopy>
            <HeroTop>
              <CatalogueBadge>
                <BookCheck size={13} /> {catalogue.shortLabel}
              </CatalogueBadge>
              {school.duration && (
                <Duration>
                  <Clock3 size={14} /> {school.duration}
                </Duration>
              )}
            </HeroTop>

            <h1>{cleanTitle(school.title)}</h1>
            {school.schoolName && <SchoolName>{school.schoolName}</SchoolName>}
            {school.summary && <Summary>{school.summary}</Summary>}

            <Stats>
              <Stat>
                <Layers3 size={17} />
                <strong>{school.blocks?.length || 0}</strong>
                <span>blocs</span>
              </Stat>
              <Stat>
                <Route size={17} />
                <strong>{totalPathways}</strong>
                <span>parcours</span>
              </Stat>
            </Stats>

            <HeroActions>
              <HeroApply
                type="button"
                onClick={() =>
                  openProgrammeContactModal({
                    catalogueId: catalogue?.id,
                    schoolSlug: school?.slug,
                    intent: "inscription",
                    source: "filiere-hero",
                  })
                }
              >
                <Send size={17} />
                Postuler / être contacté
              </HeroApply>
              <HeroHint>Votre Grande École sera déjà sélectionnée.</HeroHint>
            </HeroActions>
          </HeroCopy>

          <HeroVisual>
            <img
              src={visualFor(school)}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            <VisualShade />
            <VisualSeal
              as={motion.span}
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -6, 0], rotate: [0, -4, 0, 4, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <GraduationCap size={25} />
            </VisualSeal>
          </HeroVisual>
        </Hero>

        <MobileQuickNav aria-label="Navigation rapide dans la Grande École">
          <MobileQuickTrack>
            <MobileQuickLink href="#school-content-start">
              <BookOpen size={14} />
              Contenu
            </MobileQuickLink>

            {(school.blocks || []).map((block, index) => (
              <MobileQuickLink
                key={`mobile-${block.title}`}
                href={`#block-${index + 1}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {cleanTitle(block.title)}
              </MobileQuickLink>
            ))}

            {!!school.pathways?.length && (
              <MobileQuickLink href="#school-pathways">
                <Route size={14} />
                Parcours
              </MobileQuickLink>
            )}

            {!!school.qualificationLevels?.length && (
              <MobileQuickLink href="#school-levels">
                <GraduationCap size={14} />
                Niveaux
              </MobileQuickLink>
            )}
          </MobileQuickTrack>
        </MobileQuickNav>

        <ContentLayout>
          <SideRail aria-label="Navigation de l'école">
            <RailCard>
              <RailTitle>Navigation rapide</RailTitle>
              <RailLink href="#school-content-start">
                <BookOpen size={15} /> Contenu
              </RailLink>
              {(school.blocks || []).map((block, index) => (
                <RailLink key={block.title} href={`#block-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {cleanTitle(block.title)}
                </RailLink>
              ))}
              {!!school.pathways?.length && (
                <RailLink href="#school-pathways">
                  <Route size={15} /> Parcours
                </RailLink>
              )}
              {!!school.qualificationLevels?.length && (
                <RailLink href="#school-levels">
                  <GraduationCap size={15} /> Niveaux
                </RailLink>
              )}
              <RailApply
                type="button"
                onClick={() =>
                  openProgrammeContactModal({
                    catalogueId: catalogue?.id,
                    schoolSlug: school?.slug,
                    intent: "inscription",
                    source: "filiere-rail",
                  })
                }
              >
                <Send size={15} /> Candidater
              </RailApply>
              <BackButton type="button" onClick={onClose}>
                <ArrowLeft size={16} /> Retour au catalogue
              </BackButton>
            </RailCard>
          </SideRail>

          <Body id="school-content-start">
            {(school.blocks || []).map((block, index) => (
              <Block
                id={`block-${index + 1}`}
                key={`${block.title}-${index}`}
                as={motion.section}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: reduceMotion ? 0 : .3 }}
              >
                <BlockHead>
                  <BlockNumber>{String(index + 1).padStart(2, "0")}</BlockNumber>
                  <div>
                    <BlockKicker>BLOC DE COMPÉTENCES</BlockKicker>
                    <BlockTitle>{block.title}</BlockTitle>
                    {block.duration && (
                      <BlockMeta>
                        <Clock3 size={14} /> {block.duration}
                      </BlockMeta>
                    )}
                  </div>
                </BlockHead>

                {!!block.programs?.length ? (
                  <ProgramList>
                    {block.programs.map((program, programIndex) => (
                      <ProgramContent
                        key={`${program.title}-${programIndex}`}
                        program={program}
                        reduceMotion={reduceMotion}
                        catalogue={catalogue}
                        school={school}
                      />
                    ))}
                  </ProgramList>
                ) : (
                  !!block.modules?.length && (
                    <ModuleGrid>
                      {block.modules.map((module) => (
                        <Module key={module}>
                          <CheckIcon>
                            <CheckCircle2 size={13} />
                          </CheckIcon>
                          <span>{module}</span>
                        </Module>
                      ))}
                    </ModuleGrid>
                  )
                )}
              </Block>
            ))}

            {!!school.pathways?.length && (
              <Pathways id="school-pathways">
                <SectionHeading>
                  <Route size={18} /> Parcours
                </SectionHeading>
                <PathGrid>
                  {school.pathways.map((path, index) => (
                    <Path key={path}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {path}
                    </Path>
                  ))}
                </PathGrid>
              </Pathways>
            )}

            {!!school.qualificationLevels?.length && (
              <Pathways id="school-levels">
                <SectionHeading>
                  <GraduationCap size={18} /> Niveaux
                </SectionHeading>
                <LevelGrid>
                  {school.qualificationLevels.map((level) => (
                    <Level key={level.title}>
                      <LevelIcon>
                        <GraduationCap size={17} />
                      </LevelIcon>
                      <b>{level.title}</b>
                      {level.duration && <span>{level.duration}</span>}
                      {level.description && <p>{level.description}</p>}
                    </Level>
                  ))}
                </LevelGrid>
              </Pathways>
            )}

            {school.slug === "finance-management-public" && (
              <SourceNote>
                <Landmark size={17} /> Cette offre figure dans le catalogue Cortex
                Executive Academy.
              </SourceNote>
            )}
          </Body>
        </ContentLayout>

        <MobileActionBar>
          <MobileActionInner>
            <MobileApply
              type="button"
              onClick={() =>
                openProgrammeContactModal({
                  catalogueId: catalogue?.id,
                  schoolSlug: school?.slug,
                  intent: "inscription",
                  source: "filiere-mobile-sticky",
                })
              }
            >
              <Send size={16} />
              Candidater
            </MobileApply>

            <MobileBack type="button" onClick={onClose}>
              <ArrowLeft size={16} />
              Retour
            </MobileBack>
          </MobileActionInner>
        </MobileActionBar>
      </Shell>
    </ProModal>
  );
}

const Shell = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 100%;
  overflow-x: clip;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  color: ${colors.text};
  background:
    radial-gradient(620px 380px at 100% 0%, rgba(243,111,33,.055), transparent 68%),
    linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft});
`;

const Hero = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "visual"
    "copy";
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(135deg, ${colors.bg1}, ${colors.bg});

  /* Desktop : vrai bandeau plein écran. Aucun max-height : aucun texte n'est coupé. */
  @media (min-width: 1081px) {
    grid-template-columns: minmax(0, 52%) minmax(0, 48%);
    grid-template-areas: "copy visual";
    align-items: stretch;
    min-height: clamp(340px, 42vh, 480px);
    border-radius: 0;
    overflow: visible;
    background:
      radial-gradient(980px 420px at 0% 0%, rgba(42,75,124,.24), transparent 70%),
      linear-gradient(135deg, ${colors.bg1}, ${colors.bg});
  }

  @media (min-width: 1600px) {
    grid-template-columns: minmax(0, 54%) minmax(0, 46%);
    min-height: clamp(380px, 44vh, 520px);
  }
`;

const HeroCopy = styled.div`
  grid-area: copy;
  position: relative;
  z-index: 2;
  min-width: 0;
  padding: 22px 14px 24px;

  h1 {
    max-width: 920px;
    margin: 13px 0 0;
    color: ${colors.text};
    font-size: clamp(28px, 8vw, 42px);
    line-height: 1.03;
    letter-spacing: -.04em;
    overflow-wrap: anywhere;
  }

  @media (min-width: 641px) {
    padding: 30px 24px 34px;

    h1 {
      font-size: clamp(34px, 5.4vw, 54px);
    }
  }

  @media (min-width: 1081px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(34px, 4vh, 58px) clamp(28px, 3vw, 56px);

    h1 {
      max-width: none;
      font-size: clamp(38px, 3.6vw, 62px);
      line-height: 1.01;
      letter-spacing: -.047em;
    }
  }
`;

const HeroTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const CatalogueBadge = styled.span`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  border-radius: 999px;
  color: ${colors.accentGold3};
  border: 1px solid rgba(243,111,33,.28);
  background: rgba(243,111,33,.08);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .07em;
`;

const Duration = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.accentGoldLight};
  font-size: 11px;
  font-weight: 800;
`;

const SchoolName = styled.p`
  margin: 9px 0 0;
  color: ${colors.accentGold};
  font-size: 13px;
  line-height: 1.4;
  font-weight: 850;
`;

const Summary = styled.p`
  white-space: pre-line;
  max-width: 880px;
  margin: 13px 0 0;
  color: ${colors.muted};
  font-size: 13px;
  line-height: 1.62;

  @media (min-width: 641px) {
    margin-top: 16px;
    font-size: clamp(14px, 1.8vw, 17px);
    line-height: 1.72;
  }

  @media (min-width: 1081px) {
    max-width: 900px;
    font-size: 16px;
    line-height: 1.72;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 18px;
  max-width: 360px;

  @media (min-width: 641px) {
    display: flex;
    gap: 9px;
    flex-wrap: wrap;
    max-width: none;
    margin-top: 22px;
  }
`;

const HeroActions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  margin-top: 16px;

  @media (min-width: 641px) {
    display: flex;
    gap: 9px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 18px;
  }
`;

const HeroApply = styled.button`
  appearance: none;
  cursor: pointer;
  width: 100%;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  border-radius: 15px 0 15px 0;
  border: 1px solid rgba(243,111,33,.78);
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  box-shadow: 0 14px 32px rgba(243,111,33,.18);
  transition: transform .18s ease, box-shadow .18s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(243,111,33,.24);
    outline: none;
  }

  @media (min-width: 641px) {
    width: auto;
    min-height: 44px;
  }
`;

const HeroHint = styled.span`
  color: ${colors.muted};
  font-size: 10px;
  line-height: 1.4;
  text-align: center;

  @media (min-width: 641px) {
    text-align: left;
  }
`;

const Stat = styled.span`
  min-width: 0;
  min-height: 52px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  justify-content: start;
  gap: 6px;
  padding: 9px 10px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.09);
  background: rgba(255,255,255,.04);

  svg,
  strong {
    color: ${colors.accentGold};
  }

  span {
    min-width: 0;
    color: ${colors.muted};
    font-size: 11px;
  }

  @media (min-width: 641px) {
    min-height: 0;
    display: inline-flex;
    gap: 7px;
    padding: 9px 11px;

    span {
      font-size: 12px;
    }
  }
`;

const HeroVisual = styled.div`
  grid-area: visual;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 250px;
  overflow: hidden;
  background: ${colors.bgSoft};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  @media (min-width: 641px) and (max-width: 1080px) {
    aspect-ratio: 21 / 9;
    max-height: 330px;
  }

  @media (min-width: 1081px) {
    align-self: stretch;
    min-height: clamp(340px, 42vh, 480px);
    max-height: none;
    aspect-ratio: auto;

    img {
      min-height: clamp(340px, 42vh, 480px);
      transition: transform .6s cubic-bezier(.22,1,.36,1);
    }

    &:hover img {
      transform: scale(1.018);
    }
  }

  @media (min-width: 1600px) {
    min-height: clamp(380px, 44vh, 520px);

    img {
      min-height: clamp(380px, 44vh, 520px);
    }
  }
`;

const VisualShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(7,23,39,.06), rgba(4,9,18,.58)),
    radial-gradient(460px 220px at 0% 50%, rgba(13,29,74,.3), transparent 72%);

  @media (min-width: 901px) {
    background:
      linear-gradient(90deg, rgba(7,23,39,.44), transparent 48%),
      linear-gradient(180deg, transparent 48%, rgba(4,9,18,.55));
  }
`;

const VisualSeal = styled.span`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 16px 0 16px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 14px 34px rgba(0,0,0,.28);

  @media (min-width: 641px) {
    right: 20px;
    top: 20px;
    width: 56px;
    height: 56px;
    border-radius: 20px 0 20px 0;
  }
`;

const MobileQuickNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 12;
  display: block;
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(7,23,39,.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileQuickTrack = styled.div`
  display: flex;
  gap: 7px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scrollbar-width: none;
  padding: 9px 10px;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileQuickLink = styled.a`
  flex: 0 0 auto;
  min-height: 38px;
  max-width: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(255,255,255,.09);
  color: ${colors.muted};
  background: rgba(255,255,255,.035);
  font-size: 10px;
  line-height: 1.2;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  scroll-snap-align: start;

  span,
  svg {
    flex: 0 0 auto;
    color: ${colors.accentGold};
  }

  &:focus-visible {
    outline: 2px solid rgba(243,111,33,.35);
    outline-offset: 2px;
  }
`;

const ContentLayout = styled.div`
  width: min(1320px, calc(100% - 20px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  align-items: start;
  padding: 16px 0 88px;
  box-sizing: border-box;

  @media (min-width: 641px) {
    width: min(1320px, calc(100% - 32px));
    padding: 28px 0 92px;
    gap: 18px;
  }

  /* Tablette / desktop : surface réellement plein écran.
     Aucune largeur maximale ; seulement un gutter de sécurité. */
  @media (min-width: 900px) {
    width: 100%;
    max-width: none;
    margin: 0;
    grid-template-columns: clamp(250px, 20vw, 310px) minmax(0, 1fr);
    gap: clamp(18px, 2vw, 34px);
    padding: clamp(22px, 2.4vw, 38px) clamp(18px, 2.2vw, 34px) 72px;
  }

  @media (min-width: 1440px) {
    grid-template-columns: clamp(285px, 18vw, 340px) minmax(0, 1fr);
    gap: clamp(24px, 2.2vw, 40px);
    padding-left: clamp(24px, 2.4vw, 46px);
    padding-right: clamp(24px, 2.4vw, 46px);
  }
`;

const SideRail = styled.aside`
  display: none;
  min-width: 0;

  @media (min-width: 900px) {
    display: block;
    position: sticky;
    top: 24px;
    align-self: start;
  }
`;

const RailCard = styled.nav`
  display: grid;
  gap: 7px;
  padding: 18px;
  max-height: calc(100dvh - 48px);
  overflow: auto;
  overscroll-behavior: contain;
  border: 1px solid rgba(255,255,255,.085);
  border-radius: 24px 0 24px 0;
  background:
    linear-gradient(180deg, rgba(13,29,74,.88), rgba(7,23,39,.78));
  box-shadow: 0 18px 48px rgba(0,0,0,.18);
  backdrop-filter: blur(16px);
  scrollbar-width: thin;
  scrollbar-color: rgba(243,111,33,.36) transparent;
`;

const RailTitle = styled.div`
  margin-bottom: 5px;
  color: ${colors.accentGold};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .1em;
  text-transform: uppercase;
`;

const RailLink = styled.a`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 12px 0 12px 0;
  color: ${colors.muted};
  background: rgba(255,255,255,.025);
  font-size: 11px;
  line-height: 1.42;
  white-space: normal;
  overflow-wrap: anywhere;
  transition: color .16s ease, background .16s ease, transform .16s ease;

  > span {
    color: ${colors.accentGold};
    font-weight: 900;
  }

  &:hover,
  &:focus-visible {
    color: ${colors.text};
    background: rgba(243,111,33,.07);
    transform: translateX(2px);
    outline: none;
  }
`;

const RailApply = styled.button`
  appearance: none;
  cursor: pointer;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px;
  border-radius: 13px 0 13px 0;
  border: 1px solid rgba(243,111,33,.68);
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 11px;
  font-weight: 950;
  transition: transform .16s ease, box-shadow .16s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(243,111,33,.18);
    outline: none;
  }
`;

const BackButton = styled.button`
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px;
  border-radius: 13px 0 13px 0;
  border: 1px solid rgba(243,111,33,.24);
  color: ${colors.accentGold};
  background: rgba(243,111,33,.07);
  cursor: pointer;
  font-size: 11px;
  font-weight: 850;
`;

const Body = styled.div`
  width: 100%;
  min-width: 0;
  display: grid;
  gap: 12px;

  @media (min-width: 641px) {
    gap: 18px;
  }

  @media (min-width: 900px) {
    gap: 22px;
  }

  & * {
    max-width: 100%;
  }
`;

const Block = styled.section`
  scroll-margin-top: 64px;
  min-width: 0;
  border: 1px solid rgba(255,255,255,.085);
  border-radius: 18px 0 18px 0;
  padding: 15px 12px;
  background: linear-gradient(
    145deg,
    rgba(255,255,255,.045),
    rgba(255,255,255,.015)
  );

  @media (min-width: 641px) {
    border-radius: 24px 0 24px 0;
    padding: clamp(18px,3vw,28px);
  }

  @media (min-width: 900px) {
    scroll-margin-top: 24px;
    padding: 26px 28px 30px;
    border-radius: 26px 0 26px 0;
    background:
      radial-gradient(520px 180px at 0% 0%, rgba(42,75,124,.11), transparent 72%),
      linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.018));
    box-shadow: 0 14px 38px rgba(0,0,0,.10);
  }
`;

const BlockHead = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  margin-bottom: 14px;

  @media (min-width: 1081px) {
    gap: 14px;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const BlockNumber = styled.span`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 13px 0 13px 0;
  background: ${colors.accentGold};
  color: ${colors.bg};
  font-size: 12px;
  font-weight: 950;

  @media (min-width: 641px) {
    width: 42px;
    height: 42px;
    border-radius: 14px 0 14px 0;
  }
`;

const BlockKicker = styled.span`
  color: ${colors.accentGold3};
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .11em;
`;

const BlockTitle = styled.h3`
  margin: 4px 0 0;
  color: ${colors.text};
  font-size: clamp(17px, 5vw, 25px);
  line-height: 1.25;
  overflow-wrap: anywhere;
`;

const BlockMeta = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.muted};
  font-size: 11px;
`;

const ProgramList = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
`;

const ProgramCard = styled.article`
  min-width: 0;
  padding: 14px 11px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px 0 16px 0;
  background: rgba(7,23,39,.46);

  @media (min-width: 641px) {
    padding: 16px;
    border-radius: 18px 0 18px 0;
  }

  @media (min-width: 1081px) {
    padding: 18px;
    background: rgba(7,23,39,.52);
    transition: border-color .2s ease, transform .2s ease, background .2s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: rgba(243,111,33,.18);
      background: rgba(7,23,39,.64);
    }
  }
`;

const ProgramHead = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  align-items: start;
  margin-bottom: 11px;

  @media (min-width: 561px) {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const ProgramLabel = styled.span`
  color: ${colors.accentGold3};
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .11em;
`;

const ProgramTitle = styled.h4`
  margin: 4px 0 0;
  color: ${colors.text};
  font-size: 15px;
  line-height: 1.35;
  overflow-wrap: anywhere;

  @media (min-width: 641px) {
    font-size: 17px;
  }

  @media (min-width: 1081px) {
    font-size: 18px;
    line-height: 1.42;
  }
`;

const ProgramAction = styled.button`
  appearance: none;
  cursor: pointer;
  width: 100%;
  min-height: 46px;
  margin-top: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 11px;
  border-radius: 13px 0 13px 0;
  border: 1px solid rgba(243,111,33,.26);
  color: ${colors.accentGold};
  background: rgba(243,111,33,.055);
  font-size: 11px;
  line-height: 1.25;
  font-weight: 900;
  transition: transform .16s ease, border-color .16s ease, background .16s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(243,111,33,.5);
    background: rgba(243,111,33,.09);
    outline: none;
  }

  @media (min-width: 641px) {
    width: fit-content;
    min-height: 42px;
  }
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;

  @media (min-width: 761px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 8px;
  }

  /* On évite 3 colonnes trop serrées : meilleure lecture professionnelle. */
  @media (min-width: 1500px) {
    gap: 10px;
  }
`;

const Module = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  border-radius: 12px;
  color: ${colors.muted};
  background: rgba(255,255,255,.025);
  font-size: 12px;
  line-height: 1.48;
  overflow-wrap: anywhere;

  @media (min-width: 641px) {
    padding: 10px 11px;
    font-size: 13px;
  }
`;

const CheckIcon = styled.span`
  flex: 0 0 auto;
  margin-top: 1px;
  color: ${colors.accentGold};
`;

const SectionStack = styled.div`
  display: grid;
  gap: 12px;
`;

const SubSection = styled.div`
  min-width: 0;
  display: grid;
  gap: 8px;
`;

const SubTitle = styled.h5`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: 13px;
  line-height: 1.4;
`;

const Pathways = styled.section`
  scroll-margin-top: 64px;
  min-width: 0;
  padding: 15px 12px;
  border: 1px solid rgba(243,111,33,.18);
  border-radius: 18px 0 18px 0;
  background: rgba(243,111,33,.035);

  @media (min-width: 641px) {
    padding: clamp(18px,3vw,28px);
    border-radius: 24px 0 24px 0;
  }

  @media (min-width: 1081px) {
    scroll-margin-top: 24px;
  }
`;

const SectionHeading = styled.h3`
  margin: 0 0 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.accentGold};
  font-size: 17px;

  @media (min-width: 641px) {
    font-size: 19px;
  }
`;

const PathGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;

  @media (min-width: 761px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 8px;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }
`;

const Path = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px;
  align-items: start;
  padding: 10px;
  border-radius: 12px;
  background: rgba(255,255,255,.035);
  color: ${colors.text};
  font-size: 12px;
  line-height: 1.45;
  overflow-wrap: anywhere;

  span {
    color: ${colors.accentGold};
    font-weight: 900;
    font-size: 10px;
  }

  @media (min-width: 641px) {
    padding: 11px;
    font-size: 13px;
  }
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  @media (min-width: 701px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }

  @media (min-width: 1260px) {
    grid-template-columns: repeat(3,minmax(0,1fr));
    gap: 10px;
  }
`;

const Level = styled.article`
  min-width: 0;
  padding: 13px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 15px 0 15px 0;
  background: rgba(255,255,255,.025);

  b {
    display: block;
    margin-top: 9px;
    color: ${colors.text};
    font-size: 13px;
    line-height: 1.4;
  }

  > span {
    display: block;
    margin-top: 7px;
    color: ${colors.accentGold};
    font-weight: 900;
    font-size: 13px;
  }

  p {
    margin: 7px 0 0;
    color: ${colors.muted};
    font-size: 12px;
    line-height: 1.5;
  }

  @media (min-width: 641px) {
    padding: 15px;
    border-radius: 16px 0 16px 0;
  }
`;

const LevelIcon = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 12px 0 12px 0;
  color: ${colors.accentGold};
  background: rgba(243,111,33,.08);
  border: 1px solid rgba(243,111,33,.18);
`;

const SourceNote = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.08);
  color: ${colors.muted};
  background: rgba(255,255,255,.025);
  font-size: 12px;
  line-height: 1.45;

  svg {
    flex: 0 0 auto;
    color: ${colors.accentGold};
  }
`;

const MobileActionBar = styled.div`
  position: sticky;
  z-index: 20;
  bottom: 0;
  display: block;
  width: 100%;
  padding:
    8px
    max(10px, env(safe-area-inset-right, 0px))
    max(8px, env(safe-area-inset-bottom, 0px))
    max(10px, env(safe-area-inset-left, 0px));
  border-top: 1px solid rgba(255,255,255,.09);
  background: rgba(7,23,39,.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileActionInner = styled.div`
  width: min(100%, 620px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
`;

const MobileApply = styled.button`
  min-width: 0;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 14px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(243,111,33,.72);
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(243,111,33,.18);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

const MobileBack = styled.button`
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 13px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.11);
  color: ${colors.text};
  background: rgba(255,255,255,.045);
  font-size: 11px;
  font-weight: 850;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

