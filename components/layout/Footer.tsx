import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const navLinks = ["/analyze", "/about", "/faq"];

  function capitalizeFirst(str: string): string {
    return str.replace("/", "").replace(/^(\w)/, (c: string) => c.toUpperCase());
  }

  return (
    <footer className="border-t bg-[var(--color-surface-offset)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="mx-auto px-6 py-12"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>
              DermaSense
            </div>
            <p className="text-sm max-w-xs" style={{ color: "var(--color-text-muted)" }}>
              AI-powered skin disease screening, optimized for Indian skin tones.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-faint)" }}
            >
              Navigation
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {capitalizeFirst(href)}
                </Link>
              ))}
            </div>
          </div>

          {/* University */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-faint)" }}
            >
              Academic
            </div>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Ramdeobaba University, Nagpur
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Supervised by Prof. Rajesh Khobragade
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
            © 2026 DermaSense · Ramdeobaba University, Nagpur
          </p>
          <a
            href="https://github.com/Mayank-Ninawe/dermasense-web"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="GitHub repository"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}