export default function ExploreSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-slate-800 bg-slate-950 p-6"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="h-5 w-20 rounded-lg bg-slate-800" />
            <div className="h-4 w-10 rounded bg-slate-800" />
          </div>

          <div className="mb-2 h-5 w-3/4 rounded bg-slate-800" />
          <div className="mb-1 h-4 w-full rounded bg-slate-800" />
          <div className="mb-4 h-4 w-2/3 rounded bg-slate-800" />

          <div className="mb-4 flex gap-1.5">
            <div className="h-5 w-14 rounded-md bg-slate-800" />
            <div className="h-5 w-16 rounded-md bg-slate-800" />
            <div className="h-5 w-12 rounded-md bg-slate-800" />
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="h-3 w-24 rounded bg-slate-800" />
            <div className="h-3 w-20 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
