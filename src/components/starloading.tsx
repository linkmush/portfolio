import { motion, AnimatePresence } from "framer-motion";

export const StarRain = ({ active }: { active: boolean }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated SVG wrapper */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 2, // samma "boom"-effekt som originalet
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
                d="M20,50 C20,20 80,20 100,50 C120,80 180,80 180,50 
                   C180,20 120,20 100,50 C80,80 20,80 20,50 Z"
                stroke="url(#grad1)"
                strokeWidth="5"
                strokeOpacity="0.15"
              />

              {/* Glowande rörlig linje */}
              <motion.path
                d="M20,50 C20,20 80,20 100,50 C120,80 180,80 180,50 
                   C180,20 120,20 100,50 C80,80 20,80 20,50 Z"
                stroke="url(#grad1)"
                strokeWidth="6"
                strokeDasharray="180 600"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -780 }}
                transition={{
                  duration: 2.4,
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
