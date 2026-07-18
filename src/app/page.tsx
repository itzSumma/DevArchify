import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Stats/>
      {/* বাকি সেকশনগুলো এখানে যোগ করুন */}
    </main>
  );
}