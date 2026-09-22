import type { Metadata } from "next";
import { Poppins, Barlow, IBM_Plex_Mono } from "next/font/google";
import Reveal from "@/components/Reveal";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skyflix Media — Perfection in Profession",
  description:
    "Photography, videography, livestreaming and broadcast production for events, faith-based organisations and development partners across Nigeria.",
  openGraph: {
    title: "Skyflix Media — Perfection in Profession",
    description:
      "Photography, videography, livestreaming and broadcast production across Nigeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${barlow.variable} ${plexMono.variable}`}
    >
      <body className="bg-ink-deep font-display text-white">
        <Reveal />
        {children}
      </body>
    </html>
  );
}
