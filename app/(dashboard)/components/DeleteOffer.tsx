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
import { setIsDeleteOffer } from "@/app/store/features/offer/offer";
import { deleteOffer } from "@/app/actions/offer.actions";
import { toast } from "sonner";

function DeleteOffer() {
  const dispatch = useDispatch();
  const { offer } = useSelector((state: RootState) => state);
  const { selectedOffer, isDeleteOffer } = offer;
  const handleCancel = () => {
    dispatch(setIsDeleteOffer(false));
  };

  const handleDelete = () => {
    if (selectedOffer) deleteOffer(selectedOffer?.id);
    dispatch(setIsDeleteOffer(false));
    toast(
      <p className="flex items-center text-red-500 font-almarai text-[15px] tracking-widest">
        تم حذف العرض{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
  };

  return (
    <Modal isOpen={isDeleteOffer}>
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
              حذف العرض
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-500 font-cairo leading-relaxed max-w-xs mx-auto">
              هل أنت متأكد من حذف العرض &quot;{selectedOffer?.description}
              &quot;؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* ── Offer preview card ── */}
        <div className="mx-6 mb-6 flex items-center justify-between gap-4 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
          {/* Text info */}
          <div className="flex flex-col gap-1 text-right">
            {selectedOffer?.badge && (
              <span className="inline-block self-start px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 text-xs font-bold font-cairo">
                {selectedOffer.badge}
              </span>
            )}
            <span className="font-extrabold text-stone-900 text-base font-cairo line-clamp-2">
              {selectedOffer?.description}
            </span>
          </div>

          {/* Offer image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0">
            {selectedOffer?.imageUrl ? (
              <img
                src={selectedOffer.imageUrl}
                alt={selectedOffer.description}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300 text-3xl">
                🧴
              </div>
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
            حذف العرض
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteOffer;
