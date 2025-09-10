// src/components/home/PartnersStrip.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(200, 170, 110, 0.3); }
  50% { box-shadow: 0 0 20px rgba(200, 170, 110, 0.6); }
  100% { box-shadow: 0 0 5px rgba(200, 170, 110, 0.3); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const Strip = styled(motion.section)`
  position: relative;
  padding: clamp(24px, 5vw, 40px) 0;
 // background: linear-gradient(180deg, #0f223a, #112a48);
  overflow: hidden;
  isolation: isolate;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.accentGold}, transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.accentGold}, transparent);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    ${colors.bg} 0%,
    transparent 10%,
    transparent 90%,
    ${colors.bg} 100%
  );
  pointer-events: none;
  z-index: 2;
`;

const Title = styled(motion.h3)`
  text-align: center;
  margin: 0 0 clamp(16px, 3vw, 24px);
  color: ${colors.accentGold};
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(24px, 5vw, 48px);
  padding: 0 clamp(16px, 3vw, 32px);
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  padding: clamp(12px, 2vw, 20px);
  border-radius: 12px;
  background: linear-gradient(145deg, #0f223a, #0b1729);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(45deg, rgba(200, 170, 110, 0.1), rgba(42, 75, 124, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(200, 170, 110, 0.3);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    animation: ${glow} 2s ease infinite;
    
    &::before {
      opacity: 1;
    }
    
    img {
      filter: brightness(1.2) contrast(1.1) saturate(1.1);
      transform: scale(1.05);
    }
  }
`;

const LogoImage = styled(motion.img)`
  height: clamp(36px, 6vw, 60px);
  object-fit: contain;
  filter: brightness(0.95) contrast(1.05);
  transition: all 0.4s ease;
`;

const Placeholder = styled(motion.div)`
  width: clamp(100px, 15vw, 160px);
  height: clamp(36px, 6vw, 60px);
  border-radius: 8px;
  border: 1px dashed rgba(200, 170, 110, 0.3);
  display: grid;
  place-items: center;
  color: ${colors.muted};
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.accentGold};
    color: ${colors.accentGold};
    animation: ${float} 3s ease infinite;
  }
`;

const PartnerTooltip = styled(motion.div)`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: rgba(15, 25, 45, 0.95);
  border: 1px solid rgba(200, 170, 110, 0.2);
  border-radius: 6px;
  font-size: 12px;
  color: ${colors.text};
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  backdrop-filter: blur(10px);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: rgba(15, 25, 45, 0.95) transparent transparent transparent;
  }
`;

export default function PartnersStrip({
  logos = [imagess.pàrtenàires1,
     imagess.pàrtenàires2,imagess.pàrtenàires3,imagess.pàrtenàires4,imagess.pàrtenàires5,
     imagess.pàrtenàires6,imagess.pàrtenàires7,imagess.pàrtenàires8],
  title = "Ils nous font confiance"
}) {
  const items = (logos || []).filter(Boolean);
  const [hoveredLogo, setHoveredLogo] = useState(null);

  return (
    <Strip
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Partenaires qui nous font confiance"
    >
      <Overlay />
      
      <Title variants={fadeIn}>
        {title}
      </Title>
      
      <Marquee 
        pauseOnHover 
        gradient={false} 
        speed={40}
        style={{ overflow: 'hidden' }}
      >
        <Row>
          {items.length
            ? items.map((src, i) => (
                <LogoContainer
                  key={i}
                  onMouseEnter={() => setHoveredLogo(i)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogoImage 
                    src={src} 
                    alt={`Partenaire ${i + 1}`} 
                    loading="lazy" 
                    decoding="async" 
                  />
                  
                  {hoveredLogo === i && (
                    <PartnerTooltip
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      Partenaire {i + 1}
                    </PartnerTooltip>
                  )}
                </LogoContainer>
              ))
            : [1, 2, 3, 4, 5].map(i => (
                <Placeholder 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  PARTENAIRE
                </Placeholder>
              ))
          }
        </Row>
      </Marquee>
    </Strip>
  );
}