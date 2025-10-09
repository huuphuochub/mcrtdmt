
"use client"

import { Box, DollarSign, FileText, Home, User } from "lucide-react";
// import ApexCharts from 'apexcharts'
// import TrafficChart from "./TrafficChart ";
// import PieChart from "./Pie";
import dynamic from "next/dynamic";
import MyPieChart from "./Pie";
const TrafficChart = dynamic(() => import("./TrafficChart "), { ssr: false , loading: () => <p>Loading chart...</p>, });
// const PieChart = dynamic(() => import("./Pie"),{ssr:false , loading: () => <p>Loading chart...</p>, });

import React, { useEffect, useState } from "react";
import DashboardCards from "./doasboardcart";
import BiaxialBarChart from "./BarChart";
import { CountCustomerBySeller, CountOrderBySeller, CountProductBySeller, CountRevenueBySeller } from "../../service/order.service";
export default function HomePageAdmin(){
        const now = new Date();
          const [limit,setLimit] = useState<number>(5)


    const [month,setMonth] = useState(now.getMonth() +1)
        const [year,setYear] = useState(now.getFullYear());
        const [totalproduct,setTotalproduct] = useState<number>()
        const [totalcustomer,setTotalCustomer] = useState<number>()
        const [totalrevenue,setTotalrevenue] = useState<number>();
        const [totalorder,setTatalOrder] = useState<number>();
    // const formmonth = month.
    const Changmonth=(e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value

        const months = parseInt(value.split("-")[1]);
        const years = parseInt(value.split("-")[0]);
        console.log(months,years);
        setMonth(months)
        setYear(years)
    }

    useEffect(() =>{
        fetchdata()
    },[month,year])

    const fetchdata = async() =>{
        const order = await CountOrderBySeller(month,year);
        if(order.data.success){
            setTatalOrder(order.data.data)
        }
        const customer = await CountCustomerBySeller(month,year);
        if(customer.data.success){
            setTotalCustomer(customer.data.data)
        }
        const revenue = await CountRevenueBySeller(month,year);
        if(revenue.data.success){
            setTotalrevenue(revenue.data.data)
        }

        const productsell = await CountProductBySeller(month,year);
        if(productsell.data.success){
            setTotalproduct(productsell.data.data);
        }


    }

    const changeLimit = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const ok = e.target.value
        setLimit(Number(ok));
    }

    return(
        <div className=" m-4">
            <div className=" flex justify-between">
                <div className="flex justify-start items-center gap-2">
                <Home/> Trang chủ
                </div>
                <div>
                    <input type="month" className="bg-white border rounded px-3 py-2 shadow relative" onChange={(e) =>Changmonth(e)}/>
                </div>
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Card Đơn hàng */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Đơn hàng</p>
                    <p className="text-2xl font-bold mt-1">{totalorder}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                {/* Card Khách hàng mới */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Khách hàng mới</p>
                    <p className="text-2xl font-bold mt-1">{totalcustomer}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                {/* Card Thu nhập */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Doanh thu</p>
                    <p className="text-2xl font-bold mt-1">{totalrevenue} đ</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                </div>

                {/* Card Tổng sản phẩm */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Tổng sản phẩm</p>
                    <p className="text-2xl font-bold mt-1">{totalproduct}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                    <Box className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-10 gap-4 mt-4">
                    <div className="col-span-7 bg-white rounded-xl shadow p-4">
                        <TrafficChart month={month} year={year}/>
                    </div>

                    <div className="col-span-3 bg-white rounded-xl shadow p-4">
                        <div className="flex justify-between">
                            <p className="font-bold">Sản phẩm bán chạy</p>
                            <select name="" id="" className="border hover:cursor-pointer relative" onChange={(e) => changeLimit(e)}>
                                <option value="5">5 sản phẩm</option>
                                <option value="10">10 sản phẩm</option>

                                <option value="15">15 sản phẩm</option>

                                <option value="20">20 sản phẩm</option>

                            </select>
                        </div>

                        <MyPieChart month={month} year={year} limit={limit}/>
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-2xl shadow">
                    <BiaxialBarChart month={month} year={year}/>
                </div>

        </div>
    )
}