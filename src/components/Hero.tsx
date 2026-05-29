"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl">
        {/* Index marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a]">
            01
          </span>
          <div className="w-12 h-px bg-[#1a1a1a]" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a]">
            Digital Craft Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#f0f0f0] mb-8 max-w-5xl"
        >
          We design and
          <br />
          engineer intelligent
          <br />
          <span className="text-[#3a3a3a]">digital products.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base md:text-lg text-[#5a5a5a] max-w-md leading-relaxed mb-12"
        >
          For brands that refuse to look average. Strategy, design, and
          engineering under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-6"
        >
          <MagneticButton variant="primary" href="#work">
            View Work
          </MagneticButton>
          <a
            href="#contact"
            className="text-[13px] tracking-wide text-[#5a5a5a] hover:text-[#f0f0f0] transition-colors duration-300"
          >
            Start a project
          </a>
        </motion.div>
      </motion.div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-[#f0f0f0] opacity-[0.02]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-[#f0f0f0] opacity-[0.02]" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-[#f0f0f0] opacity-[0.02]" />
      </div>
    </section>
  );
}
