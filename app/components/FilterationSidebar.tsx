import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import Selection from "./Selection";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { IProduct } from "../libs/types";

interface IProps {
  isFilterationSidebarOpen: boolean;
  setIsFilterationSidebarOpen: (val: boolean) => void;
  perfumes: IProduct[];
  setFilteredPerfumes: (val: IProduct[]) => void;
}
function FilterationSidebar({
  isFilterationSidebarOpen,
  setIsFilterationSidebarOpen,
  perfumes,
  setFilteredPerfumes,
}: IProps) {
  const closeFilterationSidebar = () => {
    setIsFilterationSidebarOpen(false);
  };
  const [category, setCategory] = useState("للجنسين");
  const [fromPrice, setFromPrice] = useState<string>("");
  const [toPrice, setToPrice] = useState<string>(
    `${Math.max(...perfumes.map((p) => p.price || 0))}`,
  );
  const [sort, setSort] = useState("top-rating");

  const handelFilteration = () => {
    console.log(category, perfumes);
    let filteredPerfumes;
    if (category === "للجنسين")
      filteredPerfumes = perfumes.filter(
        (p) => p.price >= +fromPrice && p.price <= +toPrice,
      );
    else
      filteredPerfumes = perfumes.filter(
        (p) =>
          p.category === category &&
          p.price >= +fromPrice &&
          p.price <= +toPrice,
      );
    if (sort === "top-rating")
      setFilteredPerfumes(filteredPerfumes.sort((a, b) => b.rate - a.rate));
    else if (sort === "high-to-low")
      setFilteredPerfumes(filteredPerfumes.sort((a, b) => b.price - a.price));
    else
      setFilteredPerfumes(filteredPerfumes.sort((a, b) => a.price - b.price));
    setIsFilterationSidebarOpen(false);
  };
  const reset = () => {
    setFilteredPerfumes(perfumes);
    setCategory("all");
    setFromPrice("");
    setToPrice("");
    setSort("top-rating");
    setIsFilterationSidebarOpen(false);
  };
  return (
    <aside
      className={`bg-[#0f0f0f] flex shrink-0 min-w-0  flex-col fixed top-0 right-0 lg:overflow-hidden sm:overflow-y-auto overflow-x-hidden xl:overflow-hidden text-black transition-transform ease-in-out duration-200 transform       p-4 md:w-1/3  lg:w-1/4 w-full h-full z-[20]`}
    >
      {" "}
      {/* Header */}
      <div className="flex items-center justify-between pt-[70px]">
        <h2 className="text-2xl font-cairo text-white">تصفية</h2>
        <button className="text-white">
          <IoMdClose className="text-4xl" onClick={closeFilterationSidebar} />
        </button>
      </div>
      {/* Filteration */}
      <div className="mt-5 space-y-3">
        <div className="space-y-2">
          <h2 className="font-tajawal mb-2 text-yellow-400 font-bold text-lg border-b border-gray-400 inline-block pb-1">
            من حيث النوع
          </h2>
          <RadioGroup
            value={category}
            onValueChange={setCategory}
            className="flex flex-col gap-4 text-white font-almarai z-20 "
            dir="rtl"
          >
            <div className="flex items-center space-x-2 space-x-reverse ">
              <RadioGroupItem
                value="للجنسين"
                id="للجنسين"
                className="border-white text-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-black"
              />
              <Label htmlFor="للجنسين" className="text-lg">
                الكل
              </Label>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem
                value="رجالي"
                id="رجالي"
                className="border-white text-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-black"
              />
              <Label htmlFor="رجالي" className="text-lg">
                رجالي
              </Label>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem
                value="نسائي"
                id="نسائي"
                className="border-white text-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-black"
              />
              <Label htmlFor="نسائي" className="text-lg">
                نسائي
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <h2 className="font-tajawal mb-2 text-yellow-400 font-bold text-lg border-b border-gray-400 inline-block pb-1">
            من حيث السعر
          </h2>
          <FieldGroup>
            <Field className="font-almarai   text-gray-300">
              <div className="flex">
                {" "}
                <Label className="font-bold inline-flex flex-1">من سعر</Label>
                <Input
                  type="number"
                  className="flex-1 text-white"
                  placeholder={"0"}
                  min={0}
                  value={fromPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (Number(val) >= 0) setFromPrice(val);
                  }}
                />
              </div>
            </Field>
            <Field className="font-almarai   text-gray-300">
              <div className="flex">
                {" "}
                <Label className="font-bold inline-flex flex-1"> إلي سعر</Label>
                <Input
                  type="number"
                  className="flex-1 text-white"
                  value={toPrice}
                  placeholder={"0"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (Number(val) >= 0) setToPrice(val);
                  }}
                />
              </div>
            </Field>
          </FieldGroup>
        </div>
        <div className="space-y-2">
          <h2 className="font-tajawal mb-2 text-yellow-400 font-bold text-lg border-b border-gray-400 inline-block pb-1">
            من حيث الترتيب
          </h2>
          <Selection setSort={setSort} sort={sort} />
        </div>
      </div>
      {/* Footer */}
      <div className=" mt-7  gap-2 flex items-center">
        <button
          onClick={handelFilteration}
          className="font-almarai  w-full  flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-full text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
        >
          <FaFilter className="text-xl" />
          التصفية
        </button>
        <button
          onClick={reset}
          className="font-almarai  w-full  flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-full text-sm font-medium hover:bg-indigo-500 hover:text-white transition-all duration-300"
        >
          <GrPowerReset className="text-xl" />
          إعادة الضبط
        </button>
      </div>
    </aside>
  );
}

export default FilterationSidebar;
