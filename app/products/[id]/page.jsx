import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { dbConnect } from "@/lib/db";
import Product from "@/models/pamper";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  try {
    await dbConnect();
    const rawProduct = await Product.findById(id);

    if (!rawProduct) {
      notFound();
    }

    // Convert MongoDB document to plain JSON object
    const product = rawProduct.toObject();
    product.id = product._id.toString();
    delete product._id;
    delete product.__v;

    return <ProductDetail product={product} />;
  } catch (error) {
    // Triggers Next.js 404 page if the MongoDB ObjectId format is invalid
    notFound();
  }
}