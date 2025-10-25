"use client"

import React, { useEffect, useState } from "react";
import FooterPage from "@/component/footer";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GetAllFavourite } from "@/service/product.service";
import { interfaceProduct } from "@/interface/product.interface";
// import { FavouriteProduct } from "@/component/product/product";
import { AddFavourite } from "@/service/product.service";
import { deLeteFv } from "@/service/product.service";
interface favourite {
    product:interfaceProduct,
    id:number,
    user_id:number
}

function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}
export default function Favouriteproduct(){
//   const [favourites, setFavourites] = useState<number[]>(products.map(p => p.id));
    const [checked,setChecked] = useState<number[]>([]);
    
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true)

    const [products,setProducts] = useState<favourite[]>()

    useEffect(() =>{
        FetchPrds()
    },[])
    const FetchPrds = async() =>{
        try {
            const products = await GetAllFavourite(page);
            console.log(products.data.data);
            if(products.data.success){
                setProducts(products.data.data)
                setChecked(products.data.data.map((fv: favourite) => fv.product.id));
            }
            
        } catch (error) {
            setLoading(false)
        } finally{
            setLoading(false)
        }
    }

    const HandleAddFavourite =async(product_id:number) =>{
       try {
        console.log(checked);
        
          const add = await AddFavourite(product_id);
          // console.log(add);
        //   setFavourited(true)
        setChecked((prev) => [...prev,product_id])
          
       } catch (error) {
          
       }
    }
    
    const handleDeleteFv = async(product_id:number) =>{
       try {
          const dlt = await deLeteFv(product_id)
          // console.log);
                // setFavourited(false)
        setChecked((prev) => prev.filter((id) => id !== product_id)); // ✅ xóa id khỏi mảng

    
          
       } catch (error) {
          
       }
    }

  return(
    <div>
            <div className="mt-[100px] min-h-[600px] bg-gray-50">
            <div className="px-6 py-10 max-w-[1200px] mx-auto relative ">
                {/* Tiêu đề */}
                <div className="w-full text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Sản phẩm yêu thích</h1>
                <p className="text-gray-500 mt-2">Sản phẩm yêu thích của bạn</p>
                </div>

                {/* Grid sản phẩm */}
                {loading ? (
                    <div>
                        <div className="w-full  flex justify-center items-center h-[400px]">
                            <span className="flex space-x-1">
                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
                            </span>
                            </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
  {products?.map((item, index) => {
    const slug = `${toSlug(item.product.name)}-i.${item.product.idSeller}.${item.product.id}`;
    const avg =
      item.product.ratingCount > 0
        ? item.product.ratingSum / item.product.ratingCount
        : 0;

    return (
      <Link href={`/${slug}`} key={index}>
        <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
          
          {/* Nút like */}
          <Heart
            className={`absolute right-3 top-3 z-10 text-red-500 transition-transform duration-200 hover:scale-110 ${
              checked.includes(item.product.id) ? "fill-red-500" : ""
            }`}
            onClick={(e) => {
              e.preventDefault(); // ngăn reload khi click
              checked.includes(item.product.id)
                ? handleDeleteFv(item.product.id)
                : HandleAddFavourite(item.product.id);
            }}
          />

          {/* Ảnh sản phẩm */}
          <div className="relative aspect-square bg-gray-50 flex justify-center items-center overflow-hidden">
            <Image
              src={item.product.image || ""}
              alt={item.product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex-1 flex flex-col justify-between text-center p-3">
            <p className="font-semibold text-gray-800 text-sm line-clamp-2">
              {item.product.name}
            </p>
            <div className="mt-1">
              <p className="text-xs sm:text-sm line-through text-gray-400">
                {item.product.price} đ
              </p>
              <p className="text-base sm:text-lg text-red-500 font-bold">
                {item.product.discountprice} đ
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  })}
</div>


                )}
               
            </div>
            </div>

        <FooterPage/>
    </div>
  )
}






