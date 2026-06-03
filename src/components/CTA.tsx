"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

type Category = "startup" | "agency" | "enterprise" | null;

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [category, setCategory] = useState<Category>(null);

  const categories = [
    {
      id: "startup" as Category,
      tag: "[ STP // 01 ]",
      title: "Startup Product",
      desc: "A category-defining MVP, platform, or high-fidelity web application built from scratch.",
    },
    {
      id: "agency" as Category,
      tag: "[ AGN // 02 ]",
      title: "Agency Partner",
      desc: "Long-term production partner to handle design-to-code pipelines and overflow engineering.",
    },
    {
      id: "enterprise" as Category,
      tag: "[ ENT // 03 ]",
      title: "Enterprise Systems",
      desc: "Custom internal tooling, AI-agent integrations, database migration, or calibration.",
    },
  ];

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-12">
      <div className="max-w-7xl mx-auto">
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
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-10"
          >
            [ TERMINAL 05 // INITIATE DIAGNOSTICS ]
          </motion.span>

          <div className="group/heading cursor-default">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-[#f0f0f0] mb-10 max-w-4xl"
            >
              Let&apos;s discuss your{" "}
              <span className="text-[#3a3a3a] group-hover/heading:text-[#14c7c0] transition-colors duration-700">
                system requirements.
              </span>
            </motion.h2>
          </div>

          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] mb-4">
              Select project type
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`group/card text-left p-6 border transition-all duration-500 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[150px] ${
                    category === cat.id
                      ? "border-[#14c7c0] bg-[#14c7c0]/5 text-[#f0f0f0]"
                      : "border-[#141414] bg-[#0a0a0a]/30 text-[#5a5a5a] hover:border-[#14c7c0]/30 hover:bg-[#0c0c0c]/80"
                  }`}
                >
                  {/* Teal top edge radial glow */}
                  <div 
                    className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none ${
                      category === cat.id ? "opacity-100" : "group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(20, 199, 192, 0.04) 0%, transparent 60%)"
                    }}
                  />

                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`font-mono text-[9px] tracking-widest transition-colors duration-300 ${
                        category === cat.id ? "text-[#14c7c0]" : "text-[#2a2a2a] group-hover/card:text-[#14c7c0]/50"
                      }`}>
                        {cat.tag}
                      </span>
                      {/* Circle dot indicator */}
                      <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        category === cat.id 
                          ? "border-[#14c7c0] bg-[#14c7c0]" 
                          : "border-[#2a2a2a] bg-transparent group-hover/card:border-[#14c7c0]/40"
                      }`}>
                        {category === cat.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-[15px] font-medium transition-colors duration-300 block mb-1 ${
                        category === cat.id ? "text-[#14c7c0]" : "text-[#f0f0f0] group-hover/card:text-[#14c7c0]/80"
                      }`}>
                        {cat.title}
                      </h3>
                      <p className={`text-[11px] leading-normal transition-colors duration-300 ${
                        category === cat.id ? "text-[#8a8a8a]" : "text-[#5a5a5a] group-hover/card:text-[#7a7a7a]"
                      }`}>
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Form Fields */}
          {category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-12 overflow-hidden"
            >
              <div className="border-t border-[#141414] pt-8 space-y-8 max-w-xl">
                <div className="group/field">
                  <label htmlFor="name" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] group-focus-within/field:text-[#14c7c0] transition-colors duration-300 block mb-2">
                    Name / Company
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-transparent border-b border-[#141414] focus:border-[#14c7c0] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="group/field">
                  <label htmlFor="stack" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] group-focus-within/field:text-[#14c7c0] transition-colors duration-300 block mb-2">
                    Stack / Data Infrastructure
                  </label>
                  <input
                    id="stack"
                    type="text"
                    className="w-full bg-transparent border-b border-[#141414] focus:border-[#14c7c0] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
                    placeholder="Current tech stack"
                  />
                </div>

                <div className="group/field">
                  <label htmlFor="timeline" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] group-focus-within/field:text-[#14c7c0] transition-colors duration-300 block mb-2">
                    Estimated Runway / Timeline
                  </label>
                  <input
                    id="timeline"
                    type="text"
                    className="w-full bg-transparent border-b border-[#141414] focus:border-[#14c7c0] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
                    placeholder="When do you need this?"
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <MagneticButton variant="primary" href="mailto:hello@signalstudio.dev">
                  Deploy Inquiry // →
                </MagneticButton>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="border-t border-[#141414] pt-8"
          >
            <a
              href="mailto:hello@signalstudio.dev"
              className="text-sm font-mono tracking-wider text-[#5a5a5a] hover:text-[#14c7c0] transition-colors duration-300"
            >
              hello@signalstudio.dev
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
