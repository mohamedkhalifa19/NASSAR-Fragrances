import { Suspense } from "react";
import NewsTable from "../../components/NewsTable";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
import NewsDashboardClient from "../../components/news-dashboard-client";
import { INews } from "@/app/libs/types";
import { prisma } from "@/app/libs/prisma";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page ?? 1);

  const data: INews[] = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * 8,
    take: 8,
  });
  const totalPages = await prisma.offer.count();
  return (
    <div className=" w-full h-full  bg-white/10 ">
      <Suspense
        fallback={
          <>
            <DashboardSkeleton />
            <TableSkeleton />
          </>
        }
      >
        <NewsDashboardClient data={data} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

export default page;
