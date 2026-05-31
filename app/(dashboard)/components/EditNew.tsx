"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import UploadImage from "./UploadImage";
import { editNews } from "@/app/actions/news.actions";
import { setIsEditNews } from "@/app/store/features/news/news";
import { toast } from "sonner";
import { NewsEMPTY_FORM } from "@/app/data";

type FormState = {
  title: string;
  imageUrl: string;
  description: string;
  imageFile: File | null;
  imagePreview: string;
};

function EditNew() {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news);
  const { selectedNews, isEditNews } = news;
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof NewsEMPTY_FORM, string>>
  >({});
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    imageUrl: "",
    imageFile: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (!selectedNews) return;
    setForm({
      title: selectedNews.title ?? "",
      description: selectedNews.description,
      imageUrl: selectedNews.imageUrl ?? "",
      imageFile: null,
      imagePreview: selectedNews.imageUrl ?? "",
    });
  }, [selectedNews]);

  const handleClose = () => {
    dispatch(setIsEditNews(false));
  };

  const handleSave = () => {
    if (!selectedNews) return;
    const updatedNew = { ...selectedNews, ...form };
    editNews(updatedNew);
    toast(
      <p className="flex items-center text-green-500 font-almarai text-[15px] tracking-widest">
        تم تعديل الخبر{" "}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
    handleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const numericFields = ["stockQuantity"];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  if (!selectedNews) return null;

  return (
    <Modal isOpen={isEditNews}>
      <div
        dir="rtl"
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-center px-6 py-4 border-b border-stone-100 rounded-t-2xl">
          <AlertDialogHeader className="contents">
            <AlertDialogTitle className="text-base font-extrabold text-stone-900 tracking-tight font-cairo">
              تعديل العرض
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
            {" "}
            <UploadImage
              folderName="news"
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
            {/* العنوان */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                العنوان <span className="text-red-400">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="عنوان الخبر"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition ${
                  errors.title
                    ? "border-red-400 bg-red-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-500 font-cairo">
                  {errors.title}
                </p>
              )}
            </div>
            {/* الوصف */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 font-cairo">
                الوصف
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="خبر جديد مثل إضافة تركيبات"
                rows={3}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 font-cairo placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-stone-100 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="flex-1 max-w-full py-2.5 px-1 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors font-cairo"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="flex-1 max-w-full py-2.5 px-1 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-lg shadow-stone-900/25 hover:bg-stone-800 transition-colors font-cairo"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditNew;
