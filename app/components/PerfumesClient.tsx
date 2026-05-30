"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/app/libs/types";
import FilterationSidebar from "@/app/components/FilterationSidebar";
import Perfumes from "@/app/(dashboard)/components/Perfumes";
import SearchBar from "./SearchBar";
import { PaginationDemo } from "./Pagination";
import PerfumeCardSkeleton from "./Skelton/PerfumeCardSkeleton";

interface PerfumesClientProps {
  initialPerfumes: IProduct[];
  fullPerfumes: IProduct[];
  totalPages: number;
}

export default function PerfumesClient({
  initialPerfumes,
  totalPages,
  fullPerfumes,
}: PerfumesClientProps) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const router = useRouter();

  const [filteredPerfumes, setFilteredPerfumes] =
    useState<IProduct[]>(initialPerfumes);
  const [originalPerfumes, setOriginalPerfumes] =
    useState<IProduct[]>(initialPerfumes);
  const [FullPerfumes, setFullPerfumes] = useState<IProduct[]>(initialPerfumes);
  const [searchTxt, setSearchTxt] = useState(search);
  const [isFilterationSidebarOpen, setIsFilterationSidebarOpen] =
    useState(false);
  // Filteration choices
  const [category, setCategory] = useState("للجنسين");
  const [fromPrice, setFromPrice] = useState<string>("");
  const [toPrice, setToPrice] = useState<string>("");
  const reset = () => {
    setFilteredPerfumes(initialPerfumes);
    setCategory("للجنسين");
    setFromPrice("");
    setToPrice(`${Math.max(...initialPerfumes.map((p) => p.price || 0))}`);
    setSort("top-rating");
    setIsFilterationSidebarOpen(false);
  };
  const [sort, setSort] = useState("top-rating");

  useEffect(() => {
    setFilteredPerfumes(initialPerfumes);
    setOriginalPerfumes(initialPerfumes);
    setToPrice(`${Math.max(...initialPerfumes.map((p) => p.price || 0))}`);
  }, [initialPerfumes]);
  useEffect(() => {
    router.push("?page=1");
    setFullPerfumes(fullPerfumes);
    setToPrice(`${Math.max(...fullPerfumes.map((p) => p.price || 0))}`);
  }, []);
  useEffect(() => {
    setSearchTxt(searchParams?.get("search") ?? "");
    if (search.trim()) {
      const filtered = fullPerfumes.filter((p) =>
        p.name.trim().toLowerCase().startsWith(search.trim().toLowerCase()),
      );
      setFilteredPerfumes(filtered);
    } else {
      setFilteredPerfumes(initialPerfumes);
    }
  }, [searchParams?.get("search")]);
  const Sorting = (data: IProduct[]) => {
    if (sort === "top-rating") return data.sort((a, b) => b.rate - a.rate);
    else if (sort === "high-to-low")
      return data.sort((a, b) => b.price - a.price);
    else return data.sort((a, b) => a.price - b.price);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTxt(value);

    if (!value.trim()) {
      setFilteredPerfumes(originalPerfumes);
      router.push(`?page=1`);
      router.refresh();
      reset();
    } else {
      let filtered = [];
      if (category === "للجنسين") {
        filtered = FullPerfumes.filter(
          (p) =>
            p.name
              .trim()
              .toLowerCase()
              .startsWith(value.trim().toLowerCase()) &&
            p.price >= +fromPrice &&
            p.price <= +toPrice,
        );
      } else {
        filtered = FullPerfumes.filter(
          (p) =>
            p.name
              .trim()
              .toLowerCase()
              .startsWith(value.trim().toLowerCase()) &&
            p.price >= +fromPrice &&
            p.price <= +toPrice &&
            category === p.category,
        );
      }

      setFilteredPerfumes(Sorting(filtered));
    }
  };
  return (
    <div className="w-full h-full mt-[100px] flex transition-all duration-75 ease-in">
      <main
        className={`text-black w-full h-full flex-1 transition-all duration-75 ease-in ${
          isFilterationSidebarOpen ? "mr-[25%] md:px-7" : ""
        }`}
      >
        <div className="container flex flex-col justify-center items-center mx-auto">
          <SearchBar
            searchTxt={searchTxt}
            handleSearch={handleSearch}
            filteredCount={filteredPerfumes.length}
            onFilterClick={() => setIsFilterationSidebarOpen(true)}
          />
        </div>
        <Perfumes
          isFilterationSidebarOpen={isFilterationSidebarOpen}
          perfumes={filteredPerfumes}
          totalPages={totalPages}
        />
      </main>

      {isFilterationSidebarOpen && (
        <FilterationSidebar
          perfumes={initialPerfumes}
          setFilteredPerfumes={setFilteredPerfumes}
          isFilterationSidebarOpen={isFilterationSidebarOpen}
          setIsFilterationSidebarOpen={setIsFilterationSidebarOpen}
          category={category}
          setCategory={setCategory}
          fromPrice={fromPrice}
          setFromPrice={setFromPrice}
          toPrice={toPrice}
          setToPrice={setToPrice}
          sort={sort}
          setSort={setSort}
          reset={reset}
          Sorting={Sorting}
        />
      )}

      {isFilterationSidebarOpen && (
        <div className="z-19 inset-0 fixed top-0 right-0 bg-black/80" />
      )}
    </div>
  );
}
