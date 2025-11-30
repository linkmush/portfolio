import React, { useEffect, useRef } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600"

type ProjectCard = {
  id: string
  title: string
  desc: string
  imageUrl: string
  meta?: string
  details?: string
}

const PROJECT_ITEMS: ProjectCard[] = [
  {
    id: "solsidan",
    title: "Solsidan Booking Platform",
    desc: "End-to-end booking system for restaurants with table layout, opening hours and rules.",
    meta: "React • TypeScript • Tailwind • .NET API",
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1600",
    details:
      "Solsidan är en fullstack-baserad bokningsplattform för restauranger där fokus ligger på tydligt bordsupplägg, regelstyrda bokningar och adminvy. Jag byggde frontend i React/TypeScript med Tailwind och kopplade mot ett .NET API. Lösningen hanterar öppettider, olika sittningar, maxantal gäster och enkla verktyg för personalen att överblicka kvällens bokningar.",
  },
  {
    id: "skonhetscenter",
    title: "Skönhetscenter Booking SaaS",
    desc: "Multi-salon marketplace inspired by Bokadirekt with customer, salon and admin roles.",
    meta: "React • Vite • Tailwind • Shadcn UI",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600",
    details:
      "Skönhetscenter är ett SaaS-koncept för salonger – lite som Bokadirekt men med fokus på tydlig onboarding och multi-tenant struktur. Jag har byggt grunden i React/Vite med Tailwind och Shadcn UI, med olika roller för kund, salong och administratör. Tanken är att kunna koppla på eget bokningsflöde, betalning och statistik för varje salong.",
  },
  {
    id: "portfolio",
    title: "3D Portfolio & Starfield",
    desc: "Interactive portfolio with 3D background, starfield and smooth Lenis scrolling.",
    meta: "React • Three.js • Framer Motion",
    imageUrl:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1600",
    details:
      "Min personliga portfolio där jag experimenterar med 3D-bakgrunder, starfield-effekter och smooth scrolling via Lenis. Jag använder React, Three.js och Framer Motion för att skapa en mer levande känsla, med sektioner för erfarenhet, projekt och kompetenser – allt integrerat i ett modernt UI.",
  },
  {
    id: "calendra",
    title: "Calendra Group Website",
    desc: "Landing page and brand platform for our web agency and SaaS concepts.",
    meta: "Design system • Copywriting • Branding",
    imageUrl:
      "https://images.unsplash.com/photo-1522202195461-41a51199429a?auto=format&fit=crop&q=80&w=1600",
    details:
      "Calendra Group är plattformen för våra olika IT- och SaaS-satsningar. Här har jag jobbat med branding, copy, struktur och ett designsystem som ska kunna återanvändas i olika produkter – t.ex. bokningssystem, kundportaler och andra lösningar för små och medelstora företag.",
  },
  {
    id: "umbraco-cms",
    title: "Umbraco CMS Corporate Site",
    desc: "Figma → Umbraco 14: document types, modular blocks, multilingual-friendly structure.",
    meta: "Umbraco 14 • C# • Razor • CMS",
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1600",
    details:
      "Ett utbildnings- och portfolio-case där jag tar en Figma-design och bygger upp den i Umbraco 14. Fokus har legat på dokumenttyper, modulära block, editor-vänlig struktur och att förbereda för flerspråkighet. Backend är gjort i C#/Razor och jag har jobbat mycket med hur redaktörer ska uppleva systemet.",
  },
  {
    id: "security-lab",
    title: "Security Lab Environment",
    desc: "Hyper-V lab with pfSense, Suricata, Wazuh, Nessus and segmented VLAN/DMZ design.",
    meta: "Network security • Blue team • Lab design",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    details:
      "En egenbyggd säkerhetslab-miljö i Hyper-V med pfSense-brandvägg, Suricata IDS/IPS, Wazuh SIEM och Nessus scanner. Nätverket är segmenterat i t.ex. LAN, DMZ, gästnät och management. Labben används för att testa både försvar (blue team) och attacker (red team) i en kontrollerad miljö.",
  },
  {
    id: "futureflow-recon",
    title: "FutureFlow Internal Recon",
    desc: "Nätverkssäkerhet case: host discovery, service mapping and attack surface analysis.",
    meta: "Nmap • Metasploit • Reporting",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    details:
      "Ett kurscase inom nätverkssäkerhet där vi agerar intern angripare mot FutureFlow Solutions AB. Jag har jobbat med host discovery, portsvep med Nmap, tjänstekartläggning, versionsidentifiering och analys av attackytor. Resultatet dokumenteras i en rapport med rekommendationer till organisationen.",
  },
  {
    id: "migration-docs",
    title: "Migration Case Documentation",
    desc: "Structured templates and documentation for complex Migrationsverket applications.",
    meta: "Process design • Documentation • Legal friendly",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1600",
    details:
      "Ett mer administrativt men viktigt projekt där jag tagit fram struktur, mallar och dokumentation för en omfattande ansökan till Migrationsverket. Fokus har varit tydlighet, komplett underlag och att samla tekniska, juridiska och personliga delar i en sammanhängande dokumentation.",
  },
]

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const getScrollTop = (): number => {
  const scroller = document.querySelector(".app-scroll > div") as HTMLElement | null
  return scroller ? scroller.scrollTop : window.scrollY
}

