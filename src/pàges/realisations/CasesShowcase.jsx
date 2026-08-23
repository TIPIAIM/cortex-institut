// src/components/home/CasesShowcase.jsx
import React, { useMemo, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ------- Helper Cloudinary ------- */
function cld(url, w = 1400) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}f_auto&q_auto&w=${w}`;
}

/* ------- Keyframes décor ------- */
const gridDrift = keyframes`
  0%   { background-position: 0 0, 0 0; opacity:.28; }
  50%  { background-position: 220px 140px, -220px -140px; opacity:.5; }
  100% { background-position: 0 0, 0 0; opacity:.28; }
`;

const Section = styled.section`
  max-width: 1200px; margin: 0 auto;
  padding: clamp(24px, 5vw, 48px) 20px;
  display: grid; gap: clamp(16px, 2vw, 22px);
  position: relative; isolation: isolate;
  &:before{
    content:""; position:absolute; inset:-2% -1%; z-index:0; pointer-events:none;
    background:
      repeating-linear-gradient(90deg, #ffffff0a 0 1px, transparent 1px 42px),
      repeating-linear-gradient(0deg,  #ffffff08 0 1px, transparent 1px 42px);
    animation: ${gridDrift} 20s linear infinite;
    mix-blend-mode: soft-light;
  }
`;

const Header = styled.div`
  position: relative; z-index:1; display:grid; gap:8px;
  h2{ margin:0; font-size:clamp(22px, 4.4vw, 34px); color:${colors.accentGold}; }
  p{ margin:0; color:${colors.accentGoldLight}; max-width: 900px; }
`;

const Grid = styled.div`
  position: relative; z-index:1;
  display: grid; gap: 14px;
  grid-template-columns: repeat(6, 1fr);
  /* Motif "en escalier" responsive */
  @media (max-width: 960px){ grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 640px){ grid-template-columns: repeat(2, 1fr); }
`;

const Tile = styled(motion(Link))`
  position: relative; display:block; overflow: hidden; text-decoration:none;
  border: 1px solid #1f2c44; border-radius: 18px;
  background: #0b1729;
  /* ratios variés */
  grid-column: span 3; aspect-ratio: 16/10;
  &:nth-child(3n){ grid-column: span 2; aspect-ratio: 4/3; }
  &:nth-child(5n){ grid-column: span 4; aspect-ratio: 21/9; }
  @media (max-width: 960px){
    grid-column: span 2 !important;
  }
  @media (max-width: 640px){
    grid-column: span 2 !important;
    aspect-ratio: 16/10 !important;
  }

  figure{ margin:0; position:relative; width:100%; height:100%; overflow:hidden; }
  img{
    width:100%; height:100%; object-fit:cover; display:block;
    transform: scale(1.02);
    transition: transform .5s cubic-bezier(.22,1,.36,1), filter .5s;
    will-change: transform, filter;
  }
  .shade{
    position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(180deg, transparent, #000000aa 72%),
      radial-gradient(420px 220px at var(--mx,80%) -10%, ${colors.semygsecondar}33, transparent 60%);
    mix-blend-mode: normal;
    transition: opacity .35s ease;
  }
  .cap{
    position:absolute; inset:auto 0 0 0; padding: 12px 14px;
    color:#fff; display:grid; gap:6px;
    background: linear-gradient(180deg, transparent, #0009 40%, #000c);
    h3{ margin:0; font-size: clamp(14px,2.2vw,18px); }
    .meta{ display:flex; gap:10px; flex-wrap:wrap; }
    .tag{
      display:inline-flex; align-items:center; gap:6px;
      padding:6px 10px; border-radius: 12px;
      color:#e9eef6; font-weight:700; font-size:12px;
      background: rgba(15,25,45,.75);
      border:1px solid rgba(200,170,110,.22);
    }
  }
  .kpi{
    position:absolute; right:10px; top:10px; display:flex; gap:8px; flex-wrap:wrap;
    > span{
      padding:6px 10px; border-radius:12px; font-weight:900; font-size:12px;
      color:#0e1a2b; background:${colors.accentGold}; border:1px solid #d9b642;
      box-shadow: 0 6px 14px rgba(242,201,76,.25);
    }
  }

  /* Hover premium */
  &:hover img{ transform: scale(1.06); filter: contrast(1.02) brightness(1.03); }
  &:hover .shade{ opacity:.95; }
`;

/* Variants pour cascade */
const containerV = { initial:{}, animate:{ transition:{ staggerChildren:.08, delayChildren:.06 } } };
const itemV = {
  initial:{ opacity:0, y:18, scale:.985, filter:"blur(2px)" },
  animate:{ opacity:1, y:0, scale:1, filter:"blur(0px)", transition:{ duration:.55, ease:[.22,1,.36,1] } }
};

export default function CasesShowcase({
  title = "Nos réalisations",
  lead  = "Un échantillon de projets, programmes et déploiements menés par CORTEX+ avec nos partenaires.",
  items = [
    {
      title: "Programme Management & Leadership",
      cover: imagess.loreàt,
      href: "/realisations/management",
      tags: ["Masterclass", "Coaching", "Certification"],
      kpis: [{label:"Satisfaction",value:"98%"}, {label:"Managers formés",value:"180"}],
    },
    {
      title: "Certification QHSE – secteur industriel",
      cover: imagess.bàtiment,
      href: "/realisations/qhse",
      tags: ["Audit", "ISO", "Ateliers"],
      kpis: [{label:"Sites certifiés",value:"12"}, {label:"ROI",value:"+14%"}],
    },
    {
      title: "Ingénierie & SI — projets applicatifs",
      cover: imagess.àutàbleàu,
      href: "/realisations/ingenierie",
      tags: ["Dev", "Cloud", "Sécurité"],
      kpis: [{label:"Apps livrées",value:"9"}, {label:"Uptime",value:"99.9%"}],
    },
    {
      title: "Finance & Contrôle — parcours diplômant",
      cover: imagess.DirecteurduGroupe4,
      href: "/realisations/finance",
      tags: ["Contrôle", "Reporting", "Accréditation"],
      kpis: [{label:"Admis",value:"92%"}, {label:"Partenaires",value:"5"}],
    },
  ],
}) {
  const reduced = useReducedMotion();
  const hostRef = useRef(null);

  const onMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${px}%`);
    e.currentTarget.style.setProperty("--my", `${py}%`);
  };

  const data = useMemo(()=>items, [items]);

  return (
    <Section ref={hostRef}>
      <Header>
        <h2>{title}</h2>
        <p>{lead}</p>
      </Header>

      <motion.div variants={containerV} initial="initial" whileInView="animate" viewport={{ once:true, amount:.25 }}>
        <Grid>
          {data.map((it, i)=>(
            <Tile
              key={i}
              to={it.href || "#"}
              aria-label={it.title}
              onMouseMove={onMove}
              variants={itemV}
            >
              <figure>
                <img src={cld(it.cover, 1400)} alt={it.title} loading="lazy" decoding="async" />
                <div className="shade" />
                <div className="kpi">
                  {(it.kpis||[]).slice(0,2).map((k,idx)=>(
                    <span key={idx}>{k.label}: {k.value}</span>
                  ))}
                </div>
                <div className="cap">
                  <h3>{it.title}</h3>
                  <div className="meta">
                    {(it.tags||[]).map((t,idx)=>(
                      <span className="tag" key={idx}><CheckCircle2 size={14}/>{t}</span>
                    ))}
                    <span className="tag"><LinkIcon size={14}/>Voir le cas</span>
                  </div>
                </div>
              </figure>
            </Tile>
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
