import SkeletonBox from "@/app/components/Skelton/SkeletonBox";
import { Suspense } from "react";

async function page() {
  return (
    <div className="w-full h-full my-[100px] ">
      <main className="container w-full h-full mx-auto px-4">
        <h1 className="text-2xl font-bold font-cairo border-b border-b-gray-400 inline-block">
          تواصل معنا
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-2 ">
          {/* Contact Details */}
          <div>
            <h2 className="font-tajawal font-bold text-lg text-yellow-600">
              اتصل بنا/ EG
            </h2>
            <div className="mt-5 space-y-5">
              <div className="font-almarai font-semibold">
                <h3 className="text-lg">العنوان:</h3>
                <p className="text-gray-600">
                  البحيرة - مركز بدر - قرية الإيمان (ط)
                </p>
              </div>
              <div className="font-almarai font-semibold">
                <h3 className="text-lg">مواعيد العمل:</h3>
                <p className="text-gray-600">
                  من السبت إلي الجمعة 9:00 صباحاً إلي 10:00 مساءً
                </p>
              </div>
              <div className="font-almarai font-semibold">
                <h3 className="text-lg">وسائل التواصل:</h3>
                <div className="space-y-1 mt-2">
                  {" "}
                  <p className="text-gray-600 flex items-center">
                    الواتساب:{" "}
                    <span className="text-[14px] text-black">
                      01004458695
                    </span>{" "}
                  </p>{" "}
                  <p className="text-gray-600 flex items-center">
                    رقم الهاتف:{" "}
                    <span className="text-[14px] text-black">01004458695</span>
                  </p>{" "}
                  <p className="text-gray-600 flex items-center">
                    الإيميل:
                    <span className="text-[14px] text-black">
                      omarnassar2002z@gmail.com
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Location */}
          <Suspense fallback={<SkeletonBox />}>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3432.0602806825373!2d30.722607!3d30.660431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM5JzM3LjYiTiAzMMKwNDMnMjEuNCJF!5e0!3m2!1sen!2seg!4v1778970728001!5m2!1sen!2seg"
                width="100%"
                className="border-0 min-h-[300px] h-full"
                loading="lazy"
              />
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default page;
