"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { PSPModel } from "./PSPModel";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import PSPScreen from "./PSPScreen";

export function PSPSection() {
  const [scrollY, setScrollY] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(1);
  const [pspFocused, setPspFocused] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pspRef = useRef<HTMLDivElement | null>(null);

  // measure height
  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
    }
  }, []);

  // scroll tracking + auto exit
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // exit focus if PSP leaves viewport
      if (pspFocused && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setPspFocused(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pspFocused]);

  // scroll progress
  const t = Math.min(scrollY / sectionHeight, 1);
  const showUI = t >= 0.999;

  // global key handling for PSP focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {

      // ESC → exit PSP
      if (pspFocused && e.key === "Escape") {
        setPspFocused(false);
        return;
      }

      // intercept keys only when PSP focused
      if (pspFocused) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("psp-key", { detail: e.key }));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pspFocused, showUI]);

  function AnimatedPSP() {
    const modelRef = useRef<THREE.Group>(null);

    useFrame(() => {
      if (!modelRef.current) return;

      const startX = -3.8,
        endX = 0;
      const startY = 4,
        endY = -10;
      const startScale = 0.6,
        endScale = 1.1;

      modelRef.current.rotation.x = THREE.MathUtils.lerp(0.05, 0.12, t);
      modelRef.current.position.x = THREE.MathUtils.lerp(startX, endX, t);
      modelRef.current.position.y = THREE.MathUtils.lerp(startY, endY, t);
      modelRef.current.rotation.y = t * Math.PI * 2;

      const scale = THREE.MathUtils.lerp(startScale, endScale, t);
      modelRef.current.scale.set(scale, scale, scale);
    });

    return <PSPModel ref={modelRef} />;
  }

  return (
    <section ref={sectionRef} className="w-full h-[1080px] relative flex">
      <Canvas
        camera={{ position: [0, 0, 24], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <AnimatedPSP />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <PSPScreen
        showUI={showUI}
        focused={pspFocused}
        setFocused={setPspFocused}
        pspRef={pspRef}
      />

      <div className="w-9/16 h-full relative z-10 pointer-events-none"></div>

      <motion.div className="w-6/16 h-full relative z-10">
        <motion.p
          className="absolute text-white text-right text-[2.3vw]/12 p-6 top-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          "I strive for two things in design: simplicity and clarity. Great
          design is born of those two things." — Lindon Leader
        </motion.p>
      </motion.div>
    </section>
  );
}
