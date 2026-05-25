import HeroSection from "../components/HeroSection";
import NewsSlider from "../components/NewsSlider";
import OffersSlider from "../components/OffersSlider";
import PopularPerfumes from "../components/PopularPerfumes";
export const revalidate = 1800;
export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroSection />
        <NewsSlider />
        <PopularPerfumes />
        <OffersSlider />
      </main>
    </div>
  );
}
