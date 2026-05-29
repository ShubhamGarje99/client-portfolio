"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "AI Lead Intelligence",
    category: "SaaS / AI",
    year: "2025",
    result: "3x conversion improvement",
    description: "An AI-native platform that qualifies, scores, and routes leads in real time.",
    index: "001",
  },
  {
    id: 2,
    title: "Maison Digital Flagship",
    category: "Web / E-commerce",
    year: "2024",
    result: "Award-winning craft",
    description: "A cinematic digital flagship for a premium fashion house.",
    index: "002",
  },
  {
    id: 3,
    title: "Logistics Command",
    category: "Dashboard / Tool",
    year: "2024",
    result: "40% faster operations",
    description: "Real-time supply chain visibility with predictive analytics.",
    index: "003",
  },
  {
    id: 4,
    title: "Agent Orchestrator",
    category: "Automation / AI",
    year: "2025",
    result: "200+ hours saved weekly",
    description: "A unified control room for orchestrating AI agents and workflows.",
    index: "004",
  },
];

function ProjectCard({
  project,
  i,
}: {
  project: (typeof projects)[0];
  i: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      ref={ref}
      href="#"
      data-cursor="pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group block border-t border-[#1a1a1a] pt-8 pb-8 md:pt-10 md:pb-10"
    >
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Index */}
        <div className="md:col-span-1">
          <span className="text-[11px] tracking-wider text-[#3a3a3a]">
            {project.index}
          </span>
        </div>

        {/* Title & Meta */}
        <div className="md:col-span-5">
          <h3 className="text-xl md:text-2xl font-medium text-[#f0f0f0] group-hover:text-[#c9a84c] transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase text-[#3a3a3a]">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#2a2a2a]" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-4">
          <p className="text-sm text-[#5a5a5a] leading-relaxed group-hover:text-[#8a8a8a] transition-colors duration-300">
            {project.description}
          </p>
        </div>

        {/* Result */}
        <div className="md:col-span-2 text-right">
          <span className="text-[11px] tracking-wider text-[#5a5a5a] group-hover:text-[#c9a84c] transition-colors duration-300">
            {project.result}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6"
          >
            03 / Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl"
          >
            Projects that speak for themselves.
          </motion.h2>
        </div>

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
          <div className="border-t border-[#1a1a1a]" />
        </div>
      </div>
    </section>
  );
}
