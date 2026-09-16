"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const CATEGORIES = ["All", "Baby Diapers", "Sanitary Pads", "Baby Wipes"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" } 
  },
};

export default function ProductGrid({ products = [] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on active category and search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Controls */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-4 py-2 text-xs font-bold transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "bg-white text-[var(--color-navy)] border border-[var(--color-border)] hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 rounded-full bg-[var(--color-navy)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[var(--color-border)] bg-white py-2 pl-10 pr-9 text-xs text-[var(--color-navy)] outline-none transition-all placeholder:text-gray-400 focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] py-16 text-center">
          <p className="text-sm font-semibold text-[var(--color-navy)]">No products found</p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Try adjusting your search query or selecting a different category filter.
          </p>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-bold text-[var(--color-pink)] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory + searchQuery}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id || product._id || product.name}
                variants={cardVariants}
                layout
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}