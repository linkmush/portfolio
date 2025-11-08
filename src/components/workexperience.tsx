import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { Star, Lightbulb, Laptop, Headphones } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation, Trans } from "react-i18next";

interface Experience {
  icon: ReactNode;
  key: string; // nyckel till translation.json
}

const experiences: Experience[] = [
  { icon: <Star className="w-10 h-10 text-[#9B5DE5] drop-shadow-[0_0_8px_#9B5DE5]" />, key: "exp1" },
  { icon: <Lightbulb className="w-10 h-10 text-[#F15BB5] drop-shadow-[0_0_8px_#F15BB5]" />, key: "exp2" },
  { icon: <Laptop className="w-10 h-10 text-[#9B5DE5] drop-shadow-[0_0_8px_#9B5DE5]" />, key: "exp3" },
  { icon: <Headphones className="w-10 h-10 text-[#F15BB5] drop-shadow-[0_0_8px_#F15BB5]" />, key: "exp4" },
];

export const WorkExperience: FC = () => {
  const { t } = useTranslation();

  return (
    <>
        {/* Titel */}
        <h2
          className="text-4xl font-semibold mb-12 text-center 
                     bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] 
                     bg-clip-text text-transparent drop-shadow-[0_0_8px_#9B5DE5]"
        >
          {t("work.title")}
        </h2>

        {/* Grid med boxar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}  // slidar in till center
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl p-6 
                        bg-gradient-to-br from-[#1a0033] via-[#2a004d] to-[#3a0066] 
                        shadow-lg border border-[#9B5DE5]/30
                        hover:shadow-[0_0_20px_#9B5DE5]"
            >
              <div className="flex items-center gap-4 mb-4">
                {exp.icon}
                <div>
                  <h3 className="text-xl font-bold text-[#9B5DE5]">
                    {t(`work.${exp.key}.title`)}
                  </h3>
                  <p className="text-sm text-[#F15BB5]/80">
                    {t(`work.${exp.key}.company`)} • {t(`work.${exp.key}.years`)}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90 mb-6">
                {t(`work.${exp.key}.description`)}
              </p>

              {/* Dialog */}
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    className="px-5 py-2 
                               bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
                               rounded-lg shadow-md hover:shadow-[0_0_12px_#F15BB5] 
                               transition text-white font-medium cursor-pointer"
                  >
                    {t("work.learnMore")}
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

                  <Dialog.Content asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="fixed top-1/2 left-1/2 w-[90%] max-w-2xl 
                                 -translate-x-1/2 -translate-y-1/2 
                                 bg-gradient-to-b from-[#0b0018] via-[#1a0033] to-[#240046] 
                                 p-8 rounded-2xl shadow-2xl border border-[#9B5DE5]/30 
                                 text-white z-50"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <Dialog.Title
                          className="text-3xl font-extrabold 
                                     bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] 
                                     bg-clip-text text-transparent"
                        >
                          {t(`work.${exp.key}.title`)}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button className="text-white/70 hover:text-white transition">✕</button>
                        </Dialog.Close>
                      </div>

                      <Dialog.Description className="text-sm mb-6 text-[#9B5DE5]/80">
                        {t(`work.${exp.key}.company`)} • {t(`work.${exp.key}.years`)}
                      </Dialog.Description>

                      {/* Här använder vi <Trans> för att kunna hantera <strong> och <br /> i JSON */}
                      <p className="whitespace-pre-line leading-relaxed text-base text-white/90">
                        <Trans i18nKey={`work.${exp.key}.details`} components={{ strong: <strong />, highlight: <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold" />, em: <em /> }} />
                      </p>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>
          ))}
        </div>
    </>
  );
};
