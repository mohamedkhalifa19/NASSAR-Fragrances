import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IoMdClose } from "react-icons/io";
import QuantityButton from "./QuantityButton";
import { IOrder } from "@/app/libs/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteCartItm } from "../store/features/cart/cart";
import { IoAlert } from "react-icons/io5";
import { toast } from "sonner";

interface IProps {
  item: IOrder;
}
function CartItem({ item }: IProps) {
  const { name, imageUrl, price, quantity, category } = item;
  const dispatch = useDispatch<AppDispatch>();
  const deleteItm = (itm: IOrder) => {
    dispatch(deleteCartItm(itm));
    toast(
      <p className="flex items-center text-white font-almarai text-[15px] tracking-widest">
        <IoAlert className="text-xl text-red-600" />
        {` تم إزالة عنصر من سلة المشتريات`}
      </p>,
      { style: { background: "black", opacity: 0.9 } },
    );
  };
  return (
    <Card>
      <CardContent className="flex gap-2">
        {/* Right section for product image */}
        <div className="w-fit md:h-[100px] h-[80px] overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt="product image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left Section product Details */}
        <div className="flex-1 flex justify-between  text-white">
          {/* Details */}
          <div className="space-y-1">
            <h4 className="text-lg  font-cairo">{name}</h4>
            <Badge className="bg-orange-500 rounded-full flex items-center justify-center font-tajawal">
              {category}
            </Badge>
            <p className="text-slate-200">{price.toFixed(2)} $</p>
            <QuantityButton itm={item} />
          </div>
          <div className="flex flex-col justify-between items-center">
            <p className="text-slate-200 text-lg">
              {(quantity * price).toFixed(2)} $
            </p>
            <button className="text-red-200 " onClick={() => deleteItm(item)}>
              {" "}
              <IoMdClose className="text-3xl" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
