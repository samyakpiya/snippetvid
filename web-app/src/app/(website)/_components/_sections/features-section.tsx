import { Card } from "@/components/ui/card";
import { Video, Zap, Bot, Bell, Globe, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group relative h-[280px] p-8 transition-all duration-300 bg-black/20 backdrop-blur-lg border border-white/10 hover:border-[#7320DD]/50 hover:shadow-[0_0_30px_-5px_#7320DD]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(115,32,221,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="p-3 bg-[#7320DD] rounded-xl w-fit text-white mb-6 shadow-[0_0_15px_rgba(115,32,221,0.5)]">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-[6rem]">
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Video size={24} />}
            title="Instant Video Recording"
            description="Record high-quality videos directly from your desktop with our native app, no complex setup required."
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Real-Time Streaming"
            description="Stream your recorded videos instantly to your audience with low-latency playback powered by AWS CloudFront."
          />
          <FeatureCard
            icon={<Bot size={24} />}
            title="AI-Powered Content"
            description="Generate engaging titles, descriptions, and summaries automatically using advanced OpenAI technology."
          />
          <FeatureCard
            icon={<Bell size={24} />}
            title="Real-Time Notifications"
            description="Stay informed with instant notifications when your videos are watched or engaged with."
          />
          <FeatureCard
            icon={<Globe size={24} />}
            title="Cross-Platform Access"
            description="Access your content seamlessly across web and desktop apps for maximum flexibility."
          />
          <FeatureCard
            icon={<Sparkles size={24} />}
            title="Smart Transcription"
            description="Get accurate video transcripts automatically with Whisper AI for enhanced accessibility."
          />
        </div>
      </div>
    </section>
  );
}
