"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { CgClose, CgShoppingCart } from "react-icons/cg";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import ShoppingCart from "./ShoppingCart";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart);

  const toggleNavbar = () => {
    setIsSearchOpen(false);
    setIsOpen((prev) => !prev);
    setQuery("");
  };
  const closeNavbar = () => setIsOpen(false);
  const openSearchBox = () => {
    setIsSearchOpen(true);
    if (isSearchOpen) {
      if (query.trim().length == 0) {
        setIsSearchOpen(false);
        setQuery("");
      } else {
        router.push(`/perfumes?search=${encodeURIComponent(query)}`);
        closeSearchBox();
      }
    }
  };
  const searchWithKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      router.push(`/perfumes?search=${encodeURIComponent(query)}`);
      closeSearchBox();
    }
  };

  const closeSearchBox = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  const openCart = () => setIsShoppingCartOpen(true);
  return (
    <nav className="w-full bg-black text-white shadow-lg font-cairo fixed top-0 left-0 z-30 ">
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className={`flex items-center gap-2`}>
          <img
            src="/images/logo.png"
            alt="نصار للعطور"
            className="md:w-10 md:h-10 w-9 h-9 rounded-full object-cover"
          />
          <h1 className="lg:text-2xl  font-bold tracking-wide">نصار للعطور</h1>
        </Link>

        {/* Desktop  Links */}
        <div className="hidden md:flex flex-1 justify-center   items-center  gap-6 text-lg max-[820px]:text-[15px] max-[768px]:text-[13px] font-medium">
          <Link
            href="/"
            className={`hover:text-yellow-400 transition duration-300  ${pathname === "/" ? "border-b-2 text-yellow-400 border-b-yellow-500 " : ""}`}
          >
            الرئيسية
          </Link>

          <Link
            href="/perfumes"
            className={`hover:text-yellow-400 transition duration-300  ${pathname === "/perfumes" ? "border-b-2 text-yellow-400 border-b-yellow-500 " : ""}`}
          >
            العطور
          </Link>

          <Link
            href="/offers"
            className={`hover:text-yellow-400 transition duration-300  ${pathname === "/offers" ? "border-b-2 text-yellow-400 border-b-yellow-500 " : ""}`}
          >
            العروض
          </Link>
          <Link
            href="/news"
            className={`hover:text-yellow-400 transition duration-300  ${pathname === "/news" ? "border-b-2 text-yellow-400 border-b-yellow-500 " : ""}`}
          >
            الأخبار
          </Link>

          <Link
            href="/contact"
            className={`hover:text-yellow-400 transition duration-300  ${pathname === "/contact" ? "border-b-2 text-yellow-400 border-b-yellow-500 " : ""}`}
          >
            تواصل معنا
          </Link>
        </div>
        <div className="flex items-center ">
          <div className="flex md:gap-6 gap-2 mx-3 md:mx-0 items-center">
            <div className="relative     bg-white text-black w-fit lg:w-[250px] md:w-[200px]  rounded-md flex items-center">
              {isSearchOpen && (
                <Input
                  type="text"
                  className="w-full  rounded-none p-5 md:relative md:bg-none md:inset-0 md:z-0  fixed  !bg-white  left-0 top-[70px] z-20"
                  placeholder="ابحث عن العطر الذي تريده"
                  value={query}
                  onKeyDown={searchWithKeyDown}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}
              {/* Mobile search button inside search-box */}
              {query.trim().length > 0 && isSearchOpen && (
                <button
                  className="fixed top-[77px]  left-2 z-20 text-gray-500 md:hidden"
                  onClick={openSearchBox}
                >
                  {" "}
                  <IoSearch className="text-2xl" />
                </button>
              )}
              {/* Mobile close button inside search-box */}

              {query.trim().length === 0 && isSearchOpen && (
                <button
                  className="fixed top-[77px] left-2 z-20 text-gray-500 md:hidden"
                  onClick={closeSearchBox}
                >
                  {" "}
                  <CgClose className="text-2xl" />
                </button>
              )}

              <button
                className={`absolute left-1 text-white   ${!isSearchOpen ? "text-white" : "md:text-black"}`}
                onClick={openSearchBox}
              >
                <IoSearch className="text-2xl" />
              </button>
            </div>

            <button onClick={openCart} className="relative">
              <CgShoppingCart className="text-2xl" />
              <Badge className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold w-4 h-4  md:w-5 md:h-5 rounded-full shadow-lg">
                {cartItems.length}
              </Badge>
            </button>
          </div>
          {/* Mobile Links */}

          <button className="sm:block md:hidden" onClick={toggleNavbar}>
            <IoMdMenu className="text-4xl" />
          </button>
          {isOpen && (
            <div className="bg-black/95    fixed  p-4 top-0 bottom-0 left-0 w-full h-full z-[20]">
              {" "}
              <div className="links flex flex-col gap-7">
                <Link
                  href="/"
                  onClick={closeNavbar}
                  className="hover:text-yellow-400 transition duration-300 text-3xl"
                >
                  الرئيسية
                </Link>
                <Link
                  href="/perfumes"
                  onClick={closeNavbar}
                  className="hover:text-yellow-400 transition duration-300 text-3xl"
                >
                  العطور
                </Link>
                <Link
                  href="/offers"
                  onClick={closeNavbar}
                  className="hover:text-yellow-400 transition duration-300 text-3xl"
                >
                  العروض
                </Link>
                <Link
                  href="/news"
                  onClick={closeNavbar}
                  className="hover:text-yellow-400 transition duration-300 text-3xl"
                >
                  الأخبار
                </Link>
                <Link
                  href="/contact"
                  onClick={closeNavbar}
                  className="hover:text-yellow-400 transition duration-300 text-3xl"
                >
                  تواصل معنا
                </Link>
              </div>
              <button className="absolute top-4 left-3" onClick={closeNavbar}>
                <IoMdClose className="text-4xl" />
              </button>
            </div>
          )}
          {isShoppingCartOpen && (
            <ShoppingCart
              isShoppingCartOpen={isShoppingCartOpen}
              setIsShoppingCartOpen={setIsShoppingCartOpen}
            />
          )}
          {isShoppingCartOpen && (
            <div
              className=" fixed inset-0 bg-black/50 cursor-pointer z-25 w-full h-full"
              onClick={() => setIsShoppingCartOpen(false)}
            ></div>
          )}
        </div>
      </div>
    </nav>
  );
}
