import News from "@/app/components/News";
import NewsCardSkeleton from "@/app/components/Skelton/NewsCardSkeleton";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page) || 1;

  return (
    <Suspense
      fallback={
        <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </div>
      }
    >
      <News page={page} />
    </Suspense>
  );
}

export default page;
