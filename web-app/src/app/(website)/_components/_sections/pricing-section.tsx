import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="max-w-5xl w-full mx-auto px-4 scroll-mt-[6rem]"
    >
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-white">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your needs. No hidden fees or surprises.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        <Card className="flex-1 border border-gray-800 bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Free Trial</CardTitle>
            <CardDescription className="text-gray-400">
              Perfect for getting started
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
              Start Free Trial
            </Button>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-x-3">
                <span className="bg-gray-800 p-1 rounded-full">📹</span>
                <span>25 videos per month</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-gray-800 p-1 rounded-full">⏱️</span>
                <span>5 min per video</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-gray-800 p-1 rounded-full">🏢</span>
                <span>1 Organization</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-gray-800 p-1 rounded-full">👤</span>
                <span>No team members</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-gray-800 p-1 rounded-full">🔍</span>
                <span>1-time AI features test</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 border-2 border-purple-500 bg-[radial-gradient(100%_100%_at_50%_0%,#7320DD_0%,#111111_100%)] backdrop-blur-sm relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              Most Popular
            </span>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Professional</CardTitle>
            <CardDescription className="text-gray-300">
              For teams and businesses
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-gray-300 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Get Started
            </Button>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-center gap-x-3">
                <span className="bg-purple-800 p-1 rounded-full">📹</span>
                <span>Unlimited videos</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-purple-800 p-1 rounded-full">⏱️</span>
                <span>Unlimited duration</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-purple-800 p-1 rounded-full">🏢</span>
                <span>Unlimited organizations</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-purple-800 p-1 rounded-full">👥</span>
                <span>Unlimited team members</span>
              </li>
              <li className="flex items-center gap-x-3">
                <span className="bg-purple-800 p-1 rounded-full">🔍</span>
                <span>All AI features</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
