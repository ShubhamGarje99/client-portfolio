"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function subscribe() {
  return () => {};
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function getTouchServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const isTouch = useSyncExternalStore(
    subscribe,
    getTouchSnapshot,
    getTouchServerSnapshot
  );
  const reducedMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isTouch, reducedMotion]);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        body { cursor: none !important; }
        a, button, [data-cursor="pointer"] { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <motion.div
        className="bg-white rounded-full"
        animate={{
          width: isHovering ? 48 : 8,
          height: isHovering ? 48 : 8,
          x: isHovering ? -24 : -4,
          y: isHovering ? -24 : -4,
          opacity: isHovering ? 0.12 : 0.6,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
    </motion.div>
  );
}
