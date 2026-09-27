import {
  lazy,
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Cpu,
  Factory,
  GraduationCap,
  Layers3,
  Landmark,
  Route,
  Search,
  Send,
  BookCheck,
  Sprout,
  Truck,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { catalogues, getSchoolSearchText } from "./filieres.data";
import { openProgrammeContactModal } from "./programmeContact";

const FiliereModal = lazy(() => import("./FiliereModal.jsx"));

const iconMap = {
  briefcase: BriefcaseBusiness,
  truck: Truck,
  cpu: Cpu,
  factory: Factory,
  sprout: Sprout,
  clipboard: ClipboardList,
  banknote: Banknote,
  landmark: Landmark,
};

const catalogueIconMap = {
  etudiant: GraduationCap,
  junior: UsersRound,
  executive: BriefcaseBusiness,
};

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

const programmeCount = (school) =>
  (school.blocks || []).reduce(
    (sum, block) => sum + (block.programs?.length || 0),
    0
  ) || school.pathways?.length || 0;

export default function Catalogue({
  activeId: activeIdProp,
  onActiveIdChange,
}) {
  const reduceMotion = useReducedMotion();
  const [internalActiveId, setInternalActiveId] = useState(
    catalogues[0]?.id || "etudiant"
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const deferredQuery = useDeferredValue(query);

  const activeId = activeIdProp ?? internalActiveId;

  const active = useMemo(
    () => catalogues.find((catalogue) => catalogue.id === activeId) || catalogues[0],
    [activeId]
  );

  useEffect(() => {
    setQuery("");
    setSelected(null);
  }, [activeId]);

  const schools = useMemo(() => {
    const source = [
      ...(active?.schools || []),
      ...(active?.additionalOffers || []),
    ];
    const term = deferredQuery.trim().toLocaleLowerCase("fr");
    if (!term) return source;
    return source.filter((school) => getSchoolSearchText(school).includes(term));
  }, [active, deferredQuery]);

  const changeCatalogue = (id) => {
    if (activeIdProp === undefined) setInternalActiveId(id);
    onActiveIdChange?.(id);
  };

  const openSchool = (school) => setSelected({ catalogue: active, school });
  const ActiveCatalogueIcon = catalogueIconMap[active?.id] || GraduationCap;

  return (
    <Section id="catalogue-programmes">
      <Container>
        <Header>
          <HeaderIcon
            as={motion.span}
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -4, 0], rotate: [0, -3, 0, 3, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <GraduationCap size={23} />
          </HeaderIcon>

          <HeaderCopy>
            <Eyebrow>CATALOGUES DE FORMATION</Eyebrow>
            <Title>Explorez l’offre par profil, Grande École et parcours.</Title>
            <Intro>
              Choisissez votre profil, puis recherchez une Grande École, un bloc, un parcours ou un module.
            </Intro>
          </HeaderCopy>
        </Header>

        <CatalogueTabs role="tablist" aria-label="Choisir un catalogue">
          {catalogues.map((catalogue) => {
            const Icon = catalogueIconMap[catalogue.id] || GraduationCap;
            const isActive = activeId === catalogue.id;

            return (
              <Tab
                key={catalogue.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                $active={isActive}
                onClick={() => changeCatalogue(catalogue.id)}
              >
                <TabIcon
                  as={motion.span}
                  whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.08 }}
                  whileTap={reduceMotion ? undefined : { scale: .94 }}
                >
                  <Icon size={19} />
                </TabIcon>
                <TabText>
                  <b>{catalogue.shortLabel}</b>
                  <small>{catalogue.audience}</small>
                </TabText>
                <ArrowRight size={16} />
              </Tab>
            );
          })}
        </CatalogueTabs>

        <Overview
          as={motion.section}
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <OverviewMain>
            <OverviewIdentity>
              <OverviewIcon>
                <ActiveCatalogueIcon size={21} />
              </OverviewIcon>
              <div>
                <MiniLabel>{active.brand}</MiniLabel>
                <OverviewTitle>{active.title}</OverviewTitle>
              </div>
            </OverviewIdentity>

            <Tagline>{active.tagline}</Tagline>
            <Audience>{active.audience}</Audience>

            <IntroStack>
              {(active.intro || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </IntroStack>
          </OverviewMain>

          <OverviewStats>
            {(active.stats || []).map((stat, index) => (
              <OverviewStat
                key={stat.label}
                as={motion.div}
                initial={reduceMotion ? false : { opacity: 0, scale: .96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : .3, delay: index * .05 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </OverviewStat>
            ))}
          </OverviewStats>
        </Overview>

        {!!active.selectionLogic?.length && (
          <LogicCard>
            <LogicHeader>
              <BookCheck size={18} />
              <div>
                <LogicTitle>Pour choisir une formation</LogicTitle>
                <LogicLead>Suivez la logique proposée dans le catalogue.</LogicLead>
              </div>
            </LogicHeader>

            <LogicGrid>
              {active.selectionLogic.map((item, index) => (
                <LogicItem key={item}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{item}</span>
                </LogicItem>
              ))}
            </LogicGrid>
          </LogicCard>
        )}

        <Toolbar>
          <SearchBox>
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une école, un bloc, un parcours ou un module…"
              aria-label="Rechercher dans le catalogue actif"
            />
            {!!query && (
              <ClearSearch
                type="button"
                aria-label="Effacer la recherche"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </ClearSearch>
            )}
          </SearchBox>
          <ResultCount aria-live="polite">
            <strong>{schools.length}</strong> école(s) affichée(s)
          </ResultCount>
        </Toolbar>

        {schools.length ? (
          <SchoolGrid>
            {schools.map((school, index) => {
              const Icon = iconMap[school.iconName] || GraduationCap;
              const isAdditional = (active.additionalOffers || []).some(
                (offer) => offer.slug === school.slug
              );

              return (
                <SchoolCard
                  id={`school-${school.slug}`}
                  key={`${active.id}-${school.slug}`}
                  as={motion.article}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.025 }}
                >
                  <CardMedia>
                    <img
                      src={visualFor(school)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <CardShade />
                    <CardMediaTop>
                      <SchoolIndex>{String(index + 1).padStart(2, "0")}</SchoolIndex>
                      {isAdditional && <AdditionalTag>Executive</AdditionalTag>}
                    </CardMediaTop>
                  </CardMedia>

                  <CardBody>
                    <CardTop>
                      <IconBox
                        as={motion.span}
                        whileHover={
                          reduceMotion ? undefined : { rotate: -7, scale: 1.08 }
                        }
                      >
                        <Icon size={21} />
                      </IconBox>
                      <CardKicker>Grande École</CardKicker>
                    </CardTop>

                    <SchoolTitle>{school.title}</SchoolTitle>
                    {school.schoolName && <SchoolName>{school.schoolName}</SchoolName>}
                    {school.summary && <SchoolSummary>{school.summary}</SchoolSummary>}

                    <MetaRow>
                      <Meta>
                        <Layers3 size={14} /> {school.blocks?.length || 0} blocs
                      </Meta>
                      {!!programmeCount(school) && (
                        <Meta>
                          <Route size={14} /> {programmeCount(school)} parcours
                        </Meta>
                      )}
                      {school.duration && (
                        <Meta>
                          <Clock3 size={14} /> {school.duration}
                        </Meta>
                      )}
                    </MetaRow>

                    <CardActions>
                      <OpenButton
                        type="button"
                        onClick={() => openSchool(school)}
                        as={motion.button}
                        whileHover={reduceMotion ? undefined : { x: 2 }}
                        whileTap={reduceMotion ? undefined : { scale: .985 }}
                      >
                        Explorer le contenu
                        <ArrowRight size={17} />
                      </OpenButton>

                      <ApplyButton
                        type="button"
                        onClick={() =>
                          openProgrammeContactModal({
                            catalogueId: active?.id,
                            schoolSlug: school.slug,
                            intent: "inscription",
                            source: "catalogue-school-card",
                          })
                        }
                      >
                        <Send size={16} />
                        Postuler / être contacté
                      </ApplyButton>
                    </CardActions>
                  </CardBody>
                </SchoolCard>
              );
            })}
          </SchoolGrid>
        ) : (
          <Empty>
            <Search size={20} />
            <strong>Aucun résultat</strong>
            <span>Aucun contenu du catalogue ne correspond à cette recherche.</span>
            <button type="button" onClick={() => setQuery("")}>Réinitialiser</button>
          </Empty>
        )}

        {!!active.qualificationInfo?.length && (
          <InfoSection>
            <InfoTitle>
              <GraduationCap size={18} /> Organisation de l’offre
            </InfoTitle>
            <InfoList>
              {active.qualificationInfo.map((item) => (
                <InfoItem key={item}>
                  <CheckCircle2 size={15} /> {item}
                </InfoItem>
              ))}
            </InfoList>
          </InfoSection>
        )}

        {!!active.investment?.length && (
          <InfoSection>
            <InfoTitle>
              <WalletCards size={18} /> Investissement formation
            </InfoTitle>
            <InfoList>
              {active.investment.map((item) => (
                <InfoItem key={item}>
                  <CheckCircle2 size={15} /> {item}
                </InfoItem>
              ))}
            </InfoList>
          </InfoSection>
        )}
      </Container>

      {selected && (
        <Suspense fallback={null}>
          <FiliereModal
            open
            onClose={() => setSelected(null)}
            catalogue={selected.catalogue}
            school={selected.school}
          />
        </Suspense>
      )}
    </Section>
  );
}

const Section = styled.section`
  scroll-margin-top: 86px;
  position: relative;
  padding: clamp(58px, 7vw, 94px) 0 86px;
  background:
    radial-gradient(700px 420px at 0% 22%, rgba(42,75,124,.14), transparent 66%),
    linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft});
`;

const Container = styled.div`
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  max-width: 920px;
  margin-bottom: 28px;
`;

const HeaderIcon = styled.span`
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 18px 0 18px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 16px 34px rgba(243,111,33,.18);
`;

const HeaderCopy = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.div`
  color: ${colors.accentGold3};
  font-size: 11px;
  font-weight: 950;
  letter-spacing: .13em;
`;

const Title = styled.h2`
  margin: 9px 0 0;
  color: ${colors.text};
  font-size: clamp(30px, 5vw, 58px);
  line-height: 1.02;
  letter-spacing: -.045em;
`;

const Intro = styled.p`
  max-width: 760px;
  margin: 13px 0 0;
  color: ${colors.muted};
  line-height: 1.72;
  font-size: 15px;
`;

const CatalogueTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 24px 0;

  @media (max-width: 840px) {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: minmax(260px, 84vw);
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
  }
`;

const Tab = styled.button`
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 11px;
  align-items: center;
  padding: 14px;
  border-radius: 20px 0 20px 0;
  border: 1px solid ${({ $active }) =>
    $active ? "rgba(243,111,33,.52)" : "rgba(255,255,255,.09)"};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(243,111,33,.13), rgba(255,255,255,.035))"
      : "linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.018))"};
  color: ${colors.text};
  cursor: pointer;
  text-align: left;
  scroll-snap-align: start;
  box-shadow: ${({ $active }) => ($active ? "0 16px 38px rgba(0,0,0,.18)" : "none")};
  transition: transform .18s ease, border-color .18s ease, background .18s ease;

  > svg {
    color: ${({ $active }) => ($active ? colors.accentGold : colors.muted)};
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(243,111,33,.4);
    outline: none;
  }
`;

const TabIcon = styled.span`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  color: ${colors.accentGold};
  background: rgba(243,111,33,.08);
  border: 1px solid rgba(243,111,33,.18);
`;

const TabText = styled.span`
  min-width: 0;
  display: grid;
  gap: 3px;

  b {
    color: ${colors.text};
    font-size: 14px;
  }

  small {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${colors.muted};
    font-size: 10px;
    line-height: 1.35;
  }
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  gap: clamp(22px, 4vw, 48px);
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 30px 0 30px 0;
  background:
    radial-gradient(540px 280px at 100% 0%, rgba(243,111,33,.09), transparent 70%),
    linear-gradient(145deg, rgba(13,29,74,.88), rgba(7,23,39,.88));
  box-shadow: 0 28px 70px rgba(0,0,0,.2);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const OverviewMain = styled.div`
  min-width: 0;
`;

const OverviewIdentity = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: start;
`;

const OverviewIcon = styled.span`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 15px 0 15px 0;
  color: ${colors.accentGold};
  border: 1px solid rgba(243,111,33,.22);
  background: rgba(243,111,33,.08);
`;

const MiniLabel = styled.span`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 950;
  letter-spacing: .13em;
  text-transform: uppercase;
`;

const OverviewTitle = styled.h3`
  margin: 5px 0 0;
  color: ${colors.text};
  font-size: clamp(23px, 3.3vw, 38px);
  line-height: 1.08;
  letter-spacing: -.03em;
`;

const Tagline = styled.p`
  margin: 18px 0 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(16px, 2vw, 21px);
  font-weight: 850;
  line-height: 1.45;
`;

const Audience = styled.p`
  width: fit-content;
  margin: 12px 0 0;
  padding: 8px 10px;
  border-radius: 13px 0 13px 0;
  color: ${colors.text};
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.08);
  font-size: 12px;
  font-weight: 800;
`;

const IntroStack = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 18px;

  p {
    margin: 0;
    color: ${colors.muted};
    line-height: 1.68;
    font-size: 13px;
  }
`;

const OverviewStats = styled.div`
  align-self: start;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
`;

const OverviewStat = styled.div`
  min-height: 105px;
  display: grid;
  place-content: center;
  text-align: center;
  border-radius: 20px 0 20px 0;
  border: 1px solid rgba(255,255,255,.09);
  background: rgba(255,255,255,.04);

  strong {
    color: ${colors.accentGold};
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1;
  }

  span {
    margin-top: 6px;
    color: ${colors.muted};
    font-size: 11px;
  }
`;

const LogicCard = styled.section`
  margin-top: 18px;
  padding: 20px;
  border: 1px solid rgba(243,111,33,.17);
  border-radius: 24px 0 24px 0;
  background: rgba(243,111,33,.035);
`;

const LogicHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: ${colors.accentGold};
`;

const LogicTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: 18px;
`;

const LogicLead = styled.p`
  margin: 4px 0 0;
  color: ${colors.muted};
  font-size: 12px;
`;

const LogicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
  margin-top: 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const LogicItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 9px;
  padding: 12px;
  border-radius: 15px 0 15px 0;
  background: rgba(255,255,255,.035);

  b {
    color: ${colors.accentGold};
    font-size: 11px;
  }

  span {
    color: ${colors.text};
    font-size: 12px;
    line-height: 1.45;
  }
`;

const Toolbar = styled.div`
  position: sticky;
  top: 70px;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin: 24px 0 18px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px 0 20px 0;
  background: rgba(7,23,39,.88);
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 42px rgba(0,0,0,.18);

  @media (max-width: 680px) {
    position: static;
    grid-template-columns: 1fr;
  }
`;

const SearchBox = styled.label`
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 9px;
  align-items: center;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 15px 0 15px 0;
  background: rgba(255,255,255,.035);
  color: ${colors.accentGold};

  &:focus-within {
    border-color: rgba(243,111,33,.48);
    box-shadow: 0 0 0 3px rgba(243,111,33,.08);
  }

  input {
    min-width: 0;
    width: 100%;
    height: 46px;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${colors.text};
  }

  input::placeholder {
    color: ${colors.muted};
  }
`;

const ClearSearch = styled.button`
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.08);
  color: ${colors.muted};
  background: rgba(255,255,255,.04);
  cursor: pointer;
