export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-a-calming-bedtime-routine",
    title: "Building a Calming Evening Routine for Little Ones",
    description: "Simple, science-backed steps to ease transition into peaceful sleep without night-time tears.",
    category: "Parenting Tips",
    publishedAt: "Sep 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop",
    content: `Creating a calming bedtime routine is essential for young children. Here are practical ways to ensure smooth sleep transitions...`,
    author: {
      name: "Dr. Sarah Jenkins",
      role: "Pediatric Specialist",
    },
  },
  {
    slug: "choosing-gentle-skincare-ingredients",
    title: "What to Look For in Sensitive Skin Care Products",
    description: "How to read ingredients labels and avoid common irritants in everyday baby care lotions.",
    category: "Product Care",
    publishedAt: "Sep 05, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    content: `Sensitive skin requires minimal, pure formulas. Avoid heavy synthetic fragrances and look for natural soothing agents...`,
    author: {
      name: "Elena Rostova",
      role: "Skincare Specialist",
    },
  },
  {
    slug: "organizing-the-nursery-drawer",
    title: "The Essentials Drawer: Organizing Daily Essentials",
    description: "Keep daily changing routines quick and easy with this simple drawer setup method.",
    category: "Guides",
    publishedAt: "Aug 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
    content: `A clutter-free nursery makes late-night changes much stress-free. Partition your drawers into dedicated utility slots...`,
    author: {
      name: "Maya Patel",
      role: "Interior & Lifestyle",
    },
  },
];