// src/components/home/FinalBandCTA.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {  MessageCircle, Star, ArrowRight, Users, Award, Aperture } from "lucide-react";
import colors from "../../Styles/colors";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const pulseGold = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(200, 158, 110, 0.4); }
  70% { box-shadow: 0 0 0 12px rgba(200, 170, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(200, 170, 110, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Band = styled(motion.section)`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(32px, 6vw, 64px) 24px;
`;

const Inner = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  background: linear-gradient(135deg, ${colors.accentGold3}20 50% 0%,  ${colors.bg1} 50% 100%);
  padding: clamp(24px, 4vw, 40px);
  display: grid;
  gap: 24px;
  align-items: center;
  position: relative;
  isolation: isolate;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(200, 170, 110, 0.1) 0%,
      rgba(42, 75, 124, 0.2) 50%,
      rgba(200, 170, 110, 0.1) 100%
    );
    animation: ${gradientBackground} 8s ease infinite;
    background-size: 200% 200%;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(200, 170, 110, 0.05) 0%,
      transparent 70%
    );
    z-index: -1;
  }
  
  @media (min-width: 900px) {
    grid-template-columns: 1fr auto;
    gap: 40px;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 12px;
`;

const Title = styled(motion.h3)`
  margin: 0;
  color: ${colors.accentGold};
  font-size: clamp(20px, 3.5vw, 28px);
  font-weight: 800;
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Description = styled(motion.p)`
  margin: 0;
  color: ${colors.accentGoldLight};
  font-size: clamp(14px, 1.8vw, 16px);
  line-height: 1.6;
  max-width: 600px;
`;

const Features = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
`;

const Feature = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${colors.bg};
  border-radius: 20px 0 20px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.accentGold3};
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Actions = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  
  @media (min-width: 900px) {
    justify-content: flex-end;
  }
`;

const CTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-radius: 16px 0 16px 0;
  text-decoration: none;
  font-weight: 800;
  font-size: 16px;
  transition: all 0.3s ease;
  background: linear-gradient(120deg, ${colors.accentGold3}40, ${colors.bg});
  color:  ${colors.accentGold3};
    position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.7s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(200, 170, 110, 0.4);
    animation: ${pulseGold} 2s infinite;
    
    &::before {
      left: 100%;
    }
  }
`;

const CTAGhost = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-radius: 16px 0 16px 0;
  font-weight: 800;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
  color: ${colors.text};
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${colors.accentGold};
    color: ${colors.accentGold};
    transform: translateY(-3px);
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  z-index: -1;
  opacity: 0.1;
  
  &:nth-child(1) {
    top: 20%;
    left: 5%;
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &:nth-child(2) {
    bottom: 10%;
    right: 5%;
    animation: ${float} 7s ease-in-out infinite 1s;
  }
`;

export default function FinalBandCTA() {
  return (
    <Band
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Inner
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <FloatingElement>
          <Users size={48} />
        </FloatingElement>
        
        <FloatingElement>
          <Award size={48} />
        </FloatingElement>
        
        <Content>
          <Title variants={fadeInUp}>
            <Star size={28} />
            Catalyser vos compétences & vos projets
          </Title>
          
          <Description variants={fadeInUp}>
            Découvrez notre catalogue exclusif 2025-2026 conçu pour les partenaires ambitieux. 
            Programmes certifiants, accompagnement sur-mesure et solutions innovantes pour 
            transformer votre potentiel en excellence.
          </Description>
          
          <Features variants={fadeInUp}>
            <Feature>
              <Star size={14} />
              Formations certifiantes
            </Feature>
            <Feature>
              <Users size={14} />
              Accompagnement personnalisé
            </Feature>
            <Feature>
              <Award size={14} />
              Solutions sur-mesure
            </Feature>
          </Features>
        </Content>
        
        <Actions variants={fadeInUp}>
          <CTA 
            to="/apropos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Aperture size={20} />
            Apropos de nous
            <ArrowRight size={18} />
          </CTA>
          
          <CTAGhost 
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            Parler à un conseiller
          </CTAGhost>
        </Actions>
      </Inner>
    </Band>
  );
}