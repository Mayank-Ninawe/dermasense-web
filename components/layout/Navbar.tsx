"use client";
import { useState } from "react"; // ✅ useEffect REMOVED — was unused
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // ✅ useMotionValueEvent is correct here — no useEffect needed
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  const links = [
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      <motion.header
        // ✅ CSS variables moved to style prop — avoids Tailwind v4 conflict with /opacity modifier
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(253, 252, 249, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <nav
          className="mx-auto px-6 h-16 flex items-center justify-between"
          style={{ maxWidth: "var(--content-wide)" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <DermaSenseLogo />
            <span
              className="text-base"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              DermaSense
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--color-text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/analyze"
              className="text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
              }}
            >
              Analyze Skin →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: "var(--color-text)" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setMobileOpen(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-6"
            style={{ backgroundColor: "var(--color-surface-2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet header */}
            <div className="flex justify-between items-center mb-6">
              <span
                className="font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Menu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} style={{ color: "var(--color-text-muted)" }} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-base py-2 border-b"
                  style={{
                    color: "var(--color-text)",
                    borderColor: "var(--color-border)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/analyze"
                className="mt-2 text-base font-medium px-4 py-3 rounded-full text-center"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Analyze Skin →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function DermaSenseLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-label="DermaSense logo"
      role="img"
    >
      <circle cx="14" cy="14" r="13" stroke="#0B7C7A" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="6" fill="#0B7C7A" fillOpacity="0.15" />
      <circle cx="14" cy="14" r="3" fill="#0B7C7A" />
      <line x1="14" y1="1" x2="14" y2="6" stroke="#0B7C7A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="22" x2="14" y2="27" stroke="#0B7C7A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="14" x2="6" y2="14" stroke="#0B7C7A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="14" x2="27" y2="14" stroke="#0B7C7A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}