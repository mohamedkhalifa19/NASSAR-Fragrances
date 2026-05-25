import { Suspense } from "react";
import NewsTable from "../../components/NewsTable";
import DashboardSkeleton from "@/app/components/Skelton/DashboardSkeleton";
import TableSkeleton from "@/app/components/Skelton/TableSkeleton";

function page() {
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
        
        <NewsTable />
      </Suspense>
    </div>
  );
}

export default page;
