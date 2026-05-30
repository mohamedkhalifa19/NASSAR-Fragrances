"use client";
import { INews } from "@/app/libs/types";
import { CalendarDays } from "lucide-react";
import { redirect } from "next/navigation";

interface IProps {
  news: INews;
}

function NewsCard({ news }: IProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div
      onClick={() => redirect(`/news/${news.id}`)}
      className="bg-white my-2 w-full max-w-md h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-[220px] overflow-hidden">
        <img
          src={news.imageUrl || ""}
          alt={news.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        <span className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold font-almarai px-3 py-1 rounded-md">
          أخبار
        </span>
      </div>

      {/* Content */}
      <div className="p-5 text-right flex-1 flex flex-col" dir="rtl">
        {/* Title */}
        <h2 className="text-[#1a1a2e] md:text-xl line-clamp-1  font-bold font-cairo leading-snug mb-3">
          {news.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500  text-sm font-almarai leading-relaxed  line-clamp-3">
          {news.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 text-gray-400 text-sm font-almarai flex-row-reverse justify-end mt-auto">
          <CalendarDays className="w-4 h-4" />
          <span>{formatDate(news.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
