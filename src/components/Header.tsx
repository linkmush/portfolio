import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LanguagePicker } from "@/i18n/LanguagePicker"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <RouterLink
    to={href}
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <RouterLink
          to="/"
          className="text-[#9B5DE5] font-bold text-2xl tracking-wide 
                    drop-shadow-[0_0_8px_#9B5DE5] hover:text-[#F15BB5] transition duration-300"
        >
          ∑
        </RouterLink>

        {/* Nav */}
        <nav className="flex ml-auto mr-5 gap-8">
          <NavLink href="/">{t("nav.home")}</NavLink>
          <NavLink href="/menu">{t("nav.menu")}</NavLink>
          <NavLink href="/gallery">{t("nav.gallery")}</NavLink>
          <NavLink href="/contact">{t("nav.contact")}</NavLink>
        </nav>

        {/* Language Picker */}
        <div className="flex items-center gap-2">
          <LanguagePicker />
        </div>
      </div>
    </header>
  )
}
