// BackgroundScene.tsx
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import SpaceModel from "./spacemodel";
import Loader from "./loader";

export default function BackgroundScene({ onLoaded }: { onLoaded: () => void }) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => {
            gl.setClearColor("#000000");
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />

        <Suspense fallback={null}>
          <SpaceModel scale={7} position={[0, 0, 0]} />

          {/* === KOPPLINGEN TILL DITT LOADING === */}
          <Loader onLoaded={onLoaded} />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.4} />
        </EffectComposer>

        <Environment preset="sunset" />
      </Canvas>

      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
