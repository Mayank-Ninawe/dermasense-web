"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Upload & Input",
    description:
      "Patient uploads a skin image and fills in metadata — age, gender, skin tone (Fitzpatrick I–VI), body location, and symptom duration.",
  },
  {
    number: "02",
    title: "Visual Feature Extraction",
    description:
      "EfficientNetB3 or Swin Transformer processes the dermoscopic image and extracts deep visual feature representations.",
  },
  {
    number: "03",
    title: "Metadata Encoding",
    description:
      "A 3-layer MLP encodes patient metadata into a compact feature vector that captures clinical context.",
  },
  {
    number: "04",
    title: "Cross-Attention Fusion",
    description:
      "Image features and metadata features are fused using a cross-attention module — letting each modality inform the other.",
  },
  {
    number: "05",
    title: "Explainable Output",
    description:
      "The system predicts disease class, severity level, and referral urgency. Grad-CAM++ generates a heatmap showing exactly what drove the prediction.",
  },
];

function PipelineStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Left — number + connector line */}
      <div className="flex flex-col items-center shrink-0">
        {/* Step number circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10"
          style={{
            backgroundColor: inView
              ? "var(--color-primary)"
              : "var(--color-surface-offset)",
            border: "2px solid var(--color-primary)",
          }}
        >
          <span
            className="text-xs font-medium"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ffffff",
            }}
          >
            {step.number}
          </span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="w-px flex-1 mt-2"
            style={{
              backgroundColor: "var(--color-primary)",
              opacity: 0.25,
              transformOrigin: "top",
              minHeight: "48px",
            }}
          />
        )}
      </div>

      {/* Right — content */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        className="pb-12"
      >
        <p
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: "var(--color-text-faint)" }}
        >
          Step {step.number}
        </p>
        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-lg)",
            color: "var(--color-text)",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "52ch",
          }}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function PipelineSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--content-default)" }}
      >
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-faint)" }}
            >
              How It Works
            </motion.p>
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={
                headingInView
                  ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                  : {}
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "var(--color-text)",
                lineHeight: 1.2,
              }}
            >
              Five steps from image to explainable diagnosis
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base"
            style={{
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
            }}
          >
            DermaSense combines image intelligence with patient context — two
            streams of information fused into one trustworthy prediction.
          </motion.p>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <PipelineStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}