`;

const ResultCount = styled.div`
  padding: 0 8px;
  color: ${colors.muted};
  font-size: 12px;
  white-space: nowrap;

  strong {
    color: ${colors.accentGold};
    font-size: 15px;
  }
`;

const SchoolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;

  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const SchoolCard = styled.article`
  scroll-margin-top: 150px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 26px 0 26px 0;
  background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  box-shadow: 0 22px 58px rgba(0,0,0,.17);
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(243,111,33,.34);
    box-shadow: 0 28px 70px rgba(0,0,0,.24);
  }
`;

const CardMedia = styled.div`
  position: relative;
  height: 188px;
  overflow: hidden;
  background: ${colors.bg1};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform .5s cubic-bezier(.22,1,.36,1);
  }

  ${SchoolCard}:hover & img {
    transform: scale(1.045);
  }
`;

const CardShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 45%, rgba(4,9,18,.78));
`;

const CardMediaTop = styled.div`
  position: absolute;
  inset: 12px 12px auto 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const SchoolIndex = styled.span`
  padding: 7px 9px;
  border-radius: 12px 0 12px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 11px;
  font-weight: 950;
`;

const AdditionalTag = styled.span`
  padding: 6px 9px;
  border-radius: 999px;
  color: ${colors.text};
  background: rgba(7,23,39,.78);
  border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(8px);
  font-size: 10px;
  font-weight: 900;
