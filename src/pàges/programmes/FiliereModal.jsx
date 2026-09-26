import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
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
      title={cleanTitle(school.title)}
      labelledById="school-modal-title"
      describedById="school-modal-content"
    >
      <Shell id="school-modal-content">
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
      </Shell>
    </ProModal>
  );
}

const Shell = styled.div`
  min-height: 100%;
  color: ${colors.text};
  background: linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft});
`;

const Hero = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
  gap: 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(135deg, ${colors.bg1}, ${colors.bg});

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  padding: clamp(30px, 5vw, 68px) clamp(20px, 5vw, 64px) 40px;

  h1 {
    max-width: 920px;
    margin: 15px 0 0;
    color: ${colors.text};
    font-size: clamp(32px, 5vw, 64px);
    line-height: 1;
    letter-spacing: -.045em;
  }
`;

const HeroTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const CatalogueBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  border-radius: 999px;
  color: ${colors.accentGold3};
  border: 1px solid rgba(243,111,33,.28);
  background: rgba(243,111,33,.08);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
`;

const Duration = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.accentGoldLight};
  font-size: 12px;
  font-weight: 800;
`;

const SchoolName = styled.p`
  margin: 10px 0 0;
  color: ${colors.accentGold};
  font-weight: 800;
`;

const Summary = styled.p`
  white-space: pre-line;
  max-width: 880px;
  margin: 16px 0 0;
  color: ${colors.muted};
  font-size: clamp(14px, 1.8vw, 17px);
  line-height: 1.72;
`;

const Stats = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 22px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 18px;
`;

const HeroApply = styled.button`
  appearance: none;
  cursor: pointer;
  min-height: 44px;
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

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(243,111,33,.24);
    outline: none;
  }
`;

const HeroHint = styled.span`
  color: ${colors.muted};
  font-size: 10px;
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.09);
  background: rgba(255,255,255,.04);

  svg,
  strong {
    color: ${colors.accentGold};
  }

  span {
    color: ${colors.muted};
    font-size: 12px;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  min-height: 360px;
  overflow: hidden;
  background: ${colors.bgSoft};

  img {
    width: 100%;
    height: 100%;
    min-height: 360px;
    display: block;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    min-height: 260px;

    img {
      min-height: 260px;
      max-height: 360px;
    }
  }
`;

const VisualShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(7,23,39,.44), transparent 48%),
    linear-gradient(180deg, transparent 48%, rgba(4,9,18,.55));
`;

const VisualSeal = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 20px 0 20px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 16px 40px rgba(0,0,0,.28);
`;

const ContentLayout = styled.div`
  width: min(1320px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 245px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
  padding: clamp(28px, 5vw, 58px) 0 76px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const SideRail = styled.aside`
  position: sticky;
  top: 18px;

  @media (max-width: 1080px) {
    display: none;
  }
`;

const RailCard = styled.nav`
  display: grid;
  gap: 7px;
  padding: 14px;
  max-height: calc(100dvh - 40px);
  overflow: auto;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 22px 0 22px 0;
  background: rgba(7,23,39,.76);
  backdrop-filter: blur(14px);
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
  line-height: 1.35;
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
  min-width: 0;
  display: grid;
  gap: 18px;
`;

const Block = styled.section`
  scroll-margin-top: 24px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 24px 0 24px 0;
  padding: clamp(18px,3vw,28px);
  background: linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015));
`;

const BlockHead = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  margin-bottom: 17px;
`;

const BlockNumber = styled.span`
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  background: ${colors.accentGold};
  color: ${colors.bg};
  font-weight: 950;
`;

const BlockKicker = styled.span`
  color: ${colors.accentGold3};
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .12em;
`;

const BlockTitle = styled.h3`
  margin: 4px 0 0;
  color: ${colors.text};
  font-size: clamp(18px,2.2vw,25px);
  line-height: 1.25;
`;

const BlockMeta = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.muted};
  font-size: 12px;
`;

const ProgramList = styled.div`
  display: grid;
  gap: 12px;
`;

const ProgramCard = styled.article`
  padding: 16px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px 0 18px 0;
  background: rgba(7,23,39,.46);
`;

const ProgramHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const ProgramLabel = styled.span`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .12em;
`;

const ProgramTitle = styled.h4`
  margin: 4px 0 0;
  color: ${colors.text};
  font-size: 17px;
  line-height: 1.35;
`;

const ProgramAction = styled.button`
  appearance: none;
  cursor: pointer;
  width: fit-content;
  margin-top: 13px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(243,111,33,.26);
  color: ${colors.accentGold};
  background: rgba(243,111,33,.055);
  font-size: 11px;
  font-weight: 900;
  transition: transform .16s ease, border-color .16s ease, background .16s ease;

  &:hover,
  &:focus-visible {
    transform: translateX(2px);
    border-color: rgba(243,111,33,.5);
    background: rgba(243,111,33,.09);
    outline: none;
  }
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 8px;

  @media(max-width:720px) {
    grid-template-columns: 1fr;
  }
`;

const Module = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 11px;
  border-radius: 12px;
  color: ${colors.muted};
  background: rgba(255,255,255,.025);
  font-size: 13px;
  line-height: 1.45;
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
  display: grid;
  gap: 8px;
`;

const SubTitle = styled.h5`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: 14px;
`;

const Pathways = styled.section`
  scroll-margin-top: 24px;
  padding: clamp(18px,3vw,28px);
  border: 1px solid rgba(243,111,33,.18);
  border-radius: 24px 0 24px 0;
  background: rgba(243,111,33,.035);
`;

const SectionHeading = styled.h3`
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.accentGold};
  font-size: 19px;
`;

const PathGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 8px;

  @media(max-width:720px) {
    grid-template-columns: 1fr;
  }
`;

const Path = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 9px;
  align-items: start;
  padding: 11px;
  border-radius: 12px;
  background: rgba(255,255,255,.035);
  color: ${colors.text};
  font-size: 13px;
  line-height: 1.45;

  span {
    color: ${colors.accentGold};
    font-weight: 900;
    font-size: 10px;
  }
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 10px;

  @media(max-width:840px) {
    grid-template-columns: 1fr;
  }
`;

const Level = styled.article`
  padding: 15px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px 0 16px 0;
  background: rgba(255,255,255,.025);

  b {
    display: block;
    margin-top: 10px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.08);
  color: ${colors.muted};
  background: rgba(255,255,255,.025);
  font-size: 12px;

  svg {
    color: ${colors.accentGold};
  }
`;
