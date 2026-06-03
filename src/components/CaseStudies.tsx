"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "Apex Dispatch",
    sector: "Global Supply Chain",
    impact: "-38% Scheduling Latency",
    tagline: "Modernizing global dispatch workflows through high-density UI systems.",
    summary:
      "Apex was managing fleet scheduling using a fragmented suite of slow legacy tools. We replaced their entire stack with a unified, high-density dispatch dashboard. Built on a custom canvas map layer with real-time WebSocket state management, the new system allows schedulers to coordinate hundreds of routes simultaneously. We prioritized rapid keyboard inputs and a dense, dark-mode visual interface designed to reduce eye strain.",
    index: "001",
  },
  {
    id: 2,
    title: "Verdant Epoch",
    sector: "Venture Capital",
    impact: "+112% Form Completion Rate",
    tagline: "An immersive cinematic landing page for a sustainable venture fund.",
    summary:
      "Verdant Capital needed a digital presence that stood out in a sea of sterile financial sites. We engineered a highly immersive, interactive experience utilizing custom GLSL shaders, scroll-driven WebGL topography, and crisp typography. By keeping bundle sizes under 150kb and optimizing assets for mobile GPU limits, we delivered a cinematic interactive narrative that runs at a stable 60fps.",
    index: "002",
  },
  {
    id: 3,
    title: "Quant Ledger",
    sector: "Quantitative Finance",
    impact: "Zero-Lag 500k Data Points",
    tagline: "A high-throughput financial data visualizer for algorithmic traders.",
    summary:
      "Quant Analytics needed to display high-frequency tick data to institutional traders in real-time. We engineered a custom dashboard featuring lightweight WebGL canvas charts and a highly optimized Web Worker architecture that handles incoming high-speed data streams off the main thread. Traders can pan, zoom, and filter half a million transaction points without a single dropped frame.",
    index: "003",
  },
];

function StudyCard({
  study,
  i,
}: {
  study: (typeof caseStudies)[0];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="py-16 md:py-24 border-t border-[#1a1a1a]"
    >
      <div className="max-w-3xl">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-4">
          {study.index} / {study.sector}
        </span>
        <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#f0f0f0] leading-[1.05] tracking-[-0.02em] mb-6">
          {study.title}
        </h3>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[13px] tracking-wide text-[#c9a84c]">
            {study.impact}
          </span>
        </div>
        <p className="font-serif italic text-lg md:text-xl text-[#5a5a5a] leading-relaxed mb-8">
          {study.tagline}
        </p>
        <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-2xl">
          {study.summary}
        </p>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6"
          >
            [ PROJECTS // EDITORIAL CASE STUDIES ]
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl"
          >
            Production records.
          </motion.h2>
        </div>

        <div>
          {caseStudies.map((study, i) => (
            <StudyCard key={study.id} study={study} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
