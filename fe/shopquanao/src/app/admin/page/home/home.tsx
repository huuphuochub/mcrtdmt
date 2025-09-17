
"use client"

import { Box, DollarSign, FileText, Home, User } from "lucide-react";
// import ApexCharts from 'apexcharts'
// import TrafficChart from "./TrafficChart ";
import dynamic from "next/dynamic";
const PieChart = dynamic(() => import("./Pie"),{ssr:false});
const TrafficChart = dynamic(() => import("./TrafficChart "), { ssr: false });
import React from "react";
import DashboardCards from "./doasboardcart";
import BiaxialBarChart from "./BarChart";
export default function HomePageAdmin(){

    return(
        <div className=" m-4">
            <div className=" flex justify-between">
                <div className="flex justify-start items-center gap-2">
                <Home/> Trang chủ
                </div>
                <div>
                    <input type="month" className="bg-white border rounded px-3 py-2 shadow" />
                </div>
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Card Đơn hàng */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Đơn hàng</p>
                    <p className="text-2xl font-bold mt-1">200</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                {/* Card Khách hàng mới */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Khách hàng mới</p>
                    <p className="text-2xl font-bold mt-1">16</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                {/* Card Thu nhập */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Thu nhập</p>
                    <p className="text-2xl font-bold mt-1">200.100.000 đ</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                </div>

                {/* Card Tổng sản phẩm */}
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
                    <div>
                    <p className="text-gray-500 font-medium">Tổng sản phẩm</p>
                    <p className="text-2xl font-bold mt-1">200</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                    <Box className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-10 gap-4 mt-4">
                    <div className="col-span-7 bg-white rounded-xl shadow p-4">
                        <TrafficChart />
                    </div>

                    <div className="col-span-3 bg-white rounded-xl shadow p-4">
                        <div className="flex justify-between">
                            <p className="font-bold">Sản phẩm bán chạy</p>
                            <select name="" id="" className="border hover:cursor-pointer">
                                <option value="">5 sản phẩm</option>
                                <option value="">10 sản phẩm</option>

                                <option value="">15 sản phẩm</option>

                                <option value="">20 sản phẩm</option>

                            </select>
                        </div>

                        <PieChart/>
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-2xl shadow">
                    <BiaxialBarChart/>
                </div>

        </div>
    )
}