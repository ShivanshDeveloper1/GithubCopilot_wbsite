"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bath, Baby, Shirt, Utensils } from "lucide-react";

const categories = [
  { label: "Baby Diapers", icon: Bath },
  { label: " Sanitary Pads", icon: Shirt },
  { label: "Baby Wipes", icon: Baby },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function CategoryGrid() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {categories.map(({ label, icon: Icon }) => (
        <motion.div key={label} variants={itemVariants} whileHover={{ y: -6 }}>
          <Link
           href={`/products?category=${encodeURIComponent(label.trim())}`}
            className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 text-center shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lifted)]"
          >
            <motion.span
              className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-mint)]/20 text-[var(--color-navy)] transition-colors duration-300 group-hover:bg-[var(--color-pink)] group-hover:text-white"
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={22} aria-hidden="true" />
            </motion.span>
            <span className="text-sm font-bold text-[var(--color-navy)]">
              {label}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}