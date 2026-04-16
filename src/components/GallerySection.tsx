import { motion } from "framer-motion";
import braceletDetail from "@/assets/bracelet-detail.jpg";
import unboxing from "@/assets/unboxing.jpg";
import lifestyle from "@/assets/bracelet-lifestyle.jpg";
import { Star, Instagram } from "lucide-react";

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
          <Instagram className="w-6 h-6 text-primary" />
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
