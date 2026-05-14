import HeroSection from "@/components/landing/HeroSection";
import MarqueeStrip from "@/components/landing/MarqueeStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import PipelineSection from "@/components/landing/PipelineSection";
import ResultPreviewSection from "@/components/landing/ResultPreviewSection";
import BiasCorrectionSection from "@/components/landing/BiasCorrectionSection";
import DatasetSection from "@/components/landing/DatasetSection";
import TeamStripSection from "@/components/landing/TeamStripSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ProblemSection />
      <PipelineSection />
      <ResultPreviewSection />
      <BiasCorrectionSection />
      <DatasetSection />
      <TeamStripSection />
    </>
  );
}