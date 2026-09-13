import  Product  from "@/models/pamper";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}