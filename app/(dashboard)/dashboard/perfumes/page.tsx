import PerfumesTable from "../../components/PerfumesTable";
import { Suspense } from "react";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
import PerfumesDashboardClient from "../../components/perfumes-dashboard-client";
import { prisma } from "@/app/libs/prisma";
import { IProduct } from "@/app/libs/types";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page ?? 1);
  const totalPages = await prisma.product.count();
  const data: IProduct[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * 8,
    take: 8,
  });
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
        {" "}
        {/* TABLE + DASHBOARD */}
        <PerfumesDashboardClient totalPages={totalPages} data={data} />
      </Suspense>
    </div>
  );
}

export default page;
