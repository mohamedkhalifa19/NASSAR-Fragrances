import HandleWhatsapp from "@/app/(dashboard)/components/HandleWhatsapp";
import { prisma } from "@/app/libs/prisma";
import NotFound from "@/app/not-found";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { IoReturnUpBackSharp } from "react-icons/io5";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const offerId = (await params).id;
  const offer = await prisma.offer.findFirst({ where: { id: offerId } });
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  if (!offer) return NotFound();
  return (
    <div className="h-full  my-28 ">
      <div className="flex flex-col md:flex-row-reverse  py-2 md:mx-10 mx-4 relative ">
        <div className="offer-image w-full h-[250px]">
          <img
            src={offer?.imageUrl ?? ""}
            alt={offer?.description}
            className="w-full h-full"
          />
        </div>
        <div className=" w-full space-y-4 md:mt-0 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="md:relative md:top-0 absolute top-4 text-center w-fit p-1 md:px-4 md:py-3 rounded-md  bg-red-600 text-white  font-bold font-cairo ">
              {offer?.badge}
            </h2>
            <span className="bg-indigo-900 font-tajawal inline-flex px-6 py-1 rounded-md text-white text-lg">
              {offer?.availability ? "متاح" : "غير متاح"}
            </span>
          </div>
          <p className="font-almarai text-lg leading-relaxed">
            {offer?.description}
          </p>
          <div className="flex  ">
            <div className="w-full flex items-center gap-2 text-gray-400 text-sm font-almarai flex-row-reverse justify-end mt-auto">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(offer?.createdAt)}</span>
            </div>
            <HandleWhatsapp offer={offer} />
          </div>
          <Link
            href={"/offers"}
            className="bg-indigo-900 w-fit  px-5 flex hover:bg-indigo-600  text-white text-2xl rounded-md ml-3"
          >
            <IoReturnUpBackSharp />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
