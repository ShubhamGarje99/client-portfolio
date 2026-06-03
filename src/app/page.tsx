"use client";

import ScrollProvider from "@/components/ScrollProvider";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import Hero from "@/components/Hero";
import PeerValidation from "@/components/PeerValidation";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TechMap from "@/components/TechMap";
import Proof from "@/components/Proof";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ScrollProvider>
      <CustomCursor />
      <NoiseOverlay />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <PeerValidation />
        <Services />
        <Process />
        <TechMap />
        <Proof />
        <About />
        <CTA />
      </main>

      <Footer />
    </ScrollProvider>
  );
}
