import { Variants } from "framer-motion";

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 0.8 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerLetters = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
      when: "beforeChildren",
    },
  },
};

export const letter = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36 },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};



export const floatingEffect: Variants = {
  initial: { y: 0 },
  animate: {
    y: -10,
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 1.5,
      type: "tween",
      ease: "easeInOut",
    },
  },
};
