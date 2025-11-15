"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function DepthParallax() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Listen for global mouse movement
  useEffect(() => {
    const handleGlobalMouse = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleGlobalMouse);
    
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouse);
    };
  }, []);

  const [colorTexture, depthTexture] = useTexture(
    [
      "/textures/hero.png",
      "/textures/lithophanev2.png",
    ],
    (textures) => {
      const [mainTex, depthTex] = Array.isArray(textures) ? textures : [textures, textures];
      
      // Enhanced texture settings for main texture
      mainTex.minFilter = THREE.LinearMipMapLinearFilter;
      mainTex.magFilter = THREE.LinearFilter;
      mainTex.anisotropy = 16;
      mainTex.colorSpace = THREE.SRGBColorSpace;
      mainTex.generateMipmaps = true;
      
      // Critical: Smooth the depth map
      depthTex.minFilter = THREE.LinearMipMapLinearFilter;
      depthTex.magFilter = THREE.LinearFilter;
      depthTex.anisotropy = 16;
      depthTex.generateMipmaps = true;
      depthTex.wrapS = THREE.ClampToEdgeWrapping;
      depthTex.wrapT = THREE.ClampToEdgeWrapping;
    }
  );

  const FIXED_WORLD_HEIGHT = 0.75; 
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

  // Use global mouse position for parallax
  useFrame(() => {
    if (!meshRef.current) return;

    const mouse = mouseRef.current;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.3,
      0.08
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouse.y * 0.3,
      0.08
    );
  });

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[3, 2, 512, 512]} />
      <meshStandardMaterial
        map={colorTexture}
        displacementMap={depthTexture}
        displacementScale={0.15}
        displacementBias={-0.05}
        metalness={0.1}
        transparent={true}
        roughness={0.9}
        alphaTest={0.01}
        side={THREE.FrontSide}
        depthWrite={true}
        depthTest={true}
      />
    </mesh>
  );
}