import PerfumeCard from "../(dashboard)/components/PerfumeCard";
import { IProduct } from "../libs/types";

interface IProps {
  perfumes: IProduct[];
}
function Perfumes({ perfumes }: IProps) {
  return (
    <div>
      {" "}
      {perfumes?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {perfumes.map((perfume) => (
            <PerfumeCard perfume={perfume} key={perfume.id} />
          ))}
        </div>
      ) : (
        <h1 className="font-cairo text-3xl font-bold text-red-900 w-full justify-center text-center">
          لا توجد اي عطور حتي الآن
        </h1>
      )}
    </div>
  );
}

export default Perfumes;
