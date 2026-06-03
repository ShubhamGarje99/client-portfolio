"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "95",
    suffix: "%+",
    label: "Lighthouse Score",
    note: "Every frontend we deliver is audited for maximum loading speeds and search engine readability before release.",
  },
  {
    value: "38",
    prefix: "-",
    suffix: "%",
    label: "Latency Reduction",
    note: "Replaced legacy software stacks with high-density, real-time dashboards that keep dispatch pipelines responsive under heavy user loads.",
  },
  {
    value: "0.00",
    suffix: "",
    label: "Layout Shift",
    note: "We write vanilla code, target hardware-level rendering limits, and avoid heavy frameworks to keep codebases simple and clean.",
  },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  isActive,
}: {
  value: string;
  prefix?: string;
  suffix?: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive || !ref.current || reducedMotion) return;

    const numericValue = parseFloat(value);
    const isFloat = value.includes(".");
    const obj = { val: 0 };

    gsap.to(obj, {
      val: numericValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          const formatted = isFloat
            ? obj.val.toFixed(2)
            : Math.round(obj.val).toString();
          ref.current.textContent = prefix + formatted + suffix;
        }
      },
    });
  }, [isActive, value, prefix, suffix, reducedMotion]);

  return (
    <span ref={ref}>
      {reducedMotion ? prefix + value + suffix : prefix + (value === "0.00" ? "0.00" : "0") + suffix}
    </span>
  );
}

export default function PeerValidation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const effectivelyActive = isActive || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => setIsActive(true),
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative pt-16 pb-28 md:pt-24 md:pb-40 px-6 md:px-12 lg:px-12 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-16">
          [ DATA 01 // CORE METRICS ]
        </span>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="group border-t border-[#1a1a1a] pt-8"
              style={{
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="mb-6">
                <span className="text-[clamp(3rem,6vw,6rem)] font-mono font-light text-[#f0f0f0] tracking-tight leading-none">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    isActive={effectivelyActive}
                  />
                </span>
              </div>
              <h3 className="text-sm font-medium text-[#f0f0f0] tracking-wide mb-4">
                {metric.label}
              </h3>
              <p className="font-serif italic text-lg md:text-xl text-[#5a5a5a] leading-relaxed">
                {metric.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
