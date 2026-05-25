import SkeletonBox from "./SkeletonBox";

export default function DashboardSkeleton() {
  return (
    <div className="container w-full h-full p-4">
      {/* Button */}
      <SkeletonBox className="h-12 w-44 rounded-md" />

      <div className="mt-10">
        {/* Section title */}
        <SkeletonBox className="h-6 w-52 rounded-md border-b-2 border-b-yellow-100" />
      </div>
    </div>
  );
}
