import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export default function HyperSplash({ active }: { active: boolean }) {

  const { progress } = useProgress(); // ← direkt här

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }} // zooma lite ut samtidigt som den tonar bort
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Starfield />

          {/* Progressbar */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-black/70">
          <motion.div
              className="h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{
              background: "linear-gradient(90deg, #9B5DE5, #F15BB5)", 
              boxShadow: `
                  0 0 8px #9B5DE5,
                  0 0 16px #F15BB5,
                  0 0 24px #9B5DE5
              `,
              }}
          />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Starfield() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrame: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 1500 }).map(() => ({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      prevZ: 0,
      size: Math.random() * 2 + 0.5,
    }));

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        star.prevZ = star.z;
        star.z -= 50;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
          star.z = canvas.width;
          star.prevZ = star.z;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        const pk = 128.0 / star.prevZ;
        const ppx = star.x * pk + canvas.width / 2;
        const ppy = star.y * pk + canvas.height / 2;

        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = star.size;
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
