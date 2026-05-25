import { uploadImage } from "@/app/utils";
import { Upload } from "lucide-react";
import { useRef } from "react";
interface IPerfumeForm {
  name: string;
  price: number;
  discountPrice: number;
  badge: string;
  imageFile: File | null;
  imagePreview: string;
  stockQuantity: number;
  category: string;
  rate: number;
}

interface IOfferForm {
  description: string;
  badge: string;
  imageFile: File | null;
  imagePreview: string;
}
interface INewsForm {
  description: string;
  title: string;
  imageFile: File | null;
  imagePreview: string;
}
interface IProps<T> {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  folderName: "offers" | "products" | "news";
  errors: Partial<Record<keyof T, string>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof T, string>>>
  >;
}
function UploadImage<T extends IPerfumeForm | IOfferForm | INewsForm>({
  form,
  setForm,
  folderName,
  errors,
  setErrors,
}: IProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE = 10 * 1024 * 1024; // 5MB
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setErrors({
        ...errors,
        imagePreview: "الصورة اكبر من 10 mb  جرب صورة حجمها أقل",
      });
    }
    // ✅ بعت الـ file مباشرة مش من الـ form
    const url = await uploadImage(file, folderName);

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: url ?? "",
      imageUrl: url ?? "",
    }));
  };
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full aspect-square rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 flex flex-col items-center justify-center gap-3 hover:bg-stone-100 hover:border-stone-300 transition-colors group cursor-pointer overflow-hidden"
      >
        {form.imagePreview ? (
          <img
            src={form.imagePreview}
            alt="معاينة"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center group-hover:bg-stone-300 transition-colors">
              <Upload size={22} className="text-stone-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-stone-600 font-cairo">
                اضغط لرفع الصورة
              </p>
              <p className="text-xs text-stone-400 font-cairo mt-0.5">
                JPG, PNG, WEBP
              </p>
            </div>
          </>
        )}
      </button>

      {form.imagePreview && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm font-semibold hover:bg-stone-100 transition-colors font-cairo"
        >
          <Upload size={14} />
          تغيير الصورة
        </button>
      )}

      <p className="text-center text-xs text-stone-400 font-cairo">
        الحد الأقصى للحجم: 10MB
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}

export default UploadImage;
