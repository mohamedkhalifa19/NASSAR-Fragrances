import PerfumeCard from "./PerfumeCard";
import { IProduct } from "@/app/libs/types";

interface IProps {
  isFilterationSidebarOpen: boolean;
  perfumes: IProduct[] | null;
}

function Perfumes({ isFilterationSidebarOpen, perfumes }: IProps) {
  return (
    <div className="container mx-auto mt-10 px-5 lg:px-0">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isFilterationSidebarOpen ? "md:grid-cols-2" : "md:grid-cols-3"
        } gap-8`}
      >
        {perfumes &&
          perfumes.map((perfume) => (
            <PerfumeCard perfume={perfume} key={perfume.id} />
          ))}
      </div>
    </div>
  );
}

export default Perfumes;
