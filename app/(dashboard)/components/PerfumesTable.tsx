import { prisma } from "@/app/libs/prisma";
import { IProduct } from "@/app/libs/types";
import { PerfumesDataTable } from "./PerfumesDataTable";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
import PerfumesDashboard from "./Perfumes-dashboard";

interface IProps {
  data: IProduct[];
}
async function PerfumesTable({ data }: IProps) {
  try {
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
