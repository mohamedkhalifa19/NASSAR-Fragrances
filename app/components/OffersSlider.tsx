import { prisma } from "../libs/prisma";
import OffersSliderClient from "./OffersSliderClient";
import OfferCardSlideSkeleton from "./Skelton/OfferCardSlideSkeleton";

export default async function OffersSlider() {
  let offers = [];
  try {
    offers = await prisma.offer.findMany({ take: 8 });
    return <OffersSliderClient offers={offers} />;
  } catch {
    return (
      <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <OfferCardSlideSkeleton />
        <OfferCardSlideSkeleton />
        <OfferCardSlideSkeleton />
      </div>
    );
  }
}
