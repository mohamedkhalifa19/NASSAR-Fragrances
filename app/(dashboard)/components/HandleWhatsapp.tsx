"use client";
import { IOffer } from "@/app/libs/types";
import { FaWhatsapp } from "react-icons/fa6";

function HandleWhatsapp({ offer }: { offer: IOffer }) {
  const WHATSAPPNUMBER = process.env.NEXT_PUBLIC_WHATSAPPNUMBER;

  const handleWhatsApp = () => {
    const msg = `مرحبًا، أريد عرض ${offer.description}`;

    const url = `https://wa.me/${WHATSAPPNUMBER}?text=${encodeURIComponent(
      msg,
    )}`;

    window.open(url, "_blank");
  };
  return (
    <div className="w-full">
      {offer.availability && (
        <button
          onClick={handleWhatsApp}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white py-2.5 text-sm font-medium hover:bg-green-500 transition-all duration-300"
        >
          <FaWhatsapp className="text-base" />
          اطلب الآن
        </button>
      )}
    </div>
  );
}

export default HandleWhatsapp;
