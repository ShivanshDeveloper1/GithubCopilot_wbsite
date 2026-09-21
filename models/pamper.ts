import mongoose, { Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  tag: string;
  image: string; // Primary thumbnail / main image
  images: string[]; // Array for all product images
  description: string;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tag: { type: String, default: "" },
    image: { type: String, required: true },
   images: [{ type: String }],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

ProductSchema.set("toJSON", {
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;