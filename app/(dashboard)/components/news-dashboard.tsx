"use client";
import { AppDispatch } from "@/app/store";
import { setIsNewNews } from "@/app/store/features/news/news";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

function NewsDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const addNewNews = () => {
    dispatch(setIsNewNews(true));
  };
  return (
    <div className="container w-full h-full p-4 ">
      <Button
        onClick={addNewNews}
        className="bg-indigo-600 h-12 font-almarai font-semibold text-lg text-white"
      >
        <Plus className="text-white text-lg" /> إضافةخبر جديد
      </Button>
      <div className="mt-10">
        <h1 className="font-cairo text-lg font-bold text-gray-800 border-b-2 inline-flex border-b-yellow-400">
          قائمة الأخبار الخاصة بك
        </h1>
      </div>
    </div>
  );
}

export default NewsDashboard;
