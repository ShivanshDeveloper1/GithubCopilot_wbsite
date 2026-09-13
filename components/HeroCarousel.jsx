"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { eyebrow: "Made for little beginnings", title: "Gentle care for every little moment.", description: "Thoughtful essentials that bring a little more ease to the everyday rhythm of family life.", image: "/pampers2.jpg" },
  { eyebrow: "Comfort, wrapped with care", title: "Soft layers for growing adventures.", description: "Discover sweet, practical favourites designed to move through nap time, playtime, and everything between.", image: "/pampers.jpg" },
  { eyebrow: "A calmer way to shop", title: "The tiny things that make a big difference.", description: "From bath time to bedtime, find trusted care made to feel good for your little one and you.", image: "/pampers3.jpg" },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-[var(--color-mint)]/15">
      <div className="mx-auto grid min-h-[36rem] max-w-7xl items-center gap-10 px-[var(--space-page)] py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <AnimatePresence mode="wait">
          <motion.div key={activeSlide} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]">{slide.eyebrow}</p>
            <h1 className="mt-5 max-w-xl font-heading text-5xl font-bold leading-[1.05] tracking-[-0.06em] text-[var(--color-navy)] sm:text-6xl">{slide.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-muted)]">{slide.description}</p>
            <Link href="/products" className="mt-8 inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5">
              Shop essentials <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={`${activeSlide}-image`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.55 }} className="relative mx-auto aspect-square w-full max-w-[31rem] overflow-hidden rounded-[2rem] bg-[var(--color-mint)] shadow-[var(--shadow-lifted)]">
            <div className="absolute inset-0 bg-[var(--color-mint)]/20 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} role="img" aria-label="Little Haven baby care collection" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 shadow-[var(--shadow-soft)]"><p className="text-xs font-bold text-[var(--color-navy)]">Little joys, thoughtfully chosen</p></div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-[var(--space-page)] pb-8">
        <div className="flex gap-2" aria-label="Hero slides">
          {slides.map((item, index) => <button key={item.title} type="button" aria-label={`Show slide ${index + 1}`} aria-current={index === activeSlide} onClick={() => setActiveSlide(index)} className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-10 bg-[var(--color-pink)]" : "w-5 bg-[var(--color-navy)]/20"}`} />)}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => changeSlide(-1)} className="flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-pink)] hover:text-white"><ChevronLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label="Next slide" onClick={() => changeSlide(1)} className="flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-pink)] hover:text-white"><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}