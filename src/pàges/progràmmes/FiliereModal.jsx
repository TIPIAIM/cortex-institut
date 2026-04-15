import { useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import ProModal from "./ProModal";
import { imagess } from "../../assets/imagess";
import {
  BriefcaseBusiness,
  Banknote,
  Users,
  ShieldCheck,
  Cpu,
  HeartPulse,
  Building2,
  Boxes,
  Megaphone,
  Layers,
  Download,
  ExternalLink,
  Clock3,
  BadgeCheck,
  Target,
  BookOpen,
  Sparkles,
  Files,
  LayoutGrid,
  ListChecks,
  Info,
} from "lucide-react";

function cld(url, w = 1400) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

const iconMap = {
  briefcase: BriefcaseBusiness,
  banknote: Banknote,
  users: Users,
  shield: ShieldCheck,
  cpu: Cpu,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
  boxes: Boxes,
  megaphone: Megaphone,
};

export default function FiliereModal({ open, onClose, filiere }) {
  const computed = useMemo(() => {
    if (!filiere) return null;

    const Icon = iconMap[filiere.iconName] || Layers;
    const hero =
      (filiere.heroKey && imagess?.[filiere.heroKey]) ||
      imagess?.loreàt ||
      "/img/placeholder.jpg";

    const detailedPrograms = filiere.programCards || [];
    const fallbackPrograms = filiere.programs || [];

    return {
      Icon,
      hero,
      detailedPrograms,
      fallbackPrograms,
      stats: [
        {
          label: "Programmes détaillés",
          value: String(detailedPrograms.length),
          icon: <Files size={16} />,
        },
        {
          label: "Programmes listés",
          value: String(fallbackPrograms.length),
          icon: <LayoutGrid size={16} />,
        },
        {
          label: "Mode",
          value: filiere.meta?.mode || "—",
          icon: <BadgeCheck size={16} />,
        },
        {
          label: "Durée",
          value: filiere.meta?.duration || "—",
          icon: <Clock3 size={16} />,
        },
      ],
      navItems: [
        {
          id: "modal-overview",
          label: "Vue d’ensemble",
          icon: <Info size={15} />,
        },
        {
          id: "modal-programmes-detail",
          label: "Programmes détaillés",
          icon: <BookOpen size={15} />,
        },
        {
          id: "modal-programmes-list",
          label: "Liste complète",
          icon: <ListChecks size={15} />,
        },
      ],
    };
  }, [filiere]);

  if (!filiere || !computed) return null;

  const {
    Icon,
    hero,
    detailedPrograms,
    fallbackPrograms,
    stats,
    navItems,
  } = computed;

  return (
    <ProModal
      open={open}
      onClose={onClose}
      fullScreen
      title={filiere.title}
      labelledById="filiere-modal-title"
      describedById="filiere-modal-desc"
    >
      <Wrap id="filiere-modal-desc">
        <Layout>
          <SideRail aria-label="Navigation rapide du modal">
            <RailCard>
              <RailTitle>
                <Layers size={16} />
                Navigation rapide
              </RailTitle>

              <RailNav>
                {navItems.map((item) => (
                  <RailLink key={item.id} href={`#${item.id}`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </RailLink>
                ))}
              </RailNav>

              <RailHint>
                Utilise ces raccourcis pour accéder plus vite aux sections.
              </RailHint>
            </RailCard>
          </SideRail>

          <MainColumn>
            <HeroSection id="modal-overview">
              <HeroVisual>
                <HeroImage
                  src={cld(hero, 1400)}
                  alt={filiere.title}
                  loading="lazy"
                  decoding="async"
                />
                <HeroOverlay />
                <HeroBadge>
                  <Icon size={16} />
                  {filiere.title}
                </HeroBadge>
              </HeroVisual>

              <HeroContent
                as={motion.div}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <TitleBlock>
                  <Title id="filiere-modal-title">{filiere.title}</Title>
                  <Desc>{filiere.description}</Desc>
                </TitleBlock>

                <MetaWrap>
                  {filiere.meta?.level && (
                    <MetaPill>{filiere.meta.level}</MetaPill>
                  )}
                  {filiere.meta?.mode && <MetaPill>{filiere.meta.mode}</MetaPill>}
                  {filiere.meta?.duration && (
                    <MetaPill>{filiere.meta.duration}</MetaPill>
                  )}
                </MetaWrap>

                {Array.isArray(filiere.outcomes) &&
                  filiere.outcomes.length > 0 && (
                    <OutcomeList>
                      {filiere.outcomes.map((item, idx) => (
                        <Outcome key={idx}>
                          <Sparkles size={15} />
                          <span>{item}</span>
                        </Outcome>
                      ))}
                    </OutcomeList>
                  )}
              </HeroContent>
            </HeroSection>

            <StatsGrid>
              {stats.map((item, idx) => (
                <StatCard key={idx}>
                  <StatTop>
                    <StatIcon>{item.icon}</StatIcon>
                    <StatLabel>{item.label}</StatLabel>
                  </StatTop>
                  <StatValue>{item.value}</StatValue>
                </StatCard>
              ))}
            </StatsGrid>

            {detailedPrograms.length > 0 && (
              <Section id="modal-programmes-detail">
                <SectionTitle>
                  <BookOpen size={18} />
                  Programmes détaillés
                </SectionTitle>

                <ProgramsGrid>
                  {detailedPrograms.map((program, idx) => (
                    <ProgramCard
                      as={motion.article}
                      key={program.id || idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.32, delay: idx * 0.03 }}
                    >
                      <CardHead>
                        <div>
                          {program.type && (
                            <ProgramType>{program.type}</ProgramType>
                          )}
                          <ProgramTitle>{program.title}</ProgramTitle>
                        </div>

                        {program.duration && (
                          <MiniPill>
                            <Clock3 size={14} />
                            {program.duration}
                          </MiniPill>
                        )}
                      </CardHead>

                      {program.summary && (
                        <ProgramSummary>{program.summary}</ProgramSummary>
                      )}

                      <MetaGrid>
                        {program.schedule && (
                          <MetaBox>
                            <span className="label">Organisation</span>
                            <span className="value">{program.schedule}</span>
                          </MetaBox>
                        )}

                        {program.volume && (
                          <MetaBox>
                            <span className="label">Volume</span>
                            <span className="value">{program.volume}</span>
                          </MetaBox>
                        )}

                        {program.price && (
                          <MetaBox>
                            <span className="label">Tarif indicatif</span>
                            <span className="value">{program.price}</span>
                          </MetaBox>
                        )}

                        {program.certification && (
                          <MetaBox>
                            <span className="label">Certification</span>
                            <span className="value">{program.certification}</span>
                          </MetaBox>
                        )}
                      </MetaGrid>

                      {Array.isArray(program.target) &&
                        program.target.length > 0 && (
                          <Block>
                            <BlockTitle>
                              <Target size={16} />
                              Public cible
                            </BlockTitle>
                            <BulletList>
                              {program.target.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </BulletList>
                          </Block>
                        )}

                      {Array.isArray(program.modules) &&
                        program.modules.length > 0 && (
                          <Block>
                            <BlockTitle>
                              <BadgeCheck size={16} />
                              Modules clés
                            </BlockTitle>
                            <BulletList>
                              {program.modules.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </BulletList>
                          </Block>
                        )}

                      <Actions>
                        {program.docHref && (
                          <>
                            <PrimaryLink
                              href={program.docHref}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Download size={16} />
                              Télécharger la fiche
                            </PrimaryLink>

                            <GhostLink
                              href={program.docHref}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink size={16} />
                              Ouvrir
                            </GhostLink>
                          </>
                        )}
                      </Actions>
                    </ProgramCard>
                  ))}
                </ProgramsGrid>
              </Section>
            )}

            <Section id="modal-programmes-list">
              <SectionTitle>
                <Layers size={18} />
                Liste complète des programmes de la filière
              </SectionTitle>

              <SimpleProgramsGrid>
                {fallbackPrograms.map((item, idx) => (
                  <SimpleProgram key={`${item}-${idx}`}>{item}</SimpleProgram>
                ))}
              </SimpleProgramsGrid>
            </Section>
          </MainColumn>
        </Layout>
      </Wrap>
    </ProModal>
  );
}

const Wrap = styled.div`
  display: grid;
  gap: 20px;
  color: ${colors.text};
  padding-bottom: 6px;
`;

const Layout = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 1180px) {
    grid-template-columns: 280px minmax(0, 1fr);
    align-items: start;
  }
`;

const SideRail = styled.aside`
  display: none;

  @media (min-width: 1180px) {
    display: block;
    position: sticky;
    top: 0;
    align-self: start;
  }
`;

const RailCard = styled.div`
  border: 1px solid #1f2c44;
  border-radius: 20px 0 20px 0;
  background: linear-gradient(120deg, ${colors.bgSoft} 64%, ${colors.bg} 50%);
  padding: 16px;
  display: grid;
  gap: 14px;
`;

const RailTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  color: ${colors.accentGold};
`;

const RailNav = styled.nav`
  display: grid;
  gap: 10px;
`;

const RailLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 11px 12px;
  border-radius: 16px 0 16px 0;
  border: 1px solid #264066;
  background: ${colors.bg};
  color: ${colors.text};
  font-weight: 700;
  transition: transform 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
    box-shadow: 0 10px 22px rgba(10, 16, 28, 0.2);
  }

  span {
    line-height: 1.4;
  }
`;

const RailHint = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  opacity: 0.82;
`;

const MainColumn = styled.div`
  display: grid;
  gap: 20px;
  min-width: 0;
`;

const HeroSection = styled.section`
  display: grid;
  gap: 16px;
  scroll-margin-top: 18px;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 1fr;
    align-items: stretch;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px 0 20px 0;
  min-height: 280px;
  border: 1px solid #1f2c44;
  background: ${colors.bg};
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  display: block;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10, 16, 28, 0.08), rgba(10, 16, 28, 0.72)),
    linear-gradient(120deg, ${colors.semygsecondar}25 20%, transparent 60%);
`;

const HeroBadge = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 26, 43, 0.78);
  color: ${colors.accentGold};
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 10px 12px;
  border-radius: 16px 0 16px 0;
  font-weight: 800;
  backdrop-filter: blur(8px);
