import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-sm font-medium mb-8">
          <Sparkles className="size-4" />
          <span>The Future of Project Architecture</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
          Architect Your Next <br />
          <span className="text-blue-600">Big Idea</span> in Seconds.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Don't waste hours on boilerplate and planning. DevArchify AI generates 
          complete blueprints, database schemas, and folder structures instantly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-12 px-8 text-lg gap-2 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20">
            Start Building Free <ArrowRight className="size-5" />
          </Button>
          <Button 
  size="lg" 
  variant="outline" 
  className="h-12 px-8 text-lg bg-transparent border-white/20 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
>
  View Live Demo
</Button>
        </div>
      </div>
    </section>
  );
}