"use client";
import { useState } from "react";
import AnalyzeForm from "../../components/analyze/AnalyzeForm";
import AnalyzeResult from "../../components/analyze/AnalyzeResult";
import type { FormData } from "@/components/analyze/types";
import type { PredictResult } from "@/lib/api";
import { predictDisease } from "@/lib/api";

export default function AnalyzePage() {
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [result, setResult] = useState<PredictResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: FormData, imageDataUrl: string) {
    setFormData(data);
    setError(null);
    setPhase("loading");

    try {
      const prediction = await predictDisease(data, imageDataUrl);
      setResult(prediction);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inference failed.");
      setPhase("form");
    }
  }

  function handleReset() {
    setFormData(null);
    setResult(null);
    setError(null);
    setPhase("form");
  }

  return (
    <main
      className="min-h-screen pt-28 pb-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-default)" }}>
        {phase === "form" && (
          <>
            {error && (
              <div
                className="mb-6 px-4 py-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "var(--color-error-highlight)",
                  color: "var(--color-error)",
                  border: "1px solid var(--color-error)",
                }}
              >
                ⚠ {error}
              </div>
            )}
            <AnalyzeForm onSubmit={handleSubmit} />
          </>
        )}
        {phase === "loading" && <LoadingState />}
        {phase === "result" && formData && result && (
          <AnalyzeResult
            formData={formData}
            result={result}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full border-2 animate-ping"
          style={{ borderColor: "var(--color-primary)", opacity: 0.3 }}
        />
        <div
          className="absolute inset-2 rounded-full border-2 animate-pulse"
          style={{ borderColor: "var(--color-primary)", opacity: 0.5 }}
        />
        <div
          className="absolute inset-6 rounded-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
      </div>
      <div className="text-center">
        <p className="text-base font-medium mb-1" style={{ color: "var(--color-text)" }}>
          Analyzing...
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Running multimodal inference
        </p>
      </div>
      <div
        className="w-full max-w-lg rounded-2xl p-6 mt-4"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full mb-3 animate-pulse"
            style={{
              width: `${w}%`,
              backgroundColor: "var(--color-surface-offset)",
            }}
          />
        ))}
      </div>
    </div>
  );
}