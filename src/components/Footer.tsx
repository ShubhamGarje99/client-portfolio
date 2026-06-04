"use client";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium tracking-[0.15em] uppercase text-[#f0f0f0]">
            signaldev
          </span>
          <span className="font-mono text-[11px] tracking-wider text-[#2a2a2a]">
            Creative Engineering
          </span>
        </div>
        <div className="flex gap-8">
          <a
            href="#services"
            className="font-mono text-[11px] tracking-wider text-[#3a3a3a] hover:text-[#f0f0f0] transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-wider text-[#3a3a3a] hover:text-[#f0f0f0] transition-colors duration-300"
          >
            Contact
          </a>
        </div>
        <span className="font-mono text-[11px] tracking-wider text-[#2a2a2a]">
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
