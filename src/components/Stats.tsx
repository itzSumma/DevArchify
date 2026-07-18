import { BorderCard } from "./ui/BorderCard";

const stats = [
  { label: "Blueprints Generated", value: "500+" },
  { label: "Active Developers", value: "200+" },
  { label: "Tech Stacks", value: "10+" },
  { label: "Accuracy", value: "99%" },
];

export default function Stats() {
  return (
    <section className="py-10 bg-slate-950">
      <div className="container mx-auto px-4">
        
        {/* সেকশন হেডলাইন */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Trusted by <span className="text-blue-500">Developers</span>
          </h2>
          <p className="text-slate-400">Our platform's impact in numbers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <BorderCard key={i} className="bg-slate-900/50">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-4xl font-black text-white mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </BorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}