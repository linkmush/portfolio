import React, { useEffect, useRef } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600"

type ProjectCard = {
  id: string
  imageUrl: string
  url?: string
}

const PROJECT_ITEMS: ProjectCard[] = [
  {
    id: "Inadra",
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "calendra",
    imageUrl:
      "https://images.unsplash.com/photo-1522202195461-41a51199429a?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "solsidan",
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1600",
    url: "https://hotel-template-3.onrender.com"
  },
  {
    id: "beautynails",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600",
    url: "https://beauty-nails.onrender.com/"
  },
  {
    id: "Phonomenal",
    imageUrl:
      "https://images.unsplash.com/photo-1723744910476-19987e2bc32c?q=80&w=687&auto=format&fit=crop",
    url: "https://restaurant-template-5.onrender.com"
  },
  {
    id: "security-lab",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "vena-vardshus",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600",
    url: "https://hotel-template-2.onrender.com/"
  },
  {
    id: "aurora-restaurant",
    imageUrl:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600",
    url: "https://aurora-template.onrender.com"
  },
  {
    id: "salon-template",
    imageUrl:
      "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&q=80&w=1600",
    url: "https://salon-template.onrender.com"
  },
  {
    id: "futureflow-recon",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
  }
]

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

const getScrollTop = (): number => {
  const scroller = document.querySelector(".app-scroll > div") as HTMLElement | null
  return scroller ? scroller.scrollTop : window.scrollY
}

const getViewportHeight = (): number => {
  const scroller = document.querySelector(".app-scroll > div") as HTMLElement | null
  return scroller ? scroller.clientHeight : window.innerHeight
}

const SCROLL_SLOWDOWN = 1

export const WorkExperience: React.FC = () => {
  const { t } = useTranslation()
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
    <div
      ref={containerRef}
      className="relative container mx-auto"
      aria-label="Highlighted projects"
    >
      <div
        ref={stickyRef}
        className="sticky -top-5 h-screen overflow-hidden flex items-center justify-center px-4"
      >
        <div
          ref={stripRef}
          className="will-change-transform transition-transform duration-75 ease-linear flex gap-6 px-6"
          role="list"
        >
          {PROJECT_ITEMS.map((project) => {
            const title = t(`projects.${project.id}.title`)
            const desc = t(`projects.${project.id}.desc`)
            const meta = t(`projects.${project.id}.meta`)
            const details = t(`projects.${project.id}.details`)
            const readMore = t(`projects.${project.id}.button`)
            const visit = t(`projects.${project.id}.visit`)

            return (
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
                    alt={title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    onError={onImgError}
                  />

                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white z-20">
                    <div className="absolute inset-x-0 -top-24 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="relative space-y-2 text-center pointer-events-auto">
                      <h3 className="text-xl font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
                        {title}
                      </h3>

                      <p className="text-sm opacity-90 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] max-w-md mx-auto">
                        {desc}
                      </p>

                      {meta && meta !== `projects.${project.id}.meta` && (
                        <p className="text-xs opacity-75 mt-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                          {meta}
                        </p>
                      )}

                      {details && (
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
                            {readMore}
                          </button>
                        </Dialog.Trigger>
                      )}
                    </div>
                  </figcaption>

                  {details && (
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
                              {title}
                            </Dialog.Title>

                            <Dialog.Close asChild>
                              <button className="text-white/70 hover:text-white transition text-xl leading-none">
                                ✕
                              </button>
                            </Dialog.Close>
                          </div>

                          {meta && (
                            <Dialog.Description className="text-sm mb-4 text-[#9B5DE5]/80">
                              {meta}
                            </Dialog.Description>
                          )}

                          <p className="whitespace-pre-line leading-relaxed text-base text-white/90">
                            {details}
                          </p>

                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                group
                                mt-6 inline-flex items-center justify-center 
                                px-5 py-2 rounded-full font-medium
                                bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]
                                shadow-[0_0_12px_rgba(155,93,229,0.7)]
                                hover:shadow-[0_0_18px_rgba(241,91,181,0.9)]
                                transition 
                                text-white
                              "
                            >
                              {visit}
                              <ArrowRight
                                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </a>
                          )}
                        </motion.div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  )}
                </figure>
              </Dialog.Root>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkExperience


