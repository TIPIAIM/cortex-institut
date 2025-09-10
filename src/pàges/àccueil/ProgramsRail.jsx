// src/components/home/ProgramsRail.jsx
import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// Animation de fondu entrant depuis le bas
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation pour les cartes (entrée en escalier)
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.5 },
      scale: { duration: 0.5 },
    },
  }),
  hover: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      y: { type: "spring", stiffness: 400, damping: 15 },
    },
  },
};

// Animation pour l'image au survol
const hoverImage = {
  rest: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.15,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Animation pour le texte au survol
const hoverText = {
  rest: {
    y: 0,
    opacity: 0.9,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    y: -5,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// Animation du bouton "Voir plus"
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

function cld(url, w = 1200) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}f_auto&q_auto&w=${w}`;
}

const Section = styled(motion.section)`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(32px, 6vw, 64px) 24px;
  display: grid;
  gap: clamp(20px, 3vw, 32px);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  display: grid;
  gap: 12px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const H2 = styled(motion.h2)`
  margin: 0;
  font-size: clamp(26px, 5vw, 42px);
  color: ${colors.accentGold};
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(
    120deg,
    ${colors.accentGold} 50%,
    ${colors.secondary} 60%
  );
  -webkit-background-clip: text;
  background-clip: text;
`;

const Lead = styled(motion.p)`
  margin: 0;
  color: ${colors.text};
  max-width: 700px;
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.6;
  opacity: 0.85;
  margin: 0 auto;
`;

const RailTrack = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 1fr);
  overflow-x: auto;
  padding: 16px 8px 24px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    height: 6px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      90deg,
      ${colors.accentGold},
      ${colors.bg1}
    );
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, ${colors.accentGold}, ${colors.primary});
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Card = styled(motion(Link))`
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: linear-gradient(120deg, ${colors.bg1} 90%, ${colors.accentGold} 30%);
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
     ${colors.accentGold}10,
      rgba(42, 75, 124, 0.1)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const CardFigure = styled.figure`
  margin: 0;
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardFigcaption = styled(motion.figcaption)`
  position: absolute;
  inset: auto 0 0 0;
  padding: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  z-index: 2;
`;

const CardContent = styled(motion.div)`
  padding: 20px;
  color: ${colors.text};
`;

const CardTitle = styled(motion.h3)`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.accentGold};
`;

const CardExcerpt = styled(motion.p)`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.8;
`;

const RowEnd = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const MoreButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border: 2px dashed ${colors.accentGold};
  border-radius: 50px;
  background: linear-gradient(
    45deg,
    rgba(200, 170, 110, 0.1),
    rgba(42, 75, 124, 0.1)
  );
  color: ${colors.accentGold};
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      45deg,
      rgba(200, 170, 110, 0.2),
      rgba(42, 75, 124, 0.2)
    );
    border-style: solid;
    animation: ${pulse} 1s ease infinite;
  }
`;

const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.$active ? colors.accentGold : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.accentGold};
    transform: scale(1.2);
  }
`;

export default function ProgramsRail({
  title = "Programmes phares",
  lead = "Découvrez nos formations d'excellence conçues pour votre réussite professionnelle",
  items = [
    {
      title: "Management & Leadership",
      cover: imagess.loreàt,
      href: "/programmes#management",
      excerpt:
        "Développez vos compétences en gestion d'équipe et leadership stratégique",
    },
    {
      title: "Certification QHSE",
      cover: imagess.khse,
      href: "/programmes#qhse",
      excerpt:
        "Maîtrisez les normes qualité, hygiène, sécurité et environnement",
    },
    
    {
      title: "Finance & Contrôle",
      cover: imagess.finànce,
      href: "/programmes#finance",
      excerpt: "Expertise en gestion financière, audit et contrôle de gestion",
    },
  ],
  moreHref = "/programmes",
  moreLabel = "Découvrir tous nos programmes",
}) {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef();

  // Défilement automatique pour la navigation mobile
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const handleScroll = () => {
      const scrollPos = rail.scrollLeft;
      const cardWidth = rail.offsetWidth / 2;
      const newIndex = Math.floor(scrollPos / cardWidth);
      setActiveIndex(newIndex);
    };

    rail.addEventListener("scroll", handleScroll);
    return () => rail.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const rail = railRef.current;
    if (!rail) return;

    const cardWidth = rail.offsetWidth / 2;
    rail.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <Section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <Header>
        <H2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {title}
        </H2>
        <Lead
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {lead}
        </Lead>
      </Header>

      <RailTrack ref={railRef}>
        {items.map((p, i) => (
          <Card
            key={i}
            to={p.href}
            title={p.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
          >
            <CardFigure>
              <CardImage
                src={cld(p.cover, 1200)}
                alt={p.title}
                loading="lazy"
                decoding="async"
                initial="rest"
                whileHover="hover"
                variants={hoverImage}
              />
              <CardFigcaption
                initial="rest"
                whileHover="hover"
                variants={hoverText}
              >
                {p.title}
              </CardFigcaption>
            </CardFigure>
            <CardContent>
              <CardTitle initial="rest" whileHover="hover" variants={hoverText}>
                {p.title}
              </CardTitle>
              <CardExcerpt
                initial="rest"
                whileHover="hover"
                variants={hoverText}
              >
                {p.excerpt}
              </CardExcerpt>
            </CardContent>
          </Card>
        ))}
      </RailTrack>

      <NavigationDots>
        {items.map((_, i) => (
          <Dot
            key={i}
            $active={i === activeIndex}
            onClick={() => scrollToIndex(i)}
            aria-label={`Aller au programme ${i + 1}`}
          />
        ))}
      </NavigationDots>

      <RowEnd
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <MoreButton
          to={moreHref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {moreLabel} <ArrowRight size={18} />
        </MoreButton>
      </RowEnd>
    </Section>
  );
}
