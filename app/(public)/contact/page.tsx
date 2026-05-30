import Location from "@/app/components/Location";

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
          <Location />
        </div>
      </main>
    </div>
  );
}

export default page;
