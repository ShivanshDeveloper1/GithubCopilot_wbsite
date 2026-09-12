"use client";

import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-[var(--space-page)]">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-navy)] shadow-[var(--shadow-soft)]">
            <Heart size={21} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
          </span>
          <span className="font-[var(--font-heading)] text-lg font-bold tracking-[-0.03em] text-[var(--color-navy)]">
            Little <span className="text-[var(--color-pink)]">Haven</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="View cart"
            className="flex size-11 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"
          >
            <ShoppingBag size={21} strokeWidth={2} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="flex size-11 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-[var(--color-border)] bg-white px-[var(--space-page)] py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}