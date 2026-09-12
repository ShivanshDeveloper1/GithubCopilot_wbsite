import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import PageReveal from "@/components/PageReveal";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <PageReveal className="mx-auto max-w-7xl px-[var(--space-page)] py-16 sm:py-24">
      <SectionHeading eyebrow="The collection" title="Everyday care, thoughtfully chosen" description="Reliable little essentials for bath time, bedtime, mealtime, and all the moments between." />
      <div className="mt-12"><ProductGrid products={products} /></div>
    </PageReveal>
  );
}