import { BUCKET } from "../libs/supabase";
import { supabaseAdmin } from "../libs/supabase-admin";

export async function deleteImage(publicUrl: string): Promise<void> {
  // Extract path from URL: everything after /storage/v1/object/public/{bucket}/
  const marker = `/object/public/${BUCKET}/`;

  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // not a storage URL, skip

  const path = publicUrl.slice(idx + marker.length);
  const { error, data } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove([path]);

  if (error) console.error("Failed to delete image:", error.message);
}
