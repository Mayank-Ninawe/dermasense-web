"use client";
import { motion } from "motion/react";

const items = [
  "DermaCon-IN",
  "5,450 Images",
  "3,000+ Patients",
  "240+ Diagnoses",
  "EfficientNetB3",
  "Swin Transformer",
  "Cross-Attention Fusion",
  "Grad-CAM++",
  "ISIC 2020",
  "NeurIPS 2025",
  "Indian Skin Tones",
  "Explainable AI",
];

export default function MarqueeStrip() {
  return (
    <div
      className="w-full overflow-hidden py-4 border-y"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {/* Fade masks on left and right */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #FDFCF9, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #FDFCF9, transparent)",
          }}
        />

        {/* Track — duplicate items for seamless loop */}
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Render twice for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center shrink-0">
              {items.map((item, i) => (
                <div key={`${setIndex}-${i}`} className="flex items-center">
                  <span
                    className="text-xs uppercase tracking-widest px-5"
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    {item}
                  </span>
                  {/* Separator dot */}
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-primary)", opacity: 0.4 }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}