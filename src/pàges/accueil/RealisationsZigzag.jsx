// src/components/home/RealisationsZigzag.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, Calendar, Users, ArrowRight, ExternalLink, Star } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const imageHover = {
  rest: { scale: 1.05 },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const contentHover = {
  rest: { y: 0 },
  hover: { 
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

function cld(url, w = 1400) {
  if (typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}f_auto&q_auto&w=${w}`;
}

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(32px, 6vw, 64px) 24px;
  display: grid;
  gap: clamp(24px, 4vw, 40px);
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
  background: linear-gradient(135deg, ${colors.accentGold} 0%, ${colors.secondary} 100%);
  -webkit-background-clip: text;
   background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

const Zig = styled(motion.div)`
  display: grid;
  gap: 32px;
`;

const Row = styled(motion.article)`
  display: grid;
  gap: 24px;
  align-items: center;
  grid-template-columns: 1fr;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(145deg, #0f223a, #0b1729);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  position: relative;
  
  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    
    &.rev {
      grid-template-columns: 0.95fr 1.05fr;
      direction: rtl;
      
      > * {
        direction: ltr;
      }
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(200, 170, 110, 0.05), rgba(42, 75, 124, 0.05));
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const Media = styled(motion.div)`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 0.4;
  }
`;

const Image = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Body = styled(motion.div)`
  padding: 28px;
  display: grid;
  gap: 16px;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h3)`
  margin: 0;
  color: ${colors.accentGold};
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 800;
  line-height: 1.3;
`;

const Description = styled(motion.p)`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: 16px;
  line-height: 1.6;
`;

const Stats = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Stat = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.text};
  
  svg {
    color: ${colors.accentGold};
  }
`;

const Actions = styled(motion.div)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

 

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
  color: ${colors.accentGold};
  border: 2px solid ${colors.accentGold};
  
  &:hover {
    background: rgba(200, 170, 110, 0.1);
    transform: translateY(-2px);
  }
`;

const Badge = styled(motion.span)`
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  background: ${colors.accentGold}20;
  color: ${colors.primary}20 ;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function RealisationsZigzag({
  title = "Réalisations d'exception",
  lead = "Découvrez nos projets les plus marquants : conseil stratégique, formations diplômantes et partenariats innovants.",
  items = [
    { 
      title: "Conseil en gouvernance & pilotage", 
      desc: "Diagnostic 360°, optimisation des processus et mise en place de tableaux de bord performants pour une prise de décision éclairée.", 
      cover: imagess.DirecteurduGroupe2, 
      href: " ",
      stats: [
        { icon: Calendar, text: "6 mois" },
        { icon: Users, text: "12 consultants" },
        { icon: Star, text: "98% de satisfaction" }
      ],
      badge: "Projet phare"
    },
    { 
      title: "DBA en ligne – double diplomation", 
      desc: "Programme doctoral d'excellence avec encadrement à distance, séminaires méthodologiques et collaboration internationale.", 
      cover: imagess.Responsablecommercialegroupe1, 
      href: "",//"/realisations/dba",
      stats: [
        { icon: Calendar, text: "3 ans" },
        { icon: Users, text: "45 doctorants" },
        { icon: Star, text: "100% de réussite" }
      ],
      badge: "Innovation pédagogique"
    },
  ]
}) {
  return (
    <Section>
      <Header>
        <H2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Star size={32} />
          {title}
        </H2>
        <Lead
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          {lead}
        </Lead>
      </Header>

      <Zig
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((r, i) => (
          <Row
            key={i}
            className={i % 2 ? "rev" : ""}
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
          >
            {r.badge && (
              <Badge
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Star size={12} />
                {r.badge}
              </Badge>
            )}
            
            <Media>
              <Image
                src={cld(r.cover, 1400)}
                alt={r.title}
                loading="lazy"
                decoding="async"
                variants={imageHover}
                initial="rest"
                whileHover="hover"
              />
            </Media>
            
            <Body>
              <Title
                variants={contentHover}
              >
                {r.title}
              </Title>
              
              <Description
                variants={contentHover}
              >
                {r.desc}
              </Description>
              
              {r.stats && (
                <Stats
                  variants={contentHover}
                >
                  {r.stats.map((stat, index) => (
                    <Stat
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <stat.icon size={16} />
                      {stat.text}
                    </Stat>
                  ))}
                </Stats>
              )}
              
              <Actions
                variants={contentHover}
              >                
                <SecondaryButton to="/contact">
                  <ExternalLink size={18} />
                  Nous contacter
                </SecondaryButton>
              </Actions>
            </Body>
          </Row>
        ))}
      </Zig>
    </Section>
  );
}