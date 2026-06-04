"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// ─── Tuning ───────────────────────────────────────────────────────────────────
const MAX_SKEW     = 4;    // degrees — max tilt at peak velocity
const SKEW_DAMPING = 0.08; // how fast skew catches up (lower = more lag/drama)
const VEL_SCALE    = 0.35; // velocity → degrees multiplier

// ─── Scroll effects: skew + progress bar + CSS vars ──────────────────────────
function ScrollEffects() {
  const currentSkew = useRef(0);
  const barRef      = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);

  // Wire up per-frame effects via Lenis scroll event
  useLenis(({ scroll, limit, velocity }) => {
    // 1. Update ScrollTrigger
    ScrollTrigger.update();

    // 2. Scroll progress bar (scaleX 0→1)
    if (barRef.current) {
      const progress = limit > 0 ? scroll / limit : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    }

    // 3. Velocity as a CSS custom property — Hero shader & any other component can read it
    document.documentElement.style.setProperty(
      "--lenis-velocity",
      String(Math.abs(velocity).toFixed(3))
    );

    // 4. Skew: lerp toward target, apply to <main>
    const targetSkew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocity * VEL_SCALE));
    currentSkew.current += (targetSkew - currentSkew.current) * SKEW_DAMPING;

    // We write to <main> directly for zero-overhead DOM mutation
    const main = document.querySelector<HTMLElement>("main");
    if (main) {
      main.style.transform    = `skewY(${currentSkew.current.toFixed(4)}deg)`;
      main.style.willChange   = "transform";
    }
  });

  // Decay skew back to 0 when Lenis is idle (no scroll event fires)
  useEffect(() => {
    let raf: number;
    const decay = () => {
      if (Math.abs(currentSkew.current) > 0.001) {
        currentSkew.current *= 0.85; // smooth ease-out decay
        const main = document.querySelector<HTMLElement>("main");
        if (main) {
          main.style.transform = `skewY(${currentSkew.current.toFixed(4)}deg)`;
        }
      }
      raf = requestAnimationFrame(decay);
    };
    raf = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    /* Progress bar — fixed at top, 2 px tall, teal → purple gradient */
    <div
      aria-hidden
      style={{
        position:   "fixed",
        top:        0,
        left:       0,
        right:      0,
        height:     "2px",
        zIndex:     9998,
        background: "rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={barRef}
        style={{
          height:          "100%",
          background:      "linear-gradient(90deg, #14c7c0 0%, #0e8c87 60%, #5b8af0 100%)",
          transformOrigin: "left center",
          transform:       "scaleX(0)",
          willChange:      "transform",
          // Glow beneath the bar
          boxShadow:       "0 0 8px 1px rgba(20,199,192,0.6)",
        }}
      />
    </div>
  );
}

// ─── Root provider ────────────────────────────────────────────────────────────
export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // lerp: exponential decay coefficient — 0.08 feels premium and weighty
        lerp: 0.08,
        // Smooth mouse wheel
        smoothWheel: true,
        // Also smooth touch-based scroll on mobile
        syncTouch: true,
        // Slightly longer touch inertia duration (seconds)
        syncTouchLerp: 0.06,
      }}
    >
      <ScrollEffects />
      {children}
    </ReactLenis>
  );
}
