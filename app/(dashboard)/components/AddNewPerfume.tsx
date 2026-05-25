"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setIsNewPerfume } from "@/app/store/features/perfume/perfume";
import { addProduct } from "@/app/actions/product.actions";
import UploadImage from "./UploadImage";
import { toast } from "sonner";
import { PerfumeEMPTY_FORM as EMPTY_FORM } from "@/app/data";
const CATEGORIES = ["رجالي", "نسائي", "للجنسين"];

function AddNewPerfume() {
  const dispatch = useDispatch();
  const { perfume } = useSelector((state: RootState) => state);
  const { isNewPerfume } = perfume;

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof EMPTY_FORM, string>>
  >({});
  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    dispatch(setIsNewPerfume(false));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "أدخل سعرًا صحيحًا";
    if (!form.category) newErrors.category = "اختر التصنيف";
    if (!form.stockQuantity || Number(form.stockQuantity) < 0)
      newErrors.stockQuantity = "أدخل الكمية";
    if (!form.rate || Number(form.rate) < 1)
      newErrors.rate = " أدخل التقييم اقل تقييم 1";
    if (!form.imagePreview) newErrors.imagePreview = "الصورة مطلوبة";

    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addProduct({
      ...form,
      id: crypto.randomUUID(),
      imageUrl: form.imagePreview,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice),
      stockQuantity: Number(form.stockQuantity),
      rate: Number(form.rate),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast(
      <p className="flex items-center text-green-500 font-almarai text-[15px] tracking-widest">
        تم إضافة عطر جديد{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
    handleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Modal isOpen={isNewPerfume}>
      <div
        dir="rtl"
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              إضافة منتج
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
          <div>
            <UploadImage
              folderName="products"
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
            />
            {errors.imagePreview && (
              <p className="text-xs text-red-500 font-cairo">
                {errors.imagePreview}
              </p>
            )}
          </div>
          {/* Right — Form fields */}
          <div className="flex flex-col gap-4">
            {/* الاسم */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                الاسم <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="اسم العطر"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                  errors.name
                    ? "border-red-400 bg-red-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-cairo">{errors.name}</p>
              )}
            </div>

            {/* السعر & السعر بعد الخصم */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  السعر <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                      errors.price
                        ? "border-red-400 bg-red-50"
                        : "border-stone-200 bg-stone-50"
                    }`}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-cairo">
                    ج.م
                  </span>
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500 font-cairo">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  قبل الخصم
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-cairo">
                    ج.م
                  </span>
                </div>
              </div>
            </div>

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

            {/* الكمية & الشارة */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500 font-cairo">
                  الكمية <span className="text-red-400">*</span>
                </label>
                <input
                  name="stockQuantity"
                  type="number"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                    errors.stockQuantity
                      ? "border-red-400 bg-red-50"
                      : "border-stone-200 bg-stone-50"
                  }`}
                />
                {errors.stockQuantity && (
                  <p className="text-xs text-red-500 font-cairo">
                    {errors.stockQuantity}
                  </p>
                )}
              </div>

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
            className="flex-1 max-w-[180px] py-2.5 px-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors font-cairo"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="flex-1 max-w-[180px] py-2.5 px-2 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-lg shadow-stone-900/25 hover:bg-stone-800 transition-colors font-cairo"
          >
            إضافة المنتج
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddNewPerfume;
