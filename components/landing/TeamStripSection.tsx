"use client";
import { motion } from "motion/react";
import Link from "next/link";

const members = [
  { name: "Disha Kalbandhe", roll: "A-26", role: "Frontend & UI" },
  { name: "Hariom Rathod", roll: "A-29", role: "ML Pipeline" },
  { name: "Mayank Ninawe", roll: "A-39", role: "Lead · Full Stack" },
  { name: "Mayank Bhaiya", roll: "A-40", role: "Backend & API" },
];

const supervisor = {
  name: "Prof. Rajesh Khobragade",
  role: "Project Supervisor",
};

function Avatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const initials = name
    .split(" ")
    .filter((n) => n.length > 2)
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const dim = size === "lg" ? "w-14 h-14 text-base" : "w-11 h-11 text-sm";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-medium shrink-0`}
      style={{
        backgroundColor: "var(--color-primary-highlight, #cedcd8)",
        color: "var(--color-primary)",
      }}
    >
      {initials}
    </div>
  );
}

export default function TeamStripSection() {
  return (
    <section
      className="py-24 px-6 pb-32"
      style={{ backgroundColor: "var(--color-surface-offset)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-wide)" }}>
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-faint)" }}
            >
              The Team
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
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }}
            >
              Built at Ramdeobaba University, Nagpur
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/team"
              className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-primary)" }}
            >
              Meet the full team →
            </Link>
          </motion.div>
        </div>

        {/* Supervisor card — featured */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 p-6 rounded-2xl mb-6"
          style={{
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
          }}
        >
          <Avatar name={supervisor.name} size="lg" />
          <div>
            <p
              className="font-semibold text-base"
              style={{ color: "var(--color-text)" }}
            >
              {supervisor.name}
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {supervisor.role} · Ramdeobaba University
            </p>
          </div>
          <div
            className="ml-auto text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-surface-offset)",
              color: "var(--color-text-faint)",
            }}
          >
            Supervisor
          </div>
        </motion.div>

        {/* Team member cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <motion.div
              key={member.roll}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Avatar name={member.name} />
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {member.roll} · {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}