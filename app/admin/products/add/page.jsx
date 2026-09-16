"use client";

import { ArrowLeft, ImagePlus, Save, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageReveal from "@/components/PageReveal";

const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };
    };
  });
};

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setCompressing(true);
      // Automatically compress image down to max 1200px width @ 80% quality
      const compressed = await compressImage(selectedFile, 1200, 0.8);
      setFile(compressed);
      setPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.error("Compression failed:", err);
      alert("Error processing image. Please try another file.");
    } finally {
      setCompressing(false);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image!");

    setLoading(true);
    const formData = new FormData(e.target);
    formData.set("image", file);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Response Error:", errorText);
        alert(`Upload error status (${res.status}). Check server logs.`);
        return;
      }

      const result = await res.json();
      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageReveal className="mx-auto max-w-4xl">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]">
        <ArrowLeft size={16} aria-hidden="true" /> Back to products
      </Link>
      <div className="mt-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-pink)]">Catalog</p>
        <h1 className="mt-2 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-[var(--color-navy)]">Add new product</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Create a product record for your storefront.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">
            Product name
            <input name="name" type="text" required placeholder="e.g. Cloud-soft swaddle" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" />
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)]">
            Price ($)
            <input name="price" type="number" min="0" step="0.01" required placeholder="28.00" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" />
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)]">
  Category
  <select 
    name="category" 
    defaultValue="" 
    required 
    className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-mint)]"
  >
    <option value="" disabled>Select a category</option>
    <option value="Baby Diapers">Baby Diapers ( LittlePips Diaper ke sabhi packs )</option>
    <option value="Sanitary Pads">Sanitary Pads ( Secure Dry Sanitary Pads )</option>
    <option value="Baby Wipes">Baby Wipes ( LittlePips Soft & Gentle Baby Wipes )</option>
  </select>
</label>

          <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">
            Description
            <textarea name="description" required rows="5" placeholder="Describe what makes this product special..." className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" />
          </label>

          <div className="sm:col-span-2">
            <p className="text-sm font-bold text-[var(--color-navy)]">Product image</p>
            <div className="relative mt-2">
              {preview ? (
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]">
                  <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                  <button type="button" onClick={removeImage} className="absolute right-3 top-3 rounded-full bg-white/80 p-1.5 text-slate-700 shadow backdrop-blur transition-colors hover:bg-white hover:text-red-500">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 text-center transition-colors hover:border-[var(--color-mint)]">
                  {compressing ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 size={28} className="animate-spin text-[var(--color-mint)]" />
                      <span className="text-sm font-medium text-[var(--color-muted)]">Optimizing image size...</span>
                    </div>
                  ) : (
                    <>
                      <ImagePlus size={28} className="text-[var(--color-mint)]" aria-hidden="true" />
                      <span className="mt-3 text-sm font-bold text-[var(--color-navy)]">Upload an image</span>
                      <span className="mt-1 text-xs text-[var(--color-muted)]">Auto-compressed to fast WebP format</span>
                    </>
                  )}
                  <input type="file" required accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} disabled={compressing} className="sr-only" />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
          <Link href="/admin/products" className="inline-flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] px-5 py-3 text-sm font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)]">
            Cancel
          </Link>
          <button type="submit" disabled={loading || compressing} className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} aria-hidden="true" />}
            {loading ? "Saving..." : "Save product"}
          </button>
        </div>
      </form>
    </PageReveal>
  );
}