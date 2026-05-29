"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Product Strategy",
    description:
      "Map user needs, market gaps, and technical feasibility into a coherent product vision.",
  },
  {
    num: "02",
    title: "Web Design & Development",
    description:
      "Custom websites and apps with obsessive attention to typography, motion, and performance.",
  },
  {
    num: "03",
    title: "AI Agents & Automation",
    description:
      "Agent architectures, automation pipelines, and AI-native features that actually work.",
  },
  {
    num: "04",
    title: "Dashboards & Internal Tools",
    description:
      "Complex data, made simple. Operational tools that speed up decision-making.",
  },
  {
    num: "05",
    title: "Brand Systems",
    description:
      "Visual identity and design systems that scale across every touchpoint.",
  },
  {
    num: "06",
    title: "Growth Experiments",
    description:
      "Rapid prototyping and testing. Ship fast, measure carefully, iterate aggressively.",
  },
];

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group border-b border-[#1a1a1a]"
    >
      <div className="py-7 md:py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
        <div className="md:col-span-1">
          <span className="text-[11px] tracking-wider text-[#3a3a3a]">
            {service.num}
          </span>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-lg md:text-xl font-medium text-[#f0f0f0] group-hover:text-[#c9a84c] transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <div className="md:col-span-7">
          <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-lg group-hover:text-[#8a8a8a] transition-colors duration-300">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] block mb-6"
          >
            04 / Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#f0f0f0] max-w-2xl"
          >
            What we do, exceptionally well.
          </motion.h2>
        </div>

        <div className="border-t border-[#1a1a1a]">
          {services.map((service, index) => (
            <ServiceItem key={service.num} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
