"use client";

import { useEffect, useState, useSyncExternalStore, useRef } from "react";
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

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

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // air resistance
        p.vy *= 0.94;
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = lifeRatio * 0.7;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch, reducedMotion]);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      cursorX.set(clientX);
      cursorY.set(clientY);

      if (document.body.classList.contains("keyboard-navigating")) {
        document.body.classList.remove("keyboard-navigating");
      }

      // Spawning trailing sparks based on movement speed
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 2) {
        const count = Math.min(Math.floor(distance / 4), 3) || 1;
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const x = lastMousePosRef.current.x + dx * t;
          const y = lastMousePosRef.current.y + dy * t;

          const offsetAngle = Math.random() * Math.PI * 2;
          const offsetDist = Math.random() * 2;
          
          particlesRef.current.push({
            x: x + Math.cos(offsetAngle) * offsetDist,
            y: y + Math.sin(offsetAngle) * offsetDist,
            // Drag particle direction opposite to cursor vector + small random float
            vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3 + 1.2, // 1.2px to 4.2px
            color: Math.random() > 0.3 ? "#14c7c0" : "#ffffff", // Teal spark / white spark
            life: Math.floor(Math.random() * 15) + 15,
            maxLife: 30,
          });
        }
        
        lastMousePosRef.current = { x: clientX, y: clientY };
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

    const handleMouseDown = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const count = 15 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 4 + 1.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          color: Math.random() > 0.4 ? "#14c7c0" : Math.random() > 0.5 ? "#24ece4" : "#ffffff",
          life: Math.floor(Math.random() * 20) + 20,
          maxLife: 40,
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
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
      {/* High performance Canvas particle layer */}
      <canvas
        ref={canvasRef}
        className="custom-cursor-element fixed inset-0 pointer-events-none z-[10002] hidden md:block"
      />

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
