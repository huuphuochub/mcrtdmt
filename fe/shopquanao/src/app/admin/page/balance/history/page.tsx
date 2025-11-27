
"use client"
import React, { useEffect } from "react";
import { ArrowLeft, Filter, Download } from "lucide-react";
import { GetHistory } from "@/service/wallet.service";
// import { useNavigate } from "react-router-dom";
type HistoryType = {
    id:number;
    type:number;  
    total_amount:number;
    status:number;
    createdAt:string;
}
export default function BalanceHistoryPage() {
  const [history, setHistory] = React.useState<HistoryType[]>([]);

  const fetchHistory = async ()=>{
    try {
      const response = await GetHistory();
      console.log(response);
      if(response.data.success){
        setHistory(response.data.data);
      }
      
    } catch (error) {
      
    }
  }

  function formatVNDateTime(isoString:string) {
  return new Date(isoString).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

  useEffect(() =>{
    fetchHistory();
  },[])
//   const navigate = useNavigate();

  const transactions = [
    { id: 1, type: "Nạp tiền", amount: 200000, date: "12/11/2025", status: "Thành công" },
    { id: 2, type: "Thanh toán đơn hàng", amount: -150000, date: "10/11/2025", status: "Thành công" },
    { id: 3, type: "Rút tiền", amount: -500000, date: "05/11/2025", status: "Đang xử lý" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            // onClick={() => navigate("/balance")}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Lịch sử giao dịch</h1>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
            <Filter className="w-4 h-4 mr-2" /> Lọc
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            <Download className="w-4 h-4 mr-2" /> Xuất file
          </button>
        </div>
      </div>

      {/* Bảng lịch sử */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Ngày</th>
              <th className="px-6 py-3 text-left">Loại giao dịch</th>
              <th className="px-6 py-3 text-right">Số tiền</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {history.map((t) => (
              <tr key={t.id} className="border-b last:border-none hover:bg-gray-50 transition">
                <td className="px-6 py-3">{formatVNDateTime(t.createdAt)}</td>
                {t.type === 0 ? (
                  <td className="px-6 py-3">nạp tiền</td>
                ) : t.type === 1 ?(
                  <td className="px-6 py-3">rút tiền</td>
                ):(
                  <td className="px-6 py-3">Thanh toán đơn hàng</td>
                )}
                
                <td className={`px-6 py-3 text-right font-medium ${t.type ===1  ? "text-red-600" : "text-green-600"}`}>
                  {t.type === 1 ? "-" : "+"}₫ {Math.abs(t.total_amount).toLocaleString()}
                </td>
                {t.status === 0 ? (
                  <td className="px-6 py-3 text-green-600 font-medium">Thành công</td>
                ) : (
                  <td className="px-6 py-3 text-red-600 font-medium">Thất bại</td>
                ) }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
