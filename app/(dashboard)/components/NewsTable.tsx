import { INews } from "@/app/libs/types";
import { NewsDataTable } from "./NewsDataTable";
import NewsDashboard from "./news-dashboard";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";

interface IProps {
  data: INews[];
}
async function NewsTable({ data }: IProps) {
  try {
    return (
      <>
        <NewsDashboard />
        <NewsDataTable data={data} />
      </>
    );
  } catch (err) {
    return (
      <>
        {" "}
        <DashboardSkeleton />
        <TableSkeleton />
      </>
    );
  }
}

export default NewsTable;
