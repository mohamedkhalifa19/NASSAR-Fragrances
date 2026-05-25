import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface IProps {
  sort: string;
  setSort: (val: string) => void;
}
function Selection({setSort,sort}:IProps) {
  return (
    <Select dir="rtl" value={sort} onValueChange={setSort}>
      <SelectTrigger className="w-full max-w-full text-white font-almarai ">
        <SelectValue placeholder="الاعلي تقييماً" />
      </SelectTrigger>
      <SelectContent className="border bg-white font-almarai">
        <SelectGroup>
          <SelectItem value="top-rating">الاعلي تقييماً</SelectItem>
          <SelectItem value="high-to-low">السعر من الاعلي إلي الاقل</SelectItem>
          <SelectItem value="low-to-high">السعر من الاقل إلي الاعلي</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Selection;
