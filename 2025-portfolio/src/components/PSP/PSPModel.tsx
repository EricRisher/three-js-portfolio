"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef } from "react";

export const PSPModel = forwardRef<THREE.Group>((props, ref) => {
  const { scene } = useGLTF("/models/psp_comp.glb");
  const clonedScene = scene.clone();

  const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

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

      if (child.name.toLowerCase().includes("screen")) {
        child.material = blackMaterial;
      }

      if ("map" in child.material && child.material.map) {
        child.material.map.colorSpace = THREE.SRGBColorSpace;
      }
    }
  });

  return <primitive ref={ref} object={clonedScene} {...props} />;
});
PSPModel.displayName = "PSPModel";

useGLTF.preload("/models/psp_comp.glb");
