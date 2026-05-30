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
  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-start py-20 md:py-28 border-t border-[#1a1a1a] ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
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
        <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-md">
          {study.summary}
        </p>
      </div>

      <div
        className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative aspect-[16/10] bg-[#0d0d0d] border border-[#1a1a1a] overflow-hidden group">
          {/* Abstract pattern placeholder */}
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id={`grid-${study.index}`}
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                width="800"
                height="500"
                fill={`url(#grid-${study.index})`}
              />
              <rect
                x="60"
                y="40"
                width="680"
                height="4"
                fill="#1a1a1a"
                rx="2"
              />
              <rect
                x="60"
                y="60"
                width="480"
                height="4"
                fill="#1a1a1a"
                rx="2"
              />
              <rect
                x="60"
                y="80"
                width="560"
                height="4"
                fill="#1a1a1a"
                rx="2"
              />
              {study.id === 1 && (
                <>
                  <circle cx="200" cy="250" r="80" stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <circle cx="500" cy="300" r="60" stroke="#14c7c0" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <line x1="200" y1="250" x2="500" y2="300" stroke="#1a1a1a" strokeWidth="0.5" />
                  <line x1="200" y1="250" x2="350" y2="180" stroke="#1a1a1a" strokeWidth="0.5" />
                </>
              )}
              {study.id === 2 && (
                <>
                  <path d="M 100 400 Q 300 100 500 300 T 700 200" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.4" />
                  <path d="M 150 420 Q 350 120 550 320 T 750 220" stroke="#14c7c0" strokeWidth="0.5" fill="none" opacity="0.3" />
                </>
              )}
              {study.id === 3 && (
                <>
                  {[
                    [80, 180, 12, 140],
                    [110, 220, 12, 100],
                    [140, 160, 12, 160],
                    [170, 200, 12, 120],
                    [200, 240, 12, 80],
                    [230, 170, 12, 150],
                    [260, 210, 12, 110],
                    [290, 190, 12, 130],
                    [320, 230, 12, 90],
                    [350, 175, 12, 145],
                    [380, 205, 12, 115],
                    [410, 185, 12, 135],
                    [440, 225, 12, 95],
                    [470, 165, 12, 155],
                    [500, 195, 12, 125],
                    [530, 215, 12, 105],
                    [560, 175, 12, 145],
                    [590, 235, 12, 85],
                    [620, 185, 12, 135],
                    [650, 205, 12, 115],
                  ].map(([x, y, w, h], idx) => (
                    <rect
                      key={idx}
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      fill="#1a1a1a"
                      rx="2"
                    />
                  ))}
                </>
              )}
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#3a3a3a]">
              {study.sector}
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#c9a84c]">
              {study.impact}
            </span>
          </div>
        </div>
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
