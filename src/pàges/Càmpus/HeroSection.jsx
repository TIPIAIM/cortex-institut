// src/components/CampusCortex/HeroSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import colors from '../../Styles/colors';
import { imagess } from '../../assets/imagess';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg1} 50%, ${colors.bg2} 100%);
  background-size: 400% 400%;
  animation: ${gradientBackground} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${imagess.bàtiment}) center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: ${colors.text};
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const Logo = styled.img`
  height: 120px;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${colors.accentGold} 0%, ${colors.accentGold3} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: ${colors.muted};
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Tagline = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: ${colors.accentGoldLight};
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.accentGold};
  cursor: pointer;
`;

const HeroSection = ({ onScrollClick }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <Logo 
          src={imagess.logoCortex} 
          alt="Campus Cortex" 
        />
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          CAMPUS CORTEX
        </Title>
        <Subtitle>
          Votre passeport pour le monde professionnel
        </Subtitle>
        <Tagline>
          Formation intensive • Stage en entreprise • Emploi garanti
        </Tagline>
      </HeroContent>
      <ScrollIndicator
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onScrollClick}
      >
        <ArrowDown size={32} />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;