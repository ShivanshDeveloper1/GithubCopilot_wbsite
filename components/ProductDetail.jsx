"use client";

import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }) {
  // Normalize image sources: support both product.images array and single product.image
  const imageList =
    product?.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const addProductToCart = () => {
    Array.from({ length: quantity }).forEach(() => addToCart(product));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-[var(--space-page)] py-12 sm:py-20"
    >
      <motion.div variants={itemVariants}>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)]"
        >
          <motion.div
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </motion.div>
          Back to collection
        </Link>
      </motion.div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Product Gallery Section */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--color-mint)]/15 p-4 shadow-[var(--shadow-lifted)] sm:p-6"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full object-contain"
              />
            </AnimatePresence>
          </motion.div>

          {/* Thumbnails (Only rendered if there are multiple images) */}
          {imageList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 bg-[var(--color-mint)]/10 p-1 transition-all ${
                    selectedImage === img
                      ? "border-[var(--color-pink)] shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div variants={itemVariants}>
          <motion.p
            variants={itemVariants}
            className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-pink)]"
          >
            {product.category}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-4 font-[var(--font-heading)] text-4xl font-bold tracking-[-0.05em] text-[var(--color-navy)] sm:text-5xl"
          >
            {product.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 font-[var(--font-heading)] text-2xl font-bold text-[var(--color-pink)]"
          >
            ₹{product.price}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-base leading-8 text-[var(--color-muted)]"
          >
            {product.description}
          </motion.p>

          {/* Quantity Selector */}
          <motion.div
            variants={itemVariants}
            className="mt-8 border-y border-[var(--color-border)] py-6"
          >
            <p className="text-sm font-bold text-[var(--color-navy)]">
              Quantity
            </p>
            <div className="mt-3 flex w-fit items-center gap-1 rounded-[var(--radius-button)] border border-[var(--color-border)] p-1">
              <motion.button
                type="button"
                aria-label="Decrease quantity"
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                className="flex size-9 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"
              >
                <Minus size={16} aria-hidden="true" />
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.span
                  key={quantity}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-9 text-center text-sm font-bold text-[var(--color-navy)]"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>

              <motion.button
                type="button"
                aria-label="Increase quantity"
                whileTap={{ scale: 0.85 }}
                onClick={() => setQuantity((value) => value + 1)}
                className="flex size-9 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-pink)]"
              >
                <Plus size={16} aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={addProductToCart}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-colors sm:w-auto sm:min-w-64 ${
                isAdded
                  ? "bg-emerald-600"
                  : "bg-[var(--color-pink)] hover:bg-[var(--color-pink)]/90"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Check size={18} aria-hidden="true" />
                    <span>Added to Cart!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ShoppingBag size={18} aria-hidden="true" />
                    </motion.div>
                    <span>Add to cart</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-xs text-[var(--color-muted)]"
          >
            Free delivery on orders over $50.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}