"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setIsDeleteNews } from "@/app/store/features/news/news";
import { deleteNews } from "@/app/actions/news.actions";
import { toast } from "sonner";

function DeleteNew() {
  const dispatch = useDispatch();
  const { news } = useSelector((state: RootState) => state);
  const { selectedNews, isDeleteNews } = news;
  const handleCancel = () => {
    dispatch(setIsDeleteNews(false));
  };

  const handleDelete = () => {
    if (selectedNews) deleteNews(selectedNews?.id);
    dispatch(setIsDeleteNews(false));
    toast(
      <p className="flex items-center text-red-500 font-almarai text-[15px] tracking-widest">
        تم حذف الخبر{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
  };

  return (
    <Modal isOpen={isDeleteNews}>
      <div
        dir="rtl"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top section ── */}
        <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-6 text-center">
          {/* Trash icon with red circle bg */}
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 size={36} className="text-red-500" />
          </div>

          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-2xl font-extrabold text-stone-900 font-cairo">
              حذف الخبر
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-500 font-cairo leading-relaxed max-w-xs mx-auto">
              هل أنت متأكد من حذف الخبر &quot;
              <span className="line-clamp-2">{selectedNews?.title}</span>
              &quot;؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* ── Offer preview card ── */}
        <div className="mx-6 mb-6 flex items-center justify-between gap-4 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
          {/* Offer image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0">
            {selectedNews?.imageUrl ? (
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300 text-3xl">
                🧴
              </div>
            )}
          </div>
          {/* Description */}
          <div>
            {selectedNews?.description && (
              <p className="text-sm line-clamp-3 text-stone-500 w-full font-semibold  font-tajawal  text-right leading-relaxed break-words">
                {" "}
                {selectedNews.description}
              </p>
            )}
          </div>
        </div>

        {/* ── Footer buttons ── */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors font-cairo"
          >
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25 font-cairo"
          >
            حذف الخبر
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteNew;
