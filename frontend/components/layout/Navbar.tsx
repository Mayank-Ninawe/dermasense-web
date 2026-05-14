"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(248,245,240,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 h-16"
        style={{ maxWidth: "var(--content-wide)" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="DermaSense home"
        >
          {/* SVG Mark */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="14"
              cy="14"
              r="12"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <circle
              cx="14"
              cy="14"
              r="7"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle
              cx="14"
              cy="14"
              r="3"
              fill="var(--color-primary)"
            />
            <line
              x1="14"
              y1="2"
              x2="14"
              y2="6"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
            <line
              x1="14"
              y1="22"
              x2="14"
              y2="26"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
            <line
              x1="2"
              y1="14"
              x2="6"
              y2="14"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
            <line
              x1="22"
              y1="14"
              x2="26"
              y2="14"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            DermaSense
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm rounded-full transition-colors"
                style={{
                  color: active
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "var(--color-surface-offset)" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/analyze"
            className="ml-3 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
            }}
          >
            Analyze Skin →
          </Link>
        </nav>

        {/* Mobile — CTA only */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            href="/about"
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            About
          </Link>
          <Link
            href="/analyze"
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
            }}
          >
            Analyze →
          </Link>
        </div>
      </div>
    </header>
  );
}