// src/components/feature/FiliereModal.jsx
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { ChevronRight, Star, BadgeCheck } from "lucide-react";
import ProModal from "./ProModal";
import { imagess } from "../../assets/imagess";
import colors from "../../Styles/colors";
 
/* ========== Icône animée réutilisable ========== */
function AnimatedIcon({
  icon: IconCmp,
  accent = "#F2C94C",
  size = 18,
  delay = 0,
}) {
  return (
    <IconWrap
      initial={{ scale: 0.95, rotate: -2 }}
      animate={{
        scale: [1, 1.06, 1],
        rotate: [-2, 0, -2],
        y: [0, -1.5, 0],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <IconCmp size={size} />
      <IconGlow $accent={accent} />
    </IconWrap>
  );
}

/**
 * props:
 * - open: bool
 * - onClose: fn
 * - filiere: { title, description, outcomes[], programs[], accent?, heroKey?, meta? }
 */
export default function FiliereModal({ open, onClose, filiere }) {
  if (!filiere) return null;

  const accent = filiere.accent || "#F2C94C";
  const rawHero =
    (filiere.heroKey && imagess[filiere.heroKey]) ||
    imagess?.loreàt ||
    "/img/hero-filiere.jpg";

  // Optimisations Cloudinary
  const hero = useMemo(() => {
    if (typeof rawHero !== "string") return rawHero;
    if (!rawHero.includes("res.cloudinary.com")) return rawHero;
    return rawHero.includes("?")
      ? `${rawHero}&f_auto&q_auto`
      : `${rawHero}?f_auto&q_auto`;
  }, [rawHero]);

  // Réglages d’ajustement de l’image (toujours visible par défaut)
  const [fitMode, setFitMode] = useState("contain"); // "contain" | "cover"
  const [position, setPosition] = useState("center"); // "top" | "center" | "bottom"

  return (
    <ProModal open={open} onClose={onClose} title={filiere.title} fullScreen>
      <Wrap>
        {/* HERO image avec ajustements */}
        <HeroWrap $accent={accent}>
          <HeroImg
            as={motion.img}
            src={hero}
            alt={filiere.title}
            initial={{ opacity: 0.0, scale: 1.01, filter: "blur(3px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            $fit={fitMode}
            $pos={position}
            loading="eager"
            decoding="async"
          />
          <HeroShade />

          {/* Boutons d’ajustement */}
          <HeroControls
            role="group"
            aria-label="Réglages d’affichage de l’image"
          >
            <Chip
              data-active={fitMode === "contain"}
              onClick={() => setFitMode("contain")}
            >
              Ajuster
            </Chip>
            <Chip
              data-active={fitMode === "cover"}
              onClick={() => setFitMode("cover")}
            >
              Remplir
            </Chip>
            <Sep />
            {/*  <Chip data-active={position === "top"} onClick={() => setPosition("top")}>Haut</Chip>*/}
            <Chip
              data-active={position === "center"}
              onClick={() => setPosition("center")}
            >
              Centre
            </Chip>
            {/*       <Chip data-active={position === "bottom"} onClick={() => setPosition("bottom")}>Bas</Chip>
             */}{" "}
          </HeroControls>
        </HeroWrap>

        {/* CONTENU */}
        <Body>
          {/* Colonne principale */}
          <ColLeft
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filiere.description && <Desc>{filiere.description}</Desc>}

            {filiere.outcomes?.length > 0 && (
              <Block>
                <BlockTitle>
                  <AnimatedIcon icon={Star} accent={accent} />
                  Ce que vous saurez faire
                </BlockTitle>
                <List>
                  {filiere.outcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </List>
              </Block>
            )}

            <Block>
              <BlockTitle>
                <AnimatedIcon icon={BadgeCheck} accent={accent} delay={0.1} />
                Programmes inclus
              </BlockTitle>

              <ProgList>
                {filiere.programs.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.22, delay: i * 0.02 }}
                  >
                    <a  >
                      <span>{p}</span>
                      <ChevronAnim
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "tween", duration: 0.15 }}
                      >
                       </ChevronAnim>
                    </a>
                  </motion.li>
                ))}
              </ProgList>
            </Block>
          </ColLeft>

          {/* Aside */}
          <Aside>
            <Ctas>
              <a className="primary" href="/contact">
                Contactez-nous
              </a>
            </Ctas>

            {filiere.meta && (
              <Meta>
                {filiere.meta.level && (
                  <div>
                    <b>Niveau</b>
                    <span>{filiere.meta.level}</span>
                  </div>
                )}
                {filiere.meta.mode && (
                  <div>
                    <b>Modalité</b>
                    <span>{filiere.meta.mode}</span>
                  </div>
                )}
                {filiere.meta.duration && (
                  <div>
                    <b>Durée</b>
                    <span>{filiere.meta.duration}</span>
                  </div>
                )}
              </Meta>
            )}
          </Aside>
        </Body>
      </Wrap>
    </ProModal>
  );
}

