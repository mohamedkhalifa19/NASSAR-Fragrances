import { Suspense } from "react";
import OffersDashboard from "../../components/offers-dashboard";
import OffersTable from "../../components/OffersTable";
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
        {/* TABLE + DASHBOARD */}
        <OffersTable />
      </Suspense>
    </div>
  );
}

export default page;
