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
import { setIsDeletePerfume } from "@/app/store/features/perfume/perfume";
import { deleteProduct } from "@/app/actions/product.actions";
import { toast } from "sonner";

function DeleteProduct() {
  const dispatch = useDispatch();
  const perfume = useSelector((state: RootState) => state.perfume);
  const { selectedPerfume, isDeletePerfume } = perfume;

  const isAvailable = (selectedPerfume?.stockQuantity ?? 0) > 0;

  const handleCancel = () => {
    dispatch(setIsDeletePerfume(false));
  };

  const handleDelete = () => {
    if (selectedPerfume) deleteProduct(selectedPerfume?.id);
    handleCancel();
    toast(
      <p className="flex items-center text-red-500 font-almarai text-[15px] tracking-widest">
        تم حذف العطر{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
  };

  return (
    <Modal isOpen={isDeletePerfume}>
      <div
        dir="rtl"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top section ── */}
        <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-6 text-center">
          {/* Trash icon with pink circle bg */}
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 size={36} className="text-red-500" />
          </div>

          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-2xl font-extrabold text-stone-900 font-cairo">
              حذف المنتج
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-500 font-cairo leading-relaxed max-w-xs mx-auto">
              هل أنت متأكد من حذف المنتج &quot;{selectedPerfume?.name}&quot;؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* ── Product preview card ── */}
        <div className="mx-6 mb-6 flex items-center justify-between gap-4 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
          {/* Text info */}
          <div className="flex flex-col gap-1 text-right">
            <span className="font-extrabold text-stone-900 text-base font-cairo">
              {selectedPerfume?.name}
            </span>
            <span className="text-sm text-stone-500 font-cairo">
              السعر:{" "}
              <span className="font-bold text-stone-700">
                {selectedPerfume?.discountPrice?.toLocaleString("ar-SA")} ج.م
              </span>
            </span>
            <span className="text-sm font-cairo">
              الحالة:{" "}
              <span
                className={`font-bold ${
                  isAvailable ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {isAvailable ? "متوفر" : "غير متوفر"}
              </span>
            </span>
          </div>

          {/* Product image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0">
            {selectedPerfume?.imageUrl ? (
              <img
                src={selectedPerfume.imageUrl}
                alt={selectedPerfume.name}
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
            حذف المنتج
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteProduct;
