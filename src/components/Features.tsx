import { Bot, Database, FileCode, Zap } from "lucide-react";
import { BorderCard } from "./ui/BorderCard";

const features = [
  { title: "Smart Architecture", icon: FileCode, desc: "Instant high-level project blueprints." },
  { title: "Database Schema", icon: Database, desc: "Automated schema generation for MongoDB." },
  { title: "Agentic Chat", icon: Bot, desc: "Context-aware AI for technical guidance." },
  { title: "Lightning Fast", icon: Zap, desc: "From idea to structure in seconds." },
];

export default function Features() {
  return (
    <section className="py-10 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">
            Core <span className="text-blue-500">Features</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to build scalable architectures in one single platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <BorderCard key={i} className="transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col h-full">
              
                <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 transition-transform duration-500 group-hover:scale-110">
                  <f.icon className="size-6 text-blue-500" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </BorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}