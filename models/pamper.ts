import mongoose, { Document, Model } from "mongoose";

// 1. Define the TypeScript interface for your product
export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  tag: string;
  image: string;
  description: string;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tag: { type: String, default: "" },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Format _id to id for seamless UI rendering
ProductSchema.set("toJSON", {
  // 2. Explicitly type 'ret' as Record<string, any> so we can add 'id' to it
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;