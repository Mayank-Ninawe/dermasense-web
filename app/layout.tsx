import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Satoshi is from Fontshare — loaded via CSS, not next/font
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DermaSense — AI Skin Disease Detection for India",
  description: "Explainable multimodal AI for skin disease detection, optimized for Indian skin tones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Satoshi from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
        <Navbar />
        <main className="overflow-x-hidden min-h-screen">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
