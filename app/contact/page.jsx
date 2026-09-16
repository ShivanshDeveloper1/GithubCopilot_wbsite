"use client";

import { ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  { question: "How quickly will my order arrive?", answer: "Orders usually arrive within 3 to 5 business days. We will keep you posted along the way." },
  { question: "Can I return an item?", answer: "Absolutely. Unused items can be returned within 30 days. Reach out and we will make it simple." },
  { question: "Do you offer gift wrapping?", answer: "Yes. Add a note to your order and our team will prepare it with a little extra care." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <PageReveal className="mx-auto max-w-7xl px-[var(--space-page)] py-16 sm:py-24">
      <SectionHeading eyebrow="We are here to help" title="Let’s talk about the little things" description="Questions about an order, a product, or finding the right gift? Our friendly team would love to hear from you." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <div className="rounded-[var(--radius-card)] bg-[var(--color-navy)] p-7 text-white shadow-[var(--shadow-lifted)]">
            <h2 className="font-[var(--font-heading)] text-xl font-bold">Good things start with hello.</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">We usually reply within one business day, Monday through Friday.</p>
            <div className="mt-7 space-y-5 text-sm">
              <a href="mailto:Softsparhhygienepvtitd@gmail.com" className="flex items-center gap-3 text-white/85 transition-colors hover:text-[var(--color-mint)]"><Mail size={17} aria-hidden="true" />Softsparhhygienepvtitd@gmail.com</a>
              <a href="tel:+18005550142" className="flex items-center gap-3 text-white/85 transition-colors hover:text-[var(--color-mint)]"><Phone size={17} aria-hidden="true" /> +91-7017665151</a>
              <p className="flex items-center gap-3 text-white/85"><MapPin size={17} aria-hidden="true" /> Portland, Oregon</p>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-soft)]">
            <h2 className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-navy)]">Frequently asked</h2>
            <div className="mt-4 divide-y divide-[var(--color-border)]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return <div key={faq.question} className="py-4 first:pt-0 last:pb-0"><button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-[var(--color-navy)]"><span>{faq.question}</span><ChevronDown size={17} className={`shrink-0 transition-transform ${isOpen ? "rotate-180 text-[var(--color-pink)]" : ""}`} aria-hidden="true" /></button>{isOpen && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{faq.answer}</motion.p>}</div>;
              })}
            </div>
          </div>
        </div>
        <form className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-navy)]">Send a message</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Tell us what is on your mind and we will take it from here.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold text-[var(--color-navy)]">Name<input name="name" type="text" required placeholder="Your name" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" /></label>
            <label className="text-sm font-bold text-[var(--color-navy)]">Email<input name="email" type="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" /></label>
          </div>
          <label className="mt-5 block text-sm font-bold text-[var(--color-navy)]">Message<textarea name="message" required rows="6" placeholder="How can we help?" className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-normal outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-mint)]" /></label>
          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-pink)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"><Send size={16} aria-hidden="true" /> Send message</button>
        </form>
      </div>
    </PageReveal>
  );
}