"use server";

// app/actions/product.actions.ts

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/libs/prisma";
import type { IProduct, ActionResult } from "@/app/libs/types";
import { deleteImage } from "../utils/delete-image";

// ── Get all products ─────────────────────────────────────────────────────────

export async function getProducts(): Promise<ActionResult<IProduct[]>> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        rate: p.rate,
        discountPrice: p.discountPrice ?? null,
        category: p.category,
        badge: p.badge ?? null,
        imageUrl: p.imageUrl ?? null,
        stockQuantity: p.stockQuantity,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    };
  } catch (err) {
    console.error("[getProducts]", err);
    return { success: false, error: "فشل تحميل المنتجات" };
  }
}

// ── Add product ──────────────────────────────────────────────────────────────

export async function addProduct(
  input: IProduct,
): Promise<ActionResult<IProduct>> {
  try {
    if (!input.name.trim()) {
      return { success: false, error: "الاسم مطلوب" };
    }
    if (input.price <= 0) {
      return { success: false, error: "أدخل سعرًا صحيحًا" };
    }
    if (!input.category) {
      return { success: false, error: "اختر التصنيف" };
    }
    if (input.stockQuantity < 0) {
      return { success: false, error: "أدخل الكمية" };
    }
    if (!input.imageUrl) {
      return { success: false, error: "ارفع صورة العطر " };
    }

    const product = await prisma.product.create({
      data: {
        name: input.name.trim(),
        price: input.price,
        rate: input.rate ?? 0,
        discountPrice: input.discountPrice ?? null,
        category: input.category,
        badge: input.badge?.trim() || null,
        imageUrl: input.imageUrl || null,
        stockQuantity: input.stockQuantity,
        createdAt: input.createdAt || Date.toString(),
        updatedAt: input.updatedAt || Date.toString(),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/perfumes");

    return {
      success: true,
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        rate: product.rate,
        discountPrice: product.discountPrice ?? null,
        category: product.category,
        badge: product.badge ?? null,
        imageUrl: product.imageUrl ?? null,
        stockQuantity: product.stockQuantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  } catch (err) {
    console.error("[addProduct]", err);
    return { success: false, error: "فشل إضافة المنتج" };
  }
}

// ── Edit product ─────────────────────────────────────────────────────────────

export type EditProductInput = Partial<IProduct>;

export async function editProduct(
  input: EditProductInput,
): Promise<ActionResult<IProduct>> {
  try {
    const existing = await prisma.product.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      return { success: false, error: "المنتج غير موجود" };
    }

    const hasNewImage = input.imageUrl && input.imageUrl !== existing.imageUrl;

    if (hasNewImage && existing.imageUrl) {
      await deleteImage(existing.imageUrl);
    }

    const updated = await prisma.product.update({
      where: { id: input.id },
      data: {
        ...(input.name !== undefined && {
          name: input.name?.trim(),
        }),

        ...(input.price !== undefined && {
          price: Number(input.price),
        }),

        ...(input.rate !== undefined && {
          rate: Number(input.rate),
        }),

        ...(input.discountPrice !== undefined && {
          discountPrice: input.discountPrice,
        }),

        ...(input.category !== undefined && {
          category: input.category,
        }),

        ...(input.badge !== undefined && {
          badge: input.badge?.trim() || null,
        }),

        ...(input.imageUrl !== undefined && {
          imageUrl: input.imageUrl,
        }),

        ...(input.stockQuantity !== undefined && {
          stockQuantity: Number(input.stockQuantity),
        }),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/perfumes");

    return {
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        price: updated.price,
        rate: updated.rate,
        discountPrice: updated.discountPrice ?? null,
        category: updated.category,
        badge: updated.badge ?? null,
        imageUrl: updated.imageUrl ?? null,
        stockQuantity: updated.stockQuantity,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    };
  } catch (err: any) {
    console.error("[editProduct]", err);

    if (err?.code === "P2025") {
      return { success: false, error: "المنتج غير موجود" };
    }

    return { success: false, error: "فشل تعديل المنتج" };
  }
}
// ── Delete product ───────────────────────────────────────────────────────────

export async function deleteProduct(id: string): Promise<ActionResult<void>> {
  try {
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return { success: false, error: "المنتج غير موجود" };
    }

    // Delete image from storage first
    if (existing.imageUrl) {
      await deleteImage(existing.imageUrl);
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/dashboard/perfumes");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[deleteProduct]", err);
    return { success: false, error: "فشل حذف المنتج" };
  }
}
