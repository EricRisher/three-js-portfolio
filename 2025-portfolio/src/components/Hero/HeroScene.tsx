"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { DepthParallax } from "./DepthParallax";
import { PSPModel } from "../PSP/PSPModel";

export function HeroScene() {
  return (
    <div className="absolute inset-0 mt-70 h-auto">
      <Canvas camera={{ position: [0, 0, 1.4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 1, 2]} intensity={3.2} />

        <Suspense fallback={null}>
          <DepthParallax />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
