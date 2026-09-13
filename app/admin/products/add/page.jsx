"use client";

import { ArrowLeft, ImagePlus, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageReveal from "@/components/PageReveal";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
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

      const result = await res.json();
      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
            <select name="category" defaultValue="" required className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-mint)]">
              <option value="" disabled>Select a category</option>
              <option value="Sleep essentials">Sleep essentials</option>
              <option value="Bath time">Bath time</option>
              <option value="Little outfits">Little outfits</option>
              <option value="Feeding">Feeding</option>
            </select>
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">
            Description
            <textarea name="description" required rows="5" placeholder="Describe what makes this product special..." className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" />
          </label>

          <div className="sm:col-span-2">
            <p className="text-sm font-bold text-[var(--color-navy)]">Product image</p>
            <label className="mt-2 flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 text-center transition-colors hover:border-[var(--color-mint)] relative">
              {preview ? (
                <img src={preview} alt="Preview" className="h-44 w-full object-cover rounded-2xl" />
              ) : (
                <>
                  <ImagePlus size={28} className="text-[var(--color-mint)]" aria-hidden="true" />
                  <span className="mt-3 text-sm font-bold text-[var(--color-navy)]">Upload an image</span>
                  <span className="mt-1 text-xs text-[var(--color-muted)]">PNG, JPG or WEBP up to 5MB</span>
                </>
              )}
              <input type="file" required accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="sr-only" />
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
          <Link href="/admin/products" className="inline-flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] px-5 py-3 text-sm font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)]">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} aria-hidden="true" />}
            {loading ? "Saving..." : "Save product"}
          </button>
        </div>
      </form>
    </PageReveal>
  );
}