const getViewportHeight = (): number => {
  const scroller = document.querySelector(".app-scroll > div") as HTMLElement | null
  return scroller ? scroller.clientHeight : window.innerHeight
}

// > 1 = långsammare horisontell rörelse (behåll 1 om du gillar tempot nu)
const SCROLL_SLOWDOWN = 1

export const WorkExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const recalc = () => {
      const vh = getViewportHeight()
      if (!containerRef.current || !stickyRef.current || !stripRef.current) return

      const stripW = stripRef.current.scrollWidth
      const stickyW = stickyRef.current.clientWidth
      const travel = Math.max(0, stripW - stickyW)

      containerRef.current.style.height = `${travel * SCROLL_SLOWDOWN + vh}px`
    }

    const onRaf = () => {
      const y = getScrollTop()
      const vh = getViewportHeight()
      if (!containerRef.current || !stickyRef.current || !stripRef.current) {
        rafRef.current = requestAnimationFrame(onRaf)
        return
      }

      const start = containerRef.current.offsetTop
      const end = start + containerRef.current.offsetHeight - vh
      const t = clamp((y - start) / Math.max(1, end - start), 0, 1)

      const maxTranslate =
        stripRef.current.scrollWidth - stickyRef.current.clientWidth

      const x = -Math.round(Math.max(0, maxTranslate) * t)
      stripRef.current.style.transform = `translateX(${x}px)`

      rafRef.current = requestAnimationFrame(onRaf)
    }

    recalc()

    const observers: ResizeObserver[] = []

    const watch = (el: HTMLDivElement | null) => {
      if (!el || typeof ResizeObserver === "undefined") return
      const obs = new ResizeObserver(() => recalc())
      obs.observe(el)
      observers.push(obs)
    }

    watch(stripRef.current)
    watch(stickyRef.current)

    const onResize = () => recalc()
    window.addEventListener("resize", onResize)
    rafRef.current = requestAnimationFrame(onRaf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG
  }

  return (
    <section
      ref={containerRef}
      className="relative container mx-auto"
      aria-label="Highlighted projects"
    >
      {/* Sticky viewport area – this is what is visible while we scroll horizontally */}
      <div
        ref={stickyRef}
        className="sticky -top-5 h-screen overflow-hidden flex items-center justify-center px-4"
      >
        <div
          ref={stripRef}
          className="will-change-transform transition-transform duration-75 ease-linear flex gap-6 px-6"
          style={{ transform: "translateX(0)" }}
          role="list"
        >
          {PROJECT_ITEMS.map((project) => (
            <Dialog.Root key={project.id}>
              <figure
                role="listitem"
                className="
                  relative
                  min-w-[85%] sm:min-w-[60%] md:min-w-[50%] lg:min-w-[45%] xl:min-w-[38%] 2xl:min-w-[34%]
                  h-[70vh] md:h-[75vh]
                  overflow-hidden rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur
                  shadow-[0_0_30px_rgba(0,0,0,0.6)]
                  flex flex-col
                "
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  onError={onImgError}
                />

                {/* Caption */}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white z-20">
                  <div className="absolute inset-x-0 -top-24 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative space-y-2 text-center pointer-events-auto">
                    <h3 className="text-xl font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-90 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] max-w-md mx-auto">
                      {project.desc}
                    </p>
                    {project.meta && (
                      <p className="text-xs opacity-75 mt-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                        {project.meta}
                      </p>
                    )}

                    {project.details && (
                      <Dialog.Trigger asChild>
                        <button
                          className="
                            mt-3 inline-flex items-center justify-center
                            px-4 py-2 text-sm font-medium
                            rounded-full
                            bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
                            shadow-[0_0_12px_rgba(155,93,229,0.7)]
                            hover:shadow-[0_0_18px_rgba(241,91,181,0.9)]
                            transition
                            cursor-pointer
                          "
                        >
                          Read more
                        </button>
                      </Dialog.Trigger>
                    )}
                  </div>
                </figcaption>

                {/* Dialog content */}
                {project.details && (
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]" />
                    <Dialog.Content asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="
                          fixed top-1/2 left-1/2 w-[90%] max-w-2xl 
                          -translate-x-1/2 -translate-y-1/2 
                          bg-gradient-to-b from-[#0b0018] via-[#1a0033] to-[#240046]
                          p-8 rounded-2xl shadow-2xl border border-[#9B5DE5]/30 
                          text-white z-[10001]
                        "
                      >
                        <div className="flex justify-between items-start mb-6">
                          <Dialog.Title
                            className="
                              text-2xl md:text-3xl font-extrabold 
                              bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
                              bg-clip-text text-transparent
                            "
                          >
                            {project.title}
                          </Dialog.Title>

                          <Dialog.Close asChild>
                            <button className="text-white/70 hover:text-white transition text-xl leading-none">
                              ✕
                            </button>
                          </Dialog.Close>
                        </div>

                        {project.meta && (
                          <Dialog.Description className="text-sm mb-4 text-[#9B5DE5]/80">
                            {project.meta}
                          </Dialog.Description>
                        )}

                        <p className="whitespace-pre-line leading-relaxed text-base text-white/90">
                          {project.details}
                        </p>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </figure>
            </Dialog.Root>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience

