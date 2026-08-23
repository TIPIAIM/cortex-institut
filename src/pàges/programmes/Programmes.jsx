import {
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Search as SearchIcon, Sparkles, BadgeCheck } from "lucide-react";

import FiliereModal from "./FiliereModal";
import { filieres } from "./filieres.data";
import { imagess } from "../../assets/imagess";
import colors from "../../Styles/colors";
import HeroCortexCarousel from "./HeroCortexCarousel";
import HeroCortexCarouselhome from "./HeroCortexCarouselhome1";
import Catalogue from "./Catalogue";

/* Helper Cloudinary */
function cld(url, w = 900) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
    "--gx": "50%",
    "--gy": "50%",
  });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`,
      "--gx": `${px * 100}%`,
      "--gy": `${py * 100}%`,
    });
  };

  const reset = () =>
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
      "--gx": "50%",
      "--gy": "50%",
    });

  return (
    <TiltWrap
      ref={ref}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={reset}
    >
      {children}
    </TiltWrap>
  );
}

export default function Programmes() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const deferredQuery = useDeferredValue(q);

  const filtered = useMemo(() => {
    const s = deferredQuery.trim().toLowerCase();
    if (!s) return filieres;

    return filieres
      .map((f) => ({
        ...f,
        programs: (f.programs || []).filter((p) =>
          p.toLowerCase().includes(s)
        ),
        match:
          f.title.toLowerCase().includes(s) ||
          f.description?.toLowerCase().includes(s) ||
          f.keywords?.some((k) => k.toLowerCase().includes(s)) ||
          (f.programCards || []).some((pc) =>
            [pc.title, pc.summary, ...(pc.modules || []), ...(pc.target || [])]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(s)
          ),
      }))
      .filter((f) => f.match || f.programs.length > 0);
  }, [deferredQuery]);

  return (
    <div>
      <HeroCortexCarouselhome />
      <HeroCortexCarousel haloColors={["#2A4B7C", "#F2C94C", "#6e2a7c"]} />

      <Page>
        <Wrap>
          {/*<Head>
            <h1>Programmes & Filières</h1>
            <p>
              Explorez les filières de l’Institut CORTEX et accédez aux
              programmes détaillés, modules, fiches et documents utiles.
            </p>
          </Head>
                          
          <SearchRow>
            <SearchIconBox>
              <SearchIcon size={18} />
            </SearchIconBox>

            <Search
              placeholder="Rechercher une filière, un programme ou un module…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Rechercher"
            />
          </SearchRow>

          <SectionHead>
            <SectionTitle>
              <BadgeCheck size={18} />
              Toutes les filières
            </SectionTitle>
            <SectionText>
              Chaque filière ouvre une vue détaillée avec ses programmes, ses
              modules clés et ses fiches.
            </SectionText>
          </SectionHead>

          {filtered.length === 0 ? (
            <EmptyState>
              <Sparkles size={18} />
              Aucun résultat trouvé pour cette recherche.
            </EmptyState>
          ) : (
            <Grid>
              {filtered.map((f, idx) => {
                const img =
                  (f.heroKey && imagess?.[f.heroKey]) ||
                  imagess?.loreàt ||
                  "/img/placeholder.jpg";

                const sample = (f.programs || []).slice(0, 4);
                const remaining = Math.max(
                  0,
                  (f.programs || []).length - sample.length
                );
                const hasNewPrograms = (f.programCards || []).length > 0;

                return (
                  <TiltCard key={f.slug}>
                    <Card
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: idx * 0.03 }}
                    >
                      <Cover>
                        <CoverImg
                          src={cld(img, 1100)}
                          srcSet={`${cld(img, 700)} 700w, ${cld(
                            img,
                            900
                          )} 900w, ${cld(img, 1100)} 1100w`}
                          sizes="(max-width: 768px) 100vw, 600px"
                          alt={f.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <CoverGlare />
                        <CoverShade />
                        <PulseRing />
                        <Badge>{f.title}</Badge>

                        {hasNewPrograms && (
                          <NewTag>
                            <Sparkles size={14} />
                            Nouveaux
                          </NewTag>
                        )}
                      </Cover>

                      <h3>{f.title}</h3>
                      <p className="muted">{(f.programs || []).length} programme(s)</p>

                      {sample.length > 0 && (
                        <ul>
                          {sample.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                          {remaining > 0 && (
                            <li className="more">+ {remaining} autre(s)…</li>
                          )}
                        </ul>
                      )}

                      <div className="actions">
                        <Button type="button" onClick={() => setSelected(f)}>
                          Voir la filière
                        </Button>
                      </div>
                    </Card>
                  </TiltCard>
                );
              })}
            </Grid>
          )}*/}
        </Wrap>

        <FiliereModal
          open={!!selected}
          onClose={() => setSelected(null)}
          filiere={selected}
        />
      </Page>

      <Catalogue />
    </div>
  );
}

/* ======================= UI ======================= */

const Page = styled.div`
  display: grid;
  gap: 22px;
  background: linear-gradient(120deg, ${colors.bg1} 64%, ${colors.bg2} 50%);
  overflow-x: clip;
  max-width: 100%;
`;

const Wrap = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px 56px;
  display: grid;
  gap: 22px;
`;

const Head = styled.div`
  display: grid;
  gap: 8px;

  h1 {
    margin: 0;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: clamp(22px, 3.8vw, 36px);
    color: ${colors.accentGold};
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    color: white;
    line-height: 1.65;
  }
`;

const SearchIconBox = styled.div`
  display: grid;
  place-items: center;
  color: ${colors.accentGold};
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

const Search = styled.input`
  width: 100%;
  height: clamp(36px, 3.2vw, 42px);
  border: 0;
  outline: none;
  background: transparent;
  color: ${colors.accentGold};
  font-size: clamp(13px, 1.8vw, 14.5px);
`;

const SectionHead = styled.div`
  display: grid;
  gap: 6px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(20px, 2.6vw, 28px);
  color: ${colors.accentGold};
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

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TiltWrap = styled.div`
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.12s ease;
`;

const Card = styled(motion.article)`
  position: relative;
  background: linear-gradient(120deg, ${colors.b1g} 64%, ${colors.bgSoft} 50%);
  border: 1px solid #1f2c44;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  display: grid;
  gap: 10px;
  padding-bottom: 12px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: ${colors.accentGold};
    box-shadow: 0 18px 36px rgba(10, 16, 28, 0.45);
  }

  &:before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    background: radial-gradient(
      300px 60px at 10% -10%,
      ${colors.semygsecondar},
      transparent 60%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover:before {
    opacity: 1;
  }

  h3 {
    margin: 10px 14px 0;
    font-size: 20px;
    color: ${colors.accentGold};
    line-height: 1.25;
  }

  .muted {
    margin: 0 14px;
    color: ${colors.text};
  }

  ul {
    margin: 0 14px;
    padding-left: 18px;
    color: #cfe0f1;
  }

  .more {
    opacity: 0.82;
    list-style: none;
    margin-top: 6px;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin: 8px 14px 0;
  }
`;

const Cover = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${colors.bg};
  transform-style: preserve-3d;
`;

const imgPulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.015); }
  100% { transform: scale(1); }
`;

const CoverImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: translateZ(20px);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s;
  will-change: transform, filter;

  ${Card}:hover & {
    transform: translateZ(20px) scale(1.04);
    filter: contrast(1.03) brightness(1.02);
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${imgPulse} 6s ease-in-out infinite;
  }
`;

const CoverGlare = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    220px 140px at var(--gx, 50%) var(--gy, 50%),
    rgba(255, 255, 255, 0.08),
    transparent 60%
  );
  mix-blend-mode: screen;
  opacity: 0.75;
`;

const CoverShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(120deg, ${colors.semygprimar}20 64%, ${colors.bg}42 50%),
    radial-gradient(
      600px 220px at 85% -10%,
      ${colors.semygsecondar}55,
      transparent 60%
    );
`;

const PulseRing = styled.span`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.12);
    animation: ring 2.8s ease-out infinite;
  }

  &:after {
    animation-delay: 0.8s;
  }

  @keyframes ring {
    0% {
      width: 0;
      height: 0;
      opacity: 0.45;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.16);
    }

    70% {
      opacity: 0.08;
    }

    100% {
      width: 280px;
      height: 280px;
      opacity: 0;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: linear-gradient(
    90deg,
    ${colors.accentGold} 50%,
    ${colors.bg} 10%
  );
  backdrop-filter: blur(6px);
  border: 1px solid #24406a;
  color: ${colors.text};
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
`;

const NewTag = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(14, 26, 43, 0.82);
  color: ${colors.accentGold};
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 12px;
  font-weight: 800;
  backdrop-filter: blur(8px);
`;

const Button = styled.button`
  padding: 10px 12px;
  border-radius: 18px 0 18px 0;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #d9b642;
  background: ${colors.accentGold};
  color: #0e1a2b;
  box-shadow: 0 8px 22px rgba(242, 201, 76, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.32);
  }
`;