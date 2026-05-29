"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="manifesto" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-10"
          >
            02 / Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] mb-10 max-w-4xl"
          >
            Interfaces with taste.
            <br />
            Systems with teeth.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px w-24 bg-[#1a1a1a] origin-left mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-[#5a5a5a] leading-relaxed max-w-xl"
          >
            We combine design taste, AI engineering, and full-stack development
            to build systems that are beautiful and useful. No templates. No
            shortcuts. Just craft that survives real users.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
