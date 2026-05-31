import { prisma } from "@/app/libs/prisma";
import { IOffer } from "@/app/libs/types";
import { OffersDataTable } from "./OffersDataTable";
import OffersDashboard from "./offers-dashboard";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";
interface IProps {
  data: IOffer[];
}
async function OffersTable({ data }: IProps) {
  try {
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
