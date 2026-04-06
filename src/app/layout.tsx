import type { Metadata } from "next";
import { Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "skeleton photographs — a working draft of seeing",
  description:
    "Blueprint photography portfolio — arranged by proximity of feeling, not by date. A working draft of seeing.",
  openGraph: {
    title: "skeleton photographs — a working draft of seeing",
    description:
      "Blueprint photography portfolio — arranged by proximity of feeling, not by date.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
