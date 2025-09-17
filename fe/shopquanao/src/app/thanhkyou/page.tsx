"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { useCart } from "../context/cartcontext";
import { useUser } from "../context/usercontext";
import { checkordercode,getorderdetail,updatestatus } from "@/service/order.service";
import { deletecart } from "@/service/cartservice";
import { sendmailorder } from "@/service/mail.service";
import { updateordermail } from "@/service/order.service";

interface bodyupdate {
  ordercode:number,
  status:number,
}

export default function ThanhKyouPage() {
  const {user} = useUser()
     const searchParams = useSearchParams();
     const [loading,setLoading] = useState<boolean>(true);
     const [success,setSuccess] = useState<boolean | null>(null);
     const [error,setError] = useState<string | null>(null);
     const { cartdetail } = useCart();
     const [order,setOrder] = useState<any | null>(null);
//      const code = searchParams.get("code");
//   const id = searchParams.get("id");
//   const cancel = searchParams.get("cancel");
//   const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");
    //  console.log(cartdetail);
    // console.log(orderCode);
    
     
useEffect(() => {
  if (!orderCode) return;

  const checkOrder = async () => {
    try {
        // console.log(cartdetail);
        
      const res = await checkordercode(orderCode);
      // const order = await  getorderdetail(Number(orderCode));
      // console.log(order);
      // console.log(res);
      
      console.log(res.data.result);
      if(res.data.result.success){
        if(res.data.result.data.status === "PAID"){
          const body = {
            status:1,
            payable_amount:0,
            ordercode:Number(orderCode),
          }
           await updatestatuss(body);
          await deletecart();
          setSuccess(true);
      const order = await  getorderdetail(Number(orderCode));
      console.log(order);
      
          if(order.data.success){
            console.log(order.data.order);
            if(order.data.order.email && !order.data.order.emailsend){
              const arrayproduct = order.data.order.items.map((pr:any) =>{
                return {
                  name:pr.productname,
                  price:pr.unitprice,
                  quantity:pr.quantity,
                }
              })
              const  body = {
                customerName:user?.username,
                customerEmail:order.data.order.email,
                orderDate:order.data.order.created_at,
                products:arrayproduct,
                totalPrice:order.data.order.total_amount,
                redirectUrl:`http://localhost:3000/order/orderdetail/?id=${order.data.order.id}`,
              }
              const ok = await sendmailorder(body);
              console.log(ok);
              const akjdskja = {
                id:order.data.order.id
              }
              await updateordermail(akjdskja);
              
              

            }
            
            setOrder(order.data.order)
          }else{
            setOrder('')
            setError('đơn hàng chưa thanh toán')
          };

        }else{
            setSuccess(false);
            // console.log('don hang dang cho thanh tọa');
            setError('đơn hàng đang chờ thanh toán')
            
        }

      }else{
        setSuccess(false);
        // setLoading(false);
        setError('mã đơn hàng không hợp lệ')
      }
        // cập nhật state để hiển thị
    } catch (err) {
      console.log(err);
      setLoading(false);
      
    }finally{
        setLoading(false);
    }
  };

  checkOrder();
}, [orderCode]);

const updatestatuss = async(body:bodyupdate)=>{
    const ok = await updatestatus(body);
    return ok;
}

useEffect(() =>{
  console.log(cartdetail);
  
}, [cartdetail]);

  return (
    <div>
        {loading ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                {/* Vòng tròn loading */}
                <div className="flex justify-center mb-4">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Nội dung */}
                <h1 className="text-xl font-semibold text-gray-700 mb-2">
                Đang xử lý thanh toán...
                </h1>
                <p className="text-gray-500 text-sm">
                Vui lòng chờ trong giây lát, hệ thống đang xác nhận giao dịch của bạn.
                </p>
            </div>
            </div>
         ) : order ? (
            <div>
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {success  ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
        )}
        
        {success ? (
            
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thanh toán thành công!
        </h1>
        ) : (
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thanh toán thất bại
        </h1>
        )}
        {success ?(
            <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>
        ) : (
            <p className="text-gray-600 mt-2">
          {error}
        </p>
        )}

        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 relative py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Về trang chủ
          </Link>
          {success ?(
            <Link
            href={`/order/orderdetail/?id=${order.id}`}
            className="px-4 relative py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Xem đơn hàng
          </Link>
          ) : (
            <Link
            href={`/order`}
            className="px-4 relative py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Xem giỏ hàng
          </Link>
          )}
        </div>
      </div>
    </div>
    </div>
         ) : (
           <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                {/* Vòng tròn loading */}
                <div className="flex justify-center mb-4">
                </div>

                {/* Nội dung */}
                <h1 className="text-xl font-semibold text-gray-700 mb-2">
                {error}
                </h1>
                <Link href='cart' className="bg-red-500 text-white px-4 py-2 rounded-2xl mt-4 ">hủy</Link>
                
            </div>
            </div>
         )}
    </div>
  );
}