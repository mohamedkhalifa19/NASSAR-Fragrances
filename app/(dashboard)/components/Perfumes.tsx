"use client";
import { Suspense, useEffect, useState } from "react";
import PerfumeCard from "./PerfumeCard";
import { IProduct } from "@/app/libs/types";
import PerfumeCardSkeleton from "@/app/components/Skelton/PerfumeCardSkeleton";
import { PaginationDemo } from "@/app/components/Pagination";

interface IProps {
  isFilterationSidebarOpen: boolean;
  perfumes: IProduct[] | null;
  totalPages: number;
}

function Perfumes({ isFilterationSidebarOpen, perfumes, totalPages }: IProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    if (perfumes) {
      setData(perfumes);
      setLoading(false);
    }
  }, [perfumes]);
  if (loading)
    return (
      <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <PerfumeCardSkeleton />
        <PerfumeCardSkeleton />
        <PerfumeCardSkeleton />
      </div>
    );
  if (data.length === 0)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="font-cairo text-xl md:text-3xl font-bold text-red-900">
          لا توجد اي عطور حتي الآن
        </h1>
      </div>
    );
  return (
    <div className="container mx-auto mt-10 px-5 lg:px-0">
      <div>
        {
          <Suspense
            fallback={
              <>
                <PerfumeCardSkeleton />
                <PerfumeCardSkeleton />
                <PerfumeCardSkeleton />
              </>
            }
          >
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                isFilterationSidebarOpen ? "md:grid-cols-2" : "md:grid-cols-3"
              } gap-8`}
            >
              {" "}
              {data.map((perfume) => (
                <PerfumeCard perfume={perfume} key={perfume.id} />
              ))}
            </div>
            <div className="my-12">
              {" "}
              <PaginationDemo pages={totalPages} rowsBerPage={5} />
            </div>
          </Suspense>
        }
      </div>
    </div>
  );
}

export default Perfumes;
