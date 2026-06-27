import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyCRKSection } from "@/components/sections/WhyCRKSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <WhyCRKSection />
      <QualitySection />
      <CTASection />
    </>
  );
}
