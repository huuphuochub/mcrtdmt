"use client"

import { getOrderItemBySller } from "@/app/admin/service/order.service";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OrderInterface, OrderItemInterface } from "@/interface/order.interface";
import Button from "@/component/ui/button";
interface DataOrder {
    items:OrderItemInterface[];
    order:OrderInterface;
}

export default function ListOrderPage(){
    const now = new Date();
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(20);
    const [month,setMonth] = useState(now.getMonth() +1)
    const [year,setYear] = useState(now.getFullYear());
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState<DataOrder[]>([])
    // const [products,setProducts] = useState<
    useEffect(() =>{
        fetchOrderItem()
    },[page,month,year])
    const fetchOrderItem = async() =>{
        try {
        const data = await getOrderItemBySller(page,limit,month,year)
        console.log(data);
            if(page === 1){
                setData(data.data.data)
            }else{
                setData((prev) => [...prev,...data.data.data])
            }

        } catch (error) {
            setLoading(false)
        }finally{
            setLoading(false)
        }

        
    }
    const HandleXemthem =() =>{
        setPage(page + 1)
    }

      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // "2025-10"
    const monthValue = parseInt(value.split("-")[1]); 
    const yearValue = parseInt(value.split("-")[0]);
    setYear(yearValue);

    setMonth(monthValue);
  };

    useEffect(() =>{
        console.log(data);
        
    },[data])
    return(
                <div className="m-4">
                    {/* Header */}
                    <div className="flex justify-between ">
                        <div className="flex justify-start items-center gap-2 text-xl font-semibold">
                        <Home /> Danh sách đơn hàng
                        </div>
                        <div>
                        <input
                            type="month"
                            onChange={handleChange}

                            className="bg-white border rounded px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                        />
                        </div>
                    </div>

                    {/* Bảng đơn hàng */}
                    <div className="mt-6 bg-white rounded-xl shadow overflow-hidden p-2">
                        <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="px-4 py-3 border-b">STT</th>
                            <th className="px-4 py-3 border-b">Mã đơn</th>
                            <th className="px-4 py-3 border-b">SĐT khách hàng</th>
                            <th className="px-4 py-3 border-b">Tổng số sản phẩm</th>
                            <th className="px-4 py-3 border-b">Trạng thái</th>
                            <th className="px-4 py-3 border-b">Thời gian</th>
                            <th className="px-4 py-3 border-b text-center">Hành động</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody>
                                <tr>
                                    <td>
                                        loading
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                           <tbody>
                             {data.length > 0 && data.map((item,index) =>(
                                
                                <tr className="hover:bg-gray-50 transition" key={index}>
                            <td className="px-4 py-3 font-medium text-gray-800">{index + 1}</td>

                            <td className="px-4 py-3 font-medium text-gray-800">#{item.order.ordercode}</td>
                            <td className="px-4 py-3">{item.order.phone}</td>
                            <td className="px-4 py-3">{item.items.length}</td>
                            <td className="px-4 py-3">
                                {item.items[0].status === 1 ? (
                                     <span className="px-2 py-1 text-sm rounded-full bg-orange-100 text-orange-700 font-medium">
                                Chờ xác nhận
                                </span>
                                ) : item.items[0].status  ==2 ? (
                                     <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                Đã xác nhận
                                </span>
                                ) : item.items[0].status  ==2  ? (
                                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                                Hoàn thành
                                </span>
                                ) : (
                                    <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-700 font-medium">
                                Đã Hủy
                                </span>
                                )}
                               
                            </td>
                            <td className="px-4 py-3">{item.order.created_at}</td>

                            <td className="px-4 py-3 text-center">
                                <Link className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 relative"
                                href={`/admin/page/order/detail/?id=${item.order.id}`}
                                >
                                Xem
                                </Link>
                            </td>
                            </tr>
                             ))}
                           </tbody>
                        )}
                        
                        </table>
                        <div className="w-full flex justify-end">
                            <Button onClick={HandleXemthem}>xem them</Button>
                        </div>
                    </div>

                    {/* Biểu đồ */}
                    
                    </div>

    )
}