"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Environment } from "@react-three/drei";
import { DepthParallax } from "./DepthParallax";

export function HeroScene() {
  useEffect(() => {
    // Track mouse globally and update Three.js mouse state
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 range (Three.js convention)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the global mouse position for Three.js
      // This will be accessible in useFrame via state.mouse
      document.dispatchEvent(
        new CustomEvent("threejs-mouse-move", {
          detail: { x, y }
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 mt-70 h-auto"
      style={{ pointerEvents: 'none' }} // Make Canvas non-blocking
    >
      <Canvas 
        camera={{ position: [0, 0, 1.4], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }} // Ensure Canvas doesn't block interactions
      >
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