import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import CategoryGrid from "@/components/CategoryGrid";
import { dbConnect } from "@/lib/db";
import Product from "@/models/pamper";

export default async function Home() {
  await dbConnect();

  // Fetch featured products from MongoDB
  const rawProducts = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(8);

  const products = rawProducts.map((doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
  });

  return (
    <>
      <HeroCarousel />

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-[var(--space-page)] py-20">
        <SectionHeading
          eyebrow="Shop by need"
          title="Care for every little chapter"
          description="Find the essentials that make daily routines feel a touch softer."
        />
        <div className="mt-10">
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-[var(--space-page)] pb-20">
        <SectionHeading
          eyebrow="Parent favourites"
          title="The essentials drawer"
          description="Practical, lovely, and ready for all the small moments that fill your day."
        />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-[var(--space-page)] py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Little Haven"
            title="A little more ease, every day"
            description="We keep the details thoughtful so you can keep your attention where it belongs."
          />
          <div className="mt-10">
            <FeaturesSection />
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="mx-auto max-w-7xl px-[var(--space-page)] py-20">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-navy)] px-7 py-12 text-center text-white shadow-[var(--shadow-lifted)] sm:px-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-mint)]">
              A softer start
            </p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Make room for the little joys.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
              Build a bundle of everyday favourites and enjoy free delivery on orders over $50.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Explore the collection <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}