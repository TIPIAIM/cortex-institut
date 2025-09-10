// src/components/animations/motion.js
import { motion } from "framer-motion";

export const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(2px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  }
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0.12) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren }
  }
});

export const fadeScale = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }
  }
});

export const MotionSection = ({
  as = "section",
  children,
  initial = "hidden",
  whileInView = "show",
  viewport = { once: true, amount: 0.2 },
  variants = fadeInUp(),
  style,
  className
}) => {
  const Comp = motion[as] || motion.section;
  return (
    <Comp
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      variants={variants}
      style={style}
      className={className}
    >
      {children}
    </Comp>
  );
};
