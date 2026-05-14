import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DermaSense — AI Skin Disease Detection for India",
  description:
    "An explainable multimodal AI system for skin disease detection, optimized for Indian skin tones. Built at Ramdeobaba University, Nagpur.",
  keywords: [
    "skin disease detection",
    "AI dermatology",
    "Indian skin tones",
    "DermaCon-IN",
    "Grad-CAM",
    "explainable AI",
  ],
  openGraph: {
    title: "DermaSense — AI Skin Disease Detection for India",
    description:
      "Multimodal AI combining dermoscopic images with patient metadata, optimized for Indian skin tones.",
    siteName: "DermaSense",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Satoshi, 'Helvetica Neue', sans-serif" }}>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}