"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { slideDownExit } from "@/lib/animations";

interface SplashScreenProps {
  progress: number; // 0 to 100
  onComplete: () => void;
}

export function SplashScreen({ progress, onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [counter, setCounter] = useState(0);
const rafRef = useRef<number | null>(null);

  // Animate counter smoothly
  useEffect(() => {
    function animate() {
      setCounter((prev) => {
        const step = Math.max((progress - prev) * 0.1, 0.5); // ensure min step
        const next = prev + step;
        return next >= 100 ? 100 : next;
      });

      if (counter < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Trigger splash exit
  useEffect(() => {
    if (counter >= 100 && !isExiting) {
      setTimeout(() => setIsExiting(true), 300);
    }
  }, [counter, isExiting]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          variants={slideDownExit}
          initial="visible"
          animate="visible"
          exit="exit"
          onAnimationComplete={(definition) => {
            if (definition === "exit") onComplete();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1c1c]"
        >
          {/* Counter fades out as splash exits */}
          <motion.div
            className="text-white text-4xl font-bold"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
          >
            {Math.floor(counter)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
