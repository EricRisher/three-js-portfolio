"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function PSPModel({
  position = [0, 0, 0],
  scale = [0.5, 0.5, 0.5],
}: {
  position?: [number, number, number];
  scale?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/psp_comp.glb");
  const clonedScene = scene.clone();

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (
          child.name.toLowerCase().includes("ground") ||
          child.name.toLowerCase().includes("plane") ||
          child.name.toLowerCase().includes("shadow")
        ) {
          child.visible = false;
          return;
        }
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material && "map" in child.material && child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        }
      }
    });

  }, [clonedScene, position, scale]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/psp_comp.glb");
