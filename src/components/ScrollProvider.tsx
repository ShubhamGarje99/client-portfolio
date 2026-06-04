"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SNAP_SECTIONS = [
  "hero",
  "metrics",
  "services",
  "process",
  "tech",
  "proof",
  "about",
  "contact",
];

const DELTA_THRESHOLD = 20;
const ANIMATION_DURATION = 1300; // ms — must match lenis.scrollTo duration

function getSectionTops(): number[] {
  return SNAP_SECTIONS.flatMap((id) => {
    const el = document.getElementById(id);
    if (!el) return [];
    return [el.getBoundingClientRect().top + window.scrollY];
  });
}

function getNearestSectionIndex(scrollY: number, tops: number[]): number {
  let closest = 0;
  let minDist = Infinity;
  tops.forEach((top, i) => {
    const dist = Math.abs(top - scrollY);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- Section Snapping ---
    let locked = false;
    let lockTimeout: ReturnType<typeof setTimeout> | null = null;
    // Set to true once the user arrives at the last section and scrolls down.
    // Resets when they scroll back up past the second-to-last section.
    let snapDisabled = false;

    function unlock() {
      locked = false;
      if (lockTimeout) {
        clearTimeout(lockTimeout);
        lockTimeout = null;
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < DELTA_THRESHOLD) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const tops = getSectionTops();
      if (!tops.length) return;

      const scrollY = window.scrollY;
      const lastIndex = tops.length - 1;
      const currentIndex = getNearestSectionIndex(scrollY, tops);

      // ── FREE SCROLL: ONE-WAY LATCH ───────────────────────────────
      // Once the user scrolls down from the last section, snapping is
      // permanently disabled for the rest of the session.
      if (!snapDisabled && currentIndex === lastIndex && direction > 0) {
        snapDisabled = true;
        if (locked) unlock();
      }
      if (snapDisabled) return; // let Lenis scroll freely forever after
      // ─────────────────────────────────────────────────────────────

      // If currently animating a snap, block extra scroll.
      if (locked) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const targetIndex = Math.max(
        0,
        Math.min(lastIndex, currentIndex + direction)
      );

      // Already at the nearest section in that direction — no snap needed.
      if (targetIndex === currentIndex) return;

      e.preventDefault();
      e.stopPropagation();

      locked = true;
      // Safety: always unlock after max animation time so we never get stuck.
      lockTimeout = setTimeout(unlock, ANIMATION_DURATION + 400);

      lenis.scrollTo(tops[targetIndex], {
        duration: 1.3,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: () => {
          // Short buffer after landing so a stray event doesn't immediately re-fire.
          if (lockTimeout) clearTimeout(lockTimeout);
          lockTimeout = setTimeout(unlock, 150);
        },
      });
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    // Recalculate scroll dimensions when body height changes dynamically
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      if (lockTimeout) clearTimeout(lockTimeout);
      resizeObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
