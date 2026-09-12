import { ArrowRight, Bath, Baby, Shirt, Utensils } from "lucide-react";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/data/products";

const categories = [
  { label: "Bath time", icon: Bath },
  { label: "Little outfits", icon: Shirt },
  { label: "Feeding", icon: Utensils },
  { label: "Newborn care", icon: Baby },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <section className="mx-auto max-w-7xl px-[var(--space-page)] py-20">
        <SectionHeading eyebrow="Shop by need" title="Care for every little chapter" description="Find the essentials that make daily routines feel a touch softer." />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map(({ label, icon: Icon }) => (
            <Link key={label} href="/products" className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 text-center shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)]">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-mint)]/20 text-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-pink)] group-hover:text-white"><Icon size={22} aria-hidden="true" /></span>
              <span className="text-sm font-bold text-[var(--color-navy)]">{label}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-[var(--space-page)] pb-20">
        <SectionHeading eyebrow="Parent favourites" title="The essentials drawer" description="Practical, lovely, and ready for all the small moments that fill your day." />
        <div className="mt-10"><ProductGrid products={products} /></div>
      </section>
      <section className="bg-white px-[var(--space-page)] py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Little Haven" title="A little more ease, every day" description="We keep the details thoughtful so you can keep your attention where it belongs." />
          <div className="mt-10"><FeaturesSection /></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-[var(--space-page)] py-20">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-navy)] px-7 py-12 text-center text-white shadow-[var(--shadow-lifted)] sm:px-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-mint)]">A softer start</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Make room for the little joys.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">Build a bundle of everyday favourites and enjoy free delivery on orders over $50.</p>
            <Link href="/products" className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Explore the collection <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}