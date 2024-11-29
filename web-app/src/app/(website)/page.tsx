import VoiceFlowAgent from "@/components/global/voiceflow";
import CTASection from "./_components/_sections/cta-section";
import FeaturesSection from "./_components/_sections/features-section";
import HeroSection from "./_components/_sections/hero-section";
import PricingSection from "./_components/_sections/pricing-section";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Enhanced background with subtle gradient and animation */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-white/20 dark:from-gray-900/50 dark:to-black/20" />
        <div className="absolute inset-0 w-full h-full animate-twinkle bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-20">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </div>

      {/* Voiceflow Agent */}
      <VoiceFlowAgent />
    </main>
  );
}
