import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import PageReveal from "@/components/PageReveal";
import { dbConnect } from "@/lib/db";
import Product from "@/models/pamper";

export default async function ProductsPage() {
  await dbConnect();
  
  // Fetch products from MongoDB and convert to plain JSON objects
  const rawProducts = await Product.find({}).sort({ createdAt: -1 });
  const products = rawProducts.map((doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
  });

  return (
    <PageReveal className="mx-auto max-w-7xl px-[var(--space-page)] py-16 sm:py-24">
      <SectionHeading 
        eyebrow="The collection" 
        title="Everyday care, thoughtfully chosen" 
        description="Reliable little essentials for bath time, bedtime, mealtime, and all the moments between." 
      />
      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </PageReveal>
  );
}