"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000"
];

export default function HeroSection() {
  return (
    <section className="relative pt-10 pb-10 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/30 text-blue-400 text-sm font-medium mb-8">
          <Sparkles className="size-4" />
          <span>The Future of Project Architecture</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
          Architect Your Next <br />
          <span className="text-blue-500">Big Idea</span> in Seconds.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Don't waste hours on boilerplate and planning. DevArchify AI generates 
          complete blueprints, database schemas, and folder structures instantly.
        </p>

        {/* Swiper Slider with Border Effect */}
        <div className="max-w-4xl mx-auto mb-12 p-1 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="rounded-[20px] overflow-hidden">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full h-[300px] md:h-[500px]"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt="Banner" className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Start Building Free <ArrowRight className="size-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-700 bg-transparent text-white hover:bg-slate-900 transition-all">
            View Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
}