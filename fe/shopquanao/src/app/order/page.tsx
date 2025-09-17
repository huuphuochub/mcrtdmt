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
        <h1 className="text-2xl font-bold mb-6 ">Đơn hàng của bạn</h1>

        <div className="sticky top-[98px] bg-white z-10 pb-2 border-b">
        <div className="flex gap-4 bg-gray-200 rounded-l px-4 py-2">
          <div >
              <Button variant={ status === undefined ? `primary` : 'secondary'} onClick={() =>handleFilter(undefined)}>Tất cả</Button>
          </div>
          <div>
              <Button variant={ status === 0 ? `primary` : 'secondary'} onClick={() =>handleFilter(0)}>Chưa thanh toán</Button>

          </div>
          <div >
              <Button variant={ status === 1 ? `primary` : 'secondary'} onClick={() =>handleFilter(1)}>Đã đặt</Button>
          </div>
          <div >
              <Button variant={ status === 2 ? `primary` : 'secondary'} onClick={() =>handleFilter(2)}>Đang soạn hàng</Button>
          </div>
          <div >
              <Button variant={ status === 3 ? `primary` : 'secondary'} onClick={()=>handleFilter(3)}>Đang vận chuyển</Button>
          </div>
          <div >
              <Button variant={ status === 4 ? `primary` : 'secondary'} onClick={()=>handleFilter(4)}>Đã hoàn thành</Button>
          </div>
          <div >
              <Button variant={ status === 5 ? `primary` : 'secondary'} onClick={()=>handleFilter(5)}>Bị hủy</Button>
          </div>
          <div className="">
            <input
              type="month"
              className="
                w-[140px]
                rounded-xl 
                border border-gray-300 
                px-3 py-2 
                text-sm text-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                cursor-pointer
              "
              onChange={(e) =>handleMonthChange(e)}
            />
          </div>

        </div>
        </div>
        <div className="bg-white shadow rounded-2xl overflow-hidden mt-2">
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
                      ) : order.status === 4 ? (
                        <span className="text-green-600 font-semibold">
                          Hoàn thành
                        </span>
                      ) : order.status === 5 ?(
                        <span className="text-red-600 font-semibold">
                          Bị Hủy
                        </span>
                      ) : (
                        <span className="text-gray-600 font-semibold">
                          Không xác định
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
            {orders.length > 0 &&(
              <div className=" w-full flex justify-end mt-2">
                <Button onClick={Clickprev}>xem them</Button>
              </div>
            )}
      </div>

      <FooterPage />
    </div>
  );
}