`;

const CardBody = styled.div`
  display: flex;
  min-height: 330px;
  flex-direction: column;
  padding: 18px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const IconBox = styled.span`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  color: ${colors.accentGold};
  background: rgba(243,111,33,.08);
  border: 1px solid rgba(243,111,33,.2);
`;

const CardKicker = styled.span`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
`;

const SchoolTitle = styled.h3`
  margin: 14px 0 0;
  color: ${colors.text};
  font-size: 20px;
  line-height: 1.25;
`;

const SchoolName = styled.p`
  margin: 8px 0 0;
  color: ${colors.accentGold};
  font-size: 12px;
  font-weight: 800;
`;

const SchoolSummary = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
  margin: 11px 0 0;
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.6;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 16px;
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 8px;
  border-radius: 11px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03);
  color: ${colors.muted};
  font-size: 10px;

  svg {
    color: ${colors.accentGold};
  }
`;

const CardActions = styled.div`
  display: grid;
  gap: 8px;
  margin-top: auto;
  padding-top: 14px;
`;

const OpenButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid rgba(243,111,33,.28);
  border-radius: 16px 0 16px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(243,111,33,.16);

  &:focus-visible {
    outline: 3px solid rgba(243,111,33,.18);
    outline-offset: 3px;
  }
`;

