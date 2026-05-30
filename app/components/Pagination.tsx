"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

interface IProps {
  pages: number;
  rowsBerPage: number;
}
export function PaginationDemo({ pages, rowsBerPage }: IProps) {
  const length = Math.ceil(pages / rowsBerPage);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("page")) setPage(1);
  }, [searchParams]);
  const handlePrev = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const value = page > 1 ? page - 1 : 1;
    setPage(value);
    router.refresh();
    router.push(`?page=${value}`);
  };
  const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const value = page < length ? page + 1 : 1;
    setPage(value);
    router.refresh();
    router.push(`?page=${value}`);
  };
  if (length > 1)
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={`bg-black cursor-pointer hover:!text-white text-white font-tajawal text-center flex items-center ${page === 1 && "pointer-events-none bg-gray-400 text-gray-200"}`}
            />
          </PaginationItem>
          <div className="mx-8 spx flex items-center">
            {" "}
            {Array.from({ length: length }).map((_, idx) => (
              <PaginationItem
                key={idx}
                className={`${idx + 1 === page ? "text-indigo-600 bg-black rounded-md h-8" : ""}`}
              >
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(idx + 1);
                    router.refresh();
                    router.push(`?page=${idx + 1}`);
                  }}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={`${page === length && "pointer-events-none !bg-gray-400 !text-gray-200"} bg-black cursor-pointer hover:!text-white text-white font-tajawal text-center flex items-center`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  return;
}
