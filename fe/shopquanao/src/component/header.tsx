"use client";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Cartheader from "./cart/cart";
import { Getuserbyid, Logout } from "@/service/userservice";
import { Getallcartitem } from "@/service/cartservice";
import Link from "next/link";
import { useCart } from "@/app/context/cartcontext";
import { useUser } from "@/app/context/usercontext";
import useCategoryStore from "@/app/context/categorycontext";
import { useRouter } from "next/navigation";
import { deletehistory, getHistorysearch } from "@/service/product.service";
import Chat from "./chat/chat";
import {
  User,
  ShoppingCart,
  Heart,
  Search,
  ClockFading,
  X,
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";
import { AddKeywordSearch } from "@/service/product.service";
// import React, { useRef } from "react";
interface Carts {
  product_id: number;
  color_id: number;
  size_id: number;
  quantity: number;
}
interface CartItem {
  product_id: number;
  color_id: number;
  size_id: number;
  quantity: number;
  cart_id: number;
  id: number;
}
export default function Header() {
  const { cart, addToCart, registerCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [loadinghistory, setLoadinghistory] = useState(true);
  // const [added, setAdded] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isOpenCartheader, setIsopencartheader] = useState(false);
  const [isOpenprofile, setIsopenprofile] = useState(false);
  const [cartitem, setCartitem] = useState<CartItem[]>([]);
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const { user, seller } = useUser();
  const router = useRouter();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { categorys, fetchCategorys } = useCategoryStore();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [openmenumobile, setOpenmenumobile] = useState(false);

  useEffect(() => {
    fetchCategorys();
    // console.log(categorys);
  }, []);
  const OpenNoti = () => {
    setIsOpenNoti(!isOpenNoti);
    setIsopenprofile(false);
  };

   useEffect(() => {
    if (openmenumobile) {
      // Khóa cuộn trang
      document.body.style.overflow = "hidden";
    } else {
      // Khôi phục cuộn
      document.body.style.overflow = "auto";
    }

    // Dọn dẹp khi component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openmenumobile]);

   useEffect(() => {
    if (isOpenCartheader) {
      // Khóa cuộn trang
      document.body.style.overflow = "hidden";
    } else {
      // Khôi phục cuộn
      document.body.style.overflow = "auto";
    }

    // Dọn dẹp khi component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenCartheader]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // cuộn xuống → ẩn header
        setShow(false);
      } else {
        // cuộn lên → hiện header
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleSearch = async () => {
    if (keyword.trim()) {
      console.log(encodeURIComponent(keyword.trim()));
      if (user) {
        const ok = await AddKeywordSearch({ keyword: keyword });
        console.log(ok);
      }
      router.push(`/search/?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };
  useEffect(() => {
    if (cartitem.length > 0) {
      cartitem.forEach((element: Carts) => {
        addToCart({
          product_id: element.product_id,
          size_id: element.size_id,
          color_id: element.color_id,
          quantity: element.quantity,
        });
      });
    }
  }, [cartitem, addToCart]);
  const fetahsearch = async () => {
    setIsOpen(true);
    if (user) {
      try {
        const keywords = await getHistorysearch();
        setHistory(keywords.data.data);
        // console.log(keywords.data.data);
      } catch (error) {
        setLoadinghistory(false);
      } finally {
        setLoadinghistory(false);
      }
    }
  };
  const handledeletehistory = async (id: number) => {
    // console.log(id);
    const xoa = await deletehistory(id);
    // console.log(xoa);
    const ok = history.filter((item) => (item = item.id !== id));
    // console.log(ok);
    setHistory(ok);
  };
  function toSlug(name: string) {
    return name
      .normalize("NFD") // xóa dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // thay khoảng trắng & ký tự đặc biệt thành -
      .replace(/^-+|-+$/g, ""); // xóa - thừa đầu/cuối
  }
  const logoutsubmit = async () => {
    Logout();
    window.location.href = "/login";
  };
  const Opencart = () => {
    setIsopencartheader(!isOpenCartheader);
  };
  const Openprofile = () => {
    setIsopenprofile(!isOpenprofile);
    setIsOpenNoti(false);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header
      className={`fixed top-0 z-20 left-0 w-full bg-white shadow transition-transform duration-300 
    ${show ? "translate-y-0" : "-translate-y-full"} 
    lg:translate-y-0 z-10`}
    >
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          {/* 
   <div className="logo hover:cursor-pointer">
      Danh mục
   </div>
   */}
          <div>
            <ul className=" hidden lg:flex gap-6 text-xl font-semibold font-poppins ">
              <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                <Link href="http://localhost:3000">Trang chủ</Link>
              </li>
              <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                <Link href="http://localhost:3000/page/Shop">Cửa hàng</Link>
              </li>
              <div className="relative group inline-block py-[20px]">
                <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300">
                  <Link href="http://localhost:3000/">Danh mục</Link>
                </li>
                <div className="fixed left-0 top-[50px] w-lvw  h-[300px] bg-white z-50 border  hidden group-hover:block">
                  <ul className="flex flex-wrap gap-4 p-4">
                    {(categorys ?? []).map((cat) => {
                      const slug = `${toSlug(cat.name)}-cat.${
                        cat.id
                      }?page=1&keyword=&bestselling=0&rating=0&discount=0&newdate=0&minprice=0&maxprice=0`;
                      return (
                        <Link
                          href={`/${slug}`}
                          key={cat.id}
                          className="w-[120px] text-gray-700 hover:text-black cursor-pointer flex items-center justify-center"
                        >
                          <div>
                            <Image
                              width={100}
                              height={100}
                              alt=""
                              src={cat.urlimage}
                              className="max-w-[50px] min-w-[50px] max-h-[50px] min-h-[50px]"
                            ></Image>
                            <p>{cat.name}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                {seller && user ? (
                  <Link href="http://localhost:3000/admin">
                    Cửa hàng của bạn
                  </Link>
                ) : user && !seller ? (
                  <Link href="http://localhost:3000/sellerregistration">
                    Đăng kí bán hàng
                  </Link>
                ) : (
                  <Link href="http://localhost:3000/registration">
                    Đăng kí{" "}
                  </Link>
                )}
              </li>
              <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                <Link href="http://localhost:3000/page/support">Hỗ trợ</Link>
              </li>
            </ul>
            <div className=" flex text-xl h-[80px] items-center font-semibold font-poppins lg:hidden mx-2">
              <div className="">
                <div>
                  <Menu
                    className="text-gray-700 cursor-pointer"
                    size={30}
                    onClick={() => setOpenmenumobile(!openmenumobile)}
                  />
                  {openmenumobile && (
                    <div className="absolute h-lvh w-[300px] bg-white top-0 left-0 z-10 border">
                      <div className="flex p-2 justify-between items-center border-b ">
                        <p className="text-lg font-semibold">Menu</p>
                        <X
                          className="text-gray-600 cursor-pointer hover:text-red-500 transition"
                          size={24}
                          onClick={() => setOpenmenumobile(!openmenumobile)}
                        />
                      </div>
                      <div>
                        <ul className="flex flex-col ">
                          <li className="px-5 py-3 border-b text-gray-700 hover:bg-gray-100 hover:pl-7 transition-all cursor-pointer">
                            <Link href="http://localhost:3000">Trang chủ</Link>
                          </li>
                          <li className="px-5 py-3 border-b text-gray-700 hover:bg-gray-100 hover:pl-7 transition-all cursor-pointer">
                           <Link href="http://localhost:3000/page/Shop">Cửa hàng</Link>
                          </li>
                         
                          <li className="px-5 py-3 border-b text-gray-700 hover:bg-gray-100 hover:pl-7 transition-all cursor-pointer">
                                 {seller && user ? (
                                    <Link href="http://localhost:3000/admin">
                                    Cửa hàng của bạn
                                    </Link>
                                 ) : user && !seller ? (
                                    <Link href="http://localhost:3000/sellerregistration">
                                    Đăng kí bán hàng
                                    </Link>
                                 ) : (
                                    <Link href="http://localhost:3000/registration">
                                    Đăng kí{" "}
                                    </Link>
                                 )}
                          </li>
                          <li className="px-5 py-3 border-b text-gray-700 hover:bg-gray-100 hover:pl-7 transition-all cursor-pointer">
                              <Link href="http://localhost:3000/page/support">Hỗ trợ</Link>
                          </li>
                           <li className="border-b text-gray-700">
                            <div
                              className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-100 transition"
                              onClick={() => setOpen(!open)}
                            >
                              <span className="font-medium">Danh mục</span>
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </div>

                            <div
                              className={` transition-all duration-300 ${
                                open
                                  ? "max-auto opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <ul className="bg-gray-50">
                                {(categorys ?? []).map((cat) => {
                                  const slug = `${toSlug(cat.name)}-cat.${
                                    cat.id
                                  }?page=1&keyword=&bestselling=0&rating=0&discount=0&newdate=0&minprice=0&maxprice=0`;
                                  return (
                                    <Link href={`/${slug}`} key={cat.id}>
                                      <li className="px-7 py-2 text-gray-600 hover:bg-gray-100 transition">
                                        {cat.name}
                                      </li>
                                    </Link>
                                  );
                                })}
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-2xl max-w-[400px]">
          <div ref={wrapperRef} className="relative w-full max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              onFocus={() => fetahsearch()}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-4 pr-10 placeholder:text-xl border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer" />
            {isOpen && (
              <div className="absolute w-[350px] h-[600px] overflow-y-auto hide-scrollbar bg-white border border-gray-300 rounded-xl shadow-lg mt-2 z-50">
                <div className="flex justify-between items-center sticky text-xl top-0 p-3 font-semibold text-gray-700 border-b border-gray-200 z-10 bg-white">
                  <p >
                  Lịch sử tìm kiếm
                </p>
                <X onClick={() =>setIsOpen(false)}/>
                </div>
                {history.length > 0 &&
                  history.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start justify-between px-4 py-2 hover:bg-gray-100 transition border-b"
                    >
                      <div
                        className="flex items-start gap-2 cursor-pointer text-gray-700 "
                        onClick={() =>
                          router.push(
                            `/search/?keyword=${encodeURIComponent(
                              item.keyword
                            )}`
                          )
                        }
                      >

                        <p className="text-[20px] p-0 m-0">{item.keyword}</p>
                      </div>
                      <X
                        className="cursor-pointer size-6 p-0 m-0 text-gray-400 hover:text-red-500 transition"
                        onClick={() => handledeletehistory(item.id)}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative" ref={registerCart}>
            <ShoppingCart
              className="size-7 hover:cursor-pointer"
              onClick={() => Opencart()}
            />
            {cart.length > 0 ? (
              <div className="absolute top-[-10px] right-[-10px] bg-red-500 w-[15px] h-[15px] text-[15px] flex justify-center items-center text-white rounded-full">
                <span>{cart.length}</span>
              </div>
            ) : (
              <div></div>
            )}
            
          </div>
          <div>
            <Link href="favouriteproduct">
              <Heart className="size-7 hover:cursor-pointer" />
            </Link>
          </div>
          <div className="relative">
            <Bell
              className="size-7 hover:cursor-pointer"
              onClick={() => OpenNoti()}
            />
            {isOpenNoti && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-xl shadow-lg  z-10">
                <div className="">
                  <div className="p-2 border-b flex items-center justify-between">
                    <p className="font-semibold text-lg">Thông báo</p>
                    <X
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setIsOpenNoti(false)}
                    />
                  </div>
                  <div className=" h-[400px] overflow-y-auto hide-scrollbar">
                    <div className="border-b p-2 relative hover:cursor-pointer hover:bg-gray-100">
                      <div>
                        <p className="p-0 m-0 text-[17px]">
                          Đơn hàng 12345678 của bạn đang trên đường vận chuyển
                        </p>
                        <span className="text-sm text-gray-500 p-0 m-0">
                          <p>10 phút trước</p>
                        </span>
                      </div>
                      <div className="w-[10px] h-[10px] bg-red-500 rounded-2xl absolute bottom-[15px] right-2"></div>
                    </div>
                    <div className="border-b p-2 relative">
                      <div>
                        <p className="p-0 m-0 text-[17px]">
                          Đơn hàng 12345678 của bạn đang trên đường vận chuyển
                        </p>
                        <span className="text-sm text-gray-500 p-0 m-0">
                          <p>10 phút trước</p>
                        </span>
                      </div>
                      <div className="w-[10px] h-[10px] bg-red-500 rounded-2xl absolute bottom-[15px] right-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {/* 
   <User className="size-7 hover:cursor-pointer"/>
   */}
            {user ? (
              <div className="relative">
                <Image
                  height={55}
                  width={55}
                  src={user.avatarUrl}
                  alt="avatar"
                  className="rounded-full hover:cursor-pointer"
                  onClick={() => Openprofile()}
                />
                {/* thanh tông báo */}
                {isOpenprofile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg  z-10">
                    <div className="p-2">
                      <div
                        onClick={() => logoutsubmit()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-red-600 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1m0-4v-1a2 2 0 012-2h4a2 2 0 012 2v1"
                          />
                        </svg>
                        <span className="text-[15px]">Đăng xuất</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                        <span
                          className="text-[15px]"
                          onClick={() => OpenNoti()}
                        >
                          Thông báo
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span className="text-[15px]">Cài đặt</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17v-6a2 2 0 012-2h4m0 0l-2-2m2 2l-2 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-[15px]">
                          <Link href="/order">Lịch sử đơn hàng</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="http://localhost:3000/login">
                <User className="size-7 hover:cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {isOpenCartheader && (
              <Cartheader onClose={Opencart} isOpen={isOpenCartheader} />
            )}
    </header>
  );
}
