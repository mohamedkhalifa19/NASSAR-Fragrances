import { unstable_cache } from "next/cache";
import OfferCard from "../(dashboard)/components/OfferCard";
import { ActionResult, IOffer } from "../libs/types";
import { getOffers } from "../actions/offer.actions";
const getCachedOffers = unstable_cache(
  async () => getOffers(),
  ["offers-cache"],
  {
    revalidate: 10,
    tags: ["offers"],
  },
);
async function Offers() {
  const offers: ActionResult<IOffer[]> = await getCachedOffers();

  return (
    <>
      {offers.success && offers.data.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-8`}
        >
          {offers.data.map((offer) => (
            <OfferCard offer={offer} key={offer.id} />
          ))}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="font-cairo text-xl md:text-3xl font-bold text-red-900">
            لا توجد اي عروض حتي الآن
          </h1>
        </div>
      )}
    </>
  );
}

export default Offers;
