import { motion } from "framer-motion"
import BackgroundScene from "@/components/backgroundscene"
import { useTranslation } from "react-i18next"
import oskarBild from "../assets/oskar-bild.jpg"

export const Menu = ({ onLoaded }: { onLoaded: () => void }) => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <BackgroundScene onLoaded={onLoaded} />

      <div
        className="
          relative z-10
          max-w-4xl mx-auto px-6 md:px-12
          pt-24 pb-20
          text-center
        "
      >

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
            relative
            w-44 h-44 mx-auto mb-10
            flex items-center justify-center
            rounded-full
          "
        >
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-br from-purple-600/70 to-pink-500/70
              blur-[28px] opacity-70
            "
          />
          <div
            className="
              absolute inset-0 rounded-full
              border-4 border-purple-400/50
              shadow-[0_0_25px_6px_rgba(168,85,247,0.6)]
            "
          />
          <img
            src={oskarBild}
            alt="Oskar Lindqvist"
            className="
              relative z-10
              w-36 h-36 rounded-full object-cover object-top
              shadow-[0_0_35px_8px_rgba(236,72,153,0.45)]
              contrast-125 saturate-110
              transition-transform duration-500
              hover:scale-[1.05]
            "
          />

          {/* 🔥 Soft overlay på endast bilden */}
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-br from-black/20 via-purple-500/15 to-pink-500/20
              mix-blend-multiply
              pointer-events-none
            "
          />
        </motion.div>

        {/* Titel */}
        <h1
          className="
            text-4xl md:text-5xl font-bold mb-6 pb-2
            bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent
          "
        >
          {t("about.title")}
        </h1>

        {/* Textblock */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 text-[17px] text-white/85 leading-relaxed md:leading-[1.9]"
        >
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <p>{t("about.p4")}</p>
        </motion.div>

        {/* CTA-knapp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              px-8 py-3 rounded-full text-lg font-medium
              bg-gradient-to-r from-pink-500 to-purple-500
              hover:opacity-90 transition
            "
          >
            {t("about.cta")}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Menu
