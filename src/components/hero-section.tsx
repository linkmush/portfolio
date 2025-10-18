import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, useGLTF } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { motion } from "framer-motion"
import avatar from "../assets/avatar.png"
import { useTranslation, Trans } from "react-i18next"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import Loader from "./loader"

type PrimitiveProps = Omit<React.ComponentPropsWithoutRef<"primitive">, "object">;

function SpaceModel(props: PrimitiveProps) {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/scene-compressed.glb");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })

  return <primitive ref={ref} object={scene} {...props} />
}

export const HeroSection = ({ onLoaded }: { onLoaded: () => void }) => {
  const { t } = useTranslation()

  return (
    <section id="heroSection" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          {/* Ljus */}
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />

          {/* GLB-modellen – nu centrerad */}
          <Suspense fallback={null}>
          <SpaceModel scale={8} position={[0, 0, 0]} />
          <Loader onLoaded={onLoaded} />
          </Suspense>

          {/* Glow-effekt */}
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.8} />
          </EffectComposer>

          {/* Miljö */}
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* 🔥 Svag overlay */}
      <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none"></div>

      {/* TEXTBLOCK */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center mx-auto max-w-6xl">
        <div className="relative w-full max-w-5xl mx-auto p-12 rounded-2xl">
          {/* Avatar */}
          <div className="relative mb-10 mt-10 flex flex-col items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <div
                className="w-64 h-64 rounded-full blur-3xl opacity-80 animate-pulse-slow"
                style={{
                  background: `
                    radial-gradient(circle at center,
                      rgba(168,85,247,0.9) 0%,
                      rgba(236,72,153,0.6) 40%,
                      rgba(59,130,246,0.4) 70%,
                      transparent 100%
                    )
                  `,
                }}
              ></div>
            </div>

            <motion.img
              src={avatar}
              alt="Oskar Lindqvist"
              className="relative w-44 h-44 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] z-10"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Hello-text */}
            <p className="mt-4 text-sm text-white/70">
              {t("hero.hello")}{" "}
              <span className="text-purple-400 font-semibold">Oskar Lindqvist</span>
              <span className="ml-1 text-xs text-white/60 italic">→</span>
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-white/70 text-sm md:text-base mb-2 tracking-wide drop-shadow-[0_0_8px_#000]">
            {t("hero.subtitle")}
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 
                          drop-shadow-[0_0_12px_#000,0_0_6px_#9B5DE5]">
            {t("hero.headline")} <br />
            <span className="font-bold">
              {t("hero.headlineLast") && (
                <span className="text-purple-400 underline decoration-purple-600">
                  {t("hero.headlineLast")}
                </span>
              )}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_0_6px_#000]">
            {t("hero.tagline")}
          </p>

          {/* Description 1 */}
          <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto 
                        leading-relaxed tracking-wide pl-4 
                        drop-shadow-[0_0_10px_#000]">
            <Trans i18nKey="hero.desc1" components={{ strong: <strong /> }} />
          </p>

          {/* Description 2 */}
          <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto 
                        leading-relaxed tracking-wide pl-4
                        drop-shadow-[0_0_10px_#000] mt-6">
            <Trans
              i18nKey="hero.desc2"
              components={{
                highlight: (
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold" />
                ),
                strong: <strong />,
              }}
            />
          </p>

          {/* Description 3 */}
          <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto 
                        leading-relaxed tracking-wide pl-4
                        drop-shadow-[0_0_10px_#000] mt-6">
            <Trans
              i18nKey="hero.desc3"
              components={{
                strong: <strong />,
                em: <em className="italic text-purple-200" />,
              }}
            />
          </p>
        </div>
      </div>
    </section>
  )
}
