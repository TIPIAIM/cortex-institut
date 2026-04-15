import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Download,
  Filter,
  Search as SearchIcon,
  Tag,
  ExternalLink,
  FolderOpen,
  Sparkles,
  BookOpen,
  Clock3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { filieres } from "./filieres.data";
import FiliereModal from "./FiliereModal";

function cld(url, w = 1100) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

function getCollapsedFeaturedCount() {
  if (typeof window === "undefined") return 6;
  if (window.innerWidth < 600) return 2;
  if (window.innerWidth < 992) return 4;
  return 6;
}

export default function CatalogueBac3({
  title = "Catalogue des Programmes 2026",
  subtitle = "Retrouvez les nouveaux programmes intégrés au site, avec leurs fiches détaillées, modules, publics cibles et accès direct aux documents.",
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Tous");
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [collapsedFeaturedCount, setCollapsedFeaturedCount] = useState(
    getCollapsedFeaturedCount()
  );

  const deferredQuery = useDeferredValue(q);

  useEffect(() => {
    const onResize = () => {
      if (!showAllFeatured) {
        setCollapsedFeaturedCount(getCollapsedFeaturedCount());
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showAllFeatured]);

  useEffect(() => {
    setShowAllFeatured(false);
  }, [cat, deferredQuery]);

  const allPrograms = useMemo(() => {
    return filieres.flatMap((filiere) =>
      (filiere.programCards || []).map((program) => ({
        ...program,
        category: filiere.title,
        filiere,
        heroKey: filiere.heroKey,
      }))
    );
  }, []);

  const categories = useMemo(() => {
    const uniques = Array.from(new Set(allPrograms.map((p) => p.category)));
    return ["Tous", ...uniques];
  }, [allPrograms]);

  const filtered = useMemo(() => {
    const s = deferredQuery.trim().toLowerCase();

    return allPrograms.filter((p) => {
      const matchCat = cat === "Tous" || p.category === cat;

      const haystack = [
        p.title,
        p.type,
        p.summary,
        p.category,
        p.certification,
        ...(p.modules || []),
        ...(p.target || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchText = !s || haystack.includes(s);
      return matchCat && matchText;
    });
  }, [allPrograms, deferredQuery, cat]);

  const visibleFeatured = useMemo(() => {
    return showAllFeatured
      ? filtered
      : filtered.slice(0, collapsedFeaturedCount);
  }, [filtered, showAllFeatured, collapsedFeaturedCount]);

  const hasMoreFeatured = filtered.length > collapsedFeaturedCount;

  const allDocs = useMemo(() => {
    return allPrograms
      .filter((p) => p.docHref)
      .map((p) => ({
        label: p.title,
        href: p.docHref,
      }));
  }, [allPrograms]);

  const topDownloads = allDocs.slice(0, 4);
  const bottomFiles = allDocs.slice(4);

  return (
    <Page>
      <Head
        as={motion.header}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {topDownloads.length > 0 && (
          <TopDownloads>
            {topDownloads.map((c, i) => (
              <a
                key={`${c.label}-${i}`}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                download
              >
                <Download size={16} />
                <span>{c.label}</span>
              </a>
            ))}
          </TopDownloads>
        )}
      </Head>

      <Filters
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <SearchRow>
          <SearchIconBox>
            <SearchIcon size={18} />
          </SearchIconBox>

          <Search
            placeholder="Rechercher un programme, une filière ou un module…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Rechercher un programme"
          />
        </SearchRow>

        <Chips role="tablist" aria-label="Filtrer par catégorie">
          {categories.map((c) => (
            <Chip
              key={c}
              role="tab"
              aria-selected={cat === c}
              $active={cat === c}
              onClick={() => setCat(c)}
              type="button"
            >
              {c === "Tous" ? <Filter size={14} /> : <Tag size={14} />}
              {c}
            </Chip>
          ))}
        </Chips>
      </Filters>

      <SectionHeader>
        <SectionTitle>
          <Sparkles size={20} />
          <span>Nouveaux programmes</span>
        </SectionTitle>
        <SectionText>
          Une vue compacte et professionnelle des nouveaux programmes intégrés.
        </SectionText>
      </SectionHeader>

      {filtered.length === 0 ? (
        <EmptyState>
          <Sparkles size={18} />
          Aucun programme ne correspond à cette recherche.
        </EmptyState>
      ) : (
        <>
          <FeaturedGrid
            as={motion.div}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04 } },
            }}
          >
            {visibleFeatured.map((p) => {
              const image =
                (p.heroKey && imagess?.[p.heroKey]) ||
                imagess?.loreàt ||
                "/img/placeholder.jpg";

              return (
                <FeaturedCard
                  key={p.id}
                  as={motion.article}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeaturedCover>
                    <img
                      src={cld(image, 1000)}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <FeaturedShade />
                    <FeaturedBadge>{p.category}</FeaturedBadge>
                  </FeaturedCover>

                  <FeaturedBody>
                    <TopMeta>
                      <Badge>{p.type || "Programme"}</Badge>

                      {p.duration && (
                        <MetaPill>
                          <Clock3 size={14} />
                          {p.duration}
                        </MetaPill>
                      )}
                    </TopMeta>

                    <CardTitle title={p.title}>{p.title}</CardTitle>

                    {p.summary && (
                      <CardSummary title={p.summary}>{p.summary}</CardSummary>
                    )}

                    {p.certification && (
                      <MiniInfoBox>
                        <SmallTitle>
                          <BookOpen size={14} />
                          Certification
                        </SmallTitle>
                        <ClampLine>{p.certification}</ClampLine>
                      </MiniInfoBox>
                    )}

                    <Actions compact>
                      {p.docHref && (
                        <a
                          className="primary"
                          href={p.docHref}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          <Download size={16} />
                          Télécharger
                        </a>
                      )}

                      {p.docHref && (
                        <a
                          className="ghost"
                          href={p.docHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} />
                          Ouvrir
                        </a>
                      )}

                      <button
                        className="secondary"
                        type="button"
                        onClick={() => setSelectedFiliere(p.filiere)}
                      >
                        <FolderOpen size={16} />
                        Voir
                      </button>
                    </Actions>
                  </FeaturedBody>
                </FeaturedCard>
              );
            })}
          </FeaturedGrid>

          {(hasMoreFeatured || showAllFeatured) && (
            <MoreWrap>
              <MoreButton
                type="button"
                onClick={() => setShowAllFeatured((prev) => !prev)}
              >
                {showAllFeatured ? (
                  <>
                    <ChevronUp size={16} />
                    Afficher moins
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    Afficher le reste des nouveaux programmes
                  </>
                )}
              </MoreButton>
            </MoreWrap>
          )}
        </>
      )}

      {bottomFiles.length > 0 && (
        <BottomBox
          as={motion.section}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <h4>Autres fiches programmes</h4>

          <BottomActions>
            {bottomFiles.map((f, i) => (
              <a
                key={`${f.label}-${i}`}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                download
              >
                <Download size={16} />
                <span>{f.label}</span>
              </a>
            ))}
          </BottomActions>
        </BottomBox>
      )}

      <FiliereModal
        open={!!selectedFiliere}
        onClose={() => setSelectedFiliere(null)}
        filiere={selectedFiliere}
      />
    </Page>
  );
}

/* =========================
   Styles
========================= */
const Page = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 20px 64px;
  background: linear-gradient(120deg, ${colors.bg} 70%, ${colors.bg1} 60%);
  display: grid;
  gap: 22px;
  overflow-x: clip;
`;

const Head = styled.header`
  display: grid;
  gap: 14px;

  h1 {
    margin: 0;
    font-size: clamp(32px, 3.6vw, 50px);
    color: ${colors.accentGold};
    letter-spacing: 0.6px;
    text-align: center;
    margin-top: 6rem;
  }

  p {
    margin: 1.2rem 0 1.8rem;
    text-align: center;
    font-size: clamp(17px, 2vw, 24px);
    color: ${colors.accentGoldLight};
    line-height: 1.6;
  }
`;

const TopDownloads = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  min-width: 0;

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 12px 14px;
    border-radius: 25px 0 25px 0;
    font-weight: 900;
    color: ${colors.bg};
    background: ${colors.accentGold};
    word-break: break-word;
    box-shadow: 0 8px 22px rgba(242, 201, 76, 0.22);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  a:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.3);
  }

  span {
    line-height: 1.4;
  }
`;

const Filters = styled.div`
  display: grid;
  gap: 14px;
`;

const SearchRow = styled.div`
  width: 100%;
  max-width: 680px;
  display: grid;
  grid-template-columns: 36px 1fr;
  align-items: center;
  gap: 8px;
  border: 1px solid #1f2c44;
  border-radius: 12px;
  padding: 4px 10px;

  &:focus-within {
    border-color: ${colors.semygsecondar};
    box-shadow: 0 0 0 3px rgba(42, 75, 124, 0.25);
  }
`;

const SearchIconBox = styled.div`
  display: grid;
  place-items: center;
  color: ${colors.accentGold};
`;

const Search = styled.input`
  width: 100%;
  height: clamp(36px, 3.2vw, 42px);
  border: 0;
  outline: none;
  background: transparent;
  color: ${colors.accentGold};
  font-size: clamp(13px, 1.8vw, 14.5px);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  padding: 8px 12px;
  border-radius: 25px 0 25px 0;
  cursor: pointer;
  font-weight: 700;
  border: 1px solid
    ${(p) => (p.$active ? colors.semygsecondar : "#264066")};
  color: ${colors.text};
  background: ${(p) => (p.$active ? colors.bgSoft : colors.bg)};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s ease, border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
  }
`;

const SectionHeader = styled.div`
  display: grid;
  gap: 6px;
`;

const SectionTitle = styled.h2`
  margin: 0.3rem 0 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(24px, 2.8vw, 32px);
  color: ${colors.text};

  span {
    color: ${colors.accentGold};
  }
`;

const SectionText = styled.p`
  margin: 0;
  color: ${colors.text};
  opacity: 0.9;
  line-height: 1.6;
`;

const EmptyState = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 18px 0 18px 0;
  border: 1px solid #264066;
  background: ${colors.bgSoft};
  color: ${colors.text};
`;

const FeaturedGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
`;

const FeaturedCard = styled.article`
  border: 1px solid #1f2c44;
  border-radius: 24px 0 24px 0;
  background: linear-gradient(120deg, ${colors.bgSoft} 55%, ${colors.bg} 50%);
  overflow: hidden;
  display: grid;
  box-shadow: 0 10px 24px rgba(10, 16, 28, 0.18);
`;

const FeaturedCover = styled.div`
  position: relative;
  aspect-ratio: 16 / 7.2;
  overflow: hidden;
  background: ${colors.bg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const FeaturedShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10, 16, 28, 0.08), rgba(10, 16, 28, 0.66)),
    linear-gradient(120deg, ${colors.semygsecondar}22 20%, transparent 60%);
`;

const FeaturedBadge = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 7px 10px;
  border-radius: 14px 0 14px 0;
  background: rgba(14, 26, 43, 0.82);
  color: ${colors.accentGold};
  font-weight: 800;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
`;

const FeaturedBody = styled.div`
  display: grid;
  gap: 10px;
  padding: 12px;
`;

const TopMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  align-self: start;
  color: ${colors.accentGold};
  background: linear-gradient(120deg, ${colors.bg} 64%, ${colors.bg1} 50%);
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 800;
  display: inline-block;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid #264066;
  background: ${colors.bg};
  color: ${colors.accentGold};
  font-size: 11px;
  font-weight: 800;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  line-height: 1.35;
  color: ${colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 46px;
`;

const CardSummary = styled.p`
  margin: 0;
  color: ${colors.text};
  line-height: 1.55;
  opacity: 0.92;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
`;

const MiniInfoBox = styled.div`
  display: grid;
  gap: 6px;
  padding: 10px;
  border-radius: 16px 0 16px 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const SmallTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: ${colors.accentGold};
`;

const ClampLine = styled.p`
  margin: 0;
  color: ${colors.text};
  line-height: 1.5;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;

  .primary,
  .ghost,
  .secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 800;
    padding: ${(p) => (p.compact ? "9px 11px" : "10px 12px")};
    text-decoration: none;
    font-size: ${(p) => (p.compact ? "13px" : "14px")};
    transition: transform 0.15s ease, box-shadow 0.15s ease,
      border-color 0.15s ease;
  }

  .primary {
    border-radius: 24px 0 24px 0;
    background: linear-gradient(
      120deg,
      ${colors.accentGold} 54%,
      ${colors.accentGold}90 20%
    );
    color: #0e1a2b;
    box-shadow: 0 8px 22px rgba(242, 201, 76, 0.22);
  }

  .primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.3);
  }

  .ghost {
    border-radius: 24px 0 24px 0;
    border: 1px solid #264066;
    color: ${colors.text};
    background: ${colors.bg};
  }

  .ghost:hover {
    transform: translateY(-1px);
    border-color: ${colors.semygsecondar};
  }

  .secondary {
    border-radius: 24px 0 24px 0;
    border: 1px solid #d9b642;
    background: transparent;
    color: ${colors.accentGold};
    cursor: pointer;
  }

  .secondary:hover {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
  }
`;

const MoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -4px;
`;

const MoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 24px 0 24px 0;
  border: 1px solid ${colors.semygsecondar};
  background: ${colors.bgSoft};
  color: ${colors.accentGold};
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
    box-shadow: 0 10px 24px rgba(10, 16, 28, 0.22);
  }
`;

const BottomBox = styled.section`
  border-radius: 24px 0 24px 0;
  padding: 16px;
  display: grid;
  gap: 12px;

  h4 {
    margin: 0 0 10px;
    font-size: 25px;
    margin-top: 2rem;
    color: ${colors.accentGold};
  }
`;

const BottomActions = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 12px 14px;
    font-weight: 700;
    border-radius: 24px 0 24px 0;
    color: ${colors.text};
    background: rgb(16, 53, 104);
    transition: transform 0.15s ease, border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  a:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(10, 16, 28, 0.35);
  }

  span {
    line-height: 1.45;
  }
`;