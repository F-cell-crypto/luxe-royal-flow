import { motion } from "framer-motion";
import { Gem, Gift, Truck } from "lucide-react";

const features = [
  { icon: Gem, title: "جودة فاخرة", desc: "مواد عالية الجودة مع لمسة ذهبية أنيقة تدوم طويلاً" },
  { icon: Gift, title: "تجربة فتح استثنائية", desc: "علبة فاخرة + كيس هدايا راقي — هدية ملكية متكاملة" },
  { icon: Truck, title: "توصيل سريع", desc: "توصيل مجاني لـ 69 ولاية عبر كامل التراب الوطني" },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gold-text"
        >
          لماذا Luxe Aura؟
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card luxury-border rounded-2xl p-8 text-center hover:luxury-shadow transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                <f.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
