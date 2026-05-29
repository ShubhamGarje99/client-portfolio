import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio — Intelligent Digital Products",
  description:
    "We design and engineer intelligent digital products for brands that refuse to look average. Strategy, design, and engineering under one roof.",
  keywords: [
    "digital agency",
    "web design",
    "AI products",
    "automation",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Studio — Intelligent Digital Products",
    description:
      "We design and engineer intelligent digital products for brands that refuse to look average.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}
