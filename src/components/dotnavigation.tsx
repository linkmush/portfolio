// import { useEffect, useRef, useState } from "react"
// import Lenis from "lenis"

// type Props = {
//   children: React.ReactNode
//   dotSize?: number
//   gap?: number
//   autoHideMs?: number
//   dots?: number
//   hideNativeScrollbar?: boolean
// }

// export const DotNavigation = ({
//   children,
//   dots = 6,
//   dotSize = 12,
//   gap = 16,
//   autoHideMs = 1400,
//   hideNativeScrollbar = true,
// }: Props) => {

//   const scrollerRef = useRef<HTMLDivElement>(null)
//   const lenisRef = useRef<Lenis | null>(null)

//   const [progress, setProgress] = useState(0)
//   const [railVisible, setRailVisible] = useState(false)
//   const [draggingDot, setDraggingDot] = useState(false)
//   const hideTimer = useRef<number | null>(null)

//   const railPadding = 12
//   const railOffset = 16
//   const buttonSize = dotSize + 8

//   // ==========================================
//   // HEADER HEIGHT SYNC (samma som AppScrollDots)
//   // ==========================================
//   const [headerHeight, setHeaderHeight] = useState(64)

//   useEffect(() => {
//     const header = document.querySelector("header") as HTMLElement | null

//     const update = () => setHeaderHeight(header?.offsetHeight ?? 64)
//     update()

//     const ro = new ResizeObserver(update)
//     if (header) ro.observe(header)

//     window.addEventListener("resize", update)

//     return () => {
//       ro.disconnect()
//       window.removeEventListener("resize", update)
//     }
//   }, [])

//   useEffect(() => {
//     document.documentElement.style.setProperty("--header-height", `${headerHeight}px`)
//   }, [headerHeight])


//   // ==========================================
//   // STOPPA BODY-SCROLL – VI SCROLLAR ENDAST .app-scroll > div
//   // ==========================================
//   useEffect(() => {
//     const html = document.documentElement
//     const body = document.body
//     const oldHtml = html.style.overflow
//     const oldBody = body.style.overflow

//     html.style.overflow = "hidden"
//     body.style.overflow = "hidden"

//     return () => {
//       html.style.overflow = oldHtml
//       body.style.overflow = oldBody
//     }
//   }, [])


//   // ==========================================
//   // LENIS INIT – EXACT SAMMA SOM AppScrollDots
//   // ==========================================
//   useEffect(() => {
//     const wrapper = scrollerRef.current
//     if (!wrapper) return

//     const content = wrapper.firstElementChild as HTMLElement | null

//     const lenis = new Lenis({
//       wrapper,
//       content: content ?? undefined,
//       autoRaf: true,
//       duration: 1.0,
//       easing: (t) => 1 - Math.pow(1 - t, 3),
//     })

//     lenisRef.current = lenis

//     const updateProgress = () => {
//       const max = wrapper.scrollHeight - wrapper.clientHeight
//       const p = wrapper.scrollTop / Math.max(1, max)
//       setProgress(p)
//     }

//     const onScroll = () => {
//       updateProgress()
//       ping()
//     }

//     wrapper.addEventListener("scroll", onScroll, { passive: true })
//     updateProgress()

//     return () => {
//       wrapper.removeEventListener("scroll", onScroll)
//       lenis.destroy()
//     }
//   }, [])


//   // ==========================================
//   // VISIBILITY TIMER
//   // ==========================================
//   const ping = () => {
//     setRailVisible(true)
//     if (hideTimer.current) window.clearTimeout(hideTimer.current)
//     if (autoHideMs > 0) {
//       hideTimer.current = window.setTimeout(() => setRailVisible(false), autoHideMs)
//     }
//   }

//   // ==========================================
//   // SCROLL TO DOT
//   // ==========================================
//   const scrollToDot = (i: number) => {
//     const wrapper = scrollerRef.current
//     if (!wrapper) return

//     const max = wrapper.scrollHeight - wrapper.clientHeight
//     const target = (i / Math.max(1, dots - 1)) * max

//     const lenis = lenisRef.current
//     if (lenis) {
//       lenis.scrollTo(target, { duration: 1 })
//     } else {
//       wrapper.scrollTop = target
//     }
//   }

//   const activeIndex = Math.round(progress * Math.max(1, dots - 1))


//   // ==========================================
//   // DOM-STRUKTUR – IDENTISK MED AppScrollDots
//   // ==========================================
//   return (
//     <div
//       className="app-scroll relative w-full overflow-hidden z-[1]"
//       style={{ height: `calc(100vh - ${headerHeight}px)` }}
//     >
//       {/* Den interna scroller som WorkExperience letar efter */}
//       <div
//         ref={scrollerRef}
//         className={`h-full w-full overflow-y-scroll pointer-events-auto ${
//           hideNativeScrollbar ? "scrollbar-hide" : ""
//         }`}
//         onMouseEnter={ping}
//         onTouchStart={ping}
//       >
//         {children}
//       </div>

