import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { BLOG_POSTS } from "@/lib/blogs";

export const metadata = {
  title: "Blog & Guides | Little Haven",
  description: "Thoughtful stories, practical guides, and expert advice for everyday care.",
};

export default function BlogPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-[var(--space-page)] py-12 sm:py-20">
      {/* Header */}
      <SectionHeading
        eyebrow="Our Journal"
        title="Stories & practical care guides"
        description="Thoughtful advice, expert tips, and quiet moments for daily family life."
      />

      {/* Featured Post Hero */}
      {featuredPost && (
        <article className="mt-12 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lifted)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="relative aspect-[16/10] w-full lg:col-span-7 lg:h-full">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 sm:p-10 lg:col-span-5 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="rounded-[var(--radius-button)] bg-[var(--color-navy)] px-3 py-1 text-xs font-bold text-white">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                  <Clock size={14} /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-3xl">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="hover:text-[var(--color-pink)] transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {featuredPost.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
                <div>
                  <p className="text-xs font-bold text-[var(--color-foreground)]">
                    {featuredPost.author.name}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {featuredPost.author.role}
                  </p>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-pink)] hover:gap-3 transition-all"
                >
                  Read Story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Article Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {regularPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)]"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font-bold text-[var(--color-navy)] border border-[var(--color-border)]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                    <Calendar size={13} /> {post.publishedAt}
                  </span>
                </div>

                <h3 className="mt-4 font-[var(--font-heading)] text-lg font-bold leading-snug text-[var(--color-foreground)]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[var(--color-pink)] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">
                  {post.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                <span className="text-xs font-medium text-[var(--color-muted)]">
                  {post.readTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-navy)] hover:text-[var(--color-pink)] transition-colors"
                >
                  Read article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}