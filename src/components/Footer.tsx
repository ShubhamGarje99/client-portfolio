"use client";

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span className="text-[11px] tracking-wider text-[#2a2a2a]">
          Signal Studio
        </span>
        <span className="text-[11px] tracking-wider text-[#2a2a2a]">
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
