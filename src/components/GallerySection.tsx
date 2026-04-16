import { motion } from "framer-motion";
import braceletDetail from "@/assets/bracelet-detail.jpg";
import unboxing from "@/assets/unboxing.jpg";
import lifestyle from "@/assets/bracelet-lifestyle.jpg";
import { Star } from "lucide-react";

const reviews = [
  { name: "سارة م.", text: "سوار رائع والعلبة فاخرة جداً! أنصح الجميع بالتجربة 💛", stars: 5 },
  { name: "أمين ب.", text: "اشتريته كهدية لخطيبتي وفرحت بزاف. الجودة ممتازة!", stars: 5 },
  { name: "نورهان ل.", text: "التوصيل كان سريع والتغليف فاخر. شكراً Luxe Aura ✨", stars: 5 },
];

export default function GallerySection() {
  return (
    <section className="py-20 px-4 bg-card" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 gold-text"
        >
          آراء عملائنا
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">+500 عميل سعيد عبر الجزائر</p>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background luxury-border rounded-xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">{r.text}</p>
              <p className="text-sm text-muted-foreground font-bold">— {r.name}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-center mb-8 text-foreground flex items-center justify-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          شاهدونا على إنستغرام
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {[braceletDetail, unboxing, lifestyle].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-xl overflow-hidden luxury-border"
            >
              <img src={img} alt="Luxe Aura" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" width={640} height={640} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
