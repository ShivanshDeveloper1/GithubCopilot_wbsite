import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { dbConnect } from "@/lib/db";
import Product from "@/models/pamper";

export const maxDuration = 60;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload a single File buffer to Cloudinary
const uploadToCloudinary = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (error, result) => {
        if (error || !result) reject(error);
        else resolve((result as UploadApiResponse).secure_url);
      })
      .end(buffer);
  });
};

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST new product (Handles Multi-Image Upload)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    // Collect all files from "images" or single fallback "image"
    const rawFiles = formData.getAll("images");
    const singleFile = formData.get("image");

    const filesToUpload: File[] = [];

    if (rawFiles.length > 0) {
      rawFiles.forEach((f) => {
        if (typeof f !== "string" && f.size > 0) filesToUpload.push(f as File);
      });
    } else if (singleFile && typeof singleFile !== "string" && singleFile.size > 0) {
      filesToUpload.push(singleFile as File);
    }

    if (filesToUpload.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Upload all files concurrently
    const imageUrls = await Promise.all(
      filesToUpload.map((file) => uploadToCloudinary(file))
    );

    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      image: imageUrls[0], // Main thumbnail image
      images: imageUrls,   // Array of all uploaded image URLs
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}