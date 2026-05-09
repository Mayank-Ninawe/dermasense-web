"use client";
import { motion } from "motion/react";

const datasets = [
  {
    tag: "Primary Dataset",
    name: "DermaCon-IN",
    description:
      "A multi-concept annotated dermatological image dataset collected from South Indian patients — covering the full Fitzpatrick spectrum. Published at NeurIPS 2025.",
    stats: [
      { value: "5,450", label: "Images" },
      { value: "3,000+", label: "Patients" },
      { value: "240+", label: "Diagnoses" },
    ],
    accent: true,
    source: "Hasan et al., NeurIPS 2025",
  },
  {
    tag: "Supporting Dataset",
    name: "ISIC 2020",
    description:
      "The International Skin Imaging Collaboration 2020 challenge dataset. Used to supplement training with additional dermoscopic lesion coverage.",
    stats: [
      { value: "33,126", label: "Images" },
      { value: "2,056", label: "Patients" },
      { value: "9", label: "Classes" },
    ],
    accent: false,
    source: "ISIC Archive, 2020",
  },
];

export default function DatasetSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-wide)" }}>
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-text-faint)" }}
          >
            Training Data
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--color-text)",
              lineHeight: 1.2,
              maxWidth: "24ch",
            }}
          >
            Built on datasets that represent Indian patients
          </motion.h2>
        </div>

        {/* Dataset cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {datasets.map((ds, i) => (
            <motion.div
              key={ds.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: ds.accent
                  ? "var(--color-primary)"
                  : "var(--color-surface-offset)",
                border: ds.accent
                  ? "none"
                  : "1px solid var(--color-border)",
              }}
            >
              {/* Tag */}
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{
                  color: ds.accent
                    ? "rgba(255,255,255,0.6)"
                    : "var(--color-text-faint)",
                }}
              >
                {ds.tag}
              </p>

              {/* Name */}
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  color: ds.accent ? "#ffffff" : "var(--color-text)",
                  lineHeight: 1.2,
                }}
              >
                {ds.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-8"
                style={{
                  color: ds.accent
                    ? "rgba(255,255,255,0.75)"
                    : "var(--color-text-muted)",
                  maxWidth: "44ch",
                }}
              >
                {ds.description}
              </p>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4 pt-6 border-t"
                style={{
                  borderColor: ds.accent
                    ? "rgba(255,255,255,0.2)"
                    : "var(--color-border)",
                }}
              >
                {ds.stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-xl font-semibold mb-0.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: ds.accent ? "#ffffff" : "var(--color-text)",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{
                        color: ds.accent
                          ? "rgba(255,255,255,0.55)"
                          : "var(--color-text-faint)",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Source */}
              <p
                className="text-xs mt-5"
                style={{
                  color: ds.accent
                    ? "rgba(255,255,255,0.4)"
                    : "var(--color-text-faint)",
                }}
              >
                {ds.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}