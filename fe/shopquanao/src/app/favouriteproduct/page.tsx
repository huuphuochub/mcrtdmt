"use client"

import React, { useEffect, useState } from "react";
import Header from "@/component/header";
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
        <Header/>
            <div className="mt-[100px] min-h-[600px] bg-gray-50">
            <div className="px-6 py-10 max-w-[1200px] mx-auto relative">
                {/* Tiêu đề */}
                <div className="w-full text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Dành cho bạn</h1>
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
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        { products && products.map((item, index) => {
                            const slug = `${toSlug(item.product.name)}-i.${item.product.idSeller}.${item.product.id}`;
                     const avg = item.product.ratingCount > 0 ? item.product.ratingSum / item.product.ratingCount : 0;
                            return(
                            <Link href={`/${slug}`} key={index}>
                        <div
                            
                            className="relative rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 p-4 hover:cursor-pointer"
                            >
                            {/* Nút like */}
                            <Heart className={`absolute right-3 top-3 hover:cursor-pointer text-red-500 ${
                                checked.includes(item.product.id) ? " fill-red-500" : ""
                            }`}
                            
                                onClick={() =>
                                    checked.includes(item.product.id)
                                    ? handleDeleteFv(item.product.id)
                                    : HandleAddFavourite(item.product.id)
                                }                 
                                
                                
                            />

                            {/* Ảnh sản phẩm */}
                            <div className="w-full h-[220px] flex justify-center items-center">
                                <Image
                                width={300}
                                height={300}
                                src={item.product.image || ''}
                                alt="product"
                                className="object-contain max-h-[200px] max-w-[200px] rounded-lg"
                                />
                            </div>

                            {/* Thông tin sản phẩm */}
                            <div className="mt-4 text-center space-y-2">
                                <p className="font-semibold text-gray-800">{item?.product.name}</p>
                                <p className="text-sm line-through text-gray-400">{item.product.price} đ</p>
                                <p className="text-lg text-red-500 font-bold">{item.product.discountprice} đ</p>
                            </div>
                            </div>
                            
                            </Link>
           ) }       )}
                </div>
                )}
               
            </div>
            </div>

        <FooterPage/>
    </div>
  )
}






