// src/pages/contact/ContactHero.jsx
import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* Helper Cloudinary (quality + responsive) */
function cld(url, w = 1600) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}f_auto&q_auto&w=${w}`;
}

/* Animations */
const gridDrift = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: 240px 160px, -240px -160px; }
`;

const fadeUp = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

/* UI */
const Hero = styled.header`
  position: relative;
  height: clamp(320px, 80vh, 520px);
  isolation: isolate;
  border-bottom: 1px solid #1f2c44;
  background: linear-gradient(
    180deg,
    ${colors.accentGold},
    ${colors.accentGoldLight}
  );
  overflow: hidden;
`;

const Bg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* image centrée et bien cadrée */
  object-position: center;
  filter: saturate(0.98) brightness(0.98);
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      60% 80% at 75% 15%,
      #00000088 0%,
      #000000bb 55%,
      #000000dd 100%
    ),
    linear-gradient(180deg, rgba(22, 28, 10, 0.22), rgba(10, 16, 28, 0.66));
  mix-blend-mode: normal;
`;

/* Grille flottante subtile */
const GridFX = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background: repeating-linear-gradient(
      90deg,
      ${colors.accentGold}22 0 1px,
      transparent 1px 40px
    ),
    repeating-linear-gradient(
      0deg,
      ${colors.semygprimary}22 0 1px,
      transparent 1px 40px
    );
  animation: ${gridDrift} 26s linear infinite;
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 24px) 20px;
  height: 100%;
  display: grid;
  align-content: end;
  gap: 10px;
  color: ${colors.text};
  text-align: left;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(54px, 5vw, 44px);
 `;

const Sub = styled.p`
  margin: 0;
  max-width: 860px;
  //  margin-bottom: 5rem;

  font-size: clamp(14px, 2.2vw, 18px);
  color: ${colors.muted};
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  // margin-top: 2px;
`;

const Chip = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 5rem;

  padding: 10px 12px;
  border-radius: 24px 0 24px 0;
  color: ${colors.text};
  text-decoration: none;
  background: linear-gradient(
    120deg,
    ${colors.bg}90 60%,
    ${colors.accentGold}90 60%
  );
  border: 1px solid #1f2c44;
  transition: border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  &:hover {
    background: linear-gradient(
      120deg,
      ${colors.bg} 60%,
      ${colors.accentGold} 60%
    );

    transform: translateY(-1px);
    border-color: ${colors.semygsecondar}22;
    box-shadow: 0 10px 26px rgba(10, 16, 28, 0.35);
  }
  svg {
    color: ${colors.accentGold};
  }
`;

/**
 * ContactHero
 * props:
 * - title?: string
 * - subtitle?: string
 * - bg?: string (image URL)
 * - email?: string
 * - phone?: string
 * - whatsapp?: string (ex: +224622856693)
 */
function ContactHero({
  title = "Contactez l’Institut CORTEX",
  subtitle = "Une question sur nos programmes, certifications, partenariats ou admissions ? Notre équipe vous répond rapidement.",
  bg = imagess?.Responsablecommercialegroupe4 || imagess?.loreàt,
  email,
  phone,
  whatsapp,
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Hero role="banner" aria-label="En-tête de la page Contact">
      {/* Image de fond */}
      <Bg
        src={cld(bg, 2000)}
        srcSet={`${cld(bg, 1200)} 1200w, ${cld(bg, 1600)} 1600w, ${cld(
          bg,
          2000
        )} 2000w`}
        sizes="100vw"
        alt=""
        aria-hidden
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      {/* Voile sombre + grille animée */}
      <Shade />
      <GridFX />

      {/* Contenu */}
      <Inner {...fadeUp}>
        <Title>{title}</Title>
        <Sub>{subtitle}</Sub>

        {(email || phone || whatsapp) && (
          <Chips>
            {whatsapp && (
              <Chip
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter via WhatsApp"
              >
                <MessageCircle size={18} />
                WhatsApp direct
              </Chip>
            )}
          </Chips>
        )}
      </Inner>
    </Hero>
  );
}

export default memo(ContactHero);
