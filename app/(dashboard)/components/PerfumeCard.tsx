"use client";
import { IOrder, IProduct } from "@/app/libs/types";
import { AppDispatch } from "@/app/store";
import { addToCart } from "@/app/store/features/cart/cart";
import { Badge } from "@/components/ui/badge";
import { CgShoppingCart } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa6";
import { useDispatch } from "react-redux";

interface IProps {
  perfume: IProduct;
}

function PerfumeCard({ perfume }: IProps) {
  const dispatch = useDispatch<AppDispatch>();

  const addToShoppingCart = (itm: IProduct) => {
    const {
      stockQuantity,
      badge,
      discountPrice,
      imageFile,
      createdAt,
      updatedAt,
      ...rest
    } = itm;

    dispatch(
      addToCart({
        ...rest,
        quantity: 1,
      }),
    );
  };

  const WHATSAPPNUMBER = process.env.NEXT_PUBLIC_WHATSAPPNUMBER;

  const handleWhatsApp = () => {
    const msg = `مرحبًا، أريد شراء عطر ${perfume.name} الذي سعره ${perfume.price} جنيه`;

    const url = `https://wa.me/${WHATSAPPNUMBER}?text=${encodeURIComponent(
      msg,
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="group overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100">
        <img
          src={perfume.imageUrl ?? ""}
          alt={perfume.name}
          loading="lazy"
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badge */}
        {perfume.stockQuantity > 0 ? (
          <Badge className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow">
            {perfume.badge || "جديد"}
          </Badge>
        ) : (
          <div className="absolute text-center top-4 -left-10 bg-red-600 text-white text-[10px] font-bold font-almarai px-12 py-1 rotate-[-35deg] shadow-md">
            {"نفذت الكمية"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(Math.floor(perfume.rate || 0))].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-yellow-400"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {/* Name */}
        <h3 className="text-lg font-bold text-stone-900 font-cairo line-clamp-1">
          {perfume.name}
        </h3>
        {/* Price row */}{" "}
        <div className="flex items-center justify-center gap-3 mb-5">
          {" "}
          <span className="text-yellow-600 font-bold text-lg">
            {" "}
            {perfume.price} جنيه
          </span>{" "}
          {perfume.discountPrice != 0 && (
            <span className="text-gray-700 font-bold line-through text-sm">
              {" "}
              {perfume.discountPrice} جنيه
            </span>
          )}
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-black text-white py-2.5 text-[15px]  font-medium hover:bg-green-500 transition-all font-almarai duration-300"
          >
            <FaWhatsapp className="text-base" />
            اطلب
          </button>

          {perfume.stockQuantity > 0 && (
            <button
              onClick={() => addToShoppingCart(perfume)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-100 text-stone-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300"
            >
              <CgShoppingCart className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfumeCard;
