import SkeletonBox from "./SkeletonBox";

export default function PerfumeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* Image */}
      <div className="relative overflow-hidden">
        <SkeletonBox className="h-[220px] w-full rounded-none" />

        {/* Gradient overlay — matches real card */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <SkeletonBox className="h-6 w-16 rounded-full animate-[pulse_1.6s_ease-in-out_infinite]" />
        </div>

        {/* Dot indicators — subtle depth hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[1, 0.5, 0.3].map((opacity, i) => (
            <SkeletonBox
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ opacity }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBox
              key={i}
              className="h-3.5 w-3.5 rounded-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Name */}
        <SkeletonBox className="h-5 w-[70%] mx-auto mb-1.5 rounded-md" />
        {/* Sub-name line for depth */}
        <SkeletonBox
          className="h-3.5 w-[45%] mx-auto mb-4 rounded-md"
          style={{ animationDelay: "0.15s" }}
        />

        {/* Price row */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <SkeletonBox className="h-6 w-20 rounded-md" />
          <SkeletonBox
            className="h-4 w-14 rounded-md"
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <SkeletonBox
            className="h-10 flex-1 rounded-xl"
            style={{ animationDelay: "0.05s" }}
          />
          <SkeletonBox
            className="h-10 w-10 shrink-0 rounded-xl"
            style={{ animationDelay: "0.15s" }}
          />
        </div>
      </div>
    </div>
  );
}
