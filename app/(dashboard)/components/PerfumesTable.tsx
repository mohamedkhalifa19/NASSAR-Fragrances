import { prisma } from "@/app/libs/prisma";
import { IProduct } from "@/app/libs/types";
import { PerfumesDataTable } from "./PerfumesDataTable";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
import PerfumesDashboard from "./Perfumes-dashboard";

async function PerfumesTable() {
  try {
    const data: IProduct[] = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return (
      <>
        <PerfumesDashboard />
        <PerfumesDataTable data={data} />
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

export default PerfumesTable;
