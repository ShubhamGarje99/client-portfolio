"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: "2-6", unit: "weeks", label: "Typical delivery" },
  { value: "100", unit: "%", label: "Custom code" },
  { value: "0", unit: "", label: "Templates used" },
];

export default function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proof" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
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
            [ EVIDENCE // OPERATIONAL METRICS ]
          </motion.span>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-[#1a1a1a] pt-10">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl md:text-5xl font-medium text-[#f0f0f0] tracking-tight">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-lg text-[#5a5a5a]">{metric.unit}</span>
                  )}
                </div>
                <p className="text-[13px] text-[#5a5a5a] tracking-wide">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 text-sm text-[#3a3a3a] max-w-md leading-relaxed"
          >
            AI-native workflows. Production-grade architecture. Performance
            optimized for Core Web Vitals. We build systems that handle real
            traffic and real data.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
