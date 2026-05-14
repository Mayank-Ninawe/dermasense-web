"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="flex items-center pt-20 pb-8 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* Left — Text block */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-text-faint)" }}
          >
            AI Dermatology Screening
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-6 leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              color: "var(--color-text)",
            }}
          >
            Skin Disease{" "}
            <br />
            Detection{" "}
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>
              Built for India
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base mb-8"
            style={{
              color: "var(--color-text-muted)",
              maxWidth: "52ch",
              lineHeight: "1.7",
            }}
          >
            Upload a skin image. Add patient context. Get an explainable
            AI-powered analysis — optimized for Indian skin tones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/analyze"
              className="inline-block text-sm font-medium px-7 py-3.5 rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
              }}
            >
              Start Analysis →
            </Link>

            <p
              className="mt-5 text-xs tracking-wide"
              style={{ color: "var(--color-text-faint)" }}
            >
              Trained on DermaCon-IN · NeurIPS 2025 · Ramdeobaba University · ISIC 2020
            </p>
          </motion.div>
        </div>

        {/* Right — Visual placeholder (3D scene comes in Stage 8) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: "var(--color-primary)", opacity: 0.15 }}
            />
            {/* Middle ring — slow pulse */}
            <motion.div
              className="absolute inset-6 rounded-full border"
              style={{ borderColor: "var(--color-primary)", opacity: 0.25 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner filled circle */}
            <div
              className="absolute inset-16 rounded-full"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.12 }}
            />
            {/* Center dot */}
            <div
              className="absolute inset-[46%] rounded-full"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.6 }}
            />
            {/* Cross lines — dermoscope look */}
            <div
              className="absolute top-1/2 left-8 right-8 h-px -translate-y-1/2"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.12 }}
            />
            <div
              className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.12 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}