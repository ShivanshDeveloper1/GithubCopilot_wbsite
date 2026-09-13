import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true }, // Store price as a number
    tag: { type: String, default: "" },
    image: { type: String, required: true }, // Cloudinary URL
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Format _id to id for seamless UI rendering
ProductSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);