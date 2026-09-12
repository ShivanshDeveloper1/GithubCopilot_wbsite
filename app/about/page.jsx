import { HeartHandshake, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageReveal from "@/components/PageReveal";

const values = [
  { title: "Thoughtful by nature", description: "We choose useful details, gentle materials, and calm routines over clutter.", icon: Sparkles },
  { title: "Care you can trust", description: "Every favourite earns its place through quality, comfort, and everyday reliability.", icon: ShieldCheck },
  { title: "Kind to tomorrow", description: "We keep learning how to make better choices for little ones and the world they inherit.", icon: Leaf },
  { title: "Here for the whole family", description: "Parenthood is a shared rhythm, so our products and service are made to support everyone.", icon: HeartHandshake },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <PageReveal className="mx-auto max-w-7xl px-[var(--space-page)] py-16 sm:py-24">
        <SectionHeading eyebrow="Our story" title="Small comforts. Big beginnings." description="Little Haven began with a simple belief: the things around a baby should feel as considered as the care given to them." />
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="aspect-[4/3] rounded-[2rem] bg-[var(--color-mint)]/20 bg-[url('/images/about-story.jpg')] bg-cover bg-center shadow-[var(--shadow-lifted)]" role="img" aria-label="A soft baby-care collection" />
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-10">
            <p className="text-base leading-8 text-[var(--color-muted)]">We make room for the beautiful, imperfect, ordinary moments that become the memories you keep. From a first bath to a much-loved bedtime layer, our collection is made to bring a little more softness to the everyday.</p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">That means fewer distractions, more dependable essentials, and a shopping experience that meets you gently wherever you are in the journey.</p>
          </div>
        </div>
      </PageReveal>

      <section className="bg-white px-[var(--space-page)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What guides us" title="A softer standard of care" description="Our values shape what we choose, how we work, and the experience we create for growing families." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon: Icon }, index) => (
              <PageReveal key={title} className="h-full" style={{ animationDelay: `${index * 80}ms` }}>
                <article className="h-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-mint)]/20 text-[var(--color-navy)]"><Icon size={21} aria-hidden="true" /></span>
                  <h2 className="mt-5 font-[var(--font-heading)] font-bold text-[var(--color-navy)]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
                </article>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <PageReveal className="mx-auto grid max-w-7xl items-center gap-10 px-[var(--space-page)] py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]">Quality and care</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-heading)] text-3xl font-bold tracking-[-0.04em] text-[var(--color-navy)] sm:text-4xl">Chosen for real life, ready for little hands.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)]">We look closely at the feel, function, and finish of every item. The result is a collection that works hard in the background, leaving more space for the moments that matter.</p>
        </div>
        <div className="rounded-[var(--radius-card)] bg-[var(--color-navy)] p-8 text-white shadow-[var(--shadow-lifted)] sm:p-10">
          <p className="font-[var(--font-heading)] text-2xl font-bold">&ldquo;The best essentials are the ones you reach for without thinking.&rdquo;</p>
          <p className="mt-5 text-sm font-semibold text-[var(--color-mint)]">The Little Haven promise</p>
        </div>
      </PageReveal>
    </div>
  );
}