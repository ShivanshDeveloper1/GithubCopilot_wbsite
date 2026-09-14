"use client";

import { ArrowUpRight, Check, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  const productUrl = `/products/${product.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lifted)]"
    >
      {/* Clickable Image Container */}
      <Link href={productUrl} className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-mint)]/15 block cursor-pointer">
        <motion.div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
          style={{ backgroundImage: `url(${product.image})` }}
          role="img"
          aria-label={product.name}
        />
        
        {/* Subtle overlay accent on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--color-navy)] backdrop-blur-md shadow-sm">
            {product.tag}
          </span>
        )}

        {/* Interactive Wishlist Heart Button */}
        <motion.button
          type="button"
          onClick={handleToggleWishlist}
          whileTap={{ scale: 0.75 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label={`Save ${product.name} to wishlist`}
          className={`absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-200 shadow-sm ${
            isLiked 
              ? "bg-[var(--color-pink)] text-white" 
              : "bg-white/90 text-[var(--color-navy)] hover:text-[var(--color-pink)]"
          }`}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
          </motion.div>
        </motion.button>
      </Link>

      {/* Card Content Container */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {product.category}
          </p>
          
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-[var(--font-heading)] font-bold text-[var(--color-navy)]">
              <Link href={productUrl} className="transition-colors hover:text-[var(--color-pink)]">
                {product.name}
              </Link>
            </h3>
            <span className="shrink-0 font-bold text-[var(--color-pink)]">  ₹{product.price}</span>
          </div>
        </div>

        {/* Animated Add to Bag Button */}
        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] px-4 py-3 text-sm font-bold transition-all duration-300 ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-[var(--color-background)] text-[var(--color-navy)] hover:bg-[var(--color-pink)] hover:text-white"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isAdded ? (
              <motion.div
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Check size={16} aria-hidden="true" />
                <span>Added!</span>
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={16} aria-hidden="true" />
                <span>Add to bag</span>
                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  );
}