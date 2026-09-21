import Product from "@/models/pamper";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Context = {
  params: Promise<{ id: string }>;
};

// Helper function for uploading a single File to Cloudinary
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

export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    await dbConnect();
    const { id } = await params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    const updateData: Record<string, any> = { name, category, price, description };

    // Check for uploaded images
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

    // Only update images if new files were provided
    if (filesToUpload.length > 0) {
      const imageUrls = await Promise.all(
        filesToUpload.map((file) => uploadToCloudinary(file))
      );
      updateData.images = imageUrls;
      updateData.image = imageUrls[0];
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}