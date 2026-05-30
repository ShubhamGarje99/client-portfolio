"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    num: "I",
    title: "Architectural Diagnostics & Scope",
    description:
      "We start by auditing your existing codebases, performance bottlenecks, and systems architecture. We deliver a clear, highly technical blueprint outlining exactly how the software will be structured, avoiding surprises down the line.",
  },
  {
    num: "II",
    title: "High-Fidelity Schematics & Token Design",
    description:
      "We translate conceptual directions into high-fidelity layout schematics and interactive design tokens. We build a comprehensive visual design system before writing production code.",
  },
  {
    num: "III",
    title: "Core Engineering & Database Assembly",
    description:
      "We write type-safe APIs, structure clean database schemas, and assemble frontend components with absolute precision. We avoid heavy external dependencies, opting to write clean, vanilla code.",
  },
  {
    num: "IV",
    title: "Performance Calibration & Launch",
    description:
      "Before shipping, we put the software through extensive stress testing. We profile database queries, optimize Webpack configurations, and tune visual interactions to guarantee a stable sixty frames per second.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: "none",
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6">
            [ PROCESS 03 // ARCHITECTURAL ROUTE ]
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl">
            How we build.
          </h2>
        </div>

        <div className="relative space-y-16 md:space-y-24">
          {/* SVG connecting line aligned with dots */}
          <div className="absolute left-[11px] md:left-[11px] top-2 bottom-0 w-px hidden lg:block">
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                ref={pathRef}
                d="M1 0 L1 100"
                stroke="#1a1a1a"
                strokeWidth="1"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {stages.map((stage, i) => (
            <div
              key={stage.num}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="grid md:grid-cols-12 gap-6 md:gap-8 items-start group"
            >
              <div className="md:col-span-3 flex items-start gap-4">
                <div className="relative z-10">
                  <div className="w-3 h-3 rounded-full bg-[#3a3a3a] group-hover:bg-[#14c7c0] transition-colors duration-500 mt-2" />
                </div>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-1">
                    Stage {stage.num}
                  </span>
                  <h3 className="text-lg md:text-xl font-medium text-[#f0f0f0] group-hover:text-[#c9a84c] transition-colors duration-300">
                    {stage.title}
                  </h3>
                </div>
              </div>
              <div className="md:col-span-9 md:pl-12">
                <p className="text-sm md:text-base text-[#5a5a5a] leading-relaxed max-w-2xl">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
