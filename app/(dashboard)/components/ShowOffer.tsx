"use client";

import { useState } from "react";
import { X, Edit2, Package, CheckCircle } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  setIsEditOffer,
  setIsShowOffer,
} from "@/app/store/features/offer/offer";
// import { setIsEditOffer } from "@/app/store/features/offer/offer";

function ShowOffer() {
  const dispatch = useDispatch();
  const { offer } = useSelector((state: RootState) => state);
  const { selectedOffer, isShowOffer } = offer;
  const [activeImg, setActiveImg] = useState(0);

  const images: string[] = (selectedOffer as any)?.images?.length
    ? (selectedOffer as any).images
    : selectedOffer?.imageUrl
      ? [selectedOffer.imageUrl]
      : [];

  const handleClose = () => {
    setActiveImg(0);
    dispatch(setIsShowOffer(false));
  };

  const handleEdit = () => {
    handleClose();
    dispatch(setIsEditOffer(true));
  };

  const isAvailable = selectedOffer?.availability;

  const metaRows = [
    {
      icon: <CheckCircle size={13} className="stroke-amber-600 shrink-0" />,
      label: "حالة التوفر",
      value: isAvailable ? "متوفر" : "غير متوفر",
      valueClass: isAvailable ? "text-emerald-600" : "text-red-500",
    },
  ];
  return (
    <Modal isOpen={isShowOffer}>
      <div
        dir="rtl"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              تفاصيل العرض
            </AlertDialogTitle>
          </AlertDialogHeader>
          <button
            onClick={handleClose}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
            aria-label="إغلاق"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {/* Left — Gallery */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group">
              {images.length > 0 ? (
                <img
                  src={images[activeImg]}
                  alt={selectedOffer?.description}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">
                  🧴
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-150 ${
                      i === activeImg
                        ? "border-amber-500 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`صورة ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-4">
            {/* Badge */}
            {selectedOffer?.badge && (
              <span className="self-end inline-flex items-center bg-stone-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                {selectedOffer.badge}
              </span>
            )}

            {/* Description */}
            {selectedOffer?.description && (
              <p className="text-sm text-stone-500 w-full  font-cairo text-right leading-relaxed break-words">
                {" "}
                {selectedOffer.description}
              </p>
            )}

            {/* Meta rows */}
            <div className="flex flex-col">
              {metaRows.map(({ icon, label, value, valueClass }, idx) => (
                <div key={label}>
                  <div className="flex flex-row-reverse items-center justify-between py-2.5">
                    <span className={`text-sm font-bold ${valueClass}`}>
                      {value}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                      {icon}
                      {label}
                    </span>
                  </div>
                  {idx < metaRows.length - 1 && (
                    <div className="h-px bg-stone-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-stone-100 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="flex-1 max-w-[180px] py-2.5 px-5 rounded-xl bg-stone-100 text-stone-700 font-bold text-sm border border-stone-200 hover:bg-stone-200 transition-colors font-cairo"
          >
            إغلاق
          </button>
          <button
            onClick={handleEdit}
            className="flex-1 max-w-[180px] py-2.5 px-5 rounded-xl bg-stone-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-stone-900/25 hover:bg-stone-800 transition-colors font-cairo"
          >
            <Edit2 size={14} />
            تعديل العرض
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ShowOffer;
