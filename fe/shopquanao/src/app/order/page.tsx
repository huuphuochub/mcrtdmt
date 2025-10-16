"use client"

import React, { useEffect, useState } from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { getallorder } from "@/service/order.service";
import Link from "next/link";
import Button from "@/component/ui/button";

export default function Order() {
  const [orders,setOrders] = useState<any []>([])
  const [page,setPage] = useState(1)
  // const [pageset,setPageset] = useState(1);
const [status, setStatus] = useState<number | undefined>(undefined);
const [month, setMonth] = useState<string | undefined>(undefined);


  useEffect(() =>{
    
    fetchorder()

  },[page,status,month])

  const fetchorder = async() =>{
        const order = await getallorder(page,status,month);
        console.log(order);
        
        if(order.data.success){
          if(page === 1){
            setOrders(order.data.data.data)
          }else{
            setOrders((prev) => [...prev, ...order.data.data.data]);

          }
        }else{
          setOrders([]);
        }
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStatus(undefined)
      setMonth(e.target.value || undefined);
      setPage(1); // reset về trang 1
      console.log(month);
      
    };

  const handleFilter = (newStatus: number | undefined) => {
  setStatus(newStatus);
  setPage(1); // reset về page 1
};

  const Clickprev = () =>{
    setPage(page + 1)
  }

  // const Setorder = async(so:number) =>{
    
  //   const order = await 
  // }

  return (
<div>
  <Header />

  <div className="mt-[100px] max-w-[1200px] mx-auto px-4 min-h-[600px]">
    <h1 className="text-2xl font-bold mb-6">Đơn hàng của bạn</h1>

    {/* Bộ lọc trạng thái + tháng */}
<div className="sticky top-0 lg:top-[68px] bg-white z-10 border-b pb-3">
  <div className="flex overflow-x-auto gap-2 md:gap-3 px-2 py-2 scrollbar-hide">
    {[
      { label: "Tất cả", value: undefined },
      { label: "Chưa thanh toán", value: 0 },
      { label: "Đã đặt", value: 1 },
      { label: "Đang soạn hàng", value: 2 },
      { label: "Đang vận chuyển", value: 3 },
      { label: "Hoàn thành", value: 4 },
      { label: "Bị hủy", value: 5 },
    ].map((btn) => (
      <button
        key={btn.label}
        onClick={() => handleFilter(btn.value)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border 
          ${
            status === btn.value
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
          }`}
      >
        {btn.label}
      </button>
    ))}

    <div className="ml-auto flex-shrink-0">
      <input
        type="month"
        className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        onChange={handleMonthChange}
      />
    </div>
  </div>
</div>


    {/* Danh sách đơn hàng */}
    <div className="bg-white shadow rounded-2xl overflow-hidden mt-4">
      <table className="w-full text-left border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-3">Mã đơn hàng</th>
            <th className="px-4 py-3">Tổng tiền</th>
            <th className="px-4 py-3">Trạng thái</th>
            <th className="px-4 py-3">Ngày đặt</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-blue-600 relative">
                  <Link
                    href={`/order/orderdetail/?id=${order.id}`}
                    className="hover:underline"
                  >
                    #{order.ordercode}
                  </Link>
                </td>

                <td className="px-4 py-3 text-red-500 font-semibold">
                  {order.total_amount.toLocaleString()} đ
                </td>

                <td className="px-4 py-3 font-semibold">
                  {order.status === 0 ? (
                    <span className="text-red-600">Chưa thanh toán</span>
                  ) : order.status === 1 ? (
                    <span className="text-green-600">Đã đặt hàng</span>
                  ) : order.status === 2 ? (
                    <span className="text-yellow-600">Đang soạn hàng</span>
                  ) : order.status === 3 ? (
                    <span className="text-blue-600">Đang vận chuyển</span>
                  ) : order.status === 4 ? (
                    <span className="text-emerald-600">Hoàn thành</span>
                  ) : order.status === 5 ? (
                    <span className="text-gray-500">Bị hủy</span>
                  ) : (
                    <span className="text-gray-400">Không xác định</span>
                  )}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {order.updated_at}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500 italic">
                Bạn chưa có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Nút xem thêm */}
    {orders.length > 0 && (
      <div className="flex justify-end mt-4">
        <Button onClick={Clickprev}>Xem thêm</Button>
      </div>
    )}
  </div>

  <FooterPage />
</div>

  );
}
