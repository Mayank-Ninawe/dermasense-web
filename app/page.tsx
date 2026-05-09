import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import PipelineSection from "@/components/landing/PipelineSection";
import ResultPreviewSection from "@/components/landing/ResultPreviewSection";
import BiasCorrectionSection from "@/components/landing/BiasCorrectionSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PipelineSection />
      <ResultPreviewSection />
      <BiasCorrectionSection />
    </>
  );
}