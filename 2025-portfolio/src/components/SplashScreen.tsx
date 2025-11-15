"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  progress: number;
  onComplete: () => void;
}

export function SplashScreen({ progress, onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      setTimeout(() => setIsExiting(true), 300);
    }
  }, [progress, isExiting]);

  useEffect(() => {
    if (isExiting) onComplete();
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800"
        >
          <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-2">
              ERIC RISHER
            </h1>
            <p className="text-xl md:text-2xl text-blue-200">
              Creative Developer
            </p>

            {/* Progress bar */}
            <div className="mt-12 w-full max-w-md mx-auto h-2 bg-blue-950/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            <div className="mt-4 text-blue-200 text-sm font-mono">
              {progress < 100
                ? `Loading Experience... ${Math.round(progress)}%`
                : "Ready! ✓"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
