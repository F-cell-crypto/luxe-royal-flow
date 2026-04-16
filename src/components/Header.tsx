import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-luxury-black/95 backdrop-blur-md luxury-border border-t-0 border-x-0" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between" dir="rtl">
        <h1 className="font-heading text-2xl font-bold gold-text tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          Luxe Aura
        </h1>
        <button
          onClick={scrollToOrder}
          className="gold-gradient text-primary-foreground px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          اطلب الآن
        </button>
      </div>
    </motion.header>
  );
}
