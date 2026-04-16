import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function getEndTime() {
  const stored = localStorage.getItem("luxe_countdown_end");
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const end = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("luxe_countdown_end", end.toString());
  return end;
}

export default function CountdownOffer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const endTime = getEndTime();
    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center gold-gradient rounded-3xl p-10"
      >
        <h2 className="text-3xl font-bold text-primary-foreground mb-2">🔥 عرض محدود!</h2>
        <p className="text-primary-foreground/80 mb-6">توصيل مجاني + علبة فاخرة هدية — العرض ينتهي قريباً</p>

        <div className="flex justify-center gap-4 mb-8">
          {[
            { label: "ساعة", value: timeLeft.h },
            { label: "دقيقة", value: timeLeft.m },
            { label: "ثانية", value: timeLeft.s },
          ].map((t, i) => (
            <div key={i} className="bg-luxury-black/30 rounded-xl px-5 py-3 min-w-[70px]">
              <div className="text-3xl font-bold text-primary-foreground">{String(t.value).padStart(2, "0")}</div>
              <div className="text-xs text-primary-foreground/70">{t.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToOrder}
          className="bg-luxury-black text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-luxury-dark transition-colors"
        >
          اطلب الآن قبل فوات الأوان
        </button>
      </motion.div>
    </section>
  );
}
