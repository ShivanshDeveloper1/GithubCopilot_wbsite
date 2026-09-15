import { ArrowRight, Box, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/data/products";

const metrics = [
  { label: "Total revenue", value: "₹8,642", change: "+12.4%", icon: DollarSign },
  { label: "Orders this month", value: "184", change: "+8.2%", icon: ShoppingCart },
  { label: "Products listed", value: products.length.toString().padStart(2, "0"), change: "Active", icon: Box },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeading align="left" eyebrow="Overview" title="A clear view of your little shop" description="Keep an eye on the essentials and make thoughtful updates from one calm workspace." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {metrics.map(({ label, value, change, icon: Icon }) => <div key={label} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-mint)]/20 text-[var(--color-navy)]"><Icon size={19} aria-hidden="true" /></span><span className="text-xs font-bold text-[var(--color-mint)]">{change}</span></div><p className="mt-6 text-sm text-[var(--color-muted)]">{label}</p><p className="mt-1 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-navy)]">{value}</p></div>)}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-pink)]">Recent movement</p><h2 className="mt-2 font-[var(--font-heading)] text-xl font-bold text-[var(--color-navy)]">Store performance</h2></div><TrendingUp className="text-[var(--color-mint)]" size={22} aria-hidden="true" /></div><div className="mt-8 flex h-48 items-end gap-3 border-b border-[var(--color-border)] px-2"><div className="h-[38%] flex-1 rounded-t-lg bg-[var(--color-mint)]/35" /><div className="h-[52%] flex-1 rounded-t-lg bg-[var(--color-mint)]/45" /><div className="h-[45%] flex-1 rounded-t-lg bg-[var(--color-mint)]/55" /><div className="h-[70%] flex-1 rounded-t-lg bg-[var(--color-mint)]/65" /><div className="h-[62%] flex-1 rounded-t-lg bg-[var(--color-mint)]/75" /><div className="h-[86%] flex-1 rounded-t-lg bg-[var(--color-pink)]" /></div><div className="mt-3 flex justify-between text-xs text-[var(--color-muted)]"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></section>
        <section className="rounded-[var(--radius-card)] bg-[var(--color-navy)] p-7 text-white shadow-[var(--shadow-lifted)]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-mint)]">Quick action</p><h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold">Refresh your collection</h2><p className="mt-3 text-sm leading-7 text-white/70">Add a new thoughtful essential to your storefront in just a few steps.</p><Link href="/admin/products/add" className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-5 py-3 text-sm font-bold text-white">Add product <ArrowRight size={16} aria-hidden="true" /></Link></section>
      </div>
    </div>
  );
}