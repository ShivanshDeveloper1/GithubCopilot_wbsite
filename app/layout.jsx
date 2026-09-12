import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Little Haven | Gentle care for little moments",
  description: "A friendly baby-care shopping experience for growing families.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <CartProvider>
          <main className="flex-1">{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}