import Offers from "@/app/components/Offers";
import OfferCardSkeleton from "@/app/components/Skelton/OfferCardSkeleton";
import { Suspense } from "react";

function page() {
  return (
    <div className="w-full h-full mt-[100px]">
      <main className="container w-full h-full mx-auto px-2">
        <h1 className="text-2xl font-bold font-cairo border-b border-b-gray-400 inline-block">
          العروض
        </h1>
        <Suspense
          fallback={
            <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <OfferCardSkeleton />
              <OfferCardSkeleton />
              <OfferCardSkeleton />
            </div>
          }
        >
          <div className="container mx-auto mt-10  px-5 lg:px-0">
            <Offers />
          </div>
        </Suspense>
      </main>
    </div>
  );
}

export default page;
