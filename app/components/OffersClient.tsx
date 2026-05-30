"use client";
import { useEffect, useState } from "react";
import OfferCard from "../(dashboard)/components/OfferCard";
import { IOffer } from "../libs/types";
import { useRouter } from "next/navigation";
import OfferCardSkeleton from "./Skelton/OfferCardSkeleton";

interface Iprops {
  offers: IOffer[];
}
function OffersClient({ offers }: Iprops) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IOffer[]>([]);
  useEffect(() => {
    setLoading(false);
    router.push("?page=1");
  }, []);
  useEffect(() => {
    setData(offers);
  }, [offers]);
  if (loading || !offers)
    return (
      <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <OfferCardSkeleton />
        <OfferCardSkeleton />
        <OfferCardSkeleton />
      </div>
    );
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-8`}>
      {data.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default OffersClient;
