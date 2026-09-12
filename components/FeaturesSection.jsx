"use client";

import { HeartHandshake, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Soft & comfortable", description: "Thoughtful textures made for delicate new skin.", icon: Sparkles },
  { title: "Trusted quality", description: "Reliable essentials chosen with care by parents.", icon: ShieldCheck },
  { title: "Fast delivery", description: "The little things arrive when your family needs them.", icon: PackageCheck },
  { title: "Easy shopping", description: "A calm, simple way to find your everyday favourites.", icon: HeartHandshake },
];

export default function FeaturesSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map(({ title, description, icon: Icon }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-mint)]/20 text-[var(--color-navy)]">
            <Icon size={21} aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-[var(--font-heading)] font-bold text-[var(--color-navy)]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
        </motion.div>
      ))}
    </div>
  );
}