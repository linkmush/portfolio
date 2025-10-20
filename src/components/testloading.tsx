// components/StarRain.tsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { useMemo } from "react";

function useStarTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;

    // 🔹 Rensa med transparent bakgrund
    context.clearRect(0, 0, size, size);

    // 🔹 Rund gradient för stjärna
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    // 🔹 Gör texturen rund & transparent
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    return texture;
  }, []);
}

function StarsField() {
  const starTexture = useStarTexture();

  // 🔹 små stjärnor (många, tät bakgrund)
  const smallStars = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 7000; i++) {
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
    }
    return new Float32Array(positions);
  }, []);

  // 🔹 glowiga större stjärnor (färre, sticker ut)
  const bigStars = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1000; i++) {
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <>
        {/* Små stjärnor (stabila, alltid synliga) */}
        <points>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[smallStars, 3]} />
        </bufferGeometry>
        <pointsMaterial
            map={starTexture}
            size={0.3}
            sizeAttenuation
            transparent
            depthWrite={false}
            depthTest={false}        // 🔹 FIX: hindrar blinkningar
            blending={THREE.NormalBlending}
        />
        </points>

        {/* Glowiga större stjärnor */}
        <points>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[bigStars, 3]} />
        </bufferGeometry>
        <pointsMaterial
            map={starTexture}
            size={1.5}
            sizeAttenuation
            transparent
            alphaTest={0.01}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
        />
        </points>
    </>
  );
}

function MovingCamera() {
  const { camera } = useThree();

  useFrame(() => {
    // 🔹 Panorerar kameran åt höger
    camera.position.x += 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export const StarRain = ({ active }: { active: boolean }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 500], fov: 75 }}>
            <MovingCamera />
            <StarsField />
          </Canvas>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 2,          // BOOM – växer snabbt
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          transition={{ duration: 1 }}
        >
        <svg
          viewBox="0 0 200 100"
          width="280"
          height="140"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          overflow="visible"
        >
        {/* Baslinje */}
        <motion.path
          d="M20,50 C20,20 80,20 100,50 C120,80 180,80 180,50 C180,20 120,20 100,50 C80,80 20,80 20,50 Z"
          stroke="url(#grad1)"
          strokeWidth="5"
          strokeOpacity="0.15"
        />

      {/* Glowande rörlig linje (dash) */}
      <motion.path
        d="M20,50 C20,20 80,20 100,50 C120,80 180,80 180,50 C180,20 120,20 100,50 C80,80 20,80 20,50 Z"
        stroke="url(#grad1)"
        strokeWidth="6"
        strokeDasharray="180 600"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -780 }}
        transition={{
          duration: 3,                  // samma som puls
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "drop-shadow(0 0 18px rgba(168,85,247,0.95))",
        }}
      />

          {/* Gradient */}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B5DE5" />
              <stop offset="50%" stopColor="#F15BB5" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};