const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_DzobYu133ZQXU6WRqg3amNHCvpAAWFD6VztjNDABexVRG9gA_-GmuZWQRei4EiJ62A/exec";
const ADMIN_WHATSAPP = "213668181939";

export interface Order {
  id: string;
  fullName: string;
  phone: string;
  wilaya: string;
  offer: "single" | "bundle";
  price: number;
  status: "pending" | "shipped" | "delivered";
  timestamp: number;
  date: string;
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, "");
  return /^0[567]\d{8}$/.test(cleaned);
}

export function checkDuplicateOrder(phone: string): boolean {
  const orders: Order[] = JSON.parse(localStorage.getItem("luxe_orders") || "[]");
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  return orders.some(o => o.phone === phone && o.timestamp > tenMinAgo);
}

export function saveOrder(order: Order): void {
  const orders: Order[] = JSON.parse(localStorage.getItem("luxe_orders") || "[]");
  orders.push(order);
  localStorage.setItem("luxe_orders", JSON.stringify(orders));
}

export function getOrders(): Order[] {
  return JSON.parse(localStorage.getItem("luxe_orders") || "[]");
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx !== -1) {
    orders[idx].status = status;
    localStorage.setItem("luxe_orders", JSON.stringify(orders));
  }
}

export async function sendToGoogleSheets(order: Order): Promise<void> {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: order.fullName,
        phone: order.phone,
        wilaya: order.wilaya,
        offer: order.offer === "single" ? "سوار واحد" : "سواران",
        price: order.price,
        date: order.date,
        status: "قيد الانتظار",
      }),
    });
  } catch (e) {
    console.error("Webhook error:", e);
  }
}

export function sendWhatsAppCustomer(order: Order): void {
  const msg = `✨ *Luxe Aura - تأكيد الطلب* ✨

مرحباً ${order.fullName}،
شكراً لطلبك من Luxe Aura!

📦 *تفاصيل الطلب:*
▪️ المنتج: ${order.offer === "single" ? "سوار Royal Bracelet" : "سواران Royal Bracelet"}
▪️ السعر: ${order.price} دج
▪️ التوصيل: مجاني 🎁
▪️ الولاية: ${order.wilaya}

📞 سنتواصل معك قريباً لتأكيد الطلب.
شكراً لثقتك! 💛`;

  const encoded = encodeURIComponent(msg);
  const url = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP}&text=${encoded}`;
  window.location.assign(url);
}

export function sendWhatsAppAdmin(order: Order): void {
  const msg = `🔔 *طلب جديد - Luxe Aura*

👤 الاسم: ${order.fullName}
📱 الهاتف: ${order.phone}
📍 الولاية: ${order.wilaya}
📦 العرض: ${order.offer === "single" ? "سوار واحد - 3200 دج" : "سواران - 5200 دج"}
💰 المبلغ: ${order.price} دج
🕐 التاريخ: ${order.date}`;

  const encoded = encodeURIComponent(msg);
  const url = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP}&text=${encoded}`;
  window.open(url, "_blank");
}

export function generateOrderId(): string {
  return "LA-" + Date.now().toString(36).toUpperCase();
}
