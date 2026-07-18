"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000", // Coding
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000", // Development
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000"  // Tech
];

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-sm font-medium mb-6">
          <Sparkles className="size-4" />
          <span>The Future of Project Architecture</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-6">
          Architect Your Next <br />
          <span className="text-blue-600">Big Idea</span> in Seconds.
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Don't waste hours on boilerplate and planning. DevArchify AI generates 
          complete blueprints, database schemas, and folder structures instantly.
        </p>

        {/* Swiper Slider Section */}
        <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-[300px] md:h-[400px]"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="Banner" className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base md:text-lg gap-2 bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105">
            Start Building Free <ArrowRight className="size-5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base md:text-lg border-muted-foreground/20 hover:bg-accent transition-all duration-300">
            View Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
}