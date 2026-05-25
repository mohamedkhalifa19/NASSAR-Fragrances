import SkeletonBox from "./SkeletonBox";

export default function OfferCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100">
        <SkeletonBox className="h-[220px] w-full rounded-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Ribbon */}
        <SkeletonBox className="absolute top-4 -left-10 h-5 w-32 -rotate-[35deg]" />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        {/* Description — two lines to mimic Arabic text block */}
        <SkeletonBox className="h-4 w-full mb-2 rounded-md" />
        <SkeletonBox
          className="h-4 w-3/4 ml-auto rounded-md"
          style={{ animationDelay: "0.1s" }}
        />

        {/* Button */}
        <SkeletonBox
          className="mt-4 h-10 w-full rounded-xl"
          style={{ animationDelay: "0.15s" }}
        />
      </div>
    </div>
  );
}
