import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiFigma, SiReact, SiNodedotjs, SiJavascript, SiCss3, SiNextdotjs,
  SiAdobeillustrator, SiAdobexd, SiMongodb, SiExpress, SiDotnet,
  SiTypescript, SiTailwindcss, SiSqlite, SiDocker, SiBootstrap, SiMysql,
} from "react-icons/si";
import { FaLinkedin, FaGithub, FaDatabase, FaCode } from "react-icons/fa";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { BiLogoVisualStudio } from "react-icons/bi";
import { DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp, TbBrandPowershell } from "react-icons/tb";

type Line = { x1: number; y1: number; x2: number; y2: number };

// 🔹 Core skills (Main row)
const mainSkills = [
  { icon: <TbBrandCSharp className="text-2xl text-[#239120]" />, name: "C#" },
  { icon: <SiJavascript className="text-2xl text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <SiTypescript className="text-2xl text-[#3178C6]" />, name: "TypeScript" },
  { icon: <TbBrandPowershell className="text-2xl text-[#5391FE]" />, name: "PowerShell" },
  { icon: <DiVisualstudio className="text-2xl text-[#5C2D91]" />, name: "Visual Studio" },
  { icon: <BiLogoVisualStudio className="text-2xl text-[#0da1f7]" />, name: "Visual Studio" },
  { icon: <FaDatabase className="text-2xl text-[#4DB33D]" />, name: "Database" },
];

// 🔹 Orbit icons (Frameworks, tools, libraries, design etc.)
const orbitRings = [
  // Ring 0
  [
    { icon: <FaLinkedin />, color: "text-purple-400" },
    { icon: <SiCss3 />, color: "text-blue-500" },
    { icon: <SiMongodb />, color: "text-green-400" },
  ],
  // Ring 1
  [
    { icon: <FaGithub />, color: "text-purple-400" },
    { icon: <SiAdobeillustrator />, color: "text-orange-500" },
    { icon: <SiReact />, color: "text-[#61DAFB]" },
  ],
  // Ring 2
  [
    { icon: <SiNextdotjs />, color: "text-white" },
    { icon: <SiDotnet />, color: "text-[#5185f5]" },
    { icon: <SiExpress />, color: "text-gray-200" },
    { icon: <SiAdobexd />, color: "text-pink-500" },
  ],
  // Ring 3
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

// 🔹 Ring sizes
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

  // Ensure array length for refs
  iconRefs.current = Array(mainSkills.length)
    .fill(null)
    .map((_, i) => iconRefs.current[i] || null);

  const computeLines = () => {
    if (!sectionRef.current || !orbRef.current) return;

    const secRect = sectionRef.current.getBoundingClientRect();
    const orbRect = orbRef.current.getBoundingClientRect();

    // Centers relative to section (NO scrollX/scrollY)
    const orbCx = orbRect.left - secRect.left + orbRect.width / 2;
    const orbCy = orbRect.top - secRect.top + orbRect.height / 2;
    const orbRadius = Math.min(orbRect.width, orbRect.height) / 2;

    const newLines: Line[] = [];

    for (const el of iconRefs.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const cx = r.left - secRect.left + r.width / 2;
      const cy = r.top - secRect.top + r.height / 2;

      // Vector from orb -> icon
      const dx = cx - orbCx;
      const dy = cy - orbCy;
      const dist = Math.hypot(dx, dy);
      if (dist === 0) continue;

      // Start just outside orb edge toward the icon
      const startX = orbCx + (dx / dist) * (orbRadius + 2); // +2px to sit on edge
      const startY = orbCy + (dy / dist) * (orbRadius + 2);

      newLines.push({ x1: startX, y1: startY, x2: cx, y2: cy });
    }

    setLines(newLines);
  };

  // Recompute after paint to avoid initial glitch
  useLayoutEffect(() => {
    if (!isInView) return;

    // 1st pass after paint
    computeLines();

    // 2nd pass next frame (icons/fonts may shift slightly)
    const id = requestAnimationFrame(() => computeLines());
    return () => cancelAnimationFrame(id);
  }, [isInView]);

  // Keep in sync on scroll/resize with rAF throttle + ResizeObserver (no polling)
  useEffect(() => {
    if (!isInView) return;

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeLines();
        ticking = false;
      });
    };

    const ro = new ResizeObserver(() => onScrollOrResize());
    ro.observe(sectionRef.current!);
    ro.observe(orbRef.current!);
    iconRefs.current.forEach((el) => el && ro.observe(el));

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // If fonts load late, positions can shift
    // @ts-ignore: not all environments have document.fonts
    if (document.fonts && document.fonts.ready) {
      // @ts-ignore
      document.fonts.ready.then(() => computeLines());
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef as any}
      id="skills"
      className="relative h-screen flex flex-col items-center justify-start text-center text-white bg-[#0a0015] overflow-hidden pt-12 pb-32"
    > 

      {/* Textblock */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-wide mt-10 
        bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-400 
        bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.25)]">
        Ready to contribute to a collaborative, cross-functional team
      </h2>
      <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
        Leveraging experience in 
        <span className="text-purple-300 font-medium"> .NET, React and DevOps </span> 
        to build elegant solutions that improve people’s lives through accessible design
      </p>


      {/* Main skills row */}
      <div className="flex items-center justify-center gap-6 mb-20 relative z-10">
        {mainSkills.map((skill, i) => (
          <motion.div
            key={i}
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e]"
            animate={{
              boxShadow: [
                "0 0 10px rgba(155,93,229,0.4)",
                "0 0 25px rgba(155,93,229,0.9)",
                "0 0 10px rgba(155,93,229,0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            title={skill.name}
          >
            {skill.icon}
          </motion.div>
        ))}
      </div>

      {/* Lines (section-relative coordinates) */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(155,93,229,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: [0.4, 1, 0.4],
              strokeWidth: [1.5, 2.5, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Central orb + rings */}
      <div
        className="relative flex items-center justify-center flex-col mt-15"
        style={{ perspective: "1200px" }}
      >
        {/* 3D ring container */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotateX(65deg)", transformStyle: "preserve-3d" }}
        >
          {/* Orbit rings */}
          {rings.map((r, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${r.w}px`,
                height: `${r.h}px`,
                border: "2px solid rgba(155,93,229,0.6)",
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(155,93,229,0.4)",
                  "0 0 50px rgba(155,93,229,0.8)",
                  "0 0 20px rgba(155,93,229,0.4)",
                ],
                borderColor: [
                  "rgba(155,93,229,0.4)",
                  "rgba(155,93,229,1)",
                  "rgba(155,93,229,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Orbit icons */}
          {orbitRings.map((ringIcons, ringIndex) => {
            const ring = rings[ringIndex];
            const radius = ring.w / 2;

            return ringIcons.map((item, i) => {
              const angle = (360 / ringIcons.length) * i;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={`${ringIndex}-${i}`}
                  className={`absolute ${item.color} text-2xl`}
                  style={{ transform: `translate(${x}px, ${y}px) rotateX(-65deg)` }}
                >
                  {item.icon}
                </div>
              );
            });
          })}
        </div>

        {/* Central orb */}
        <motion.div
          ref={orbRef}
          className="relative z-10 w-48 h-48 rounded-full bg-[#1a1a2e] flex items-center justify-center text-6xl font-bold"
          animate={{
            boxShadow: [
              "0 0 80px rgba(168,85,247,0.5)",
              "0 0 150px rgba(168,85,247,0.9)",
              "0 0 80px rgba(168,85,247,0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Σ
        </motion.div>
      </div>
    </section>
  );
}
