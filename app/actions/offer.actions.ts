"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/libs/prisma";
import type { IOffer, ActionResult } from "@/app/libs/types";
import { deleteImage } from "../utils/delete-image";

// ── Get all offers ───────────────────────────────────────────────────────────

export async function getOffers(): Promise<ActionResult<IOffer[]>> {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: offers.map((o) => ({
        id: o.id,
        badge: o.badge,
        imageUrl: o.imageUrl,
        availability: o.availability,
        description: o.description,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      })),
    };
  } catch (err) {
    console.error("[getOffers]", err);
    return { success: false, error: "فشل تحميل العروض" };
  }
}

// ── Add offer ────────────────────────────────────────────────────────────────

export async function addOffer(input: IOffer): Promise<ActionResult<IOffer>> {
  try {
    if (!input.description.trim()) {
      return { success: false, error: "الوصف مطلوب" };
    }

    const offer = await prisma.offer.create({
      data: {
        badge: input.badge?.trim() || null,
        imageUrl: input.imageUrl || null,
        availability: input.availability,
        description: input.description.trim(),
        createdAt: input.createdAt || Date.toString(),
        updatedAt: input.updatedAt || Date.toString(),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/offers");

    return {
      success: true,
      data: {
        id: offer.id,
        badge: offer.badge,
        imageUrl: offer.imageUrl,
        description: offer.description,
        availability: offer.availability,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
      },
    };
  } catch (err) {
    console.error("[addOffer]", err);
    return { success: false, error: "فشل إضافة العرض" };
  }
}

// ── Edit offer ───────────────────────────────────────────────────────────────

export type EditOfferInput = Partial<IOffer>;

export async function editOffer(
  input: EditOfferInput,
): Promise<ActionResult<IOffer>> {
  try {
    const existing = await prisma.offer.findUnique({ where: { id: input.id } });

    if (!existing) {
      return { success: false, error: "العرض غير موجود" };
    }

    // Delete old image if a new one was provided
    if (
      input.imageUrl &&
      existing.imageUrl &&
      input.imageUrl !== existing.imageUrl
    ) {
      await deleteImage(existing.imageUrl);
    }

    const updated = await prisma.offer.update({
      where: { id: input.id },
      data: {
        ...(input.badge !== undefined && {
          badge: input.badge?.trim() || null,
        }),
        ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
        ...(input.availability !== undefined && {
          availability: input.availability,
        }),

        ...(input.description !== undefined && {
          description: input.description.trim(),
        }),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/offers");

    return {
      success: true,
      data: {
        id: updated.id,
        badge: updated.badge,
        imageUrl: updated.imageUrl,
        description: updated.description,
        availability: updated.availability,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    };
  } catch (err) {
    console.error("[editOffer]", err);
    return { success: false, error: "فشل تعديل العرض" };
  }
}

// ── Delete offer ─────────────────────────────────────────────────────────────

export async function deleteOffer(id: string): Promise<ActionResult<void>> {
  try {
    const existing = await prisma.offer.findUnique({ where: { id } });

    if (!existing) {
      return { success: false, error: "العرض غير موجود" };
    }

    if (existing.imageUrl) {
      await deleteImage(existing.imageUrl);
    }

    await prisma.offer.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/dashboard/offers");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[deleteOffer]", err);
    return { success: false, error: "فشل حذف العرض" };
  }
}
