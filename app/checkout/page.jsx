"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import PageReveal from "@/components/PageReveal";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <PageReveal className="mx-auto max-w-7xl px-[var(--space-page)] py-14 sm:py-20">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"><ArrowLeft size={16} aria-hidden="true" /> Back to cart</Link>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]">Almost there</p>
          <h1 className="mt-3 font-[var(--font-heading)] text-4xl font-bold tracking-[-0.05em] text-[var(--color-navy)]">Complete your order</h1>
          <form className="mt-8 space-y-6">
            <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-navy)]">Customer information</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">Email address<input type="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
                <label className="text-sm font-bold text-[var(--color-navy)]">First name<input type="text" required placeholder="First name" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
                <label className="text-sm font-bold text-[var(--color-navy)]">Last name<input type="text" required placeholder="Last name" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
              </div>
            </section>
            <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-navy)]">Delivery information</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold text-[var(--color-navy)] sm:col-span-2">Address<input type="text" required placeholder="Street address" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
                <label className="text-sm font-bold text-[var(--color-navy)]">City<input type="text" required placeholder="City" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
                <label className="text-sm font-bold text-[var(--color-navy)]">Postal code<input type="text" required placeholder="Postal code" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none focus:border-[var(--color-mint)]" /></label>
              </div>
            </section>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:min-w-56">Place order <ArrowRight size={17} aria-hidden="true" /></button>
          </form>
        </div>
        <aside className="rounded-[var(--radius-card)] bg-[var(--color-navy)] p-6 text-white shadow-[var(--shadow-lifted)] lg:sticky lg:top-24">
          <h2 className="font-[var(--font-heading)] text-lg font-bold">Order summary</h2>
          {items.length ? <div className="mt-6 space-y-4 border-b border-white/15 pb-6">{items.map((item) => <div key={item.id} className="flex items-start justify-between gap-3 text-sm"><span className="text-white/75">{item.name} <span className="text-white/45">x{item.quantity}</span></span><span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span></div>)}</div> : <p className="mt-6 border-b border-white/15 pb-6 text-sm leading-6 text-white/65">Your cart is empty. Add a few essentials before checking out.</p>}
          <div className="flex justify-between gap-4 pt-5 text-sm text-white/70"><span>{totalItems} items</span><span className="font-bold text-white">${totalPrice.toFixed(2)}</span></div>
          <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-mint)]"><Check size={15} aria-hidden="true" /> Free delivery included</div>
        </aside>
      </div>
    </PageReveal>
  );
}