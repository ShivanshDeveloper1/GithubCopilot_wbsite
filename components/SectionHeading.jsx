"use client"

import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const isLeftAligned = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${isLeftAligned ? "text-left" : "mx-auto text-center"}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]">{eyebrow}</p>
      <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-[var(--color-navy)] sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{description}</p>}
    </motion.div>
  );
}