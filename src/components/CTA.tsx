"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

type Category = "startup" | "agency" | "enterprise" | null;

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [category, setCategory] = useState<Category>(null);

  const categories: { id: Category; label: string }[] = [
    { id: "startup", label: "A category-defining product (Startup)" },
    { id: "agency", label: "A long-term production partner (Agency)" },
    { id: "enterprise", label: "Custom software or AI integration (Enterprise)" },
  ];

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
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-10"
          >
            [ TERMINAL 05 // INITIATE DIAGNOSTICS ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-[#f0f0f0] mb-10 max-w-4xl"
          >
            Let&apos;s discuss your system requirements.
          </motion.h2>

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
            <div className="flex flex-col md:flex-row gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`text-left px-5 py-3 border transition-all duration-300 text-[13px] tracking-wide ${
                    category === cat.id
                      ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/5"
                      : "border-[#1a1a1a] text-[#5a5a5a] hover:border-[#2a2a2a] hover:text-[#f0f0f0]"
                  }`}
                >
                  {cat.label}
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
              <div className="border-t border-[#1a1a1a] pt-8 space-y-8 max-w-xl">
                <div>
                  <label htmlFor="name" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-2">
                    Name / Company
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-transparent border-b border-[#1a1a1a] focus:border-[#c9a84c] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="stack" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-2">
                    Stack / Data Infrastructure
                  </label>
                  <input
                    id="stack"
                    type="text"
                    className="w-full bg-transparent border-b border-[#1a1a1a] focus:border-[#c9a84c] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
                    placeholder="Current tech stack"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-2">
                    Estimated Runway / Timeline
                  </label>
                  <input
                    id="timeline"
                    type="text"
                    className="w-full bg-transparent border-b border-[#1a1a1a] focus:border-[#c9a84c] text-[#f0f0f0] text-lg py-2 outline-none transition-colors duration-300"
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
            className="border-t border-[#1a1a1a] pt-8"
          >
            <a
              href="mailto:hello@signalstudio.dev"
              className="text-sm text-[#5a5a5a] hover:text-[#c9a84c] transition-colors duration-300"
            >
              hello@signalstudio.dev
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
