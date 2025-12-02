import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"

type Props = {
  children: React.ReactNode
  dotSize?: number
  gap?: number
  autoHideMs?: number
  dots?: number
  hideNativeScrollbar?: boolean
}

export const DotNavigation = ({
  children,
  dots = 6,
  dotSize = 12,
  gap = 16,
  autoHideMs = 1400,
  hideNativeScrollbar = true,
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const [railVisible, setRailVisible] = useState(false)
  const [draggingDot, setDraggingDot] = useState(false)
  const hideTimer = useRef<number | null>(null)

  const [headerHeight, setHeaderHeight] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionCount, setSectionCount] = useState(0)

  const railPadding = 12
  const railOffset = 16
  const buttonSize = dotSize + 8

  const dotCount = sectionCount || dots

  // Hämta header-höjd (uppdateras även när header dyker upp efter load)
  useEffect(() => {
    const update = () => {
      const headerEl = document.querySelector("header") as HTMLElement | null
      setHeaderHeight(headerEl?.offsetHeight ?? 0)
    }

    update()
    window.addEventListener("resize", update)

    let ro: ResizeObserver | null = null
    const headerEl = document.querySelector("header") as HTMLElement | null
    if (headerEl && "ResizeObserver" in window) {
      ro = new ResizeObserver(update)
      ro.observe(headerEl)
    }

    return () => {
      window.removeEventListener("resize", update)
      ro?.disconnect()
    }
  }, [])

  // Exponera header-height som CSS-variabel om du vill använda den i CSS
  useEffect(() => {
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`)
  }, [headerHeight])

  // Lås window-scroll när DotNavigation är aktiv
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const oldHtml = html.style.overflow
    const oldBody = body.style.overflow

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"

    return () => {
      html.style.overflow = oldHtml
      body.style.overflow = oldBody
    }
  }, [])

  // Initiera Lenis + räkna ut aktiv sektion vid scroll
  useEffect(() => {
    const wrapper = scrollerRef.current
    if (!wrapper) return

    const content = wrapper.firstElementChild as HTMLElement | null

    const lenis = new Lenis({
      wrapper,
      content: content ?? undefined,
      autoRaf: true,
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    lenisRef.current = lenis

    const updateActiveSection = () => {
      // Hitta alla <section> inne i scrollcontainern
      const sections = Array.from(wrapper.querySelectorAll<HTMLElement>("section"))
      setSectionCount(sections.length)

      if (!sections.length) {
        setActiveIndex(0)
        return
      }

      const wrapperRect = wrapper.getBoundingClientRect()
      const viewportMiddle = wrapper.scrollTop + wrapper.clientHeight / 2

      let closestIndex = 0
      let closestDist = Infinity

      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect()
        // top relativt scrollinnehållet
        const sectionTop = rect.top - wrapperRect.top + wrapper.scrollTop
        const dist = Math.abs(sectionTop - viewportMiddle)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      setActiveIndex(closestIndex)
    }

    const onScroll = () => {
      updateActiveSection()
      ping()
    }

    wrapper.addEventListener("scroll", onScroll, { passive: true })

    // Initiera direkt
    updateActiveSection()

    return () => {
      wrapper.removeEventListener("scroll", onScroll)
      lenis.destroy()
    }
  }, [autoHideMs, dots])

  const ping = () => {
    setRailVisible(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (autoHideMs > 0) {
      hideTimer.current = window.setTimeout(() => setRailVisible(false), autoHideMs)
    }
  }

  // Scrolla till sektion i med Lenis
  const scrollToDot = (i: number) => {
    const wrapper = scrollerRef.current
    if (!wrapper) return

    const sections = Array.from(wrapper.querySelectorAll<HTMLElement>("section"))

    if (sections.length) {
      const index = Math.min(i, sections.length - 1)
      const targetSection = sections[index]

      const wrapperRect = wrapper.getBoundingClientRect()
      const rect = targetSection.getBoundingClientRect()

      // top i scroll-koordinater
      const targetTop = rect.top - wrapperRect.top + wrapper.scrollTop

      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 1 })
      } else {
        wrapper.scrollTop = targetTop
      }
      return
    }

    // fallback om inga sections hittas
    const max = wrapper.scrollHeight - wrapper.clientHeight
    const target = (i / Math.max(1, dotCount - 1)) * max

    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { duration: 1 })
    } else {
      wrapper.scrollTop = target
    }
  }

  return (
    <div
      className="app-scroll relative w-full overflow-hidden z-[1]"
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      <div
        ref={scrollerRef}
        className={`h-full w-full overflow-y-scroll pointer-events-auto ${
          hideNativeScrollbar ? "scrollbar-hide" : ""
        }`}
        onMouseEnter={ping}
        onTouchStart={ping}
      >
        {children}
      </div>

      {/* Dots */}
      <div
        className="pointer-events-auto absolute top-1/2 -translate-y-1/2 hidden sm:block transition-opacity z-[9999]"
        style={{
          right: railOffset,
          opacity: railVisible || draggingDot ? 1 : 0,
        }}
      >
        <div
          className="relative"
          style={{
            padding: railPadding,
            height: `min(76vh, ${dotCount * (buttonSize + gap) - gap + railPadding * 2}px)`,
            width: buttonSize + railPadding * 2,
          }}
          onPointerLeave={() => setDraggingDot(false)}
          onPointerUp={() => setDraggingDot(false)}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bg-neutral-300/70 dark:bg-white/30"
            style={{
              top: railPadding + buttonSize / 2,
              width: 2,
              height: `calc(100% - ${railPadding * 2 + buttonSize}px)`,
              borderRadius: 9999,
            }}
          />

          <nav className="relative flex flex-col items-center">
            {Array.from({ length: dotCount }).map((_, i) => {
              const isActive = i === activeIndex
              const size = isActive ? dotSize + 2 : dotSize

              return (
                <button
                  key={i}
                  onPointerDown={(e) => {
                    setDraggingDot(true)
                    scrollToDot(i)
                    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
                  }}
                  onPointerEnter={() => draggingDot && scrollToDot(i)}
                  className="group relative block cursor-pointer"
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    marginBottom: i === dotCount - 1 ? 0 : gap,
                  }}
                >
                  <span
                    className={`
                      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      rounded-full transition-all duration-150
                      ${
                        isActive
                          ? "bg-[#cf7bff] shadow-[0_0_12px_rgba(207,123,255,0.8)]"
                          : "bg-[#44215c]"
                      }
                    `}
                    style={{ width: size, height: size }}
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

