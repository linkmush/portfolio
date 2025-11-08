// // SectionCard.tsx
// import type { ReactNode } from "react";

// export const SectionCard = ({
//   id,
//   children,
//   className = "",
//   widthClass = "w-[90vw] max-w-[1600px]",
// }: {
//   id?: string;
//   children: ReactNode;
//   className?: string;
//   widthClass?: string;
// }) => {
//   return (
//     <section
//       id={id}
//       className={`relative w-full h-screen snap-start flex items-center justify-center ${className}`}
//     >
//       <div className={`mx-auto ${widthClass} px-6`}>
//         <div
//           className="
//             rounded-3xl border border-white/15 bg-black/10 backdrop-blur-xl
//             shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/5
//             px-8 md:px-12 py-12 md:py-16 w-full
//           "
//         >
//           {children}
//         </div>
//       </div>
//     </section>
//   );
// };

"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

type SectionCardProps = {
  id?: string
  children: ReactNode
  className?: string
  widthClass?: string
}

export const SectionCard = ({
  id,
  children,
  className = "",
  widthClass = "max-w-[1100px]",
}: SectionCardProps) => {
  const ref = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"])
  const x = useTransform(scrollYProgress, [0, 1], ["0px", "100px"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full h-screen snap-start flex items-center justify-center ${className}`}
    >
      <motion.div style={{ y, x, opacity }} className="mx-auto px-6 w-full flex justify-center">
        
        {/* INNER WIDTH WRAP – tvingar samma exakt bredd */}
        <div className={`${widthClass} w-full mx-auto`}>
          <div
            className="
              rounded-3xl border border-white/15 bg-black/10 backdrop-blur-xl
              shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/5
              px-8 md:px-12 py-12 md:py-16 w-full
            "
          >
            {children}
          </div>
        </div>

      </motion.div>
    </section>
  )
}
