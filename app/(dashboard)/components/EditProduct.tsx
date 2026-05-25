"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setIsEditPerfume } from "@/app/store/features/perfume/perfume";
import { editProduct } from "@/app/actions/product.actions";
import UploadImage from "./UploadImage";
import { toast } from "sonner";
import { IEditProductForm } from "@/app/libs/types";
const CATEGORIES = ["رجالي", "نسائي", "للجنسين"];


function EditProduct() {
  const dispatch = useDispatch();
  const { perfume } = useSelector((state: RootState) => state);
  const { selectedPerfume, isEditPerfume } = perfume;
  const [errors, setErrors] = useState<
    Partial<Record<keyof IEditProductForm, string>>
  >({});
  const [form, setForm] = useState<IEditProductForm>({
    name: selectedPerfume?.name ?? "",
    price: selectedPerfume?.price ?? 0,
    discountPrice: selectedPerfume?.discountPrice ?? 0,
    badge: selectedPerfume?.badge ?? "",
    imageUrl: selectedPerfume?.imageUrl ?? "",
    imageFile: null,
    imagePreview: selectedPerfume?.imageUrl ?? "",
    stockQuantity: selectedPerfume?.stockQuantity ?? 0,
    category: selectedPerfume?.category ?? "",
    rate: selectedPerfume?.rate ?? 0,
  });
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "أدخل سعرًا صحيحًا";
    if (!form.category) newErrors.category = "اختر التصنيف";
    if (Number(form.stockQuantity) < 0) newErrors.stockQuantity = "أدخل الكمية";
    if (!form.rate || Number(form.rate) < 1)
      newErrors.rate = " أدخل التقييم اقل تقييم 1";
    return newErrors;
  };
  useEffect(() => {
    if (!selectedPerfume) return;
    setForm({
      badge: selectedPerfume.badge ?? "",
      stockQuantity: selectedPerfume.stockQuantity ?? 0,
      discountPrice: selectedPerfume.discountPrice ?? 0,
      price: selectedPerfume.price ?? 0,
      name: selectedPerfume.name,
      category: selectedPerfume.category,
      imageUrl: selectedPerfume.imageUrl ?? "",
      imageFile: null,
      imagePreview: selectedPerfume.imageUrl ?? "",
      rate: selectedPerfume.rate,
    });
  }, [selectedPerfume]);
  const handleClose = () => {
    dispatch(setIsEditPerfume(false));
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      setErrors(newErrors);
      return;
    }
    editProduct({ ...selectedPerfume, ...form });
    toast(
      <p className="flex items-center text-green-500 font-almarai text-[15px] tracking-widest">
        تم تعديل العطر{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
    handleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal isOpen={isEditPerfume}>
      <div
        dir="rtl"
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              تعديل المنتج
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
          {/* Left — Image upload */}
          <UploadImage
            folderName="products"
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />

          {/* Right — Form fields */}
          <div className="flex flex-col gap-4">
            {/* الاسم */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                الاسم
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="اسم المنتج"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              {/* السعر */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  السعر
                </label>
                <div className="relative">
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-cairo">
                    ج.م
                  </span>
                </div>
              </div>
              {/* السعر بعد الخصم */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  السعر قبل الخصم
                </label>
                <div className="relative">
                  <input
                    name="discountPrice"
                    type="number"
                    value={form.discountPrice}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-cairo">
                    ج.م
                  </span>
                </div>
              </div>
            </div>
            {/* الكمية */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                الكمية{" "}
              </label>
              <div className="relative">
                <input
                  name="stockQuantity"
                  type="number"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition"
                />
              </div>
            </div>{" "}
            {/* التصنيف */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                التصنيف <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setForm((p) => ({ ...p, category: cat }));
                      setErrors((p) => ({ ...p, category: undefined }));
                    }}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold font-cairo border transition-colors ${
                      form.category === cat
                        ? "bg-stone-900 border-stone-900 text-white"
                        : "bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-red-500 font-cairo">
                  {errors.category}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  الشارة
                </label>
                <input
                  name="badge"
                  type="text"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="وسم العطر"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                    errors.badge
                      ? "border-red-400 bg-red-50"
                      : "border-stone-200 bg-stone-50"
                  }`}
                />
                {errors.badge && (
                  <p className="text-xs text-red-500 font-cairo">
                    {errors.badge}
                  </p>
                )}
              </div>
              {/* التقييم */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  التقييم
                </label>
                <input
                  name="rate"
                  type="number"
                  value={form.rate}
                  onChange={handleChange}
                  placeholder="1"
                  min={1}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                    errors.rate
                      ? "border-red-400 bg-red-50"
                      : "border-stone-200 bg-stone-50"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-stone-100 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="flex-1 max-w-full py-2.5 px-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors font-cairo"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="flex-1 max-w-full py-2.5 px-2 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-lg shadow-stone-900/25 hover:bg-stone-800 transition-colors font-cairo"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProduct;
