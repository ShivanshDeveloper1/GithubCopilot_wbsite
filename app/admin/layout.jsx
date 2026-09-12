"use client";

import { BarChart3, Box, ChevronRight, LayoutDashboard, Menu, Settings, ShoppingCart, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Box },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[var(--color-background)] lg:flex">
      {isSidebarOpen && <button type="button" aria-label="Close admin navigation" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-30 bg-[var(--color-navy)]/25 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[var(--color-border)] bg-white px-5 py-6 transition-transform lg:static lg:block lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-3 lg:block">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--color-mint)] text-[var(--color-navy)]"><BarChart3 size={20} strokeWidth={2.5} aria-hidden="true" /></span>
            <span><span className="block font-[var(--font-heading)] text-sm font-bold text-[var(--color-navy)]">Little Haven</span><span className="block text-xs text-[var(--color-muted)]">Admin workspace</span></span>
          </Link>
          <button type="button" aria-label="Close admin navigation" onClick={() => setIsSidebarOpen(false)} className="flex size-10 items-center justify-center rounded-full text-[var(--color-navy)] lg:hidden"><X size={20} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Admin navigation" className="mt-10 space-y-2">
          {navigation.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[var(--color-navy)] text-white shadow-[var(--shadow-soft)]" : "text-[var(--color-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-navy)]"}`}><Icon size={18} aria-hidden="true" />{label}{isActive && <ChevronRight size={16} className="ml-auto" aria-hidden="true" />}</Link>;
          })}
        </nav>
        <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-[var(--color-mint)]/15 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-navy)]">Store status</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-[var(--color-muted)]"><span className="size-2 rounded-full bg-[var(--color-mint)]" /> All systems ready</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-20 items-center justify-between border-b border-[var(--color-border)] bg-white px-[var(--space-page)]">
          <button type="button" aria-label="Open admin navigation" onClick={() => setIsSidebarOpen(true)} className="flex size-10 items-center justify-center rounded-full text-[var(--color-navy)] hover:bg-[var(--color-background)] lg:hidden"><Menu size={21} aria-hidden="true" /></button>
          <div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Store management</p><p className="mt-1 text-sm font-bold text-[var(--color-navy)]">Good morning, Haven team</p></div>
          <div className="ml-auto flex items-center gap-4"><button type="button" onClick={() => router.push("/")} className="text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]">View storefront</button><span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-mint)]/20 text-sm font-bold text-[var(--color-navy)]">LH</span></div>
        </header>
        <motion.main key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-[calc(100vh-12.5rem)] px-[var(--space-page)] py-10">{children}</motion.main>
      </div>
    </div>
  );
}