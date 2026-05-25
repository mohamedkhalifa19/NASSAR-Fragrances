"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setIsNewPerfume } from "@/app/store/features/perfume/perfume";
function PerfumesDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const addNewPerfume = () => {
    dispatch(setIsNewPerfume(true));
  };
  return (
    <div className="container w-full h-full p-4 ">
      <Button
        onClick={addNewPerfume}
        className="bg-indigo-600 h-12 font-almarai font-semibold text-lg text-white"
      >
        <Plus className="text-white text-lg" /> إضافة عطر جديد
      </Button>
      <div className="mt-10">
        <h1 className="font-cairo text-lg font-bold text-gray-800 border-b-2 inline-flex border-b-yellow-400">
          قائمة العطور الخاصة بك
        </h1>
      </div>
    </div>
  );
}

export default PerfumesDashboard;
