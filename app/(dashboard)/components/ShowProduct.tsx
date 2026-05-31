"use client";

import { useState } from "react";
import { X, Edit2, Tag, Package, CheckCircle } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  setIsEditPerfume,
  setIsShowPerfume,
} from "@/app/store/features/perfume/perfume";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex flex-row-reverse gap-0.5"
      aria-label={`${rating} من 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span
            key={star}
            className={`text-lg leading-none ${
              filled
                ? "text-amber-400"
                : half
                  ? "text-amber-300"
                  : "text-stone-300"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function ShowProduct() {
  const dispatch = useDispatch();
  const perfume = useSelector((state: RootState) => state.perfume);
  const { isShowPerfume, selectedPerfume } = perfume;

  const [activeImg, setActiveImg] = useState(0);
  // Support both single imageUrl and an images array
  const images: string[] = (selectedPerfume as any)?.images?.length
    ? (selectedPerfume as any).images
    : selectedPerfume?.imageUrl
      ? [selectedPerfume.imageUrl]
      : [];

  const handleClose = () => {
    setActiveImg(0);
    dispatch(setIsShowPerfume(false));
  };

  const handleEdit = () => {
    dispatch(setIsEditPerfume(true));
    handleClose();
  };

  // Derive availability from stockQuantity
  const isAvailable = (selectedPerfume?.stockQuantity ?? 0) > 0;
  const availabilityLabel = isAvailable ? "متوفر" : "غير متوفر";

  const metaRows = [
    {
      icon: <Tag size={13} className="stroke-amber-600 shrink-0" />,
      label: "التصنيف",
      value: selectedPerfume?.category,
      valueClass: "text-stone-900",
    },
    {
      icon: <Package size={13} className="stroke-amber-600 shrink-0" />,
      label: "الكمية المتاحة",
      value: selectedPerfume?.stockQuantity,
      valueClass: "text-stone-900",
    },
    {
      icon: <CheckCircle size={13} className="stroke-amber-600 shrink-0" />,
      label: "حالة التوفر",
      value: availabilityLabel,
      valueClass: isAvailable ? "text-emerald-600" : "text-red-500",
    },
  ];

  return (
    <Modal isOpen={isShowPerfume}>
      <div
        dir="rtl"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              تفاصيل العطر
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
                  alt={selectedPerfume?.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                // Placeholder when no image is provided
                <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">
                  🧴
                </div>
              )}
            </div>

            {/* Thumbnails — only show if multiple images */}
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
            {selectedPerfume?.badge && (
              <span className="self-end inline-flex items-center bg-stone-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                {selectedPerfume.badge}
              </span>
            )}

            {/* Name */}
            <h3 className="text-3xl font-extrabold text-stone-900 leading-tight text-right font-cairo">
              {selectedPerfume?.name}
            </h3>

            {/* Rating */}
            <div className="flex flex-row-reverse items-center gap-2 justify-end">
              <StarRating rating={selectedPerfume?.rate ?? 0} />
              <span className="text-sm font-bold text-stone-800">
                {selectedPerfume?.rate}
              </span>
            </div>

            {/* Pricing card */}
            <div className="flex items-center justify-around bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-stone-400 font-semibold">
                  السعر بعد الخصم
                </span>
                <span className="text-2xl font-extrabold text-stone-900 leading-tight">
                  {selectedPerfume?.discountPrice?.toLocaleString("ar-SA")}
                  <span className="text-sm font-medium text-stone-400 mr-1">
                    ج.م
                  </span>
                </span>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-stone-400 font-semibold">
                  السعر الأصلي
                </span>
                <span className="text-base font-semibold text-stone-400 line-through">
                  {selectedPerfume?.price?.toLocaleString("ar-SA")} ج.م
                </span>
              </div>
            </div>

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
            className="flex-1 max-w-full py-2.5 px-2 rounded-xl bg-stone-100 text-stone-700 font-bold text-sm border border-stone-200 hover:bg-stone-200 transition-colors font-cairo"
          >
            إغلاق
          </button>
          <button
            onClick={handleEdit}
            className="md:flex-1 max-w-full py-2.5 px-2 rounded-xl bg-stone-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-stone-900/25 hover:bg-stone-800 transition-colors font-cairo"
          >
            <Edit2 size={14} />
            تعديل المنتج
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ShowProduct;
