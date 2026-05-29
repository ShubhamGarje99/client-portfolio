"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
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
            09 / Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-[#f0f0f0] mb-10 max-w-4xl"
          >
            Bring us a messy idea.
            <br />
            <span className="text-[#3a3a3a]">We&apos;ll build a product.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6 mb-16"
          >
            <MagneticButton variant="primary" href="mailto:hello@youragency.com">
              Start a project
            </MagneticButton>
            <a
              href="#work"
              className="text-[13px] tracking-wide text-[#5a5a5a] hover:text-[#f0f0f0] transition-colors duration-300"
            >
              View work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="border-t border-[#1a1a1a] pt-8"
          >
            <a
              href="mailto:hello@youragency.com"
              className="text-sm text-[#5a5a5a] hover:text-[#c9a84c] transition-colors duration-300"
            >
              hello@youragency.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
