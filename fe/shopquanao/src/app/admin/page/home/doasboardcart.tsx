"use client";
import React from "react";
import { FileText, User, DollarSign, Box } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const DashboardCards = () => {
  const cards = [
    {
      title: "Đơn hàng so với tháng trước",
      value: 200,
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      percent: 75, // phần trăm so với tháng trước
      color: "#3b82f6" // màu cho vòng tròn
    },
    {
      title: "Khách hàng mới",
      value: 16,
      icon: <User className="w-6 h-6 text-green-600" />,
      iconBg: "bg-green-100",
      percent: 60,
      color: "#10b981"
    },
    {
      title: "Thu nhập",
      value: "200.100.000 đ",
      icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
      iconBg: "bg-yellow-100",
      percent: 50,
      color: "#f59e0b"
    },
    {
      title: "Tổng sản phẩm",
      value: 200,
      icon: <Box className="w-6 h-6 text-purple-600" />,
      iconBg: "bg-purple-100",
      percent: 90,
      color: "#8b5cf6"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
            <div className="    flex items-center justify-between ">
                <div >
                    <p className="text-gray-500 font-medium">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className="">
                    {/* Icon nhỏ */}
                    <div className={`${card.iconBg} p-3 rounded-full`}>
                    {card.icon}
                    </div>
                    {/* Circular progress */}
                    
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="w-20 h-20 ">
              <CircularProgressbar
                value={card.percent}
                text={`${card.percent}%`}
                styles={buildStyles({
                  pathColor: card.color,
                  textColor: "#111",
                  trailColor: "#e5e7eb",
                  textSize: '32px'
                })}
              />
            </div>
        </div>
        </div>
        
      ))}
    </div>
  );
};

export default DashboardCards;
