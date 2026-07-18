import { BorderCard } from "./ui/BorderCard";

// স্টেপসগুলোকে এখানে ফাংশনের বাইরে বা ভেতরে ডিক্লেয়ার করুন
const steps = [
  { id: "01", title: "Input Idea", desc: "Share your project concept with our AI." },
  { id: "02", title: "Generate", desc: "Get full stack architecture instantly." },
  { id: "03", title: "Build & Refine", desc: "Use the chat agent to iterate faster." },
];

export default function HowItWorks() {
  return (
    <section className="py-10 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <BorderCard key={step.id} className="h-full">
              <div className="flex flex-col items-center text-center">
                
                {/* আইকন/নম্বর জুম ইফেক্ট */}
                <div className="size-16 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-2xl font-bold mb-6 transition-transform duration-500 group-hover:scale-110">
                  {step.id}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </BorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}