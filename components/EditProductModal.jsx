"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

export default function EditProductModal({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        description: product.description || "",
      });
      setPreview(product.image || "");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const productId = product._id || product.id;
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        onSuccess(result.data);
        onClose();
      } else {
        alert(result.error || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-[var(--radius-card)] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-navy)]">
            Edit Product
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[var(--color-navy)]">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-2.5 text-sm outline-none focus:border-[var(--color-pink)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[var(--color-navy)]">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-2.5 text-sm outline-none focus:border-[var(--color-pink)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[var(--color-navy)]">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-2.5 text-sm outline-none focus:border-[var(--color-pink)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[var(--color-navy)]">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-2.5 text-sm outline-none focus:border-[var(--color-pink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[var(--color-navy)]">
              Image
            </label>
            <div className="mt-1 flex items-center gap-4">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="size-12 rounded-lg object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-[var(--color-muted)]"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-pink)] px-5 py-2 text-sm font-bold text-white shadow-md"
            >
              {loading && <Loader2 className="animate-spin" size={16} />} Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}