`;

const HeroContent = styled.div`
  border: 1px solid #1f2c44;
  border-radius: 20px 0 20px 0;
  padding: 18px;
  background: linear-gradient(120deg, ${colors.bgSoft} 64%, ${colors.bg} 50%);
  display: grid;
  gap: 16px;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.08;
  color: ${colors.accentGold};
`;

const Desc = styled.p`
  margin: 0;
  line-height: 1.72;
  color: ${colors.text};
`;

const MetaWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 999px;
  border: 1px solid #264066;
  background: ${colors.bg};
  color: ${colors.accentGold};
  font-weight: 800;
  font-size: 13px;
`;

const OutcomeList = styled.div`
  display: grid;
  gap: 10px;
`;

const Outcome = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: 16px 0 16px 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);

  svg {
    color: ${colors.accentGold};
    margin-top: 2px;
    flex: 0 0 auto;
  }

  span {
    line-height: 1.55;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const StatCard = styled.div`
  border: 1px solid #1f2c44;
  border-radius: 18px 0 18px 0;
  background: linear-gradient(120deg, ${colors.bgSoft} 58%, ${colors.bg} 50%);
  padding: 14px;
  display: grid;
  gap: 10px;
`;

const StatTop = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const StatIcon = styled.span`
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 12px 0 12px 0;
  background: rgba(242, 201, 76, 0.12);
  color: ${colors.accentGold};
`;

const StatLabel = styled.span`
  font-size: 13px;
  opacity: 0.88;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: ${colors.text};
`;

const Section = styled.section`
  display: grid;
  gap: 14px;
  scroll-margin-top: 18px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: ${colors.accentGold};
`;

const ProgramsGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ProgramCard = styled.article`
  display: grid;
  gap: 14px;
  padding: 16px;
  border-radius: 20px 0 20px 0;
  border: 1px solid #1f2c44;
  background: linear-gradient(120deg, ${colors.bgSoft} 58%, ${colors.bg} 50%);
  box-shadow: 0 14px 34px rgba(10, 16, 28, 0.22);
  align-content: start;
`;

const CardHead = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ProgramType = styled.div`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 900;
  color: ${colors.accentGold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ProgramTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  line-height: 1.25;
  color: ${colors.text};
`;

const MiniPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #264066;
  background: ${colors.bg};
  color: ${colors.accentGold};
  font-size: 12px;
  font-weight: 800;
`;

const ProgramSummary = styled.p`
  margin: 0;
  line-height: 1.7;
  color: ${colors.text};
  opacity: 0.95;
`;

const MetaGrid = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MetaBox = styled.div`
  display: grid;
  gap: 6px;
  padding: 12px;
  border-radius: 16px 0 16px 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);

  .label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${colors.accentGold};
  }

  .value {
    font-size: 14px;
    line-height: 1.55;
    color: ${colors.text};
  }
`;

const Block = styled.div`
  display: grid;
  gap: 10px;
`;

const BlockTitle = styled.h5`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: ${colors.accentGold};
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: ${colors.text};

  li {
    line-height: 1.55;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 4px;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 800;
  padding: 11px 14px;
  border-radius: 18px 0 18px 0;
  background: ${colors.accentGold};
  color: #0e1a2b;
  box-shadow: 0 10px 24px rgba(242, 201, 76, 0.22);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(242, 201, 76, 0.3);
  }
`;

const GhostLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 800;
  padding: 11px 14px;
  border-radius: 18px 0 18px 0;
  border: 1px solid #264066;
  background: ${colors.bg};
  color: ${colors.text};
  transition: transform 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.semygsecondar};
  }
`;

const SimpleProgramsGrid = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SimpleProgram = styled.div`
  padding: 12px 14px;
  border-radius: 16px 0 16px 0;
  border: 1px solid #1f2c44;
  background: linear-gradient(120deg, ${colors.bgSoft} 58%, ${colors.bg} 50%);
  line-height: 1.55;
  color: ${colors.text};
`;