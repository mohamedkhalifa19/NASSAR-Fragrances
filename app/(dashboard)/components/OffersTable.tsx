import { prisma } from "@/app/libs/prisma";
import { IOffer } from "@/app/libs/types";
import { OffersDataTable } from "./OffersDataTable";
import OffersDashboard from "./offers-dashboard";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";

async function OffersTable() {
  try {
    const data: IOffer[] = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return (
      <>
        <OffersDashboard />
        <OffersDataTable data={data} />
      </>
    );
  } catch (err) {
    return (
      <>
        <DashboardSkeleton />
        <TableSkeleton />
      </>
    );
  }
}

export default OffersTable;