/* ================= styles ================= */

const Wrap = styled.div`
  display: grid;
  gap: 18px;
  max-width: 1400px;
  margin: 0 auto;
  
`;

/* --- HERO --- */
const HeroWrap = styled.div`
  position: relative;
  height: clamp(220px, 42vh, 480px);
  border-radius: 4px;
   overflow: hidden;
  background: linear-gradient(180deg, ${colors.bg1}, ${colors.bg2});
  &:after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 6px;
    background: ${(p) => p.$accent};
    opacity: 0.95;
  }
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: ${(p) => (p.$fit === "cover" ? "cover" : "contain")};
  object-position: ${(p) =>
    p.$pos === "top" ? "50% 0%" : p.$pos === "bottom" ? "50% 100%" : "50% 50%"};
  filter: contrast(1.03) brightness(0.98);
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      1000px 480px at 85% -10%,
    ${colors.bg2},
      transparent 60%
    ),
    linear-gradient(180deg, ${colors.bg1}, ${colors.bg1});
  mix-blend-mode: soft-light;
`;

const HeroControls = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${colors.bg1};
  backdrop-filter: blur(6px);
   border-radius: 12px;
  padding: 6px;
`;

const Sep = styled.span`
  width: 1px;
  height: 18px;
  background: ${colors.bg2};
  opacity: 0.8;
  margin: 0 2px;
`;

const Chip = styled.button`
  border: 1px solid #2a4b7c;
  background: ${colors.bg2};
  color: ${colors.accentGold3};
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
  transition: transform 0.12s ease, background 0.12s ease,
    border-color 0.12s ease, color 0.12s ease;
  &[data-active="true"] {
    background: ${colors.accentGold};
    color:${colors.bg1};
    border-color: #3a67a8;
  }
  &:hover {
    transform: translateY(-1px);
  }
`;

/* --- CONTENU --- */
const Body = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 340px;
  }
`;

const ColLeft = styled(motion.div)`
  display: grid;
  gap: 16px;
`;

const Desc = styled.p`
  margin: 0;
  color:${colors.accentGoldLight};
  font-size: clamp(15px, 1.9vw, 18px);
  line-height: 1.65;
`;

const Block = styled.section`
  border: 1px solid #1f2c44;
  border-radius: 14px;
  padding: clamp(12px, 2vw, 16px);
  background: linear-gradient(180deg,${colors.bg2}20 , ${colors.bg1});
`;

const BlockTitle = styled.h4`
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(16px, 2.2vw, 18px);
  color: ${colors.accentGold3};
`;

/* icône animée */
const IconWrap = styled(motion.span)`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background:${colors.bg2};
  box-shadow: 0 8px 22px rgba(26, 44, 73, 0.35);
  svg {
    transform: translateY(0);
  }
`;

const IconGlow = styled.span`
  pointer-events: none;
  position: absolute;
  inset: -18px;
  border-radius: 16px;
  background: radial-gradient(
    20px 20px at 50% 50%,
    ${(p) => p.$accent}55,
    transparent 60%
  );
  filter: blur(10px);
`;

const List = styled.ul`
  margin: 0;
  padding-left: clamp(16px, 2vw, 20px);
  color: ${colors.accentGoldLight};
  li {
    margin: 6px 0;
    line-height: 1.6;
  }
`;

const ProgList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  li a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    color: ${colors.accentGoldLight};
    background: linear-gradient(180deg, #0e1a2b, #0f223a);
    border: 1px solid transparent;
    transition: border-color 0.15s ease, background 0.15s ease,
      transform 0.15s ease;
  }
  li a:hover {
    border-color: #25406b;
    background: #0f223a;
    transform: translateX(2px);
  }
`;

const ChevronAnim = styled(motion.span)`
  display: grid;
  place-items: center;
`;

const Aside = styled.aside`
  display: grid;
  gap: 14px;
  align-content: start;
`;

const Ctas = styled.div`
  display: grid;
  gap: 10px;
  a {
    text-align: center;
    padding: 12px 14px;
    border-radius: 12px 12px 0 0;
    font-weight: 700;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    font-size: clamp(14px, 1.8vw, 16px);
  }
  .primary {
    background: ${colors.accentGold};
    color: ${colors.bg1};
    
    box-shadow: 0 8px 22px rgba(242, 201, 76, 0.25);
  }
  .primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.32);
  }
  .ghost {
    border: 1px solid #264066;
    color: #cfe0f1;
    background: #0e1a2b;
  }
  .ghost:hover {
    border-color: #2a4b7c;
  }
`;

const Meta = styled.div`
  border: 1px solid #1f2c44;
  border-radius: 14px 14px 0px 0px;
 margin-bottom: 1rem;
  padding: 14px;
  background: ${colors.bg1};
  display: grid;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  b {
    color: #a8b3c7;
    font-weight: 600;
  }
  span {
    color: #e8eef7;
  }
`;
