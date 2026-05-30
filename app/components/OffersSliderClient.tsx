"use client";
import { IOffer } from "../libs/types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import OfferCardSlide from "../(dashboard)/components/OfferCardSlide";
interface IProps {
  offers: IOffer[];
}
function OffersSliderClient({ offers }: IProps) {
  return (
    <section className="py-20 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black font-cairo">
            آخر العروض
          </h2>

          <p className="text-gray-600 text-lg font-tajawal">
            أفضل الخصومات والعروض الحصرية
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={offers.length >= 1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {offers?.length ? (
            offers.map((offer) => (
              <SwiperSlide key={offer.id}>
                <OfferCardSlide offer={offer} />
              </SwiperSlide>
            ))
          ) : (
            <h1 className="font-cairo text-3xl font-bold text-red-900 text-center">
              لا توجد اي عروض حتي الآن
            </h1>
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default OffersSliderClient;
