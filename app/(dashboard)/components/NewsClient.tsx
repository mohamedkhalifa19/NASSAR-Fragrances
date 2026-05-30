"use client";
import { INews } from "@/app/libs/types";
import NewsCard from "./NewsCard";
import { PaginationDemo } from "@/app/components/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  news: INews[];
  totalPages: number;
}
function NewsClient({ news, totalPages }: IProps) {
  const router = useRouter();
  useEffect(() => {
    router.push("?page=1");
  }, []);
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-3 py-4 grid-cols-1">
        {news.map((n) => (
          <NewsCard news={n} key={n.id} />
        ))}
      </div>
      <div className="my-12">
        <PaginationDemo pages={totalPages} rowsBerPage={6} />
      </div>
    </div>
  );
}

export default NewsClient;
