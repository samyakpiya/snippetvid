import { CompanyLogo } from "@/components/global/images";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingPageNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-x-3 hover:opacity-80 transition-opacity"
        >
          <CompanyLogo className="w-8 h-8" />
          <span className="text-2xl font-bold text-white">SnippetVid</span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden lg:flex items-center gap-x-8">
          <Link
            href="#about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-x-4">
          <Button
            asChild
            className="bg-[#7320DD] hover:bg-[#7320DD]/90 text-white"
          >
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
