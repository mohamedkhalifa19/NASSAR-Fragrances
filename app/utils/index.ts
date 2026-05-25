import { BUCKET, supabase } from "../libs/supabase";

export async function uploadImage(
  file: File,
  folder: "products" | "offers" | "news",
): Promise<string> {
  if (!file) throw new Error("No file provided");

  // 🔹 تحسين اسم الملف
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const path = `${folder}/${fileName}`;

  // 🔹 رفع مباشر لـ Supabase
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  // 🔹 الحصول على الرابط
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return data.publicUrl;
}
