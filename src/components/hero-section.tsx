import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";
import { useTranslation, Trans } from "react-i18next";

export function HeroContent() {
  const { t } = useTranslation();

  return (
    <div className="fixed w-full h-screen items-center justify-center pointer-events-none z-[1] text-center">
      {/* Avatar + glow */}
      <div className="relative mb-10 mt-10 flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <div
            className="w-64 h-64 rounded-full blur-3xl opacity-80 animate-pulse-slow"
            style={{
              background: `
                radial-gradient(circle at center,
                  rgba(168,85,247,0.9) 0%,
                  rgba(236,72,153,0.6) 40%,
                  rgba(59,130,246,0.4) 70%,
                  transparent 100%
                )
              `,
            }}
          />
        </div>

        <motion.img
          src={avatar}
          alt="Oskar Lindqvist"
          className="relative w-44 h-44 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        <p className="mt-4 text-sm text-white/70">
          {t("hero.hello")}{" "}
          <span className="text-purple-400 font-semibold">Oskar Lindqvist</span>
          <span className="ml-1 text-xs text-white/60 italic">→</span>
        </p>
      </div>

      <p className="text-white/70 text-sm md:text-base mb-2 tracking-wide drop-shadow-[0_0_8px_#000]">
        {t("hero.subtitle")}
      </p>

      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 
                     drop-shadow-[0_0_12px_#000,0_0_6px_#9B5DE5]">
        {t("hero.headline")} <br />
        <span className="font-bold">
          {t("hero.headlineLast") && (
            <span className="text-purple-400 decoration-purple-600">
              {t("hero.headlineLast")}
            </span>
          )}
        </span>
      </h1>

      <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_0_6px_#000]">
        {t("hero.tagline")}
      </p>

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
  );
}

