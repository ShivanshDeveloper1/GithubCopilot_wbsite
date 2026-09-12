"use client";

import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const addProductToCart = () => {
    Array.from({ length: quantity }).forEach(() => addToCart(product));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-7xl px-[var(--space-page)] py-12 sm:py-20">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"><ArrowLeft size={16} aria-hidden="true" /> Back to collection</Link>
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-square overflow-hidden rounded-[2rem] bg-[var(--color-mint)]/15 shadow-[var(--shadow-lifted)]">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} role="img" aria-label={product.name} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]">{product.category}</p>
          <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold tracking-[-0.05em] text-[var(--color-navy)] sm:text-5xl">{product.name}</h1>
          <p className="mt-5 font-[var(--font-heading)] text-2xl font-bold text-[var(--color-pink)]">{product.price}</p>
          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-muted)]">{product.description}</p>
          <div className="mt-8 border-y border-[var(--color-border)] py-6">
            <p className="text-sm font-bold text-[var(--color-navy)]">Quantity</p>
            <div className="mt-3 flex items-center gap-1 rounded-[var(--radius-button)] border border-[var(--color-border)] p-1 w-fit">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex size-9 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"><Minus size={16} aria-hidden="true" /></button>
              <span className="min-w-9 text-center text-sm font-bold text-[var(--color-navy)]">{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="flex size-9 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"><Plus size={16} aria-hidden="true" /></button>
            </div>
          </div>
          <motion.button type="button" whileTap={{ scale: 0.98 }} onClick={addProductToCart} className="mt-7 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:min-w-64"><ShoppingBag size={18} aria-hidden="true" /> Add to cart</motion.button>
          <p className="mt-4 text-xs text-[var(--color-muted)]">Free delivery on orders over $50.</p>
        </div>
      </div>
    </motion.div>
  );
}