"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
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
            08 / About
          </motion.span>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0]"
            >
              Small team.
              <br />
              <span className="text-[#3a3a3a]">Serious output.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-base md:text-lg text-[#5a5a5a] leading-relaxed mb-8">
                We are a compact team of builders, designers, and AI operators
                creating sharp digital systems for startups, agencies, and
                ambitious founders. No bloated overhead. No junior work. Just
                senior craft, delivered fast.
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="text-2xl font-medium text-[#f0f0f0]">5+</span>
                  <p className="text-[11px] tracking-wider text-[#3a3a3a] mt-1">
                    Years of craft
                  </p>
                </div>
                <div>
                  <span className="text-2xl font-medium text-[#f0f0f0]">30+</span>
                  <p className="text-[11px] tracking-wider text-[#3a3a3a] mt-1">
                    Projects shipped
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
