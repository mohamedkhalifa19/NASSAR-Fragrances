import { PaginationDemo } from "@/app/components/Pagination";
import { INews } from "@/app/libs/types";
import OffersTable from "./OffersTable";
import NewsTable from "./NewsTable";

interface IProps {
  totalPages: number;
  data: INews[];
}
function NewsDashboardClient({ totalPages, data }: IProps) {
  return (
    <div>
      {" "}
      <NewsTable data={data} />
      <div className="my-8">
        {" "}
        <PaginationDemo pages={totalPages} rowsBerPage={8} />
      </div>{" "}
    </div>
  );
}

export default NewsDashboardClient;
