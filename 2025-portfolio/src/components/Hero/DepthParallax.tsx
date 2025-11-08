"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function DepthParallax() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const [colorTexture, depthTexture] = useTexture(
    [
      "/textures/hero.png",
      "/textures/lithophane.png",
    ],
    (textures) => {
      const mainTexture = Array.isArray(textures) ? textures[0] : textures;
      mainTexture.minFilter = THREE.LinearFilter;
      mainTexture.magFilter = THREE.LinearFilter;
      mainTexture.anisotropy = 16;
      mainTexture.colorSpace = THREE.SRGBColorSpace;
    }
  );

  const { viewport } = useThree();
  const FIXED_WORLD_HEIGHT = 0.7; 
  const GEOM_WIDTH = 3; 
  const GEOM_HEIGHT = 2; 

  const textureImage = (colorTexture as THREE.Texture | undefined)?.image as
    | { width?: number; height?: number }
    | HTMLImageElement
    | ImageBitmap
    | undefined;
  const textureAspect =
    textureImage && textureImage.width && textureImage.height
      ? textureImage.width / textureImage.height
      : GEOM_WIDTH / GEOM_HEIGHT;

  const targetWorldWidth = textureAspect * FIXED_WORLD_HEIGHT;
  const scaleX = targetWorldWidth / GEOM_WIDTH;
  const scaleY = FIXED_WORLD_HEIGHT / GEOM_HEIGHT;

  // Mouse-based parallax
  useFrame((state) => {
    if (!meshRef.current) return;

    const { mouse } = state;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouse.y * 0.3,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      {/* High subdivision for smoother displacement */}
      <planeGeometry args={[3, 2, 256, 256]} />
      <meshStandardMaterial
        map={colorTexture}
        displacementMap={depthTexture}
        displacementScale={0.15}
        metalness={0.1}
        transparent={true}
        roughness={0.9}
        alphaTest={0.01}
      />
    </mesh>
  );
}
