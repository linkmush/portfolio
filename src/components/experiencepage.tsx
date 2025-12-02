import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Download, Mail, Monitor, Code, Sparkles, Building2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function ExperiencePage() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"])

  return (
    <div
      ref={sectionRef}
      className="
        relative
        w-full flex flex-col items-center justify-center
        text-white px-6 md:px-12 lg:px-24
      "
    >

      {/* STATS */}
      <motion.div
        style={{ y: parallaxY }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="
          w-full max-w-6xl
          grid grid-cols-2 md:grid-cols-4 gap-4 mb-16
        "
      >
        <FadeInChild>
          <Stat 
            icon={<Monitor />} 
            number={t("experience.stats.supportYearsNumber")}
            label={t("experience.stats.supportYears")}
          />
        </FadeInChild>

        <FadeInChild>
          <Stat 
            icon={<Code />} 
            number={t("experience.stats.devYearsNumber")}
            label={t("experience.stats.devYears")}
          />
        </FadeInChild>

        <FadeInChild>
          <Stat 
            icon={<Sparkles />} 
            number={t("experience.stats.projectsNumber")}
            label={t("experience.stats.projects")}
          />
        </FadeInChild>

        <FadeInChild>
          <Stat 
            icon={<Building2 />} 
            number={t("experience.stats.erpNumber")}
            label={t("experience.stats.erp")}
          />
        </FadeInChild>
      </motion.div>

      <NeonDivider />

      {/* TWO COLUMNS */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.10 },
          },
        }}
        className="
          w-full max-w-6xl
          grid grid-cols-1 md:grid-cols-2 gap-10 relative
        "
      >

        {/* LEFT – Education */}
        <div className="flex flex-col gap-6 relative">
          <ColumnHeader 
            icon="🎓" 
            title={t("experience.education.title")} 
          />

          <FadeInChild>
            <GradientCard 
              title={t("experience.education.itsec.title")}
              subtitle={t("experience.education.itsec.subtitle")}
            />
          </FadeInChild>

          <FadeInChild>
            <GradientCard 
              title={t("experience.education.dotnet.title")}
              subtitle={t("experience.education.dotnet.subtitle")}
            />
          </FadeInChild>

          <FadeInChild>
            <GradientCard 
              title={t("experience.education.aiSweden.title")}
              subtitle={t("experience.education.aiSweden.subtitle")}
            />
          </FadeInChild>
        </div>

        {/* RIGHT – Work */}
        <div className="flex flex-col gap-6 relative">
          <ColumnHeader 
            icon="💼" 
            title={t("experience.work.title")} 
          />

          <FadeInChild>
            <GradientCard
              title={t("experience.work.inadra.title")}
              subtitle={t("experience.work.inadra.subtitle")}
              date={t("experience.work.inadra.date")}
            />
          </FadeInChild>

          <FadeInChild>
            <GradientCard
              title={t("experience.work.webbdesign.title")}
              subtitle={t("experience.work.webbdesign.subtitle")}
              date={t("experience.work.webbdesign.date")}
            />
          </FadeInChild>
        </div>


        {/* Vertical line */}
        <div className="
          hidden md:block
          absolute left-1/2 top-0 bottom-0 w-[3px]
          bg-gradient-to-b from-transparent via-[#F15BB5] to-transparent
          animate-pulse
        "></div>
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex gap-6 mt-16"
      >
        <a
          href="/Oskar-CV.pdf"
          download
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-full
            bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
            shadow-[0_0_15px_rgba(155,93,229,0.7)]
            hover:shadow-[0_0_35px_rgba(241,91,181,1)]
            hover:scale-[1.07]
            transition-all duration-300 font-medium
          "
        >
          <Download className="w-5 h-5" />
          {t("experience.buttons.downloadCV")}
        </a>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border ..."
        >
          <Mail className="w-5 h-5" />
          {t("experience.buttons.contact")}
        </Link>
      </motion.div>
    </div>
  )
}

/* COMPONENTS BELOW UNCHANGED */

function FadeInChild({ children }: any) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function NeonDivider() {
  return (
    <div className="
      w-full max-w-5xl h-[2px] mb-16
      bg-gradient-to-r from-transparent via-[#F15BB5] to-transparent
      animate-[shine_3s_linear_infinite]
    " />
  )
}

function ColumnHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
      <h2 className="
        text-xl font-bold 
        bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
        bg-clip-text text-transparent
      ">
        {title}
      </h2>
    </div>
  )
}

function Stat({ icon, number, label }: any) {
  return (
    <div
      className="
        p-4 rounded-xl 
        bg-black/40 backdrop-blur 
        border border-white/10
        text-center flex flex-col items-center gap-2
        hover:scale-[1.05] transition-all duration-300
        hover:shadow-[0_0_16px_rgba(241,91,181,0.5)]
      "
    >
      <div className="text-[#F15BB5] drop-shadow-[0_0_8px_rgba(241,91,181,0.8)]">
        {icon}
      </div>
      <p className="text-3xl font-bold text-[#F15BB5]">{number}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  )
}

function GradientCard({ title, subtitle, date }: any) {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }}
      className="
        relative p-6 rounded-2xl border border-white/10
        bg-gradient-to-br from-[#240046]/70 via-[#3b0066]/70 to-[#5a009e]/70
        backdrop-blur-lg shadow-xl
        min-h-[110px] flex flex-col gap-3
        transition-all duration-300
      "
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
        style={{
          background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(241,91,181,0.6), transparent 60%)`
        }}
      />

      <h3 className="text-lg font-semibold relative z-10">{title}</h3>

      {/* SUBTITLE + DATE IN SAME ROW */}
      {(subtitle || date) && (
        <div className="flex items-center justify-between w-full text-sm relative z-10">
          {subtitle && <p className="text-white/60">{subtitle}</p>}
          {date && <p className="text-white/80 whitespace-nowrap">{date}</p>}
        </div>
      )}
    </motion.div>
  )
}

