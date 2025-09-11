

"use client"
import React, { useEffect } from "react";
import { useSeller } from "../context/sellercontext";
import { AlignJustify,Search,Settings ,Box,ChartArea,Bell,MessageCircleMore } from 'lucide-react';
import Image from "next/image";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Headeradmin1 =() =>{
  const {seller,loading} = useSeller();
  useEffect(() => {
    if (!loading) { // chỉ kiểm tra sau khi load xong
      if (!seller) {
        window.location.href = "http://localhost:3000/sellerregistration";
      }
    }
  }, [loading, seller]);
    return(
        <div className=" fixed top-0 w-full bg-gray-200 z-10  h-[80px] ">
            {loading ? (
            <div className="w-full h-full flex justify-center items-center bg-gray-200 border">
               <span className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
              </span>
            </div>
            ) : (
              <div className=" w-full px-4 ">
            <div  className="flex justify-between items-center  w-full ">
                 <div className="flex w-max-[334px] w-[334px]  items-center">
                        <AlignJustify />
                        <div>
                            <Image 
                                        width={70}
                                        height={70}
                                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
                                        alt=""
                                        ></Image>
                        </div>
                 </div>


                    <div className="flex-1">
                        <div className="relative w-full md:w-1/2  ">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm theo tên..."
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Settings/>
                        <MessageCircleMore/>
                        <Bell/>
                        <Image
                        width={50}
                        height={50}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
                        alt=""
                        className="rounded-full"

                        
                        >
                            
                            
                        </Image>                        
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
        <div className="w-max-[350px] w-[350px] border h-lvh mt-[80px] p-4">
            {!loading ? (
              <div>
                 <div className="">
                  
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1"  >
                       <div className="flex items-center gap-2">
                          <ChartArea/>
                          <AccordionTrigger>   Doashboard</AccordionTrigger>
                       </div>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          San pham
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          Khach hang
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          ok
                        </AccordionContent>
                        
                      </AccordionItem>
                    </Accordion>




                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1"  >
                       <div className="flex items-center gap-2">
                          <Box/>
                          <AccordionTrigger>   San pham</AccordionTrigger>
                       </div>
                        <AccordionContent className="ml-[20px]">
                          danh sach
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          Them san pham
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        
                      </AccordionItem>
                    </Accordion>




                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1"  >
                       <div className="flex items-center gap-2">
                          <ChartArea/>
                          <AccordionTrigger>   Doashboard</AccordionTrigger>
                       </div>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        <AccordionContent className="ml-[20px]">
                          doanh thu
                        </AccordionContent>
                        
                      </AccordionItem>
                    </Accordion>
                 </div>
            </div>
            ) : (
            <div className=" w-full px-4 ">
                        <div className="w-full h-lvh flex justify-center items-center">
                          <span className="flex space-x-1">
                              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
                              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
                          </span>
                        </div>
                        </div>
            )}
           
        </div>
    )
}
export {Headeradmin1,Headeradmin2}