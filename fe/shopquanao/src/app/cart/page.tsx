import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
export default function Cart(){
return(
<div>
   <Header/>
   <div className="mt-[100px] max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>
      {/* Danh sách sản phẩm */}
      <div className="space-y-4">
         {/* Một sản phẩm */}
         <div className="flex items-center gap-4  p-4 rounded-md shadow-sm bg-white">
            <img
               src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
               alt="product"
               className="w-24 h-24 object-contain  rounded-md"
               />
            <div className="flex-1">
               <h3 className="font-medium text-lg">Áo Hoodie Freestyle</h3>
               <p className="text-sm text-gray-500">Size: L | Màu: Đỏ</p>
               <div className="flex items-center mt-2 gap-2">
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                  <span>2</span>
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">+</button>
               </div>
            </div>
            <div className="text-right">
               <p className="font-medium text-red-600">120.000đ</p>
               <p className="text-sm text-gray-500 line-through">140.000đ</p>
               <button className="text-sm text-red-500 mt-2 hover:underline">Xóa</button>
            </div>
         </div>

         <div className="flex items-center gap-4  p-4 rounded-md shadow-sm bg-white">
            <img
               src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
               alt="product"
               className="w-24 h-24 object-contain  rounded-md"
               />
            <div className="flex-1">
               <h3 className="font-medium text-lg">Áo Hoodie Freestyle</h3>
               <p className="text-sm text-gray-500">Size: L | Màu: Đỏ</p>
               <div className="flex items-center mt-2 gap-2">
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                  <span>2</span>
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">+</button>
               </div>
            </div>
            <div className="text-right">
               <p className="font-medium text-red-600">120.000đ</p>
               <p className="text-sm text-gray-500 line-through">140.000đ</p>
               <button className="text-sm text-red-500 mt-2 hover:underline">Xóa</button>
            </div>
         </div>
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