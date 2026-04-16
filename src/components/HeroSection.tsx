import { motion } from "framer-motion";
import heroBracelet from "@/assets/hero-bracelet.jpg";

export default function HeroSection() {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" dir="rtl">
      <div className="absolute inset-0">
        <img src={heroBracelet} alt="Royal Bracelet" className="w-full h-full object-cover opacity-50" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-luxury-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4">
            مجموعة حصرية
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gold-text">عيش الأناقة الملكية</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
            هدية ملكية متكاملة — سوار فاخر مع علبة أنيقة وكيس هدايا راقي
          </p>
          <p className="text-muted-foreground text-base mb-10">
            توصيل مجاني لـ 69 ولاية 🇩🇿
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToOrder}
              className="luxury-border bg-secondary text-foreground px-8 py-4 rounded-full text-lg font-bold w-full sm:w-auto"
            >
              <span className="block text-sm text-muted-foreground line-through mb-1">4500 دج</span>
              سوار واحد بـ 3200 دج
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToOrder}
              className="gold-gradient text-primary-foreground px-8 py-4 rounded-full text-lg font-bold animate-pulse-gold w-full sm:w-auto"
            >
              <span className="block text-xs mb-1">🔥 عرض محدود</span>
              سواران بـ 5200 دج بدل 6400 دج
            </motion.button>
          </div>

          <p className="text-primary text-sm mt-4">✨ التوصيل مجاني + العلبة الفاخرة هدية ✨</p>
        </motion.div>
      </div>
    </section>
  );
}
