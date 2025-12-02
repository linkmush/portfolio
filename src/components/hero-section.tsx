import { motion } from "framer-motion"
import oskarBild from "../assets/oskar-bild.png"
import { useTranslation, Trans } from "react-i18next"

export function HeroContent() {
  const { t } = useTranslation()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none z-[1] text-center">
      {/* Avatar Container */}
      <div className="relative mb-12 mt-10 flex flex-col items-center group">

        {/* Soft animated glow behind avatar */}
        <div className="absolute w-64 h-64 rounded-full blur-[90px] opacity-70
                        bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                        animate-pulse-slow"></div>

        {/* Avatar with gradient border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="
            relative z-10 p-[3px] rounded-full 
            bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500
            transition-transform duration-500 
            group-hover:scale-[1.03]
            group-hover:rotate-[1.5deg]
            shadow-[0_0_35px_rgba(168,85,247,0.35)]
          "
        >
          <img
            src={oskarBild}
            alt="Oskar Lindqvist"
            className="
              w-44 h-44 rounded-full object-cover 
              bg-black/20
              shadow-xl
              contrast-125 saturate-110
              transition-transform duration-500
              group-hover:scale-[1.05]
            "
          />
        </motion.div>

        <p className="mt-4 text-sm text-white/70">
          {t("hero.hello")}{" "}
          <span className="text-purple-400 font-semibold">Oskar Lindqvist</span>
        </p>
      </div>

      <p className="text-white/70 text-sm md:text-base mb-2 tracking-wide drop-shadow-[0_0_8px_#000]">
        {t("hero.subtitle")}
      </p>

      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_12px_#000,0_0_6px_#9B5DE5]">
        {t("hero.headline")} <br />
        <span className="font-bold">
          {t("hero.headlineLast") && (
            <span className="text-purple-400 decoration-purple-600">
              {t("hero.headlineLast")}
            </span>
          )}
        </span>
      </h1>

      <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
        <Trans i18nKey="hero.desc1" components={{ strong: <strong /> }} />
      </p>

      <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto leading-relaxed mt-6">
        <Trans
          i18nKey="hero.desc2"
          components={{
            highlight: (
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold" />
            ),
            strong: <strong />,
          }}
        />
      </p>

      <p className="relative text-white/90 text-base md:text-xl max-w-4xl mx-auto leading-relaxed mt-6">
        <Trans
          i18nKey="hero.desc3"
          components={{ strong: <strong />, em: <em className="italic text-purple-200" /> }}
        />
      </p>
    </div>
  )
}