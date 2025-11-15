"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PSPModel } from "./PSPModel";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface DynamicControlsProps {
  target: [number, number, number];
}

export function DynamicOrbitControls({ target }: DynamicControlsProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (controlsRef.current) {
      // Smoothly update target to match model position
      controlsRef.current.target.lerp(new THREE.Vector3(...target), 0.2);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI * 0.4}
      maxPolarAngle={Math.PI * 0.6}
      minAzimuthAngle={-Math.PI * 0.9}
      maxAzimuthAngle={Math.PI * 0.9}
      autoRotate={false}
    />
  );
}

export function PSPSection() {
  const modelPosition: [number, number, number] = [0, 0, 0.1];

  return (
    <section className="w-full h-screen relative flex">
      <div
        className="w-2/5 h-full relative"
        style={{ overflow: "visible", pointerEvents: "auto" }}
      >
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{
            position: "absolute",
            top: -250,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          <Suspense fallback={null}>
            <PSPModel position={modelPosition} />

            {/* Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight
              position={[-3, 2, -2]}
              intensity={0.5}
              color="#4a90e2"
            />

            {/* Environment */}
            <Environment preset="city" />

            {/* Dynamic OrbitControls */}
            <DynamicOrbitControls target={modelPosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Right 2/3 can be content, or empty */}
      <motion.div className="w-3/5 h-full ">
        <motion.p
          variants={fadeIn}
          className="absolute text-white text-right text-[2.6vw]/12 p-6 top-24"
          initial="hidden"
          animate="visible"
        >
          &quot;I strive for two things in design: simplicity and clarity. Great
          design is born of those two things.&quot;— Lindon Leader
        </motion.p>
      </motion.div>
    </section>
  );
}
