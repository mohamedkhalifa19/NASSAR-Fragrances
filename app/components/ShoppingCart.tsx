import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetCart } from "../store/features/cart/cart";

interface IProps {
  isShoppingCartOpen: boolean;
  setIsShoppingCartOpen: (val: boolean) => void;
}
function ShoppingCart({ isShoppingCartOpen, setIsShoppingCartOpen }: IProps) {
  const closeCart = () => {
    setIsShoppingCartOpen(false);
  };
  const dispatch = useDispatch();
  const { cart: cartItems } = useSelector((state: RootState) => state);
  const WHATSAPPNUMBER = process.env.NEXT_PUBLIC_WHATSAPPNUMBER;
  const resetCartItems = () => {
    dispatch(resetCart());
    setIsShoppingCartOpen(false);
  };
  const handleWhatsapp = () => {
    const message = cartItems
      .map(
        (item) =>
          `أريد شراء عطر ${item.name} عدد ${item.quantity} وسعره ${item.price} جنية`,
      )
      .join("\n");

    console.log(message);
    const msg = `${message} إجمالي الطلبات =${cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)} جنية`;
    console.log(msg);
    const url = `https://wa.me/${WHATSAPPNUMBER}?text=${encodeURIComponent(
      msg,
    )}`;

    window.open(url, "_blank");
    resetCartItems();
  };
  return (
    <div
      className={`bg-[#0f0f0f] flex  flex-col  overflow-auto text-black transition-transform ease-in-out duration-200 transform ${isShoppingCartOpen ? " translate-x-0" : " translate-x-[-100%]"}    fixed  p-4 top-0 left-0 md:w-1/3 w-full h-full z-[20]`}
    >
      {" "}
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cairo text-white">سلة التسوق</h2>
        <button onClick={closeCart} className="text-white">
          <IoMdClose className="text-4xl" />
        </button>
      </div>
      {/* Orders */}
      <div
        className={`flex-1 flex flex-col gap-7 ${cartItems.length === 0 ? "justify-center items-center" : ""}`}
      >
        <div className="space-y-2">
          {cartItems.length > 0 ? (
            <>
              {/* Total items */}{" "}
              <p className="font-almarai text-white text-lg ">
                {" "}
                ({cartItems.length}) طلبات
              </p>{" "}
              {cartItems.map((cart) => (
                <CartItem key={cart.id} item={cart} />
              ))}
            </>
          ) : (
            <p className="text-gray-200 text-xl font-almarai ">
              سلة المشتريات فارغة
            </p>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="space-y-4">
        {cartItems.length > 0 && (
          <div className="flex  justify-between">
            {/* اجمالي الطلبات*/}
            <p className="font-tajawal text-lg text-white">اجمالي الطلبات</p>
            {/* Total price */}
            <p className="text-white">
              {cartItems
                .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                .toFixed(2)}{" "}
              $
            </p>
          </div>
        )}
        <button
          onClick={handleWhatsapp}
          className="font-almarai  w-full  flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
        >
          <FaWhatsapp className="text-xl" />
          اطلب الآن
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
