import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <Services />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
