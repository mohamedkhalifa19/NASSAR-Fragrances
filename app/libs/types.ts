// lib/types.ts

export interface IProduct {
  id: string;
  name: string;
  price: number;
  rate: number;
  discountPrice?: number | null;
  category: string;
  badge?: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  createdAt?: string;
  imageFile?: File | null;
  updatedAt?: string;
}
export interface IOrder {
  id: string;
  name: string;
  price: number;
  rate: number;
  category: string;
  imageUrl: string | null;
  quantity: number;
}
export interface IEditProductForm {
  name: string;
  price: number;
  discountPrice: number;
  badge: string;
  imageUrl: string;
  imageFile: File | null;
  imagePreview: string;
  stockQuantity: number;
  category: string;
  rate: number;
}
export interface IOffer {
  id: string;
  createdAt: string;
  updatedAt: string;
  badge: string | null;
  imageUrl: string | null;
  imageFile?: File | null;
  description: string;
  availability: boolean;
}
export interface INews {
  id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  description: string;
  title: string;
}

export interface ILogin {
  email: string;
  password: string;
}
// ── Server action result wrapper ─────────────────────────────────────────────

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
