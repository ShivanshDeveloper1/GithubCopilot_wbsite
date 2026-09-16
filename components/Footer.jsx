import { Mail, Pin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Our story", href: "/about" },
];

const supportLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Shipping & returns", href: "/shipping" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-[var(--space-page)] py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

        {/* Brand Section */}
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-navy)]">
              <Pin
                size={20}
                fill="currentColor"
                aria-hidden="true"
              />
            </span>

            <span className="font-[var(--font-heading)] text-lg font-bold tracking-[-0.03em]">
              Little{" "}
              <span className="text-[var(--color-pink)]">
                Haven
              </span>
            </span>
          </Link>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Thoughtful essentials and gentle care for every little beginning.
          </p>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-2">
            {[FaInstagram, FaFacebook, FaTwitter].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={`Social media placeholder ${index + 1}`}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
                >
                  <Icon
                    size={17}
                    aria-hidden="true"
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* Explore Links */}
        <FooterColumn
          title="Explore"
          links={navigationLinks}
        />

        {/* Support Links */}
        <FooterColumn
          title="Support"
          links={supportLinks}
        />

        {/* Newsletter / Contact */}
        <div>
          <h2 className="font-[var(--font-heading)] text-sm font-bold tracking-wide text-white">
            Stay in the know
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/70">
            New arrivals, helpful tips, and tiny joys in your inbox.
          </p>

          <a
            href="mailto:Softsparhhygienepvtitd@gmail.com"
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-mint)] hover:text-white"
          >
            <Mail size={16} aria-hidden="true" />
           Softsparhhygienepvtitd@gmail.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-[var(--space-page)] py-5 text-center text-xs text-white/50">
        © 2025 Little Haven. Made for little moments.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h2 className="font-[var(--font-heading)] text-sm font-bold tracking-wide text-white">
        {title}
      </h2>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-[var(--color-mint)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}