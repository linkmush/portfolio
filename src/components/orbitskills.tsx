import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  SiFigma, SiReact, SiNodedotjs, SiJavascript, SiCss3, SiNextdotjs,
  SiAdobeillustrator, SiMongodb, SiExpress, SiDotnet,
  SiTypescript, SiTailwindcss, SiSqlite, SiDocker, SiBootstrap, SiMysql,
} from "react-icons/si";
import { FaLinkedin, FaGithub, FaDatabase, FaCode } from "react-icons/fa";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { BiLogoVisualStudio } from "react-icons/bi";
import { DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp, TbBrandPowershell } from "react-icons/tb";

type Line = { x1: number; y1: number; x2: number; y2: number; mergeX: number; mergeY: number };

const TILT = 65;

const mainSkills = [
  { icon: <TbBrandCSharp className="text-2xl text-[#239120]" />, name: "C#" },
  { icon: <SiJavascript className="text-2xl text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <SiTypescript className="text-2xl text-[#3178C6]" />, name: "TypeScript" },
  { icon: <DiVisualstudio className="text-2xl text-[#5C2D91]" />, name: "Visual Studio" },
  { icon: <BiLogoVisualStudio className="text-2xl text-[#0da1f7]" />, name: "Visual Studio" },
  { icon: <FaDatabase className="text-2xl text-[#4DB33D]" />, name: "Database" },
];

const orbitRings = [
  [
    { icon: <FaLinkedin />, color: "text-purple-400" },
    { icon: <SiCss3 />, color: "text-blue-500" },
    { icon: <SiMongodb />, color: "text-green-400" },
  ],
  [
    { icon: <FaGithub />, color: "text-purple-400" },
    { icon: <SiAdobeillustrator />, color: "text-orange-500" },
    { icon: <SiReact />, color: "text-[#61DAFB]" },
  ],
  [
    { icon: <SiNextdotjs />, color: "text-white" },
    { icon: <SiDotnet />, color: "text-[#5185f5]" },
    { icon: <SiExpress />, color: "text-gray-200" },
    { icon: <TbBrandPowershell />, color: "text-blue-500" },
  ],
  [
    { icon: <SiFigma />, color: "text-pink-400" },
    { icon: <SiNodedotjs />, color: "text-green-500" },
    { icon: <SiTailwindcss />, color: "text-[#06B6D4]" },
    { icon: <SiDocker />, color: "text-[#2496ED]" },
    { icon: <VscAzure />, color: "text-[#0078D7]" },
    { icon: <VscAzureDevops />, color: "text-[#0078D7]" },
    { icon: <SiBootstrap />, color: "text-[#7952B3]" },
    { icon: <SiMysql />, color: "text-[#4479A1]" },
    { icon: <SiSqlite />, color: "text-[#003B57]" },
    { icon: <FaCode />, color: "text-gray-300" },
  ],
];

const rings = [
  { w: 400, h: 400 },
  { w: 600, h: 600 },
  { w: 800, h: 800 },
  { w: 1000, h: 1000 },
];

export default function OrbitSkills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
  const ringControls = useAnimation();
  const iconControls = useAnimation();

  iconRefs.current = Array(mainSkills.length).fill(null).map((_, i) => iconRefs.current[i] || null);

  // *** FIXED LINE LOGIC ***
  const computeLines = () => {
    if (!sectionRef.current || !orbRef.current) return;
    const secRect = sectionRef.current.getBoundingClientRect();
    const orbRect = orbRef.current.getBoundingClientRect();

    const orbCx = orbRect.left - secRect.left + orbRect.width / 2;
    const orbCy = orbRect.top - secRect.top + orbRect.height / 2;

    const centers = iconRefs.current
      .filter(Boolean)
      .map((el) => {
        const r = el!.getBoundingClientRect();
        return {
          cx: r.left - secRect.left + r.width / 2,
          cy: r.top - secRect.top + r.height / 2,
        };
      });

    const iconLowestY = Math.max(...centers.map((p) => p.cy));
    const mergeY = iconLowestY + 30; // funnel sits ~30 px under mainIcons
    const mergeX = orbCx;
    const orbRadius = orbRect.width / 2;

    const newLines = centers.map((p) => ({
      x1: p.cx,
      y1: p.cy + (-24), // din fix för main bubble
      x2: orbCx,
      y2: orbCy - orbRadius + 10,  // <<<<<< sluta ca 10px ovanför orb ytan
      mergeX,
      mergeY,
    }));

    setLines(newLines);
  };

  useLayoutEffect(() => {
    if (!isInView) return;
    computeLines();
    const id = requestAnimationFrame(() => computeLines());
    return () => cancelAnimationFrame(id);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const ro = new ResizeObserver(() => computeLines());
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (orbRef.current) ro.observe(orbRef.current);
    iconRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("scroll", computeLines, { passive: true });
    window.addEventListener("resize", computeLines);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", computeLines);
      window.removeEventListener("resize", computeLines);
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    (async () => {
      await ringControls.start(i => ({
        scale: 1,
        opacity: 1,
        transition: { duration: 1, delay: 0.5 + i * 0.3 },
      }));
      iconControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 },
      });
    })();
  }, [isInView, ringControls, iconControls]);

  return (
    <section
      ref={sectionRef as any}
      id="skills"
      className="relative h-screen flex flex-col items-center justify-start text-center text-white bg-[#0a0015] overflow-hidden pt-12 pb-32"
    >
      {/* text */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-wide mt-10 
        bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-400 
        bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.25)]">
        My core skills and the ecosystem I build with
      </h2>
      <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
        Core stack: C#, JavaScript, TypeScript, databases and modern tooling.
        <br />
        Everything around it is the ecosystem I use to build fullstack solutions.
      </p>

      {/* main skills row */}
      <div className="flex items-center justify-center gap-6 mb-20 relative z-30" style={{ transform: "none" }}>
        {mainSkills.map((skill, i) => (
          <motion.div
            key={i}
            ref={(el) => { iconRefs.current[i] = el; }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e]"
            title={skill.name}
            initial={{ opacity: 0, y: 30, boxShadow: "none" }}
            animate={isInView ? { opacity: 1, y: 0, boxShadow: "0 0 20px rgba(168,85,247,0.6)" } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
          >
            {skill.icon}
          </motion.div>
        ))}
      </div>

      {/* funnel lines */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {lines.map((line, i) => {
          const d = `M ${line.x1},${line.y1}
                     Q ${line.mergeX},${line.mergeY}
                     ${line.x2},${line.y2}`;

          return (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(155,93,229,0.65)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.4 + i * 0.1 }}
              strokeLinecap="round"
              style={{ filter:"drop-shadow(0 0 8px rgba(155,93,229,0.7))" }}
            />
          );
        })}

        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B5DE5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F15BB5" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* orbit system */}
      <div className="relative flex items-center justify-center flex-col mt-15" style={{ perspective: "1200px" }}>
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ transform: `rotateX(${TILT}deg)`, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {rings.map((r, i) => (
            <motion.div
              key={`ring-${i}`}
              custom={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={ringControls}
              className="absolute rounded-full"
              style={{
                width: `${r.w}px`,
                height: `${r.h}px`,
                border: "2px solid rgba(155,93,229,0.6)",
                transformOrigin: "50% 50%",
              }}
            />
          ))}

          {orbitRings.flatMap((ringIcons, ringIndex) => {
            const ring = rings[ringIndex];
            const radius = ring.w / 2;

            return ringIcons.map((item, i) => {
              let angle = (360 / ringIcons.length) * i;
                // --- flytta PowerShell ikonen
                if(ringIndex === 2 && i === 3) {
                  angle += 12; // test värde
                }

              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <motion.div
                  key={`${ringIndex}-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={iconControls}
                  className="absolute"
                  style={{
                    x, y,
                    rotateX: -TILT,
                    transformStyle: "preserve-3d",
                    transformOrigin: "50% 50%",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className={`${item.color} text-2xl drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]`}>
                    {item.icon}
                  </div>
                </motion.div>
              );
            });
          })}
        </div>

        {/* orb */}
        <motion.div
          ref={orbRef}
          className="relative z-20 w-48 h-48 rounded-full flex items-center justify-center text-6xl font-bold"
          style={{
            background: "radial-gradient(circle, #fff59d 0%, #fbbf24 40%, #f97316 80%, #1a1a2e 100%)",
            color: "#fff",
          }}
          animate={{
            boxShadow: [
              "0 0 100px 30px rgba(251,191,36,0.6)",
              "0 0 160px 50px rgba(249,115,22,0.8)",
              "0 0 100px 30px rgba(251,191,36,0.6)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Σ
        </motion.div>

      </div>
    </section>
  );
}