const ApplyButton = styled.button`
  appearance: none;
  cursor: pointer;
  width: 100%;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.1);
  color: ${colors.text};
  background: rgba(255,255,255,.035);
  font-size: 11px;
  font-weight: 900;
  transition: border-color .18s ease, transform .18s ease, background .18s ease;

  svg { color: ${colors.accentGold}; }

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(243,111,33,.38);
    background: rgba(243,111,33,.055);
    outline: none;
  }
`;

const Empty = styled.div`
  display: grid;
  place-items: center;
  gap: 8px;
  min-height: 240px;
  padding: 28px;
  text-align: center;
  border: 1px dashed rgba(255,255,255,.13);
  border-radius: 24px 0 24px 0;
  color: ${colors.muted};
  background: rgba(255,255,255,.025);

  svg,
  strong {
    color: ${colors.accentGold};
  }

  button {
    margin-top: 6px;
    padding: 9px 12px;
    border-radius: 12px 0 12px 0;
    border: 1px solid rgba(243,111,33,.28);
    background: rgba(243,111,33,.08);
    color: ${colors.accentGold};
    cursor: pointer;
  }
`;

const InfoSection = styled.section`
  margin-top: 18px;
  padding: clamp(18px, 3vw, 26px);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 24px 0 24px 0;
  background: rgba(255,255,255,.025);
`;

const InfoTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.accentGold};
  font-size: 18px;
`;

const InfoList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin-top: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 11px;
  border-radius: 13px;
  background: rgba(255,255,255,.025);
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
    color: ${colors.accentGold};
  }
`;
