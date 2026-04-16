import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-border" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="font-heading text-2xl font-bold gold-text mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Luxe Aura
        </h3>
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full luxury-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full luxury-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Luxe Aura — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
