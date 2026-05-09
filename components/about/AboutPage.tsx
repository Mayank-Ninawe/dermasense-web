"use client";
import { motion } from "motion/react";
import Link from "next/link";

const problemPoints = [
  {
    stat: "3.8%",
    label: "of AI training images show Fitzpatrick Type IV–VI skin tones",
    source: "Kinyanjui et al., 2023",
  },
  {
    stat: "1 in 1M",
    label: "dermatologist-to-patient ratio in rural India",
    source: "Ministry of Health & Family Welfare, India",
  },
  {
    stat: "68%",
    label: "average accuracy of metadata-only AI on Indian skin types",
    source: "Cassidy et al., 2024",
  },
];

const approach = [
  {
    step: "01",
    title: "Multimodal Input",
    body: "DermaSense accepts both a dermoscopic skin image and structured patient metadata — age, gender, Fitzpatrick skin tone, body location, and symptom duration.",
  },
  {
    step: "02",
    title: "Dual-Branch Architecture",
    body: "EfficientNetB3 or Swin Transformer extracts deep visual features from the image. A 3-layer MLP independently encodes the patient metadata.",
  },
  {
    step: "03",
    title: "Cross-Attention Fusion",
    body: "A cross-attention module fuses the image and metadata feature streams — letting each modality inform the other for a richer combined representation.",
  },
  {
    step: "04",
    title: "Explainable Output",
    body: "Grad-CAM++ generates a pixel-level heatmap showing exactly which region of the skin drove the prediction, making results transparent and trustworthy.",
  },
];

const datasets = [
  {
    name: "DermaCon-IN",
    detail: "5,450 images · 3,000+ South Indian patients · 240+ diagnoses · NeurIPS 2025",
  },
  {
    name: "ISIC 2020",
    detail: "33,126 images · International Skin Imaging Collaboration · Supporting dataset",
  },
];

export default function AboutPage() {
  return (
    <main
      className="min-h-screen pt-32 pb-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-default)" }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-faint)" }}
          >
            About DermaSense
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              color: "var(--color-text)",
              lineHeight: 1.15,
              maxWidth: "20ch",
            }}
          >
            Why we built this — and how it works.
          </h1>
        </motion.div>

        {/* The Problem */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--color-text-faint)" }}
          >
            The Problem
          </p>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-text-muted)", maxWidth: "60ch" }}
          >
            Most dermatology AI systems were trained on Western datasets dominated
            by lighter skin tones. When deployed on Indian patients — who represent
            over a billion people — their accuracy drops significantly. At the same
            time, access to dermatologists in rural India remains critically limited.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {problemPoints.map((p, i) => (
              <motion.div
                key={p.stat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    color: "var(--color-primary)",
                    lineHeight: 1,
                  }}
                >
                  {p.stat}
                </p>
                <p
                  className="text-sm leading-snug mb-3"
                  style={{ color: "var(--color-text)" }}
                >
                  {p.label}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {p.source}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Approach */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--color-text-faint)" }}
          >
            Our Approach
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {approach.map((a, i) => (
              <motion.div
                key={a.step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-xs font-medium mb-3"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    color: "var(--color-primary)",
                  }}
                >
                  {a.step}
                </p>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {a.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {a.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Datasets */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--color-text-faint)" }}
          >
            Training Data
          </p>
          <div className="flex flex-col gap-3">
            {datasets.map((d) => (
              <div
                key={d.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl gap-2"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {d.name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {d.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-6 rounded-2xl"
          style={{
            backgroundColor: "var(--color-accent-light, #FDECD6)",
            border: "1px solid var(--color-accent, #D4700A)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--color-accent, #D4700A)" }}
          >
            Important Notice
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-accent, #D4700A)" }}
          >
            DermaSense is a research prototype developed as a final-year academic project.
            It is intended as a screening aid only and does not constitute medical advice
            or diagnosis. Always consult a qualified dermatologist for clinical decisions.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/analyze"
            className="px-8 py-3.5 rounded-full text-sm font-medium text-center"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
            }}
          >
            Try DermaSense →
          </Link>
          <Link
            href="/team"
            className="px-8 py-3.5 rounded-full text-sm font-medium text-center"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            Meet the Team →
          </Link>
        </motion.div>

      </div>
    </main>
  );
}