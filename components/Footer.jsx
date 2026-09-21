import { Mail, Pin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/littlepips.in?stkn=emR0MGFsY25sdWRm",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592930366409",
    Icon: FaFacebook,
  }
 
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-[var(--space-page)] py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

        {/* Brand Section */}
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
         
                  <Image src={'/logo.jpeg'} alt="logo" width={85} height={95}  className="object-cover" />
          

          
          </Link>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Thoughtful essentials and gentle care for every little beginning.
          </p>

          {/* Social Media Icons */}
       <div className="mt-6 flex gap-2">
  {socialLinks.map(({ label, href, Icon }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
    >
      <Icon size={17} aria-hidden="true" />
    </a>
  ))}
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
    <h2 className="font-[var(--font-heading)] text-sm font-bold tracking-wide text-white"> Contact Information </h2>

      <p className="mt-4 text-sm leading-6 text-white/70"> H.N. 315, Rampur, <br /> Roorkee – 247667, <br /> Haridwar, Uttarakhand, India <br /> Phone: +91 70176 65151 </p>

         <a href="mailto:Softsparhhygienepvtitd@gmail.com" className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-mint)] hover:text-white" > <Mail size={16} aria-hidden="true" /> Softsparhhygienepvtitd@gmail.com </a>
       
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