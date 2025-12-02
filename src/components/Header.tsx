import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LanguagePicker } from "@/i18n/LanguagePicker"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const NavLink = ({ href, children, onClick }: any) => (
  <RouterLink
    to={href}
    onClick={onClick}
    className="relative text-lg font-semibold text-[#9B5DE5] transition duration-300
              hover:text-[#F15BB5] 
              after:content-[''] after:block after:h-[2px] after:w-0 
              after:bg-gradient-to-r after:from-[#9B5DE5] after:to-[#F15BB5] 
              after:transition-all after:duration-300 
              hover:after:w-full
              drop-shadow-[0_0_4px_#9B5DE5]"
  >
    {children}
  </RouterLink>
)

export const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-[10002] pointer-events-auto">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">

        {/* Logo */}
        <RouterLink
          to="/"
          className="text-[#9B5DE5] font-bold text-2xl tracking-wide 
                    drop-shadow-[0_0_8px_#9B5DE5] hover:text-[#F15BB5] transition duration-300"
        >
          ∑
        </RouterLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex ml-auto mr-5 gap-8">
          <NavLink href="/">{t("nav.home")}</NavLink>
          <NavLink href="/aboutme">{t("nav.menu")}</NavLink>
          <NavLink href="/contact">{t("nav.contact")}</NavLink>
        </nav>

        {/* Desktop Language Picker */}
        <div className="hidden md:flex items-center gap-2">
          <LanguagePicker />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#9B5DE5] hover:text-[#F15BB5] transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SLIDE-IN NAV */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="
              fixed top-0 right-0 w-[75%] max-w-[340px] h-full 
              bg-[#0b0018] border-l border-[#9B5DE5]/30 
              shadow-xl z-[9999] p-6 flex flex-col gap-6
            "
          >

            <div className="mt-4 flex flex-col gap-6">
              <NavLink href="/" onClick={() => setOpen(false)}>
                {t("nav.home")}
              </NavLink>
              <NavLink href="/menu" onClick={() => setOpen(false)}>
                {t("nav.menu")}
              </NavLink>
              <NavLink href="/gallery" onClick={() => setOpen(false)}>
                {t("nav.gallery")}
              </NavLink>
              <NavLink href="/contact" onClick={() => setOpen(false)}>
                {t("nav.contact")}
              </NavLink>
            </div>

            <div className="mt-auto">
              <LanguagePicker iconOnly={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
