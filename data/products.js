export const products = [
  {
    id: "cloud-soft-swaddle",
    name: "Cloud-soft swaddle",
    category: "Sleep essentials",
    price: "$28",
    tag: "Bestseller",
    image: "/images/product-swaddle.jpg",
    description: "A breathable, cloud-soft layer for peaceful cuddles, naps, and new beginnings.",
  },
  {
    id: "gentle-wash-duo",
    name: "Gentle wash duo",
    category: "Bath time",
    price: "$22",
    tag: "New",
    image: "/images/product-wash.jpg",
    description: "A simple, soothing pair for everyday bath time, made with delicate skin in mind.",
  },
  {
    id: "everyday-bodysuit",
    name: "Everyday bodysuit",
    category: "Little outfits",
    price: "$18",
    tag: "Parent pick",
    image: "/images/product-bodysuit.jpg",
    description: "An easy everyday layer with a soft feel and room for all the growing and exploring ahead.",
  },
  {
    id: "mealtime-starter-set",
    name: "Mealtime starter set",
    category: "Feeding",
    price: "$32",
    tag: "Made easy",
    image: "/images/product-feeding.jpg",
    description: "The thoughtful little set that makes first tastes and everyday meals feel a bit easier.",
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id);
}