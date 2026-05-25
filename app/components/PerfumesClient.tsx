"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/app/libs/types";
import FilterationSidebar from "@/app/components/FilterationSidebar";
import Perfumes from "@/app/(dashboard)/components/Perfumes";
import SearchBar from "./SearchBar";

interface PerfumesClientProps {
  initialPerfumes: IProduct[];
}

export default function PerfumesClient({
  initialPerfumes,
}: PerfumesClientProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [filteredPerfumes, setFilteredPerfumes] =
    useState<IProduct[]>(initialPerfumes);
  const [searchTxt, setSearchTxt] = useState(search);
  const [isFilterationSidebarOpen, setIsFilterationSidebarOpen] =
    useState(false);

  useEffect(() => {
    setSearchTxt(search);
    if (search) {
      const filtered = initialPerfumes.filter((p) =>
        p.name.trim().toLowerCase().startsWith(search.trim().toLowerCase()),
      );
      setFilteredPerfumes(filtered);
    } else {
      setFilteredPerfumes(initialPerfumes);
    }
  }, [search, initialPerfumes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTxt(value);

    if (!value.trim()) {
      setFilteredPerfumes(initialPerfumes);
    } else {
      const filtered = initialPerfumes.filter((p) =>
        p.name.trim().toLowerCase().startsWith(value.trim().toLowerCase()),
      );
      setFilteredPerfumes(filtered);
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

        {filteredPerfumes.length > 0 ? (
          <Perfumes
            isFilterationSidebarOpen={isFilterationSidebarOpen}
            perfumes={filteredPerfumes}
          />
        ) : (
          <div className="h-screen flex justify-center items-center">
            <h1 className="font-cairo text-xl md:text-3xl font-bold text-red-900">
              لا توجد اي عطور حتي الآن
            </h1>
          </div>
        )}
      </main>

      {isFilterationSidebarOpen && (
        <FilterationSidebar
          perfumes={initialPerfumes}
          setFilteredPerfumes={setFilteredPerfumes}
          isFilterationSidebarOpen={isFilterationSidebarOpen}
          setIsFilterationSidebarOpen={setIsFilterationSidebarOpen}
        />
      )}

      {isFilterationSidebarOpen && (
        <div className="z-19 inset-0 fixed top-0 right-0 bg-black/80" />
      )}
    </div>
  );
}
