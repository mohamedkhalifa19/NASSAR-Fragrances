"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";
import { FaTentArrowTurnLeft } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { logout } from "../actions/admin.actions";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const slugUrl: Record<string, string> = {
  "/dashboard/offers": "العروض",
  "/dashboard/perfumes": "العطور",
  "/dashboard/news": "الأخبار",
};
interface IProps {
  closeDashboard: () => void;
}
function DashboardSidebar({ closeDashboard }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const err = await logout();
    if (!err) {
      router.push("/dashboard");
      setLoading(false);
      toast(
        <p className="flex items-center text-green-500 font-almarai text-[15px] tracking-widest">
          تم تسجيل الخروج بنجاح
        </p>,
        { style: { background: "black", opacity: 0.9 } },
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <aside
      className={`bg-[#0f0f0f] flex shrink-0 min-w-0  flex-col fixed top-0 right-0 overflow-y-auto overflow-x-hidden xl:overflow-hidden text-black transition-transform ease-in-out duration-200 transform       p-4 md:w-1/3  lg:w-1/4 w-full h-full z-[20]`}
    >
      {" "}
      {/* Header */}
      <div className="flex items-center justify-between ">
        <h2 className="md:text-3xl text-2xl font-cairo text-white ">
          لوحة التحكم
        </h2>
        <Button
          className=" text-white inline-flex md:hidden"
          onClick={closeDashboard}
        >
          <IoIosClose className="!w-12 !h-12" />
        </Button>
      </div>
      {/* Main content */}
      <div className="mt-5 space-y-3 flex-1  ">
        <div className="space-y-2">
          <h2 className="font-tajawal mb-2 border-b text-yellow-400 font-bold text-[16px]  inline-block pb-1">
            لوحة التحكم/ <span>{slugUrl[`${pathname}`]}</span>
          </h2>
        </div>
        <div className="mt-5 space-y-5 ">
          <Button
            variant={"default"}
            onClick={() => {
              closeDashboard();
              redirect("/dashboard/perfumes");
            }}
            className={`w-full h-10 font-tajawal text-white text-2xl ${pathname === "/dashboard/perfumes" ? "bg-indigo-500" : "border bg-transparent border-white"}`}
          >
            العطور
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              closeDashboard();
              redirect("/dashboard/offers");
            }}
            className={`w-full h-10 font-tajawal text-white text-2xl ${pathname === "/dashboard/offers" ? "bg-indigo-500" : "border bg-transparent border-white"}`}
          >
            العروض
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              closeDashboard();
              redirect("/dashboard/news");
            }}
            className={`w-full h-10 font-tajawal text-white text-2xl ${pathname === "/dashboard/news" ? "bg-indigo-500" : "border bg-transparent border-white"}`}
          >
            الأخبار
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="space-y-4 my-7">
        <Button
          onClick={handleLogout}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-400 h-12 w-full  font-almarai font-semibold text-lg text-white"
        >
          تسجيل الخروج
          {loading && <Spinner />}
        </Button>
        <Link
          href={"/"}
          className="text-indigo-500 font-almarai  lg:text-lg text-[15px] flex items-center gap-4"
        >
          العودة إلي الصفحة الرئيسية
          <FaTentArrowTurnLeft className="text-indigo-400" />
        </Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
