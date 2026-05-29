import { prisma } from "@/app/libs/prisma";
import NotFound from "@/app/not-found";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { IoReturnUpBackSharp } from "react-icons/io5";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const newId = (await params).id;
  const New = await prisma.news.findFirst({ where: { id: newId } });
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  if (!New) return NotFound();
  return (
    <div className="h-full  my-28 ">
      <div className="flex flex-col md:flex-row-reverse  py-2 md:mx-10 mx-4 relative ">
        <div className="offer-image w-full h-[250px]">
          <img
            src={New?.imageUrl ?? ""}
            alt={New?.description}
            className="w-full h-full"
          />
        </div>
        <div className=" w-full space-y-4 md:mt-0 mt-4">
          <div className="flex items-center justify-between">
            <h2 className=" text-center w-fit p-1 md:px-4 md:py-3 rounded-md  font-bold font-cairo ">
              {New?.title}
            </h2>
          </div>
          <p className="font-almarai text-lg leading-relaxed">
            {New?.description}
          </p>
          <div className="flex  ">
            <div className="w-full flex items-center gap-2 text-gray-400 text-sm font-almarai flex-row-reverse justify-end mt-auto">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(New?.createdAt)}</span>
            </div>
            <Link
              href={"/news"}
              className="bg-indigo-900 hover:bg-indigo-600 px-5 text-white text-2xl rounded-md ml-3"
            >
              <IoReturnUpBackSharp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
