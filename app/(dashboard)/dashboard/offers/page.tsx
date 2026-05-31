import { Suspense } from "react";
import OffersDashboard from "../../components/offers-dashboard";
import OffersTable from "../../components/OffersTable";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
import { IOffer } from "@/app/libs/types";
import { prisma } from "@/app/libs/prisma";
import OffersDashboardClient from "../../components/offers-dashboard-client";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page ?? 1);
  const totalPages = await prisma.offer.count();
  const data: IOffer[] = await prisma.offer.findMany({
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
        {/* TABLE + DASHBOARD */}
        <OffersDashboardClient data={data} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

export default page;
