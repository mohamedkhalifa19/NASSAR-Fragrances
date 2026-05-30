import PerfumeCardSkeleton from "./Skelton/PerfumeCardSkeleton";
import { prisma } from "../libs/prisma";
import Perfumes from "./Perfumes";

export default async function PopularPerfumes() {
  let perfumes = [];
  try {
    perfumes = await prisma.product.findMany({
      orderBy: { rate: "desc" },
      take: 3,
    });
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-14">
            <h2 className="md:text-4xl text-3xl font-bold text-black mb-4 font-cairo">
              العطور الأكثر طلبًا
            </h2>

            <p className="text-gray-600 text-lg font-tajawal">
              اكتشف أكثر العطور مبيعًا والأكثر تميزًا
            </p>
          </div>

          {/* Cards */}
          <Perfumes perfumes={perfumes} />
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="container gap-3 my-5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <PerfumeCardSkeleton />
        <PerfumeCardSkeleton />
        <PerfumeCardSkeleton />
      </div>
    );
  }
}