//       {/* RIGHT DOT RAIL */}
//       <div
//         className="pointer-events-auto absolute top-1/2 -translate-y-1/2 hidden sm:block transition-opacity z-[9999]"
//         style={{
//           right: railOffset,
//           opacity: railVisible || draggingDot ? 1 : 0,
//         }}
//       >
//         <div
//           className="relative"
//           style={{
//             padding: railPadding,
//             height: `min(76vh, ${dots * (buttonSize + gap) - gap + railPadding * 2}px)`,
//             width: buttonSize + railPadding * 2,
//           }}
//           onPointerLeave={() => setDraggingDot(false)}
//           onPointerUp={() => setDraggingDot(false)}
//         >
//           {/* Line */}
//           <div
//             aria-hidden
//             className="pointer-events-none absolute left-1/2 -translate-x-1/2 bg-neutral-300/70 dark:bg-white/30"
//             style={{
//               top: railPadding + buttonSize / 2,
//               width: 2,
//               height: `calc(100% - ${railPadding * 2 + buttonSize}px)`,
//               borderRadius: 9999,
//             }}
//           />

//           <nav className="relative flex flex-col items-center">
//             {Array.from({ length: dots }).map((_, i) => {
//               const isActive = i === activeIndex
//               const size = isActive ? dotSize + 2 : dotSize

//               return (
//                 <button
//                   key={i}
//                   onPointerDown={(e) => {
//                     setDraggingDot(true)
//                     scrollToDot(i)
//                     ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
//                   }}
//                   onPointerEnter={() => draggingDot && scrollToDot(i)}
//                   className="group relative block cursor-pointer"
//                   style={{
//                     width: buttonSize,
//                     height: buttonSize,
//                     marginBottom: i === dots - 1 ? 0 : gap,
//                   }}
//                 >
//                   <span
//                     className={`
//                       absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
//                       rounded-full transition-all duration-150
//                       ${isActive ? "bg-[#cf7bff] shadow-[0_0_12px_rgba(207,123,255,0.8)]" : "bg-[#44215c]"}
//                     `}
//                     style={{ width: size, height: size }}
//                   />
//                 </button>
//               )
//             })}
//           </nav>
//         </div>
//       </div>
//     </div>
//   )
// }


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

  const [progress, setProgress] = useState(0)
  const [railVisible, setRailVisible] = useState(false)
  const [draggingDot, setDraggingDot] = useState(false)
  const hideTimer = useRef<number | null>(null)

  const railPadding = 12
  const railOffset = 16
  const buttonSize = dotSize + 8

  const [headerHeight, setHeaderHeight] = useState(64)

  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement | null

    const update = () => setHeaderHeight(header?.offsetHeight ?? 64)
    update()

    const ro = new ResizeObserver(update)
    if (header) ro.observe(header)

    window.addEventListener("resize", update)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`)
  }, [headerHeight])

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

    const updateProgress = () => {
      const max = wrapper.scrollHeight - wrapper.clientHeight
      const p = wrapper.scrollTop / Math.max(1, max)
      setProgress(p)
    }

    const onScroll = () => {
      updateProgress()
      ping()
    }

    wrapper.addEventListener("scroll", onScroll, { passive: true })
    updateProgress()

    return () => {
      wrapper.removeEventListener("scroll", onScroll)
      lenis.destroy()
    }
  }, [])

  const ping = () => {
    setRailVisible(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (autoHideMs > 0) {
      hideTimer.current = window.setTimeout(() => setRailVisible(false), autoHideMs)
    }
  }

  // ⬇️ FIXED: snap to real <section> elements, not just percentage of the page
  const scrollToDot = (i: number) => {
    const wrapper = scrollerRef.current
    if (!wrapper) return

    // all sections inside the scroll container (your Hero, WorkExperience, OrbitSkills)
    const sections = Array.from(
      wrapper.querySelectorAll<HTMLElement>("section")
    )

    if (sections.length && sections[i]) {
      const targetTop = sections[i].offsetTop

      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 1 })
      } else {
        wrapper.scrollTop = targetTop
      }
      return
    }

    // fallback: old behavior if no sections found
    const max = wrapper.scrollHeight - wrapper.clientHeight
    const target = (i / Math.max(1, dots - 1)) * max

    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { duration: 1 })
    } else {
      wrapper.scrollTop = target
    }
  }

  const activeIndex = Math.round(progress * Math.max(1, dots - 1))

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
            height: `min(76vh, ${dots * (buttonSize + gap) - gap + railPadding * 2}px)`,
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
            {Array.from({ length: dots }).map((_, i) => {
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
                    marginBottom: i === dots - 1 ? 0 : gap,
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

