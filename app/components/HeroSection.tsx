import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-sec-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-cairo">
          نصار للعطور
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl font-tajwal">
          أفخم العطور الرجالي والحريمي بروائح تدوم طوال اليوم
        </p>

        <Link
          href={"/perfumes"}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-full transition duration-300 
        font-almarai"
        >
          اكتشف العطور
        </Link>
      </div>
    </section>
  );
}
