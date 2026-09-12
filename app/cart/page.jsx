"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CartItem from "@/components/CartItem";
import SectionHeading from "@/components/SectionHeading";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-[var(--space-page)] py-14 sm:py-20">
      <SectionHeading eyebrow="Your little basket" title="A softer way to shop" description={items.length ? `${totalItems} ${totalItems === 1 ? "item" : "items"} waiting for you.` : "Your carefully chosen essentials will appear here."} align="left" />

      {items.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white px-6 py-16 text-center shadow-[var(--shadow-soft)]">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--color-mint)]/20 text-[var(--color-navy)]"><ShoppingBag size={25} aria-hidden="true" /></span>
          <h2 className="mt-5 font-[var(--font-heading)] text-xl font-bold text-[var(--color-navy)]">Your basket is ready for something lovely.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--color-muted)]">Browse our everyday favourites and add a little comfort to your next order.</p>
          <Link href="/products" className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5">Shop essentials <ArrowRight size={17} aria-hidden="true" /></Link>
        </motion.div>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
          <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7" aria-label="Cart items">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-5">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-navy)]">Your essentials</h2>
              <button type="button" onClick={clearCart} className="text-xs font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]">Clear cart</button>
            </div>
            <div>{items.map((item) => <CartItem key={item.id} item={item} />)}</div>
          </section>

          <aside className="rounded-[var(--radius-card)] bg-[var(--color-navy)] p-6 text-white shadow-[var(--shadow-lifted)] lg:sticky lg:top-24">
            <h2 className="font-[var(--font-heading)] text-lg font-bold">Order summary</h2>
            <div className="mt-6 space-y-4 border-b border-white/15 pb-6 text-sm">
              <div className="flex justify-between gap-4 text-white/70"><span>Subtotal</span><span className="font-semibold text-white">${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between gap-4 text-white/70"><span>Delivery</span><span className="font-semibold text-[var(--color-mint)]">Free</span></div>
            </div>
            <div className="flex justify-between gap-4 pt-5"><span className="font-bold">Total</span><span className="font-[var(--font-heading)] text-xl font-bold">${totalPrice.toFixed(2)}</span></div>
            <button type="button" className="mt-7 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Checkout <ArrowRight size={17} aria-hidden="true" /></button>
            <p className="mt-4 text-center text-xs leading-5 text-white/55">Secure checkout coming soon.</p>
          </aside>
        </div>
      )}
    </div>
  );
}