"use client";

import { IProduct, IOffer, INews } from "@/app/libs/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  setIsDeletePerfume,
  setIsEditPerfume,
  setIsShowPerfume,
  setSelectedPerfume,
} from "@/app/store/features/perfume/perfume";
import {
  setIsDeleteOffer,
  setIsEditOffer,
  setIsShowOffer,
  setSelectedOffer,
} from "@/app/store/features/offer/offer";
import DeleteOffer from "./DeleteOffer";
import {
  setIsDeleteNews,
  setIsEditNews,
  setIsShowNews,
  setSelectedNews,
} from "@/app/store/features/news/news";

export const perfumeColumns = (): ColumnDef<IProduct>[] => {
  const dispatch = useDispatch<AppDispatch>();
  return [
    {
      accessorKey: "name",
      header: "الاسم",
    },
    {
      accessorKey: "price",
      header: "السعر  ",
    },
    {
      accessorKey: "discountPrice",
      header: "السعر بعد الخصم",
    },

    {
      accessorKey: "rate",
      header: "التقييم",
    },
    {
      accessorKey: "category",
      header: "التصنيف",
    },
    {
      accessorKey: "stockQuantity",
      header: "الكمية",
    },
    {
      accessorKey: "badge",
      header: "شارة العطر",
    },
    {
      accessorKey: "actions",
      header: " التغييرات",
      cell: ({ row }) => {
        const showPerfumeDetails = () => {
          dispatch(setIsShowPerfume(true));

          dispatch(
            setSelectedPerfume({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        const showPerfumeDelete = () => {
          dispatch(setIsDeletePerfume(true));
          dispatch(
            setSelectedPerfume({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        const showPerfumeEdit = () => {
          dispatch(setIsEditPerfume(true));
          dispatch(
            setSelectedPerfume({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        return (
          <>
            <div className="flex justify-center gap-3">
              <Button
                className="border border-white "
                onClick={showPerfumeDetails}
              >
                عرض
              </Button>
              <Button
                className="border border-indigo-600"
                onClick={showPerfumeEdit}
              >
                تعديل
              </Button>
              <Button
                className="border border-red-600"
                onClick={showPerfumeDelete}
              >
                حذف
              </Button>
            </div>
          </>
        );
      },
    },
  ];
};

export const offerColumns = (): ColumnDef<IOffer>[] => {
  const dispatch = useDispatch<AppDispatch>();

  return [
    {
      accessorKey: "description",
      header: "الوصف",
      cell: ({ row }) => {
        const desc = row.getValue("description") as string;
        return (
          <p className="max-w-[250px] truncate" title={desc}>
            {desc}
          </p>
        );
      },
    },
    {
      accessorKey: "badge",
      header: "الشارة",
    },

    {
      id: "actions",
      header: "التغييرات",
      cell: ({ row }) => {
        const showOfferDetails = () => {
          dispatch(setIsShowOffer(true));
          dispatch(
            setSelectedOffer({
              ...row.original,
              createdAt: row.original.createdAt?.toString(),
              updatedAt: row.original.updatedAt?.toString(),
            }),
          );
        };
        const showOfferDelete = () => {
          dispatch(setIsDeleteOffer(true));
          dispatch(
            setSelectedOffer({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        const showOfferEdit = () => {
          dispatch(setIsEditOffer(true));
          dispatch(
            setSelectedOffer({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        return (
          <div className="flex justify-center gap-3">
            <Button onClick={showOfferDetails} className="border border-white">
              عرض
            </Button>
            <Button
              onClick={showOfferEdit}
              className="border border-indigo-600"
            >
              تعديل
            </Button>
            <Button onClick={showOfferDelete} className="border border-red-600">
              حذف
            </Button>
          </div>
        );
      },
    },
  ];
};

export const newsColumns = (): ColumnDef<INews>[] => {
  const dispatch = useDispatch<AppDispatch>();

  return [
    {
      accessorKey: "title",
      header: "الاسم",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        return (
          <p className="max-w-[250px] " title={title}>
            {title}
          </p>
        );
      },
    },

    {
      accessorKey: "description",
      header: "الوصف",
      cell: ({ row }) => {
        const desc = row.getValue("description") as string;
        return (
          <p className="max-w-[250px] truncate" title={desc}>
            {desc}
          </p>
        );
      },
    },

    {
      id: "actions",
      header: "التغييرات",
      cell: ({ row }) => {
        const showNewsDetails = () => {
          dispatch(setIsShowNews(true));
          dispatch(
            setSelectedNews({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        const showNewsDelete = () => {
          dispatch(setIsDeleteNews(true));
          dispatch(
            setSelectedNews({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        const showNewsEdit = () => {
          dispatch(setIsEditNews(true));
          dispatch(
            setSelectedNews({
              ...row.original,
              createdAt: row.original.createdAt,
              updatedAt: row.original.updatedAt,
            }),
          );
        };
        return (
          <div className="flex justify-center gap-3">
            <Button onClick={showNewsDetails} className="border border-white">
              عرض
            </Button>
            <Button onClick={showNewsEdit} className="border border-indigo-600">
              تعديل
            </Button>
            <Button onClick={showNewsDelete} className="border border-red-600">
              حذف
            </Button>
          </div>
        );
      },
    },
  ];
};
