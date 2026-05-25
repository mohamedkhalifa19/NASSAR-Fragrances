import { unstable_cache } from "next/cache";
import { getNews } from "../actions/news.actions";
const getCachedNews = unstable_cache(async () => getNews(), ["news-cache"], {
  revalidate: 3600,
  tags: ["news"],
});
async function NewsSlider() {
  const news = (await getCachedNews()) || [];
  return (
    <div className="w-full bg-red-700  text-white font-tajawal text-lg overflow-hidden py-3">
      <div className="ticker whitespace-nowrap flex gap-16">
        {news?.success ? (
          news?.data.map((n) => <span key={n.id}>{n.description}</span>)
        ) : (
          <span>لا يوجد اخبار حتي الآن</span>
        )}
      </div>
    </div>
  );
}

export default NewsSlider;
