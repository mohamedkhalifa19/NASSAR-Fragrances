import { unstable_cache } from "next/cache";
import OfferCard from "../(dashboard)/components/OfferCard";
import { ActionResult, IOffer } from "../libs/types";
import { getOffers } from "../actions/offer.actions";
import { PaginationDemo } from "./Pagination";
import { prisma } from "../libs/prisma";
import OffersClient from "./OffersClient";
const getCachedOffers = unstable_cache(
  async (page: number = 1) => {
    try {
      return await prisma.offer.findMany({
        orderBy: { createdAt: "asc" },
        take: 3,
        skip: (page - 1) * 3,
      });
    } catch (err) {
      return [];
    }
  },
  ["offers-cache"],
  {
    revalidate: 10,
    tags: ["offers"],
  },
);
async function Offers({ page }: { page: number }) {
  const offers: IOffer[] = await getCachedOffers(page);
  const totalPages = await prisma.offer.count();
  if (!offers)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="font-cairo text-xl md:text-3xl font-bold text-red-900">
          لا توجد اي عروض حتي الآن
        </h1>
      </div>
    );
  return (
    <>
      <div>
        <OffersClient offers={offers} />
        <div className=" my-12">
          <PaginationDemo pages={totalPages} rowsBerPage={3} />
        </div>
      </div>
    </>
  );
}

export default Offers;
