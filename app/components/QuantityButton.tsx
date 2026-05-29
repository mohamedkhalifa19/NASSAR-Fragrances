"use client";

import { IOrder } from "@/app/libs/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteCartItm, editCart } from "../store/features/cart/cart";
import { toast } from "sonner";
import { IoAlert } from "react-icons/io5";

interface IProps {
  itm: IOrder;
}
export default function QuantityButton({ itm }: IProps) {
  const { cart: cartItems } = useSelector((state: RootState) => state);
  const cartItm = cartItems.find((product) => product.id == itm.id);
  const dispatch = useDispatch<AppDispatch>();
  const increase = () => {
    if (cartItm) {
      dispatch(editCart({ ...cartItm, quantity: cartItm.quantity + 1 }));
    }
  };

  const decrease = () => {
    if (cartItm) {
      if (cartItm?.quantity > 1) {
        dispatch(editCart({ ...cartItm, quantity: cartItm.quantity - 1 }));
      } else {
        dispatch(deleteCartItm(cartItm));
        toast(
          <p className="flex items-center text-white font-almarai text-[15px] tracking-widest">
            <IoAlert className="text-xl text-red-600" />
            {` تم إزالة عنصر من سلة المشتريات`}
          </p>,
          { style: { background: "black", opacity: 0.9 } },
        );
      }
    }
  };
  return (
    <div className="flex items-center gap-3 border rounded px-1 w-fit bg-white shadow-sm">
      <button
        onClick={decrease}
        className="w-4 h-4 flex items-center justify-center rounded-full bg-black hover:bg-gray-300 transition"
      >
        −
      </button>

      <span className="text-md font-semibold w-6 text-center text-black">
        {cartItm?.quantity}
      </span>

      <button
        onClick={increase}
        className="w-4 h-4 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition"
      >
        +
      </button>
    </div>
  );
}
