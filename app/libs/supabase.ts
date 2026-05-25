// lib/supabase.ts
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client (for storage uploads from browser)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with service role key (bypasses RLS)

// ── Storage helpers ──────────────────────────────────────────────────────────

export const BUCKET = "perfume-images";

/**
 * Upload a File object to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */

/**
 * Delete an image from Supabase Storage by its public URL.
 */
