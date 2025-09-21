

"use client"
import React, { useEffect } from "react";
import { useSeller } from "../context/sellercontext";
import { AlignJustify,Search,Settings ,Box,ChartArea,Bell,MessageCircleMore, Home,ChevronDown  } from 'lucide-react';
import Image from "next/image";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";

const Headeradmin1 =({ onToggleMenu }: { onToggleMenu: () => void }) =>{
  const {seller,loading} = useSeller();
  useEffect(() => {
    console.log(seller);
    
    if (!loading) { // chỉ kiểm tra sau khi load xong
      if (!seller) {
        window.location.href = "http://localhost:3000/sellerregistration";
      }
    }
  }, [loading, seller]);
    return(
<div className="fixed top-0 left-0 w-full h-[60px] bg-white shadow z-20">
  {loading ? (
    // Loading state
    <div className="w-full h-full flex justify-center items-center bg-gray-50">
      <span className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
      </span>
    </div>
  ) : (
    <div className="h-full px-6 flex items-center justify-between">
      {/* Left: Logo + toggle */}
      <div className="flex items-center gap-4 w-[280px]">
        <AlignJustify className="cursor-pointer hover:text-blue-500 text-xl transition  bg-gray-200 w-[35px] h-[35px] p-[5px] rounded-2xl" onClick={onToggleMenu}/>
        <Image
          width={35}
          height={35}
          src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
          alt="Logo"
          className="object-contain border rounded-full"
        />
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center ">
        <div className="relative w-full max-w-[500px]">
          <input
            type="text"
            placeholder="Tìm sản phẩm theo tên..."
            className="w-full pl-4 pr-10 py-1 border border-gray-300 rounded-full 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Settings className="cursor-pointer hover:text-blue-500 text-xl transition  bg-gray-200 w-[35px] h-[35px] p-[5px] rounded-2xl" />
        <MessageCircleMore className="cursor-pointer hover:text-blue-500 text-xl transition bg-gray-200 w-[35px] h-[35px] p-[5px] rounded-2xl" />
        <Bell className="cursor-pointer hover:text-blue-500 text-xl transition bg-gray-200 w-[35px] h-[35px] p-[5px] rounded-2xl" />
        <div className="flex items-center">
            <Image
            width={35}
            height={35}
            src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
            alt="User avatar"
            className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition"
          />
          <ChevronDown size={15}/>
          <div>
            <p className="">{seller?.usernameseller}</p>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

    )
}
const Headeradmin2 =() =>{
  const {loading} = useSeller();
  console.log(loading);
  
    return(
<aside className="fixed  left-0 w-[280px] h-[calc(100vh-60px)] bg-white border-r p-4 overflow-y-auto z-10 rounded-tr-xl ">
  {!loading ? (
    <div className="flex flex-col gap-4 ">
      {/* Trang chủ */}
      <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
        <Home />
        <span className="text-2xl">Trang chủ</span>
      </a>

      {/* Accordion Menu */}
      <Accordion type="single" collapsible>
        <AccordionItem value="dashboard" className="text-2xl">
          <div className="flex  items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 text-xl font-medium">Dashboard</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl ">Doanh thu</a>
            <a href="#" className="hover:text-blue-500 text-xl">Sản phẩm</a>
            <a href="#" className="hover:text-blue-500 text-xl">Khách hàng</a>
            <a href="#" className="hover:text-blue-500 text-xl">Báo cáo</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible>
        <AccordionItem value="products">
          <div className="flex items-center gap-2">
            <Box />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Sản phẩm</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <Link href="/admin/page/product/list" className="hover:text-blue-500 text-xl">Danh sách</Link>
            <a href="#" className="hover:text-blue-500 text-xl">Thêm sản phẩm</a>
            <a href="#" className="hover:text-blue-500 text-xl">Thêm biến thể</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type="single" collapsible>
        <AccordionItem value="other">
          <div className="flex items-center gap-2">
            <ChartArea />
            <AccordionTrigger className="flex-1 text-gray-700 font-medium">Khác</AccordionTrigger>
          </div>
          <AccordionContent className="ml-6 flex flex-col gap-1">
            <a href="#" className="hover:text-blue-500 text-xl">Item 1</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 2</a>
            <a href="#" className="hover:text-blue-500 text-xl">Item 3</a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ) : (
    // Loading state
    <div className="w-full h-full flex justify-center items-center">
      <span className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
      </span>
    </div>
  )}
</aside>

    )
}
export {Headeradmin1,Headeradmin2}