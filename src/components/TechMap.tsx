"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    domain: "Frontend",
    tools: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Three.js",
  },
  {
    domain: "Backend & Data",
    tools: "Node.js, PostgreSQL, Supabase, Python, REST, GraphQL",
  },
  {
    domain: "AI & Automation",
    tools: "LangGraph, OpenAI API, Claude, Kimi, n8n, Custom Agents",
  },
];

function CapabilityRow({
  cap,
  index,
}: {
  cap: (typeof capabilities)[0];
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
      <div className="md:col-span-3">
        <span className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] group-hover:text-[#c9a84c] transition-colors duration-300">
          {cap.domain}
        </span>
      </div>
      <div className="md:col-span-9">
        <p className="text-sm md:text-base text-[#5a5a5a] leading-relaxed group-hover:text-[#8a8a8a] transition-colors duration-300">
          {cap.tools}
        </p>
      </div>
    </motion.div>
  );
}

export default function TechMap() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6"
          >
            06 / Technology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl"
          >
            Tools we master.
          </motion.h2>
        </div>

        <div className="border-t border-[#1a1a1a]">
          {capabilities.map((cap, index) => (
            <CapabilityRow key={cap.domain} cap={cap} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
