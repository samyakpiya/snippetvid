import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(115,32,221,0.2),transparent)]" />
      </div>
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to Transform Your Video Communication?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Join freelancers, agencies and businesses who are recording and
            sharing personalized AI-enhanced videos instantly with SnippetVid.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-[#7320DD] hover:bg-[#7320DD]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8"
            >
              <Link href="/auth/sign-up">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white transition-all duration-300 text-lg px-8"
            >
              <Link href="/demo">See It In Action</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
