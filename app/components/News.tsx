import { unstable_cache } from "next/cache";
import { INews } from "../libs/types";
import NewsClient from "../(dashboard)/components/NewsClient";
import { prisma } from "../libs/prisma";

const getCachedNews = unstable_cache(
  async (page: number = 1) => {
    try {
      return await prisma.news.findMany({
        orderBy: { createdAt: "asc" },
        take: 3,
        skip: (page - 1) * 3,
      });
    } catch (err) {
      return [];
    }
  },
  ["news-cache"],
  {
    revalidate: 10,
    tags: ["news"],
  },
);

interface IProps {
  page: number;
}
async function News({ page }: IProps) {
  let news: INews[] = await getCachedNews(page);
  const totalPages = await prisma.news.count();
  if (!news)
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
          <NewsClient news={news} totalPages={totalPages} />
        </div>
      </main>
    </div>
  );
}

export default News;
