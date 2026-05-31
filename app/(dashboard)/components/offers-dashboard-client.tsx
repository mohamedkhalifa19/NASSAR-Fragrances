import { PaginationDemo } from "@/app/components/Pagination";
import { IOffer } from "@/app/libs/types";
import OffersTable from "./OffersTable";

interface IProps {
  totalPages: number;
  data: IOffer[];
}
function OffersDashboardClient({ totalPages, data }: IProps) {
  return (
    <div>
      {" "}
      <OffersTable data={data} />
      <div className="my-8">
        {" "}
        <PaginationDemo pages={totalPages} rowsBerPage={8} />
      </div>{" "}
    </div>
  );
}

export default OffersDashboardClient;
