import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
 
// Palette MKGS
const COLORS = {
  primary: "#002d52",
  secondary: "#006699",
  accent: "#f2c94c",
  neutral: "#333333",
  light: "#ffffff",
};

// Grid + Parallax + Glow
const AnimatedGrid = styled(motion.svg)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
  filter: blur(0.7px) drop-shadow(0 0 8px #00669944);
  transition: filter 0.5s;
`;

 

// Floating particles
const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  z-index: 1;
  pointer-events: none;
`;

function FondAnimerPremium() {
  // Effet Parallax : on suit la souris
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef([]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 700);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Generate particles on mount
  useEffect(() => {
    particlesRef.current = Array.from({ length: isMobile ? 15 : 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? COLORS.accent : 
             Math.random() > 0.5 ? COLORS.secondary : COLORS.primary,
      duration: Math.random() * 10 + 10,
    }));
  }, [isMobile]);

  // Mouse move effect
  useEffect(() => {
    if (isMobile) return;
    
    const move = (e) => {
      setPos({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };
    
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

   

  return (
    <div>
      <AnimatedGrid
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        initial={{ scale: 1, opacity: 0.2 }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.2, 0.48, 0.32],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          filter: pos.x !== 0 ? "blur(1.3px) drop-shadow(0 0 22px #f2c94c)" : "",
        }}
      >
        {/* Vertical lines */}
        {[...Array(40)].map((_, i) => (
          <line
            key={"v" + i}
            x1={i * 30}
            y1="0"
            x2={i * 30}
            y2="800"
            stroke={COLORS.secondary}
            strokeWidth="0.7"
            opacity="0.34"
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(28)].map((_, i) => (
          <line
            key={"h" + i}
            x1="0"
            y1={i * 30}
            x2="1200"
            y2={i * 30}
            stroke={COLORS.primary}
            strokeWidth="0.7"
            opacity="0.23"
          />
        ))}
        {/* Diagonal lines (accent color, light) */}
        {[...Array(10)].map((_, i) => (
          <line
            key={"diag" + i}
            x1={i * 120}
            y1="0"
            x2="0"
            y2={i * 80}
            stroke={COLORS.accent}
            strokeWidth="0.55"
            opacity="0.16"
          />
        ))}
      </AnimatedGrid>

      {/* Floating particles */}
      {particlesRef.current.map((particle) => (
        <Particle
          key={particle.id}
          color={particle.color}
          opacity={particle.opacity}
          size={particle.size}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + (Math.random() * 10 - 5)}vw`,
              `${particle.x}vw`
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + (Math.random() * 10 - 5)}vh`,
              `${particle.y}vh`
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

    </div>
  );
}
export default FondAnimerPremium;