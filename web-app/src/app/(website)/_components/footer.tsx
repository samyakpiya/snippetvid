import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Documentation", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background z-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">SnippetVid</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Making video content creation easier and more accessible for
              everyone through AI-powered tools.
            </p>
            <div className="flex space-x-5">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-primary/10"
              >
                <Link
                  href="https://twitter.com/snippetvid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-primary/10"
              >
                <Link
                  href="https://github.com/snippetvid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center border-t py-8 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SnippetVid. All rights reserved.
          </p>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0">
            Crafted with 💜 by the SnippetVid team
          </p>
        </div>
      </div>
    </footer>
  );
}
