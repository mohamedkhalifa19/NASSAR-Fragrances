import { INews } from "@/app/libs/types";
import { NewsDataTable } from "./NewsDataTable";
import { prisma } from "@/app/libs/prisma";
import NewsDashboard from "./news-dashboard";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";

async function NewsTable() {
  try {
    const data: INews[] = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
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
