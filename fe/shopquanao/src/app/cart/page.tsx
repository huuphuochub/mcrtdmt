"use client"

import React, { use, useEffect } from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { useCart } from "../context/cartcontext";
import Image from "next/image";
import Button from "@/component/ui/button";
import Link from "next/link";
import { useUser } from "../context/usercontext";
export default function Cart(){
         const {user} = useUser()
     const {  cartdetail,updateQuantity, removeFromCart,savecart,loading,deleteCart} = useCart();
     const [loadingcart,setLoadingcart] = React.useState(false);
   //   useEffect(() =>{
   //       if(!user)
   //   })
   const clicksavecart=async ()=>{
      try {
         
         setLoadingcart(true);
         await savecart();
      } catch (error) {
      }finally{
         setLoadingcart(false);
      }
   }


        function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
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
            <div className="flex items-center gap-4  p-4 rounded-md shadow-sm bg-white" key={`${cat.product.id}-${cat.color_id}-${cat.size_id}`}>
            <Image
            
               src={cat.product.image}
               alt="product"
               className="w-24 h-24 object-contain  rounded-md"
               height={96}
               width={96}  
               />
               
            <div className="flex-1">
               <h3 className="font-medium text-lg">{cat.product.name}</h3>
               {cat.size && cat.color && (
                  <p className="text-sm text-gray-500">Size: {cat.size.name} | Màu: {cat.color.name}</p>

               )}
               <div className="flex items-center mt-2 gap-2">
                  <button className="px-2 relative hover:cursor-pointer py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => {
                    if (cat.quantity > 1) {
                      updateQuantity(cat.product.id, cat.size_id, cat.color_id, cat.quantity - 1);
                    }
                  }}
                  
                  >-</button>
                  <span>{cat.quantity}</span>
                  <button className="px-2 relative py-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => {
                    updateQuantity(cat.product.id, cat.size_id, cat.color_id, cat.quantity + 1);
                  }}
                  >+</button>
               </div>
            </div>
            <div className="text-right">
               {isInPromotion(cat.product.promo_start,cat.product.promo_end) ? (
                  <div>
                        <p className="font-medium text-red-600">{cat.product.discountprice.toLocaleString()} đ</p>
                        <p className="text-sm text-gray-500 line-through">{cat.product.price.toLocaleString()} đ</p>
                  </div>
               ) : (
                  <div>
                     <p className="font-medium text-red-600">{cat.product.price.toLocaleString()} đ</p>
                     {/* <p className="text-sm text-gray-500 line-through">{cat.product.price.toLocaleString()} đ</p> */}
                  </div>
               )}
               
               <button className="text-sm relative text-red-500 mt-2 hover:underline"
               onClick={() => clickDeletecart(cat.product.id, cat.size_id, cat.color_id)}
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
            <div className="mt-4 p-6 rounded-2xl bg-white shadow-md border border-gray-100">
            <div className="space-y-3">
               <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{cartdetail.length} sản phẩm</span>
               </div>

               {/* Giá gốc */}
               <div className="flex justify-between text-gray-600 font-medium">
               <span>Giá gốc</span>
               <span>
                  {cartdetail
                     .reduce((total, item) => {
                     const { price = 0, quantity } = item.product;
                     return total + price * item.quantity;
                     }, 0)
                     .toLocaleString("vi-VN")}đ
               </span>
               </div>

               {/* Giá khuyến mãi */}
               <div className="flex justify-between font-semibold text-red-600 text-lg">
               <span>Giá khuyến mãi</span>
               <span>
                  {cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0)
                     .toLocaleString("vi-VN")}đ
               </span>
               </div>

               {/* Tiết kiệm */}
               <div className="flex justify-between text-green-600 font-medium">
               <span>Tiết kiệm</span>
               <span>
                  {cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // chỉ tính tiết kiệm nếu còn khuyến mãi
                     if (isInPromotion(promo_start, promo_end)) {
                        return total + (price - discountprice) * item.quantity;
                     }
                     return total;
                     }, 0)
                     .toLocaleString("vi-VN")}đ
               </span>
               </div>

            </div>

            <div className="mt-6">
               {user ? (
                     <Link href="/checkout" className="relative inline-block text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold shadow-sm transition w-full text-center">
                  Tiến hành thanh toán
               </Link>
               ) : (
                  <Link href="/login" className="relative inline-block text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold shadow-sm transition w-full text-center">
                  Đăng nhập để thanh toán
               </Link>
               )}

            </div>
            </div>

   </div>
      )
   }
   <FooterPage/>
</div>
)
}