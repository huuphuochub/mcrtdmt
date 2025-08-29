"use client"

import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { useCart } from "../context/cartcontext";
import Image from "next/image";
import Button from "@/component/ui/button";
import Link from "next/link";

export default function Cart(){

     const {  cartdetail,updateQuantity, removeFromCart,savecart,loading,deleteCart} = useCart();
     const [loadingcart,setLoadingcart] = React.useState(false);
   const clicksavecart=async ()=>{
      try {
         
         setLoadingcart(true);
         await savecart();
      } catch (error) {
      }finally{
         setLoadingcart(false);
      }
   }
   const clickDeletecart =async(produt_id:number,size_id:number,color_id:number)=>{
      if(cartdetail.length===1){
         const xacnhan = confirm('ban co muon xoa gio hang k')
         if(xacnhan){

            removeFromCart(produt_id,size_id,color_id);
            // console.log(cartdetail);
            deleteCart()
            
            // savecart()
         }  else{
            return;
         }
         

      }
            removeFromCart(produt_id,size_id,color_id);

   }
return(
<div>
   <Header/>
   {
      loading ?(
         <div>
            <div className="w-full h-lvh flex justify-center items-center">
      <span className="flex space-x-1">
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
    </span>
            </div>
         </div>
      ) : cartdetail.length === 0 ? (
         <div className="w-full h-lvh flex justify-center items-center">
            <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
         </div>
      ) :   (
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
                  <button className="px-2 relative hover:cursor-pointer py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => {
                    if (cat.quantity > 1) {
                      updateQuantity(cat.product.id, cat.size.id, cat.color.id, cat.quantity - 1);
                    }
                  }}
                  
                  >-</button>
                  <span>{cat.quantity}</span>
                  <button className="px-2 relative py-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => {
                    updateQuantity(cat.product.id, cat.size.id, cat.color.id, cat.quantity + 1);
                  }}
                  >+</button>
               </div>
            </div>
            <div className="text-right">
               <p className="font-medium text-red-600">{cat.product.discountprice}</p>
               <p className="text-sm text-gray-500 line-through">{cat.product.price}</p>
               <button className="text-sm relative text-red-500 mt-2 hover:underline"
               onClick={() => clickDeletecart(cat.product.id, cat.size.id, cat.color.id)}
               >Xóa</button>
            </div>
         </div>
         ) )}

         <div className="flex justify-end">
            <Button variant="primary" className="" onClick={clicksavecart}>
               {loadingcart ? "Đang lưu..." : "Lưu giỏ hàng"}
            </Button>
         </div>
         {/* ... thêm nhiều sản phẩm khác nếu cần */}
      </div>

      {/* voucher */}

{/* Mã giảm giá */}


      {/* Tổng tiền & nút thanh toán */}
            <div className="mt-6 p-6 rounded-2xl bg-white shadow-md border border-gray-100">
            <div className="space-y-3">
               <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{cartdetail.length} sản phẩm</span>
               </div>

               <div className="flex justify-between text-sm text-gray-500">
                  <span>Giá gốc</span>
                  <span className="line-through">
                  {cartdetail
                     .reduce((total, item) => total + item.product.price * item.quantity, 0)
                     .toLocaleString()}đ
                  </span>
               </div>

               <div className="flex justify-between font-semibold text-red-600 text-lg">
                  <span>Giá khuyến mãi</span>
                  <span>
                  {cartdetail
                     .reduce((total, item) => total + item.product.discountprice * item.quantity, 0)
                     .toLocaleString()}đ
                  </span>
               </div>

               <div className="flex justify-between text-green-600 font-medium">
                  <span>Tiết kiệm</span>
                  <span>
                  {cartdetail
                     .reduce(
                        (total, item) =>
                        total + (item.product.price - item.product.discountprice) * item.quantity,
                        0
                     )
                     .toLocaleString()}đ
                  </span>
               </div>
            </div>

            <div className="mt-6">
               <Link href="/checkout" className="relative inline-block text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold shadow-sm transition w-full text-center">
                  Tiến hành thanh toán
               </Link>
            </div>
            </div>

   </div>
      )
   }
   <FooterPage/>
</div>
)
}