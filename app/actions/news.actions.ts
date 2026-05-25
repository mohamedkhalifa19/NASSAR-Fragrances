"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/libs/prisma";
import type { ActionResult, INews } from "@/app/libs/types";
import { deleteImage } from "../utils/delete-image";

// ── Get all news ──────────────────────────────────────────────────────

export async function getNews(): Promise<ActionResult<INews[]>> {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: news.map((n) => ({
        id: n.id,
        title: n.title,
        description: n.description,
        imageUrl: n.imageUrl,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
      })),
    };
  } catch (err) {
    console.error("[getNews]", err);
    return { success: false, error: "فشل تحميل الأخبار" };
  }
}

// ── Add news ─────────────────────────────────────────────────────────

export async function addNews(input: INews): Promise<ActionResult<INews>> {
  try {
    if (!input.title.trim()) {
      return { success: false, error: "العنوان مطلوب" };
    }

    if (!input.description.trim()) {
      return { success: false, error: "الوصف مطلوب" };
    }

    const news = await prisma.news.create({
      data: {
        title: input.title.trim(),
        description: input.description.trim(),
        imageUrl: input.imageUrl || null,
        createdAt: input.createdAt || Date.toString(),
        updatedAt: input.updatedAt || Date.toString(),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/news");

    return {
      success: true,
      data: {
        id: news.id,
        title: news.title,
        description: news.description,
        imageUrl: news.imageUrl,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt,
      },
    };
  } catch (err) {
    console.error("[addNews]", err);
    return { success: false, error: "فشل إضافة الخبر" };
  }
}

// ── Edit news ─────────────────────────────────────────────────────────

export type EditNewsInput = Partial<INews>;

export async function editNews(
  input: EditNewsInput,
): Promise<ActionResult<INews>> {
  try {
    if (!input.id) {
      return { success: false, error: "ID مطلوب" };
    }

    const existing = await prisma.news.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      return { success: false, error: "الخبر غير موجود" };
    }

    // Delete old image if replaced
    if (
      input.imageUrl &&
      existing.imageUrl &&
      input.imageUrl !== existing.imageUrl
    ) {
      await deleteImage(existing.imageUrl);
    }

    const updated = await prisma.news.update({
      where: { id: input.id },
      data: {
        ...(input.title !== undefined && {
          title: input.title.trim(),
        }),
        ...(input.description !== undefined && {
          description: input.description.trim(),
        }),
        ...(input.imageUrl !== undefined && {
          imageUrl: input.imageUrl,
        }),
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/news");

    return {
      success: true,
      data: {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        imageUrl: updated.imageUrl,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    };
  } catch (err) {
    console.error("[editNews]", err);
    return { success: false, error: "فشل تعديل الخبر" };
  }
}

// ── Delete news ───────────────────────────────────────────────────────

export async function deleteNews(id: string): Promise<ActionResult<void>> {
  try {
    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "الخبر غير موجود" };
    }

    if (existing.imageUrl) {
      await deleteImage(existing.imageUrl);
    }

    await prisma.news.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/dashboard/news");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[deleteNews]", err);
    return { success: false, error: "فشل حذف الخبر" };
  }
}
