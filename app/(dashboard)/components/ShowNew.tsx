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
import { setIsShowOffer } from "@/app/store/features/offer/offer";
import { setIsEditNews, setIsShowNews } from "@/app/store/features/news/news";
// import { setIsEditOffer } from "@/app/store/features/offer/offer";

function ShowNew() {
  const dispatch = useDispatch();
  const { news } = useSelector((state: RootState) => state);
  const { selectedNews, isShowNews } = news;
  const [activeImg, setActiveImg] = useState(0);

  const images: string[] = (selectedNews as any)?.images?.length
    ? (selectedNews as any).images
    : selectedNews?.imageUrl
      ? [selectedNews.imageUrl]
      : [];

  const handleClose = () => {
    setActiveImg(0);
    dispatch(setIsShowNews(false));
  };

  const handleEdit = () => {
    handleClose();
    dispatch(setIsEditNews(true));
  };

  return (
    <Modal isOpen={isShowNews}>
      <div
        dir="rtl"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              تفاصيل الخبر
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
                  alt={selectedNews?.title}
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
          <div className="space-y-4">
            <div>
              {selectedNews?.title && (
                <h2 className="text-sm text-black font-bold w-full  font-cairo text-right leading-relaxed break-words">
                  {" "}
                  {selectedNews.title}
                </h2>
              )}
            </div>
            {/* Description */}
            <div>
              {selectedNews?.description && (
                <p className="text-sm text-stone-500 w-full font-semibold  font-tajawal  text-right leading-relaxed break-words">
                  {" "}
                  {selectedNews.description}
                </p>
              )}
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
            تعديل الخبر
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ShowNew;
