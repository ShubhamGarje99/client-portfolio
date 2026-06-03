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

  const springConfig = { damping: 30, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (document.body.classList.contains("keyboard-navigating")) {
        document.body.classList.remove("keyboard-navigating");
      }
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigating");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("keyboard-navigating");
    };
  }, [cursorX, cursorY, isTouch, reducedMotion]);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        body:not(.keyboard-navigating) { cursor: none !important; }
        body:not(.keyboard-navigating) a, 
        body:not(.keyboard-navigating) button, 
        body:not(.keyboard-navigating) [data-cursor="pointer"] { cursor: none !important; }
      }
      body.keyboard-navigating .custom-cursor-element {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Inner Dot: Zero lag, instant tracking */}
      <motion.div
        className="custom-cursor-element fixed top-0 left-0 w-0 h-0 flex items-center justify-center pointer-events-none z-[10001] mix-blend-difference hidden md:flex"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 0.8,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        />
      </motion.div>

      {/* Outer Ring: Smooth spring tracking */}
      <motion.div
        className="custom-cursor-element fixed top-0 left-0 w-0 h-0 flex items-center justify-center pointer-events-none z-[10000] mix-blend-difference hidden md:flex"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="w-5 h-5 rounded-full border border-white flex-shrink-0"
          animate={{
            scale: isHovering ? 2.4 : 1,
            backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
            borderWidth: isHovering ? 0 : 1,
            opacity: isHovering ? 0.12 : 0.4,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
        />
      </motion.div>
    </>
  );
}
