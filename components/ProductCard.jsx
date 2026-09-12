"use client";

import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-mint)]/15">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
          role="img"
          aria-label={product.name}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--color-navy)]">
          {product.tag}
        </span>
        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-navy)] transition-colors hover:text-[var(--color-pink)]"
        >
          <Heart size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">{product.category}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-[var(--font-heading)] font-bold text-[var(--color-navy)]"><Link href={`/products/${product.id}`} className="transition-colors hover:text-[var(--color-pink)]">{product.name}</Link></h3>
          <span className="shrink-0 font-bold text-[var(--color-pink)]">{product.price}</span>
        </div>
        <motion.button
          type="button"
          onClick={() => addToCart(product)}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-background)] px-4 py-3 text-sm font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-mint)]/25"
        >
          <ShoppingBag size={16} aria-hidden="true" />
          Add to bag
          <ArrowUpRight size={15} aria-hidden="true" />
        </motion.button>
      </div>
    </motion.article>
  );
}