import { cn } from "@/lib/utils";

interface BorderCardProps {
  children: React.ReactNode;
  className?: string;
  // আমরা একটি নতুন প্রপস নিচ্ছি যাতে কার্ডের ভেতরের আইকন বা টপ এলিমেন্টটি সিলেক্ট করা যায়
  iconClassName?: string; 
}

export function BorderCard({ children, className, iconClassName }: BorderCardProps) {
  return (
    <div className={cn(
      "group relative rounded-2xl bg-slate-950 p-[1px] overflow-hidden transition-all duration-300", 
      className
    )}>
      
      {/* ১. স্থায়ী বর্ডার (যা সবসময় দেখা যাবে) */}
      <div className="absolute inset-0 rounded-2xl border border-slate-800 pointer-events-none" />

      {/* ২. হোভার করলে মুভ করা বর্ডার লাইন */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-spin pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, transparent 120deg)',
        }}
      />

      {/* ৩. ভেতরের কন্টেন্ট কভার (যাতে বর্ডারের কালার ভেতরে না যায়) */}
      <div className="relative bg-slate-950 rounded-[15px] h-full w-full">
        <div className="p-8 text-white">
          {/* 
            4. আইকন/টপ কন্টেন্ট জুম ইফেক্ট 
            এখানে আমরা iconClassName ব্যবহার করে আইকনটিকে ধরছি 
          */}
          {iconClassName && (
            <div className={cn(
              "mb-6 inline-block transition-transform duration-500 ease-in-out group-hover:scale-110",
              iconClassName
            )}>
              {/* 
                 লক্ষ্য করুন: এই ডিভটির ভেতর আপনার মূল আইকনটি থাকবে।
                 আমরা ধরে নিচ্ছি আপনার children (HowItWorks.tsx থেকে আসা) এর প্রথম অংশটিই আইকন।
              */}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
}