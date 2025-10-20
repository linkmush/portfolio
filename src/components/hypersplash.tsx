import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export default function HyperSplash({ active }: { active: boolean }) {
  const { progress } = useProgress();
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (progress >= 100) {
      // vänta lite och trigga vit fade
      const t = setTimeout(() => setFinished(true), 1000);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Stjärnfältet */}
          <Starfield speed={finished ? 150 : 40} />

          {/* Glow i mitten */}
          <motion.div
            className="absolute rounded-full"
            initial={{ width: 200, height: 200, opacity: 0.6 }}
            animate={{
              width: finished ? "300vw" : 400,
              height: finished ? "300vw" : 400,
              opacity: finished ? 1 : 0.8,
            }}
            transition={{ duration: finished ? 2 : 1.5, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(60px)",
            }}
          />

          {/* Progressbar högst upp */}
          {!finished && (
            <div className="absolute top-0 left-0 w-full h-[3px] bg-black/70">
              <motion.div
                className="h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Starfield({ speed = 10 }: { speed?: number }) {
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
        star.z -= speed;

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
  }, [speed]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}