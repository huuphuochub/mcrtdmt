import React from "react";
import { ArrowLeft, Filter, Download } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function BalanceHistoryPage() {
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
            {transactions.map((t) => (
              <tr key={t.id} className="border-b last:border-none hover:bg-gray-50 transition">
                <td className="px-6 py-3">{t.date}</td>
                <td className="px-6 py-3">{t.type}</td>
                <td className={`px-6 py-3 text-right font-medium ${t.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                  {t.amount < 0 ? "-" : "+"}₫ {Math.abs(t.amount).toLocaleString()}
                </td>
                <td className="px-6 py-3">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
