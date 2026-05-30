import PerfumesClient from "@/app/components/PerfumesClient";
import PerfumeCardSkeleton from "@/app/components/Skelton/PerfumeCardSkeleton";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/app/libs/prisma";

const getCachedPerfumes = unstable_cache(
  async (page: number) => {
    try {
      return await prisma.product.findMany({
        orderBy: { rate: "asc" },
        take: 6,
        skip: (page - 1) * 6,
      });
    } catch (err) {
      return [];
    }
  },
  ["perfumes-cache"],
  {
    revalidate: 10,
    tags: ["perfumes"],
  },
);

export default async function PerfumesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  try {
    const page = Number((await searchParams).page) || 1;
    const perfumes = await getCachedPerfumes(page);
    const fullPerfumes = await prisma.product.findMany({
      orderBy: { rate: "desc" },
    });
    const totalPages = await prisma.product.count();
    // if (!perfumes) return <PerfumesPageSkelton />;
    return (
      <PerfumesClient
        fullPerfumes={fullPerfumes}
        initialPerfumes={perfumes}
        totalPages={totalPages}
      />
    );
  } catch (err) {
    // return <PerfumesPageSkelton />;
  }
}
