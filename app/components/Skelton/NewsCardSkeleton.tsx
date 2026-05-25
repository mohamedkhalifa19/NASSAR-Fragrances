import SkeletonBox from "./SkeletonBox";

export default function NewsCardSkeleton() {
  return (
    <div className="bg-white my-2 w-full max-w-md h-full rounded-2xl overflow-hidden shadow-md flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[220px] overflow-hidden">
        <SkeletonBox className="w-full h-full rounded-none" />

        {/* Badge */}
        <SkeletonBox className="absolute top-4 right-4 h-7 w-14 rounded-md" />
      </div>

      {/* Content */}
      <div className="p-5 text-right flex-1 flex flex-col">
        {/* Title — two lines mimic Arabic bold heading */}
        <SkeletonBox className="h-5 w-full mb-2 rounded-md" />
        <SkeletonBox
          className="h-5 w-2/3 mr-auto mb-4 rounded-md"
          style={{ animationDelay: "0.08s" }}
        />

        {/* Description — 3 lines mimic body text */}
        <SkeletonBox
          className="h-3.5 w-full mb-2 rounded-md"
          style={{ animationDelay: "0.1s" }}
        />
        <SkeletonBox
          className="h-3.5 w-full mb-2 rounded-md"
          style={{ animationDelay: "0.15s" }}
        />
        <SkeletonBox
          className="h-3.5 w-4/5 mr-auto mb-5 rounded-md"
          style={{ animationDelay: "0.2s" }}
        />

        {/* Footer — date with calendar icon */}
        <div className="flex items-center gap-2 flex-row-reverse justify-end mt-auto">
          <SkeletonBox
            className="h-4 w-4 rounded-sm"
            style={{ animationDelay: "0.1s" }}
          />
          <SkeletonBox
            className="h-4 w-28 rounded-md"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </div>
  );
}
