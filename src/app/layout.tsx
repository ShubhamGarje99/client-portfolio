import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Signal Studio — Creative Engineering",
  description:
    "An independent engineering studio constructing high-fidelity web frontends, interactive design systems, and stable database architectures. No compromise on performance, typography, or code quality.",
  keywords: [
    "creative engineering",
    "web frontend",
    "design systems",
    "Next.js",
    "React",
    "TypeScript",
    "Three.js",
  ],
  openGraph: {
    title: "Signal Studio — Creative Engineering",
    description:
      "An independent engineering studio constructing high-fidelity web frontends, interactive design systems, and stable database architectures.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-silver-dust font-sans">
        {children}
      </body>
    </html>
  );
}
