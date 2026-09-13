"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger child cards by 100ms each
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-muted)]">
        <p>No products found in the collection.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div 
          key={product.id || product.name} 
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}