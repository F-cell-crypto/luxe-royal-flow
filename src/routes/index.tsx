import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import CountdownOffer from "@/components/CountdownOffer";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Luxe Aura — سوار Royal Bracelet الفاخر | توصيل مجاني" },
      { name: "description", content: "اكتشف سوار Royal Bracelet من Luxe Aura. جودة فاخرة مع علبة أنيقة وكيس هدايا — توصيل مجاني لكامل الجزائر" },
      { property: "og:title", content: "Luxe Aura — سوار Royal Bracelet الفاخر" },
      { property: "og:description", content: "هدية ملكية متكاملة — سوار فاخر + علبة أنيقة + توصيل مجاني 🇩🇿" },
      { property: "og:type", content: "website" },
    ],
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <CountdownOffer />
      <OrderForm />
      <Footer />
    </div>
  );
}
