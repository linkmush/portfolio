// OrbitSkills.tsx
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

const TILT = 70;

// —————————— DATA ——————————
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

// procent av containerbredd som bas, justerat nedåt på små skärmar via clamp
const RING_FACTORS = [0.38, 0.55, 0.72, 0.88] as const; // inner → outer

export default function OrbitSkills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [ringSizes, setRingSizes] = useState<number[]>([0, 0, 0, 0]); // px
  const [orbSize, setOrbSize] = useState(120);

  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
  const ringControls = useAnimation();
  const iconControls = useAnimation();

  iconRefs.current = Array(mainSkills.length).fill(null).map((_, i) => iconRefs.current[i] || null);

  // —————————— RING SIZE CALC ——————————
  const calcRingSizes = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    // Gör ringarna alltid "in view":
    // Bas = min(containerWidth, containerHeight*1.2) så vi tar hänsyn till höjden.
    const base = Math.min(rect.width, rect.height * 1.2);

    // Liten padding från kanter (20–32px beroende på bredd)
    const pad = Math.max(20, Math.min(32, rect.width * 0.03));
    const maxDiameter = Math.max(160, base - pad * 2); // hård lägsta så det aldrig blir 0

    const sizes = RING_FACTORS.map(f => Math.round(maxDiameter * f));
    setRingSizes(sizes);
    setOrbSize(Math.round(sizes[0] * 0.35));
  };

  // —————————— FUNNEL LINES ——————————
  const computeLines = () => {
    if (!sectionRef.current || !orbRef.current) return;

    const secRect = sectionRef.current.getBoundingClientRect();
    const orbRect = orbRef.current.getBoundingClientRect();

    const orbCx = orbRect.left - secRect.left + orbRect.width / 2;
    const orbCy = orbRect.top - secRect.top + orbRect.height / 2;
    const orbRadius = orbRect.width / 2;

    const centers = iconRefs.current
      .filter(Boolean)
      .map((el) => {
        const r = el!.getBoundingClientRect();
        return {
          cx: r.left - secRect.left + r.width / 2,
          cy: r.top - secRect.top + r.height / 2,
        };
      });

    if (!centers.length) return;

    const iconLowestY = Math.max(...centers.map((p) => p.cy));
    const mergeY = iconLowestY + 30;
    const mergeX = orbCx;

    const newLines = centers.map((p) => ({
      x1: p.cx,
      y1: p.cy - 24,
      x2: orbCx,
      y2: orbCy - orbRadius + 10,
      mergeX,
      mergeY,
    }));

    setLines(newLines);
  };

  // —————————— EFFECTS ——————————
  useLayoutEffect(() => {
    if (!isInView) return;
    calcRingSizes();
    computeLines();
    const id = requestAnimationFrame(() => {
      calcRingSizes();
      computeLines();
    });
    return () => cancelAnimationFrame(id);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    const ro = new ResizeObserver(() => {
      calcRingSizes();
      computeLines();
    });
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (orbRef.current) ro.observe(orbRef.current);
    iconRefs.current.forEach((el) => el && ro.observe(el));

    const onScroll = () => computeLines();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      calcRingSizes();
      computeLines();
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", () => {});
    };
  }, [isInView]);
  
  useEffect(() => {
    if (!isInView) return;

    (async () => {
      // 1) vänta tills mainskills ikoner är uppe
      await new Promise(res => setTimeout(res, 900));

      // 2) vänta tills lines har ritat klart
      await new Promise(res => setTimeout(res, 900));

      // 3) ringar skjuter ut
      await ringControls.start(i => ({
        scale: 1,
        opacity: 1,
        transition: { duration: 1, delay: i * 0.15 }
      }));

      // 4) orbit ikoner fadeas in
      await iconControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7 }
      });
    })();

  }, [isInView]);


  // —————————— RENDER ——————————
  return (
    <div
      ref={sectionRef as any}
      className="
        relative w-full flex flex-col items-center text-center text-white overflow-hidden
        min-h-[560px] md:min-h-[640px]  /* ger yta så ringar syns även på mobil */
      "
    >
      {/* text */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-wide
        bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-400
        bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] mt-5">
        My core skills and the ecosystem I build with
      </h2>

      <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mt-5">
        Core stack: C#, JavaScript, TypeScript, databases and modern tooling.<br />
        Everything around it is the ecosystem I use to build fullstack solutions.
      </p>

      {/* main skills row */}
      <div className="flex items-center justify-center gap-6 mb-16 md:mb-20 relative z-[75] mt-15" style={{ transform: "none" }}>
        {mainSkills.map((skill, i) => (
          <motion.div
            key={i}
            ref={(el) => { iconRefs.current[i] = el; }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e]"
            title={skill.name}
            initial={{ opacity: 0, y: 30, boxShadow: "none" }}
            animate={isInView ? { opacity: 1, y: 0, boxShadow: "0 0 20px rgba(168,85,247,0.6)" } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
          >
            {skill.icon}
          </motion.div>
        ))}
      </div>

      {/* funnel lines (läggs under ringar men över bakgrund) */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-[50]">
        {lines.map((line, i) => {
          const d = `M ${line.x1},${line.y1} Q ${line.mergeX},${line.mergeY} ${line.x2},${line.y2}`;
          return (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(155,93,229,0.75)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.35 + i * 0.06 }}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px rgba(155,93,229,0.8))" }}
            />
          );
        })}
      </svg>

      {/* orbit system */}
      <div className="relative flex items-center justify-center flex-col mt-10" style={{ perspective: "1200px" }}>
        <div
          className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none"
          style={{ transform: `rotateX(${TILT}deg)`, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* rings */}
          {ringSizes.map((size, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={ringControls}
              className="absolute rounded-full z-[60]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: "2px solid rgba(155,93,229,0.7)",
                boxShadow: "0 0 18px rgba(155,93,229,0.25) inset",
                transformOrigin: "50% 50%",
              }}
            />
          ))}

          {/* ring icons – följer ringarnas radie */}
          {orbitRings.flatMap((ringIcons, ringIndex) => {
            const radius = ringSizes[ringIndex] / 2 || 0;

            return ringIcons.map((item, i) => {
              let angle = (360 / ringIcons.length) * i;
              if (ringIndex === 2 && i === 3) angle += 12; // din specialplacering

              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <motion.div
                  key={`${ringIndex}-${i}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={iconControls}
                  className="absolute z-[70]"
                  style={{
                    x, y,
                    rotateX: -TILT,
                    transformStyle: "preserve-3d",
                    transformOrigin: "50% 50%",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className={`${item.color} text-[22px] md:text-2xl drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]`}>
                    {item.icon}
                  </div>
                </motion.div>
              );
            });
          })}
        </div>

        {/* orb (alltid överst) */}
        <motion.div
          ref={orbRef}
          className="relative z-[80] rounded-full flex items-center justify-center font-bold"
          style={{
            width: orbSize + "px",
            height: orbSize + "px",
            fontSize: orbSize * 0.3 + "px",
            background: "radial-gradient(circle, #fff59d 0%, #fbbf24 40%, #f97316 80%, #1a1a2e 100%)",
            color: "#fff",
          }}
          animate={{
            boxShadow: [
              "0 0 80px 24px rgba(251,191,36,0.55)",
              "0 0 140px 40px rgba(249,115,22,0.75)",
              "0 0 80px 24px rgba(251,191,36,0.55)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Σ
        </motion.div>
      </div>
    </div>
  );
}
