import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { dbConnect } from "@/lib/db";
import Product from "@/models/pamper";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST new product (Handles File Upload + Database Saving)
export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description");
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });
    }

    // Convert File object to Buffer for Cloudinary upload stream
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      image: uploadResponse.secure_url,
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}