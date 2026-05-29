"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "Deep research into users, market, and constraints. We find the real problem before solving it.",
  },
  {
    num: "02",
    title: "Design System",
    description: "Build the visual and interaction language first. Type, color, motion, components.",
  },
  {
    num: "03",
    title: "Prototype",
    description: "Interactive prototypes tested with real users. Refined with data, approved with confidence.",
  },
  {
    num: "04",
    title: "Build",
    description: "Clean architecture. React, Next.js, TypeScript, and whatever AI stack the product demands.",
  },
  {
    num: "05",
    title: "Launch & Iterate",
    description: "Ship, measure, learn, improve. We stay close to make sure the product gets better every release.",
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group grid md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-8 items-baseline border-b border-[#1a1a1a]"
    >
      <div className="md:col-span-1">
        <span className="text-[11px] tracking-wider text-[#3a3a3a]">{step.num}</span>
      </div>
      <div className="md:col-span-3">
        <h3 className="text-lg md:text-xl font-medium text-[#f0f0f0] group-hover:text-[#c9a84c] transition-colors duration-300">
          {step.title}
        </h3>
      </div>
      <div className="md:col-span-8">
        <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-2xl group-hover:text-[#8a8a8a] transition-colors duration-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6"
          >
            05 / Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl"
          >
            How we work.
          </motion.h2>
        </div>

        <div>
          {steps.map((step, index) => (
            <ProcessStep key={step.num} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
