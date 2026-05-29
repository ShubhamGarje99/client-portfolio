"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TechMap from "@/components/TechMap";
import Proof from "@/components/Proof";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Work />
        <Services />
        <Process />
        <TechMap />
        <Proof />
        <About />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
