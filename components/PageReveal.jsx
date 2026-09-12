"use client";

import { motion } from "framer-motion";

export default function PageReveal({ children, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={className}>
      {children}
    </motion.div>
  );
}