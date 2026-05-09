"use client";
import { motion } from "motion/react";

const supervisor = {
  name: "Prof. Rajesh Khobragade",
  role: "Project Supervisor",
  department: "Computer Science & Engineering",
  university: "Ramdeobaba University, Nagpur",
  initials: "RK",
  bio: "Prof. Khobragade supervises the DermaSense project, guiding the team on deep learning architectures, multimodal AI design, and medical AI ethics.",
};

const members = [
  {
    name: "Disha Kalbandhe",
    roll: "A-26",
    initials: "DK",
    role: "Frontend & UI",
    focus: "React, Next.js, Tailwind CSS, Motion animations, UI/UX design",
    contribution: "Designed and built the complete frontend interface including the landing page, analyze page, and all interactive components.",
  },
  {
    name: "Hariom Rathod",
    roll: "A-29",
    initials: "HR",
    role: "ML Pipeline",
    focus: "EfficientNetB3, Swin Transformer, PyTorch, model training",
    contribution: "Led the deep learning model architecture, training pipeline, and EfficientNetB3 / Swin Transformer integration.",
  },
  {
    name: "Mayank Ninawe",
    roll: "A-39",
    initials: "MN",
    role: "Lead · Full Stack",
    focus: "System architecture, FastAPI backend, cross-attention fusion, deployment",
    contribution: "Project lead. Designed the multimodal cross-attention fusion module, FastAPI backend, and full system integration.",
  },
  {
    name: "Mayank Bhaiya",
    roll: "A-40",
    initials: "MB",
    role: "Backend & API",
    focus: "FastAPI, database, API design, Grad-CAM++ implementation",
    contribution: "Built the backend API layer, Grad-CAM++ explainability module, and dataset preprocessing pipeline.",
  },
];

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const dim =
    size === "lg" ? "w-20 h-20 text-xl" :
    size === "md" ? "w-14 h-14 text-base" :
    "w-10 h-10 text-sm";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-semibold shrink-0`}
      style={{
        backgroundColor: "color-mix(in oklch, var(--color-primary) 12%, var(--color-surface))",
        color: "var(--color-primary)",
      }}
    >
      {initials}
    </div>
  );
}

export default function TeamPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-default)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-faint)" }}
          >
            The People
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              color: "var(--color-text)",
              lineHeight: 1.15,
            }}
          >
            Built by students,<br />
            <em>for everyone.</em>
          </h1>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--color-text-muted)", maxWidth: "48ch" }}
          >
            DermaSense is a final-year project from Ramdeobaba University,
            Nagpur — developed by four students under the guidance of
            Prof. Rajesh Khobragade.
          </p>
        </motion.div>

        {/* Supervisor — featured card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-8 mb-6 flex flex-col sm:flex-row gap-6"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
        >
          <Avatar initials={supervisor.initials} size="lg" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h2
                className="text-lg font-semibold"
                style={{ color: "#ffffff" }}
              >
                {supervisor.name}
              </h2>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Supervisor
              </span>
            </div>
            <p
              className="text-sm mb-1"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {supervisor.department} · {supervisor.university}
            </p>
            <p
              className="text-sm mt-3 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)", maxWidth: "56ch" }}
            >
              {supervisor.bio}
            </p>
          </div>
        </motion.div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={m.roll}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Top row */}
              <div className="flex items-start gap-4 mb-5">
                <Avatar initials={m.initials} size="md" />
                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {m.name}
                  </h3>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {m.roll} · {m.role}
                  </p>
                </div>
              </div>

              {/* Contribution */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                {m.contribution}
              </p>

              {/* Focus areas */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  Focus Areas
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {m.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* University block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            backgroundColor: "var(--color-surface-offset)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex-1">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "var(--color-text-faint)" }}
            >
              Institution
            </p>
            <p
              className="text-base font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Ramdeobaba University, Nagpur
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Formerly Shri Ramdeobaba College of Engineering &amp; Management
            </p>
          </div>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-faint)" }}
          >
            Final Year Project · 2025–26
          </p>
        </motion.div>

      </div>
    </main>
  );
}