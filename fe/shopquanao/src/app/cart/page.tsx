"use client"

import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { useCart } from "../context/cartcontext";
import Image from "next/image";

export default function Cart(){

     const {  cartdetail } = useCart();
   
return(
<div>
   <Header/>
   <div className="mt-[100px] max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>
      {/* Danh sách sản phẩm */}
      <div className="space-y-4">
         {/* Một sản phẩm */}
         {(cartdetail ?? []).map((cat) =>(
            <div className="flex items-center gap-4  p-4 rounded-md shadow-sm bg-white" key={`${cat.product.id}-${cat.color.id}-${cat.size.id}`}>
            <Image
            
               src={cat.product.image}
               alt="product"
               className="w-24 h-24 object-contain  rounded-md"
               height={96}
               width={96}  
               />
               
            <div className="flex-1">
               <h3 className="font-medium text-lg">{cat.product.name}</h3>
               <p className="text-sm text-gray-500">Size: {cat.size.name} | Màu: {cat.color.name}</p>
               <div className="flex items-center mt-2 gap-2">
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                  <span>{cat.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">+</button>
               </div>
            </div>
            <div className="text-right">
               <p className="font-medium text-red-600">{cat.product.discountprice}</p>
               <p className="text-sm text-gray-500 line-through">{cat.product.price}</p>
               <button className="text-sm text-red-500 mt-2 hover:underline">Xóa</button>
            </div>
         </div>
         ))}


         {/* ... thêm nhiều sản phẩm khác nếu cần */}
      </div>

      {/* voucher */}

{/* Mã giảm giá */}


      {/* Tổng tiền & nút thanh toán */}
      <div className="mt-6 p-4  rounded-md bg-white shadow-sm flex justify-between items-center">
         <div>
            <p className="text-gray-600">Tạm tính:</p>
            <p className="text-sm text-gray-500 line-through">280.000đ</p>
            <p className="text-xl font-bold text-red-600">240.000đ</p>
             <p className="text-gray-600">tiet kiem</p>
            <p className="text-xl font-bold text-red-600">40.000đ</p>
         </div>
        
        <div>
             <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold">
         Tiến hành thanh toán
         </button>
         
        </div>
      </div>
   </div>
   <FooterPage/>
</div>
)
}