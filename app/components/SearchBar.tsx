"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFilter } from "react-icons/fa";

interface SearchBarProps {
  searchTxt: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredCount: number;
  onFilterClick: () => void;
}

export default function SearchBar({
  searchTxt,
  handleSearch,
  filteredCount,
  onFilterClick,
}: SearchBarProps) {
  return (
    <div className="w-full gap-5 flex items-center justify-center">
      {/* زرار الفلتر */}
      <Button className="space-x-1" onClick={onFilterClick}>
        <FaFilter />
        <span className="md:text-lg font-cairo font-bold md:inline-block">
          تصفية
        </span>
      </Button>

      {/* Input البحث */}
      <div className="flex-1 bg-white text-black rounded-md ml-5">
        <Input
          type="text"
          className="w-full p-5 font-almarai text-xs md:text-lg"
          placeholder="ابحث عن العطر الذي تريده"
          onChange={handleSearch}
          value={searchTxt}
        />
      </div>

      {/* عداد العطور */}
      <h2
        className="text-black hidden md:block font-bold font-tajawal mx-2"
        dir="rtl"
      >
        <span>عدد العطور المتوفرة</span> <span>({filteredCount})</span>
      </h2>
    </div>
  );
}
