import { IOffer } from "@/app/libs/types";
import { FaWhatsapp } from "react-icons/fa6";

interface IProps {
  offer: IOffer;
}
function OfferCardSlide({ offer }: IProps) {
  const WHATSAPPNUMBER = process.env.NEXT_PUBLIC_WHATSAPPNUMBER;

  const handleWhatsApp = () => {
    const msg = `مرحبًا، أريد عرض ${offer.description}`;

    const url = `https://wa.me/${WHATSAPPNUMBER}?text=${encodeURIComponent(
      msg,
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="relative group overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100">
        <img
          src={offer.imageUrl || ""}
          alt={offer.description}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Ribbon */}
        <div className="absolute top-4 -left-10 bg-red-600 text-white text-[10px] font-bold font-almarai px-12 py-1 rotate-[-35deg] shadow-md">
          {offer.availability ? offer.badge : "نفذت الكمية"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-center absolute bottom-0 w-2/3">
        {/* Button */}
        {offer.availability && (
          <button
            onClick={handleWhatsApp}
            className="hidden group-hover:flex mt-4 w-full  items-center justify-center gap-2 rounded-md bg-slate-100 text-black py-2.5 text-sm font-medium hover:bg-green-500 transition-all duration-300"
          >
            <FaWhatsapp className="text-base" />
            اطلب الآن
          </button>
        )}
      </div>
    </div>
  );
}

export default OfferCardSlide;
