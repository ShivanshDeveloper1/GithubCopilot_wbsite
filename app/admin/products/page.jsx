"use client";

import { Edit3, MoreHorizontal, Plus, Search, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageReveal from "@/components/PageReveal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageReveal className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-pink)]">Catalog</p>
          <h1 className="mt-2 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-[var(--color-navy)]">Products</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Manage the essentials available in your storefront.</p>
        </div>
        <Link href="/admin/products/add" className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5">
          <Plus size={17} aria-hidden="true" /> Add new product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 border-b border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[var(--font-heading)] font-bold text-[var(--color-navy)]">
              All products <span className="ml-1 text-sm font-normal text-[var(--color-muted)]">{products.length}</span>
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-muted)]">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search products</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent outline-none placeholder:text-[var(--color-muted)] sm:w-52" />
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="animate-spin text-[var(--color-pink)]" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-[var(--color-background)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Product name</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Stock status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-[var(--color-background)]/70">
                    <td className="px-6 py-4">
                      <div className="size-12 rounded-xl bg-[var(--color-mint)]/15 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} role="img" aria-label={product.name} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[var(--color-navy)]">{product.name}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">{product.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)]">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mint)]/15 px-3 py-1.5 text-xs font-bold text-[var(--color-navy)]">
                        <span className="size-1.5 rounded-full bg-[var(--color-mint)]" /> In stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button type="button" aria-label={`Edit ${product.name}`} className="flex size-9 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-mint)]/15 hover:text-[var(--color-navy)]">
                          <Edit3 size={16} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={`Delete ${product.name}`} onClick={() => deleteProduct(product.id)} className="flex size-9 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-pink)]/10 hover:text-[var(--color-pink)]">
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={`More actions for ${product.name}`} className="flex size-9 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-background)]">
                          <MoreHorizontal size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filteredProducts.length === 0 && <p className="px-6 py-12 text-center text-sm text-[var(--color-muted)]">No products match your search.</p>}
      </div>
    </PageReveal>
  );
}