"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const skinTones = [
  { label: "Type I–II", subLabel: "Very Light / Light", bar: 78, color: "#F4C89A" },
  { label: "Type III", subLabel: "Medium", bar: 14, color: "#C8855A" },
  { label: "Type IV", subLabel: "Olive / Tan", bar: 6, color: "#A0522D" },
  { label: "Type V–VI", subLabel: "Brown / Dark", bar: 2, color: "#5C2E0E" },
];

const improvements = [
  { label: "Indian Skin Tone Accuracy", before: 61, after: 89 },
  { label: "Fitzpatrick V–VI Detection", before: 48, after: 84 },
  { label: "Overall Multimodal F1 Score", before: 72, after: 93 },
];

function BiasBar({
  tone,
  index,
}: {
  tone: (typeof skinTones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <div ref={ref} className="flex items-center gap-4">
      {/* Swatch */}
      <div
        className="w-4 h-4 rounded-full shrink-0"
        style={{ backgroundColor: tone.color }}
      />
      {/* Label */}
      <div className="w-28 shrink-0">
        <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          {tone.label}
        </p>
        <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
          {tone.subLabel}
        </p>
      </div>
      {/* Bar */}
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-offset)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: tone.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${tone.bar}%` } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
      {/* Percentage */}
      <span
        className="text-sm w-10 text-right shrink-0"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          color: "var(--color-text-muted)",
        }}
      >
        {tone.bar}%
      </span>
    </div>
  );
}

function ImprovementRow({
  item,
  index,
}: {
  item: (typeof improvements)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-5 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm" style={{ color: "var(--color-text)" }}>
          {item.label}
        </span>
        <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          <span style={{ color: "var(--color-text-faint)" }}>{item.before}%</span>
          <span style={{ color: "var(--color-text-faint)" }}>→</span>
          <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>{item.after}%</span>
        </div>
      </div>
      {/* Before bar */}
      <div className="flex flex-col gap-1.5">
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-offset)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-text-faint)" }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${item.before}%` } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        {/* After bar */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-offset)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${item.after}%` } : {}}
            transition={{ duration: 0.9, delay: index * 0.1 + 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function BiasCorrectionSection() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "0px" });

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: "var(--color-surface-offset)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--color-accent, #D4700A)" }}
            >
              Indian Skin Tone Bias Correction
            </motion.p>
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "var(--color-text)",
                lineHeight: 1.2,
              }}
            >
              The dataset problem — and how we fixed it
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Standard dermatology datasets are overwhelmingly skewed toward
            lighter skin tones. DermaSense addresses this directly with
            DermaCon-IN — a dataset built from South Indian patients across
            the full Fitzpatrick spectrum.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — existing dataset bias chart */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: "var(--color-text-faint)" }}
            >
              Skin tone distribution in standard datasets
            </p>
            <div className="flex flex-col gap-5">
              {skinTones.map((tone, i) => (
                <BiasBar key={tone.label} tone={tone} index={i} />
              ))}
            </div>
            <p
              className="mt-4 text-xs"
              style={{ color: "var(--color-text-faint)" }}
            >
              Source: Kinyanjui et al., 2023 — ISIC dataset composition analysis
            </p>
          </div>

          {/* Right — DermaSense improvement */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              DermaSense improvement on Indian skin
            </p>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-text-faint)" }} />
                <span className="text-xs" style={{ color: "var(--color-text-faint)" }}>Image-only baseline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>DermaSense multimodal</span>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: "var(--color-border)" }} />
            {improvements.map((item, i) => (
              <ImprovementRow key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}