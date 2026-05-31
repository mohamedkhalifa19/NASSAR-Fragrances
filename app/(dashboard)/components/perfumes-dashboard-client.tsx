import { PaginationDemo } from "@/app/components/Pagination";
import PerfumesTable from "./PerfumesTable";
import { IProduct } from "@/app/libs/types";

interface IProps {
  totalPages: number;
  data: IProduct[];
}
function PerfumesDashboardClient({ totalPages, data }: IProps) {
  return (
    <div>
      {" "}
      <PerfumesTable data={data} />
      <div className="my-8">
        {" "}
        <PaginationDemo pages={totalPages} rowsBerPage={8} />
      </div>{" "}
    </div>
  );
}

export default PerfumesDashboardClient;
