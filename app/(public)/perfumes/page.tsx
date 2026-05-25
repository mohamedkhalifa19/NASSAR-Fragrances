import { unstable_cache } from "next/cache";
import { getPerfumes } from "@/app/data";
import PerfumesClient from "@/app/components/PerfumesClient";
import PerfumeCardSkeleton from "@/app/components/Skelton/PerfumeCardSkeleton";
import { Suspense } from "react";

const getCachedPerfumes = unstable_cache(
  async () => getPerfumes(),
  ["perfumes-cache"],
  {
    revalidate: 10,
    tags: ["perfumes"],
  },
);

export default async function PerfumesPage() {
  let perfumes = await getCachedPerfumes();
  return (
    <Suspense
      fallback={
        <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <PerfumeCardSkeleton />
          <PerfumeCardSkeleton />
          <PerfumeCardSkeleton />
        </div>
      }
    >
      <PerfumesClient initialPerfumes={perfumes} />;
    </Suspense>
  );
}
