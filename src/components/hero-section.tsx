import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Galaxy } from "./galaxy";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full">
        <Canvas camera={{ position: [0, 15, 30], fov: 50 }}>
          {/* Ljus */}
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

          {/* Galaxen */}
          <Galaxy />

          {/* Kamerakontroller */}
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
            target={[0, 0, 0]} // alltid på galaxens mitt
          />

          {/* Glow-effekt */}
            <EffectComposer>
                <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                intensity={2.2} // lite starkare
                />
            </EffectComposer>

          {/* Miljö */}
          <Environment preset="sunset" />
        </Canvas>
      </div>

    {/* 🔥 Svag overlay över hela sectionen */}
    <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none"></div>

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center mx-auto max-w-4xl">

        {/* Gradient-overlay bakom textblocket */}
        <div className="absolute inset-x-0 top-1/4 bottom-1/4 mx-auto w-[90%] max-w-3xl 
                        bg-gradient-to-b from-black/70 via-black/50 to-black/20 
                        rounded-xl blur-xl z-[-1]"></div>

        {/* Avatar med glow */}
        <div className="relative mb-10 mt-20">
            <div className="absolute inset-0 w-48 h-48 rounded-full bg-purple-600/40 blur-3xl"></div>
            <motion.img
            src={avatar}
            alt="Oskar Lindqvist"
            className="relative w-44 h-44 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            />
            <p className="absolute -top-8 -right-40 text-sm text-white/70 whitespace-nowrap">
            Hello! I am{" "}
            <span className="text-purple-400 font-semibold">Oskar Lindqvist</span>
            <span className="ml-1 text-xs text-white/60 italic">→</span>
            </p>
        </div>

        {/* Subtitle */}
        <p className="text-white/70 text-sm md:text-base mb-2 tracking-wide drop-shadow-[0_0_8px_#000]">
            A Developer who
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 
                        drop-shadow-[0_0_12px_#000,0_0_6px_#9B5DE5]">
            Builds digital solutions <br />
            <span className="font-bold">
            that{" "}
            <span className="text-purple-400 underline decoration-purple-600">
                last
            </span>
            .
            </span>
        </h1>

        {/* Tagline */}
        <p className="text-white/80 text-sm md:text-base max-w-xl mb-10 leading-relaxed drop-shadow-[0_0_6px_#000]">
            Because meaningful products should be scalable, secure, and delightful to use.
        </p>

        {/* Role + Description */}
        <h2 className="text-xl md:text-2xl text-white font-semibold mb-3 drop-shadow-[0_0_8px_#000]">
            I'm a Software Engineer.
        </h2>
        <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed tracking-wide 
                        drop-shadow-[0_0_10px_#000]">
            With a foundation in <span className="text-white font-medium">.NET web development</span> 
            and over <span className="text-white font-medium">six years in IT support</span>, I’ve built 
            a career on solving complex technical challenges with precision and creativity. During my LIA, 
            I gained hands-on experience as a
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> Fullstack Developer</span>, 
            driving projects from database architecture to intuitive frontends. Today, I co-found and run a 
            <span className="text-white font-medium"> startup AB</span>, where we craft 
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold"> scalable and secure digital solutions</span> 
            tailored for real business impact. Alongside this, I’m advancing my expertise in 
            <span className="text-purple-300 font-medium"> IT Security Development</span> — combining 
            software engineering with a <span className="italic text-purple-200">security-first mindset</span> 
            to deliver technology that is not only powerful, but resilient.
        </p>
        </div>
    </section>
  );
};

