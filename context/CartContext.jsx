"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function getProductId(product) {
  return product.id ?? product.name;
}

function getPrice(product) {
  return typeof product.price === "number" ? product.price : Number.parseFloat(String(product.price).replace(/[^0-9.]/g, "")) || 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    const productId = getProductId(product);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === productId);

      if (existingItem) {
        return currentItems.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }

      return [...currentItems, { ...product, id: productId, price: getPrice(product), quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setItems((currentItems) => currentItems.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (productId) => {
    setItems((currentItems) => currentItems.flatMap((item) => {
      if (item.id !== productId) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems: items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}