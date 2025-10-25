"use client"

import React, { useEffect, useState } from "react";
import FooterPage from "@/component/footer";
import { Search } from "lucide-react";
import Image from "next/image";
import Button from "@/component/ui/button";
import { SellerInterface } from "@/interface/seller.interface";
import { getAllSeller, searchNameSeller } from "@/service/sellerservice";
import Link from "next/link";
export default function Shop() {
  const [sellers,setSellers] = useState<SellerInterface[]>([]);
  const [loading,setLoading] = useState(true)
  const [nameseller,setNameseller] = useState<string>('');
  useEffect(() =>{
    fetchSeller()
  },[])
  const fetchSeller = async() =>{
    try {
      const seller = await getAllSeller();
    console.log(seller);
    
    if(seller.data.success){
      setSellers(seller.data.data)
    }
    } catch (error) {
      setLoading(false)
    }finally {
      setLoading(false)
    }
  }
  const searchNameseller = async() =>{
    try {
      setLoading(true)
      const data = await searchNameSeller(nameseller);
      console.log(data);
      if(data.data.success){
        setSellers(data.data.data);
      }
      
    } catch (error) {
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  const formatteddate = (date:string)=>{
    const dates = new Date(date);
    return  `${dates.getDate().toString().padStart(2, '0')}/${(dates.getMonth() + 1).toString().padStart(2, '0')}/${dates.getFullYear()}`
  }
  return (
    <div>
      


      <div className="mt-[80px] max-w-[1200px] mx-auto px-4 min-h-[800px]">
        {/* PHẦN TÌM KIẾM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Tìm nhà bán hàng</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Ô tìm theo tên */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                value={nameseller}
                placeholder="Nhập tên nhà bán hàng..."
                onChange={(e) => setNameseller(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchNameseller();
                }
              }}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Dropdown danh mục sản phẩm */}
           
          </div>
        </div>

        {/* GỢI Ý NHÀ BÁN HÀNG NỔI BẬT */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Nhà bán hàng nổi bật</h3>
          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sellers.length === 0 ?(
                <div>
                  không có seller nào
                </div>
              ) : (
                <div>
                  
                </div>
              )}
            {sellers.length > 0 && sellers.map((s) => (
              <div className="w-full md:w-80 border rounded-xl shadow-md p-4 bg-white" key={s.id}>
                    <div className="flex items-center gap-4">
                        <Image
                        width={64}
                        height={64}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                        alt="Shop Avatar"
                        className=" rounded-full border object-cover"
                        />
                        <div>
                        <Link href={`/page/sellerinfor/?id=${s.id}`}><h2 className="text-lg relative font-semibold text-gray-800 hover:cursor-pointer hover:underline ">{s.usernameseller}</h2></Link>
                        <p className="text-sm text-gray-500">Tham gia: {formatteddate(s.createdAt)}</p>
                        </div>
                    </div>

                    {/* Thông tin */}
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <p>⭐ Đánh giá: <span className="font-medium text-gray-800">{s.ratingSum/s.ratingCount}</span></p>
                        <p>📦 Tổng sản phẩm đã bán: <span className="font-medium text-gray-800">{s.soldCount}</span></p>
                        <p>Người theo giõi <span className="font-medium text-gray-800">{s.follower}</span></p>
                        <p>📍 Địa chỉ: <span className="font-medium text-gray-800">{s.address}</span></p>
                    </div>

                    {/* Nút hành động */}
                    {/* <div className="mt-4 flex gap-3">
                        
                        <Button className="">
                        ➕ Theo dõi
                        </Button>
                    </div> */}

                    {/* Tabs */}
                    
                    </div>
            ))}
            </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-4">
                { [1, 2, 3, 4, 5, 6].map((s) => (
                      <div
                        key={s}
                        className="w-full border rounded-xl shadow-md p-4 bg-white animate-pulse flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-300 rounded-full" />
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>

                        {/* Info Skeleton */}
                        <div className="mt-4 space-y-2">
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                        </div>

                        {/* Button Skeleton */}
                        <div className="mt-4 flex gap-3">
                          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                        </div>
                      </div>
                    ))

                    }
              </div>



          )}
          
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
