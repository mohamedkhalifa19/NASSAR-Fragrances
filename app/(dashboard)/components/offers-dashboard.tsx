"use client";
import { AppDispatch } from "@/app/store";
import { setIsNewOffer } from "@/app/store/features/offer/offer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

function OffersDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const addNewOffer = () => {
    dispatch(setIsNewOffer(true));
  };

  return (
    <div className="container w-full h-full p-4 ">
      <Button
        onClick={addNewOffer}
        className="bg-indigo-600 h-12 font-almarai font-semibold text-lg text-white"
      >
        <Plus className="text-white text-lg" /> إضافة عرض جديد
      </Button>
      <div className="mt-10">
        <h1 className="font-cairo text-lg font-bold text-gray-800 border-b-2 inline-flex border-b-yellow-400">
          قائمة العروض الخاصة بك
        </h1>
      </div>
    </div>
  );
}

export default OffersDashboard;
