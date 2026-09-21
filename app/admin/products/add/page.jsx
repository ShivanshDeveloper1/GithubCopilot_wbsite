"use client";

import { ArrowLeft, ImagePlus, Save, Loader2, X, Star } from "lucide-react";
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
            const compressedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              {
                type: "image/webp",
                lastModified: Date.now(),
              }
            );
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
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    try {
      setCompressing(true);
      const compressedFiles = await Promise.all(
        selectedFiles.map((f) => compressImage(f, 1200, 0.8))
      );

      const newPreviews = compressedFiles.map((f) => URL.createObjectURL(f));

      setFiles((prev) => [...prev, ...compressedFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    } catch (err) {
      console.error("Compression failed:", err);
      alert("Error processing images. Please try another file.");
    } finally {
      setCompressing(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please upload at least one image!");

    setLoading(true);
    const formData = new FormData(e.target);

    // Append primary image (first element) for backward compatibility
    formData.set("image", files[0]);

    // Append all selected files for multi-image processing
    files.forEach((file) => {
      formData.append("images", file);
    });

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
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to products
      </Link>
      <div className="mt-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-pink)]">
          Catalog
        </p>
        <h1 className="mt-2 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-[var(--color-navy)]">
          Add new product
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Create a product record for your storefront.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">
            Product name
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Cloud-soft swaddle"
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]"
            />
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)]">
            Price ($)
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="28.00"
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]"
            />
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)]">
            Category
            <select
              name="category"
              defaultValue=""
              required
              className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors focus:border-[var(--color-mint)]"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Baby Diapers">Baby Diapers</option>
              <option value="Sanitary Pads">Sanitary Pads</option>
              <option value="Baby Wipes">Baby Wipes</option>
            </select>
          </label>

          <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">
            Description
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Describe what makes this product special..."
              className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]"
            />
          </label>

          {/* Multi-Image Upload Field */}
          <div className="sm:col-span-2">
            <p className="text-sm font-bold text-[var(--color-navy)]">
              Product images {files.length > 0 && `(${files.length})`}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]"
                >
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[var(--color-pink)] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      <Star size={10} /> Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-slate-700 shadow backdrop-blur transition-colors hover:bg-white hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-background)] p-4 text-center transition-colors hover:border-[var(--color-mint)]">
                {compressing ? (
                  <div className="flex flex-col items-center gap-1">
                    <Loader2
                      size={24}
                      className="animate-spin text-[var(--color-mint)]"
                    />
                    <span className="text-xs text-[var(--color-muted)]">
                      Optimizing...
                    </span>
                  </div>
                ) : (
                  <>
                    <ImagePlus
                      size={24}
                      className="text-[var(--color-mint)]"
                    />
                    <span className="mt-2 text-xs font-bold text-[var(--color-navy)]">
                      {previews.length > 0 ? "Add More" : "Upload Images"}
                    </span>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  disabled={compressing}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] px-5 py-3 text-sm font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || compressing}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} aria-hidden="true" />
            )}
            {loading ? "Saving..." : "Save product"}
          </button>
        </div>
      </form>
    </PageReveal>
  );
}