"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SplashScreen } from "@/components/SplashScreen";
import { useProgress } from "@react-three/drei";
import { PSPSection } from "@/components/PSP/PSPSection";
import { motion } from "framer-motion";

// Dynamically import Hero (3D model)
const Hero = dynamic(
  () => import("@/components/Hero").then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { progress } = useProgress();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen progress={progress} onComplete={handleSplashComplete} />
      )}

      <main>
        <Hero />

        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <PSPSection />
          </motion.div>
        )}

        {!showSplash && (
          <section className="min-h-screen bg-black text-white p-8">
            <h2 className="text-4xl font-bold">About Me</h2>
            <p className="mt-4">Section placeholder...</p>
          </section>
        )}
      </main>
    </>
  );
}
