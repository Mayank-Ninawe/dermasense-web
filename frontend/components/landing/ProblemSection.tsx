"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  {
    number: "3.8%",
    label: "of dermatology AI training images feature Fitzpatrick Type IV–VI skin tones",
    source: "Kinyanjui et al., 2023",
  },
  {
    number: "1 in 1M",
    label: "dermatologist availability ratio in rural India",
    source: "Ministry of Health & Family Welfare, India",
  },
  {
    number: "68%",
    label: "average accuracy of metadata-only AI systems on Indian skin types",
    source: "Cassidy et al., 2024",
  },
];

function CountUpStat({ number, label, source, index }: {
  number: string;
  label: string;
  source: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col md:flex-row md:items-center gap-4 py-8 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Number */}
      <div
        className="shrink-0 w-full md:w-48"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          color: "var(--color-primary)",
          lineHeight: 1,
        }}
      >
        {number}
      </div>

      {/* Label + Source */}
      <div className="flex-1">
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--color-text)" }}
        >
          {label}
        </p>
        <p
          className="text-xs mt-1 uppercase tracking-widest"
          style={{ color: "var(--color-text-faint)" }}
        >
          {source}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "0px" });

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: "var(--color-surface-offset)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--content-default)" }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--color-text-faint)" }}
        >
          The Problem
        </motion.p>

        {/* Editorial statement */}
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={
            headingInView
              ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
              : {}
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            color: "var(--color-text)",
            maxWidth: "22ch",
            lineHeight: 1.2,
          }}
        >
          Most dermatology AI was never trained on skin that looks like yours.
        </motion.h2>

        {/* Stat strips */}
        <div>
          {/* Top border */}
          <div
            className="border-t"
            style={{ borderColor: "var(--color-border)" }}
          />
          {stats.map((s, i) => (
            <CountUpStat
              key={i}
              number={s.number}
              label={s.label}
              source={s.source}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}