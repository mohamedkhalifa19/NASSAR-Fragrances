import SkeletonBox from "./SkeletonBox";

export default function OfferCardSlideSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100">
        <SkeletonBox className="h-[220px] w-full rounded-none" />

        {/* Gradient overlay — matches real card */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Ribbon placeholder — same position/rotation as real card */}
        <SkeletonBox className="absolute top-4 -left-10 h-5 w-32 -rotate-[35deg]" />
      </div>

      {/* Button placeholder — same absolute positioning as real card */}
      <div className="absolute bottom-0 w-2/3 p-4">
        <SkeletonBox
          className="h-10 w-full rounded-md"
          style={{ animationDelay: "0.1s" }}
        />
      </div>
    </div>
  );
}
