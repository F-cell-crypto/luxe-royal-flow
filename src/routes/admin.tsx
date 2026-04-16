import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus, type Order } from "@/lib/orders";
import { ArrowRight, Package, TrendingUp, Clock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const refresh = () => setOrders(getOrders());

  const toggleStatus = (id: string, status: Order["status"]) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const todayOrders = orders.filter(o => {
    const d = new Date(o.timestamp);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });

  const todayRevenue = todayOrders.reduce((s, o) => s + o.price, 0);
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const exportCSV = () => {
    const headers = ["رقم الطلب", "الاسم", "الهاتف", "الولاية", "العرض", "السعر", "الحالة", "التاريخ"];
    const rows = orders.map(o => [
      o.id, o.fullName, o.phone, o.wilaya,
      o.offer === "single" ? "سوار واحد" : "سواران",
      o.price.toString(), o.status, o.date,
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `luxe-aura-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusLabel: Record<string, string> = {
    pending: "قيد الانتظار",
    shipped: "تم الشحن",
    delivered: "تم التوصيل",
  };

  const nextStatus: Record<string, Order["status"]> = {
    pending: "shipped",
    shipped: "delivered",
    delivered: "pending",
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold gold-text">لوحة التحكم</h1>
          <Link to="/" className="text-sm text-primary flex items-center gap-1 hover:underline">
            الصفحة الرئيسية <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card luxury-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm">إيرادات اليوم</span>
            </div>
            <div className="text-2xl font-bold gold-text">{todayRevenue.toLocaleString()} دج</div>
          </div>
          <div className="bg-card luxury-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm">طلبات اليوم</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{todayOrders.length}</div>
          </div>
          <div className="bg-card luxury-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm">إجمالي الطلبات</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{orders.length}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(["all", "pending", "shipped", "delivered"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === s ? "gold-gradient text-primary-foreground font-bold" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s === "all" ? "الكل" : statusLabel[s]}
            </button>
          ))}
          <button onClick={exportCSV} className="mr-auto px-4 py-2 rounded-full text-sm luxury-border text-primary hover:bg-secondary transition-colors">
            تصدير Excel 📥
          </button>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">لا توجد طلبات بعد</div>
          )}
          {filtered.sort((a, b) => b.timestamp - a.timestamp).map(o => (
            <div key={o.id} className="bg-card luxury-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{o.fullName}</span>
                  <span className="text-xs text-muted-foreground">#{o.id}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {o.phone} · {o.wilaya} · {o.offer === "single" ? "سوار واحد" : "سواران"} · {o.price} دج
                </div>
                <div className="text-xs text-muted-foreground">{o.date}</div>
              </div>
              <button
                onClick={() => toggleStatus(o.id, nextStatus[o.status])}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  o.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                  o.status === "shipped" ? "bg-blue-500/20 text-blue-400" :
                  "bg-green-500/20 text-green-400"
                }`}
              >
                {statusLabel[o.status]} ←
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
