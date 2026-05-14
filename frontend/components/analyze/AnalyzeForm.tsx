"use client";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, X } from "lucide-react";
import type { FormData } from "@/components/analyze/types";

const skinTones = [
  { value: "I-II", label: "Type I–II", sub: "Very Light / Light", color: "#F4C89A" },
  { value: "III", label: "Type III", sub: "Medium", color: "#C8855A" },
  { value: "IV", label: "Type IV", sub: "Olive / Tan", color: "#A0522D" },
  { value: "V-VI", label: "Type V–VI", sub: "Brown / Dark", color: "#5C2E0E" },
];

const bodyLocations = [
  "Face", "Scalp", "Neck", "Chest", "Back",
  "Arm", "Hand", "Leg", "Foot", "Other",
];

const durations = [
  "Less than 1 week",
  "1–4 weeks",
  "1–3 months",
  "3–6 months",
  "More than 6 months",
];

const symptomOptions = [
  "Itching", "Pain", "Bleeding", "Color change",
  "Size increase", "Scaling", "Discharge", "None",
];

export default function AnalyzeForm({ onSubmit }: { onSubmit: (data: FormData, imageDataUrl: string) => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [bodyLocation, setBodyLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function toggleSymptom(s: string) {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  const canSubmit = image && gender && skinTone && bodyLocation && duration;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-faint)" }}
        >
          Skin Analysis
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            color: "var(--color-text)",
            lineHeight: 1.15,
          }}
        >
          Upload & Analyze
        </h1>
        <p
          className="mt-3 text-base"
          style={{ color: "var(--color-text-muted)", maxWidth: "52ch" }}
        >
          Upload a clear skin image and provide patient context for the most
          accurate multimodal prediction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left — Image upload */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-faint)" }}
          >
            Skin Image
          </p>

          {!image ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
              style={{
                borderColor: dragOver
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                backgroundColor: dragOver
                  ? "var(--color-primary-highlight, #cedcd8)"
                  : "var(--color-surface)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-surface-offset)" }}
              >
                <Upload size={20} style={{ color: "var(--color-primary)" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                  Drop image here
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-faint)" }}>
                  or click to browse · JPG, PNG, WEBP
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <img
                src={image}
                alt="Uploaded skin"
                className="w-full h-full object-cover"
              />
              <button
                suppressHydrationWarning
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                aria-label="Remove image"
              >
                <X size={14} color="white" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {/* Right — Metadata form */}
        <div className="flex flex-col gap-7">
          {/* Age slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--color-text-faint)" }}
              >
                Age
              </label>
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  color: "var(--color-primary)",
                }}
              >
                {age} yrs
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={90}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-faint)" }}>1</span>
              <span className="text-xs" style={{ color: "var(--color-text-faint)" }}>90</span>
            </div>
          </div>

          {/* Gender */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              Gender
            </p>
            <div className="flex gap-3">
              {["Male", "Female"].map((g) => (
                <button
                  suppressHydrationWarning
                  key={g}
                  onClick={() => setGender(g)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor:
                      gender === g
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                    color: gender === g ? "#ffffff" : "var(--color-text-muted)",
                    border: `1px solid ${gender === g ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Tone */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              Skin Tone (Fitzpatrick)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {skinTones.map((t) => (
                <button
                  suppressHydrationWarning
                  key={t.value}
                  onClick={() => setSkinTone(t.value)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    backgroundColor:
                      skinTone === t.value
                        ? "var(--color-surface-offset)"
                        : "var(--color-surface)",
                    border: `1px solid ${skinTone === t.value ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--color-text)" }}>
                      {t.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
                      {t.sub}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Body Location */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              Body Location
            </p>
            <div className="flex flex-wrap gap-2">
              {bodyLocations.map((loc) => (
                <button
                  suppressHydrationWarning
                  key={loc}
                  onClick={() => setBodyLocation(loc)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor:
                      bodyLocation === loc
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                    color:
                      bodyLocation === loc ? "#ffffff" : "var(--color-text-muted)",
                    border: `1px solid ${bodyLocation === loc ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              Symptom Duration
            </p>
            <div className="flex flex-col gap-2">
              {durations.map((d) => (
                <button
                  suppressHydrationWarning
                  key={d}
                  onClick={() => setDuration(d)}
                  className="px-4 py-2.5 rounded-xl text-sm text-left transition-colors"
                  style={{
                    backgroundColor:
                      duration === d
                        ? "var(--color-surface-offset)"
                        : "var(--color-surface)",
                    color:
                      duration === d ? "var(--color-text)" : "var(--color-text-muted)",
                    border: `1px solid ${duration === d ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-faint)" }}
            >
              Symptoms (select all that apply)
            </p>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((s) => (
                <button
                  suppressHydrationWarning
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className="px-3 py-1.5 rounded-full text-xs transition-colors"
                  style={{
                    backgroundColor: symptoms.includes(s)
                      ? "var(--color-primary)"
                      : "var(--color-surface)",
                    color: symptoms.includes(s) ? "#ffffff" : "var(--color-text-muted)",
                    border: `1px solid ${symptoms.includes(s) ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {image && !canSubmit && (
        <div
          className="text-xs px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--color-warning-highlight)",
            color: "var(--color-warning)",
            border: "1px solid var(--color-warning)",
          }}
        >
          Still needed:{" "}
          {[
            !gender && "Gender",
            !skinTone && "Skin Tone",
            !bodyLocation && "Body Location",
            !duration && "Duration",
          ]
            .filter(Boolean)
            .join(", ")}
        </div>
      )}

      {/* Submit */}
      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          suppressHydrationWarning
          onClick={() => canSubmit && image && onSubmit({ age, gender, skinTone, bodyLocation, duration, symptoms }, image)}
          disabled={!canSubmit}
          className="px-8 py-3.5 rounded-full text-sm font-medium transition-opacity"
          style={{
            backgroundColor: canSubmit ? "var(--color-primary)" : "var(--color-surface-offset)",
            color: canSubmit ? "#ffffff" : "var(--color-text-faint)",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          Run Analysis →
        </button>
        <p
          className="text-xs"
          style={{ color: "var(--color-text-faint)" }}
        >
          ⚠ AI screening aid only. Not a medical diagnosis.
        </p>
      </div>
    </motion.div>
  );
}