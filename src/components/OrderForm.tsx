import { useState } from "react";
import { motion } from "framer-motion";
import { WILAYAS } from "@/lib/algerian-wilayas";
import {
  validatePhone,
  checkDuplicateOrder,
  saveOrder,
  sendToGoogleSheets,
  sendWhatsAppCustomer,
  generateOrderId,
  type Order,
} from "@/lib/orders";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function OrderForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [offer, setOffer] = useState<"single" | "bundle">("single");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const price = offer === "single" ? 3200 : 5200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) { setError("الرجاء إدخال الاسم الكامل"); return; }
    if (!validatePhone(phone)) { setError("رقم الهاتف غير صحيح — يجب أن يبدأ بـ 05, 06 أو 07 ويتكون من 10 أرقام"); return; }
    if (!wilaya) { setError("الرجاء اختيار الولاية"); return; }
    if (checkDuplicateOrder(phone)) { setError("⚠️ لقد قمت بتسجيل طلب مؤخراً بهذا الرقم. الرجاء الانتظار 10 دقائق."); return; }

    setLoading(true);
    const order: Order = {
      id: generateOrderId(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      wilaya,
      offer,
      price,
      status: "pending",
      timestamp: Date.now(),
      date: new Date().toLocaleString("ar-DZ"),
    };

    saveOrder(order);
    await sendToGoogleSheets(order);
    setSuccess(true);
    setLoading(false);

    setTimeout(() => sendWhatsAppCustomer(order), 1500);
  };

  if (success) {
    return (
      <section id="order-form" className="py-20 px-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-card luxury-border rounded-3xl p-10 text-center"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">تم تسجيل طلبك بنجاح! 🎉</h3>
          <p className="text-muted-foreground">سيتم تحويلك إلى واتساب لتأكيد طلبك...</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-20 px-4" dir="rtl">
      <div className="max-w-md mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-2 gold-text"
        >
          اطلب الآن
        </motion.h2>
        <p className="text-center text-muted-foreground mb-8">التوصيل مجاني 🚚 — الدفع عند الاستلام</p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-card luxury-border rounded-3xl p-8 space-y-5 luxury-shadow"
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOffer("single")}
              className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                offer === "single" ? "luxury-border bg-secondary" : "border-border bg-background"
              }`}
            >
              <div className="text-sm text-muted-foreground line-through">4500 دج</div>
              <div className="text-lg font-bold text-foreground">3200 دج</div>
              <div className="text-xs text-muted-foreground">سوار واحد</div>
            </button>
            <button
              type="button"
              onClick={() => setOffer("bundle")}
              className={`flex-1 p-4 rounded-xl border text-center transition-all relative ${
                offer === "bundle" ? "luxury-border bg-secondary" : "border-border bg-background"
              }`}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                الأكثر طلباً
              </span>
              <div className="text-sm text-muted-foreground line-through">6400 دج</div>
              <div className="text-lg font-bold text-foreground">5200 دج</div>
              <div className="text-xs text-muted-foreground">سواران</div>
            </button>
          </div>

          <input
            type="text"
            placeholder="الاسم الكامل"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full bg-input text-foreground rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="tel"
            placeholder="رقم الهاتف (مثال: 0561234567)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-input text-foreground rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            dir="ltr"
          />

          <select
            value={wilaya}
            onChange={e => setWilaya(e.target.value)}
            className="w-full bg-input text-foreground rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          <div className="luxury-border rounded-xl p-4 text-center">
            <div className="text-sm text-muted-foreground">المبلغ الإجمالي</div>
            <div className="text-2xl font-bold gold-text">{price} دج</div>
            <div className="text-xs text-primary">✅ التوصيل مجاني + علبة فاخرة هدية</div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive p-3 rounded-xl text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-gradient text-primary-foreground py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "جاري التسجيل..." : "تأكيد الطلب 🛒"}
          </button>

          <p className="text-center text-xs text-muted-foreground">💳 الدفع عند الاستلام — بدون مخاطرة</p>
        </motion.form>
      </div>
    </section>
  );
}
