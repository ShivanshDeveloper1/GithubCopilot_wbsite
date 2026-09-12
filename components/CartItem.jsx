"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <motion.article layout className="flex gap-4 border-b border-[var(--color-border)] py-5 first:pt-0 last:border-b-0 last:pb-0 sm:gap-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-mint)]/15 sm:size-28">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={item.name} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">{item.category}</p>
            <h2 className="mt-1 font-[var(--font-heading)] font-bold text-[var(--color-navy)]">{item.name}</h2>
          </div>
          <p className="shrink-0 font-bold text-[var(--color-pink)]">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-[var(--radius-button)] border border-[var(--color-border)] p-1">
            <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decreaseQuantity(item.id)} className="flex size-7 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"><Minus size={14} aria-hidden="true" /></button>
            <span className="min-w-7 text-center text-sm font-bold text-[var(--color-navy)]">{item.quantity}</span>
            <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => increaseQuantity(item.id)} className="flex size-7 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"><Plus size={14} aria-hidden="true" /></button>
          </div>
          <button type="button" onClick={() => removeFromCart(item.id)} className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"><Trash2 size={15} aria-hidden="true" /> Remove</button>
        </div>
      </div>
    </motion.article>
  );
}