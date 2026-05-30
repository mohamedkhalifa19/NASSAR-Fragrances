import { Spinner } from "@/components/ui/spinner";

function loading() {
  return (
    <div className="w-full font-reemKufi h-screen flex justify-center gap-3 items-center bg-black/90 flex-col">
      <h2 className=" text-5xl md:text-[150px] text-white">نصار</h2>
      <h2 className=" text-5xl md:text-[150px] text-orange-500">للعطور</h2>
      <Spinner className=" w-24 h-24 text-indigo-500" />
    </div>
  );
}

export default loading;
