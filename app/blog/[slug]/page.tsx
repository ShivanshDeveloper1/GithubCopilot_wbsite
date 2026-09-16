import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogs";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Context) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Little Haven Journal`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Context) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-[var(--space-page)] py-12 sm:py-20">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-navy)] hover:text-[var(--color-pink)] transition-colors"
      >
        <ArrowLeft size={16} /> Back to journal
      </Link>

      {/* Meta tags */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[var(--color-navy)] px-3 py-1 text-xs font-bold text-white">
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
          <Calendar size={14} /> {post.publishedAt}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
          <Clock size={14} /> {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
        {post.title}
      </h1>

      {/* Author info */}
      <div className="mt-6 flex items-center gap-3 border-b border-[var(--color-border)] pb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-mint)] font-bold text-[var(--color-navy)]">
          {post.author.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--color-foreground)]">
            {post.author.name}
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            {post.author.role}
          </p>
        </div>
      </div>

      {/* Banner image */}
      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Body */}
      <div className="prose prose-navy max-w-none mt-10 text-base leading-relaxed text-[var(--color-foreground)]">
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
          {post.description}
        </p>
        <div className="mt-6 whitespace-pre-line leading-8">
          {post.content}
        </div>
      </div>
    </article>
  );
}