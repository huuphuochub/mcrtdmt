"use client"

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { useCart } from "../context/cartcontext";
import { checkordercode } from "@/service/order.service";


export default function ThanhKyouPage() {
     const searchParams = useSearchParams();
     const { cartdetail } = useCart();
     const code = searchParams.get("code");
  const id = searchParams.get("id");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");
    //  console.log(cartdetail);
     
useEffect(() => {
  if (!orderCode) return;

  const checkOrder = async () => {
    try {
        console.log(orderCode);
        
      const res = await checkordercode(orderCode);
      console.log(res);
        // cập nhật state để hiển thị
    } catch (err) {
      console.log(err);
      
    }
  };

  checkOrder();
}, [orderCode]);
  

  return (
    <div>
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {code === "00" ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
        )}
        
        {code === "00" ? (
            
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thanh toán thành công!
        </h1>
        ) : (
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thanh toán thất bại
        </h1>
        )}
        {code === "00" ?(
            <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>
        ) : (
            <p className="text-gray-600 mt-2">
          Đơn hàng của bạn đã bị hủy hoặc thanh toán không thành công.
        </p>
        )}

        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 relative py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Về trang chủ
          </Link>
          {code === "00" ?(
            <Link
            href="/orders"
            className="px-4 relative py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Xem đơn hàng
          </Link>
          ) : (
            <Link
            href="/orders"
            className="px-4 relative py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Xem giỏ hàng
          </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}