import {
  SiFigma, SiReact, SiNodedotjs, SiJavascript, SiCss3,
  SiNextdotjs, SiAdobeillustrator, SiAdobexd, SiMongodb, SiExpress
} from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const mainSkills = [
  { icon: <SiFigma className="text-2xl text-pink-400" />, name: "Figma" },
  { icon: <SiReact className="text-2xl text-[#61DAFB]" />, name: "React" },
  { icon: <SiNodedotjs className="text-2xl text-green-500" />, name: "Node.js" },
  { icon: <SiCss3 className="text-2xl text-blue-500" />, name: "CSS" },
  { icon: <SiJavascript className="text-2xl text-yellow-300" />, name: "JavaScript" },
  { icon: <SiNextdotjs className="text-2xl text-white" />, name: "Next.js" },
  { icon: <SiAdobexd className="text-2xl text-pink-500" />, name: "Adobe XD" },
  { icon: <SiAdobeillustrator className="text-2xl text-orange-500" />, name: "Illustrator" },
  { icon: <SiExpress className="text-2xl text-gray-200" />, name: "Express" },
  { icon: <SiMongodb className="text-2xl text-green-400" />, name: "MongoDB" },
  { icon: <FaGithub className="text-2xl text-gray-400" />, name: "GitHub" },
];

// 🔹 Alla ikoner utspridda på ringarna
const orbitIcons = [
  // Ring 0 (3 st)
  { icon: <FaLinkedin />, angle: 0, ring: 0, color: "text-purple-400" },
  { icon: <SiCss3 />, angle: 120, ring: 0, color: "text-blue-500" },
  { icon: <SiMongodb />, angle: 240, ring: 0, color: "text-green-400" },

  // Ring 1 (3 st)
  { icon: <FaGithub />, angle: 60, ring: 1, color: "text-purple-400" },
  { icon: <SiAdobeillustrator />, angle: 180, ring: 1, color: "text-orange-500" },
  { icon: <SiJavascript />, angle: 300, ring: 1, color: "text-yellow-300" },

  // Ring 2 (4 st)
  { icon: <SiReact />, angle: 45, ring: 2, color: "text-[#61DAFB]" },
  { icon: <SiNextdotjs />, angle: 135, ring: 2, color: "text-white" },
  { icon: <SiAdobexd />, angle: 225, ring: 2, color: "text-pink-500" },
  { icon: <SiExpress />, angle: 315, ring: 2, color: "text-gray-200" },

  // Ring 3 (3 st)
  { icon: <SiFigma />, angle: 90, ring: 3, color: "text-pink-400" },
  { icon: <SiNodedotjs />, angle: 210, ring: 3, color: "text-green-500" },
  { icon: <SiJavascript />, angle: 330, ring: 3, color: "text-yellow-300" },
];

// 🔹 Ringarnas storlek
const rings = [
  { w: 400, h: 400 },
  { w: 600, h: 600 },
  { w: 800, h: 800 },
  { w: 1000, h: 1000 },
];

export default function OrbitSkills() {
  return (
    <section
      id="skills"
      className="relative h-screen flex flex-col items-center justify-start text-center text-white bg-[#0a0015] overflow-hidden pt-12 pb-32"
    >
      {/* Textblock */}
      <div className="mb-8">
        <p className="text-lg md:text-xl text-white/80">
          I&apos;m currently looking to join a{" "}
          <span className="text-purple-400 font-semibold">cross-functional</span>{" "}
          team
        </p>
        <p className="text-sm md:text-base text-white/60 mt-2">
          that values improving people&apos;s lives through accessible design
        </p>
      </div>

      {/* Main skills row */}
      <div className="flex gap-4 mb-20 flex-wrap justify-center">
        {mainSkills.map((skill, i) => (
          <div
            key={i}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e] 
                       shadow-[0_0_15px_rgba(155,93,229,0.5)]"
          >
            {skill.icon}
          </div>
        ))}
      </div>

      {/* Central orb + ringar */}
      <div
        className="relative flex items-center justify-center flex-col mt-40"
        style={{ perspective: "1200px" }}
      >
        {rings.map((r, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${r.w}px`,
              height: `${r.h}px`,
              transform: "rotateX(65deg)",
              border: "2px solid rgba(155,93,229,0.6)",
              boxShadow: "0 0 40px rgba(155,93,229,0.4)",
            }}
          />
        ))}

        {/* Planet */}
        <div className="relative z-10 w-48 h-48 rounded-full bg-[#1a1a2e] 
                        flex items-center justify-center text-6xl font-bold 
                        shadow-[0_0_150px_rgba(168,85,247,0.9),0_0_250px_rgba(147,51,234,0.6)]">
          Σ
        </div>

        {/* Ikoner (1 per ring) */}
        {orbitIcons.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const ring = rings[item.ring];
          const radiusX = ring.w / 2;
          const radiusY = (ring.h / 2) * 0.5;
          const x = Math.cos(rad) * radiusX;
          const y = Math.sin(rad) * radiusY;

          return (
            <div
              key={i}
              className={`absolute ${item.color} text-2xl`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: 20,
              }}
            >
              {item.icon}
            </div>
          );
        })}
      </div>
    </section>
  );
}
