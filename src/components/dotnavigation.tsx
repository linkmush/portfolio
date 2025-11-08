import { useLayoutEffect, useRef, useState } from "react"
import Lenis from "lenis"

const sectionIds = ["heroSection","experienceSection","skills","contactSection"]

export const DotNavigation = ({ children }: { children: React.ReactNode }) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const buttonSize = 14
  const gap = 20
  const railPadding = 12
  const railOffset = 16

  // Lenis init
  useLayoutEffect(() => {
    if (!scrollerRef.current) return

    let cleanupRaf = 0
    let lenis: any

    const init = () => {
      const wrapper = scrollerRef.current as HTMLElement
      const firstEl = wrapper.firstElementChild
      const contentEl = (firstEl instanceof HTMLElement) ? firstEl : undefined

      const opts: any = {
        wrapper,
        autoRaf: true,
        duration: 0.9,               // smoother feeling
        wheelMultiplier: 1.35,       // faster wheel input = less lag feeling
        touchMultiplier: 1.8,        // touchpad smoother
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      }

      if (contentEl) opts.content = contentEl

      lenis = new Lenis(opts)
      ;(window as any).__lenis = lenis
    }

    cleanupRaf = requestAnimationFrame(init)

    return () => {
      if (cleanupRaf) cancelAnimationFrame(cleanupRaf)
      try {
        lenis?.destroy?.()
      } finally {
        delete (window as any).__lenis
      }
    }
  }, [])

  // intersection observer
  useLayoutEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = sectionIds.indexOf((entry.target as HTMLElement).id)
            if (i !== -1) {
              setActiveIndex(i)
              break
            }
          }
        }
      },
      { threshold: 0.6 }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  const scrollToSection = (idx: number) => {
    const target = document.getElementById(sectionIds[idx])
    if (!target) return
    ;(window as any).__lenis?.scrollTo(target)
  }

  return (
    <div className="app-scroll relative w-full overflow-hidden pointer-events-auto" style={{ height: "100vh" }}>
      <div
        ref={scrollerRef}
        className="h-full w-full overflow-y-scroll scrollbar-hide"
      >
        {children}
      </div>

      {/* DOT RAIL RIGHT */}
      <div
        className="pointer-events-auto absolute top-1/2 -translate-y-1/2 hidden sm:block mr-3 z-[1000]"
        style={{ right: railOffset }}
      >
        <div
          className="relative"
          style={{
            padding: railPadding,
            height: `min(76vh, ${sectionIds.length * (buttonSize + gap) - gap + railPadding * 2}px)`,
            width: buttonSize + railPadding * 2,
          }}
        >
          <nav aria-label="Scroll progress" className="relative flex flex-col items-center">
            {sectionIds.map((_, i) => {
              const isActive = i === activeIndex
              const coreSize = isActive ? buttonSize + 4 : buttonSize
              return (
              <button
                key={i}
                onClick={() => scrollToSection(i)}
                className="group relative block focus:outline-none"
                style={{
                  width: buttonSize,
                  height: buttonSize,
                  marginBottom: i === sectionIds.length - 1 ? 0 : gap,
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                {/* ring (yttercirkeln) */}
                <span
                  className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                    transition-all duration-300
                    ${isActive
                      ? "border-[2px] border-[#d88aff] drop-shadow-[0_0_6px_rgba(216,138,255,0.85)]"
                      : "border-[2px] border-[#341847]"
                    }
                  `}
                  style={{
                    width: coreSize + 10,
                    height: coreSize + 10,
                  }}
                />

                {/* core dot */}
                <span
                  className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                    transition-all duration-200
                    ${isActive ? "bg-[#cf7bff]" : "bg-[#44215c]"}
                  `}
                  style={{ width: coreSize, height: coreSize }}
                />
              </button>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}