"use client"

import React, { useEffect, useState } from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { getallorder } from "@/service/order.service";
import Link from "next/link";

export default function Order() {
  const [orders,setOrders] = useState<any []>([])

  useEffect(() =>{
    const fetchorder = async() =>{
        const order = await getallorder();
        console.log(order);
        
        if(order.data.success){
            setOrders(order.data.data.orders)
        }
    }
    fetchorder()

  },[])

  return (
    <div>
      <Header />

      <div className="mt-[100px] max-w-[1200px] mx-auto px-4 min-h-[600px]">
        <h1 className="text-2xl font-bold mb-6 ">Đơn hàng của bạn</h1>

        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Mã đơn hàng</th>
                {/* <th className="px-4 py-3">Tổng sản phẩm</th> */}
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
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-blue-600 relative hover:cursor-pointer">
                      <Link href={`/order/orderdetail/?id=${order.id}`}>#{order.ordercode}</Link>
                    </td>
                    {/* <td className="px-4 py-3">{orders.length}</td> */}
                    <td className="px-4 py-3 text-red-500 font-semibold">
                      {order.total_amount.toLocaleString()} đ
                    </td>
                    <td className="px-4 py-3">
                      {order.status === 1 ? (
                        <span className="text-green-600 font-semibold">
                          Đã thanh toán
                        </span>
                      ) : order.status === 0 ? (
                        <span className="text-red-600 font-semibold">
                          Chưa thanh toán
                        </span>
                      ) : order.status === 2 ? (
                        <span className="text-yellow-600 font-semibold">
                          Đang soạn hàng
                        </span>
                      ) : order.status === 3 ? (
                        <span className="text-blue-600 font-semibold">
                          Đang vận chuyển
                        </span>
                      ) : (
                        <span className="text-gray-600 font-semibold">
                          Hoàn thành
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{order.updated_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    Bạn chưa có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
