"use client"

import { Bell, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Getnoti } from "../service/notification.service";
import { NotificationInterface } from "@/interface/notification.interface";

export default function Notification(){
    const [ isopenNoti,setIsopenNoti] = useState(false);
    const [noti,setNoti] = useState<NotificationInterface[]>([])

    useEffect(() =>{
        fetchnoti();
    },[])

    const fetchnoti = async() =>{
        const data = await Getnoti()
        if(data.data.success) {
            setNoti(data.data.data)
        }
        
    }

    return(
        <div className="relative">
        {/* 🔔 Nút chuông */}
        <div className="relative group">
            <Bell className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-blue-50 w-[40px] h-[40px] p-2 rounded-full shadow-sm" onClick={() =>setIsopenNoti(!isopenNoti)}/>
            
            {/* 🔴 Chấm thông báo */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* 🧾 Popup thông báo */}
        {isopenNoti && (
            <div className="absolute right-0 mt-2 w-[360px] max-h-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
            <p className="text-lg font-semibold text-gray-700">Thông báo</p>
            <X className="cursor-pointer text-gray-500 hover:text-red-500 transition" onClick={() =>setIsopenNoti(false)}/>
            </div>

            {/* Danh sách thông báo */}
            <div className="max-h-[540px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {noti.map((item, i) => (
                <div key={item.id} className="relative hover:bg-gray-100 transition">
                <Link href={`/admin/page/order/detail?id=${item.order_id}`} className="flex items-start justify-between p-3">
                    <div>
                    <p className="text-base text-gray-800 font-medium">
                       {item.content}
                    </p>
                    <span className="text-xs text-gray-500">1 ngày trước</span>
                    </div>
                    {!item.isRead && (
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-2"></div>

                    )}
                </Link>
                </div>
            ))}
            </div>
        </div>
        )}
        </div>

    )
}