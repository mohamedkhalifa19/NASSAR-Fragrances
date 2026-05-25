import { unstable_cache } from "next/cache";
import NewsCard from "../(dashboard)/components/NewsCard";
import { getNews } from "../actions/news.actions";
import { ActionResult, INews } from "../libs/types";

const getCachedNews = unstable_cache(async () => getNews(), ["news-cache"], {
  revalidate: 10,
  tags: ["news"],
});
async function News() {
  let news: ActionResult<INews[]> = await getCachedNews();
  if (!news.success)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="font-cairo text-xl md:text-3xl font-bold text-red-900">
          لا توجد اي أخبار حتي الآن
        </h1>
      </div>
    );
  return (
    <div className="w-full h-full mt-[100px]">
      <main className="container w-full h-full mx-auto px-2">
        <h1 className="text-2xl font-bold font-cairo border-b border-b-gray-400 inline-block">
          الأخبار
        </h1>
        <div className="container mx-auto mt-10  px-5 lg:px-0">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-3 py-4 grid-cols-1">
            {news.data.map((n) => (
              <NewsCard news={n} key={n.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default News;
