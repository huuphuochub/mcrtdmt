'use client'
import React, { useState } from "react";
import { CreditCard, Wallet, History, X } from "lucide-react";
import Button from "@/component/ui/button";
import Image from "next/image";
type Bank = {
  name: string;
  number: string;
  logo: string;
};
const banks: Bank[] = [
  { name: "Vietcombank", number: "**** 1234", logo: "/vcb.png" },
  { name: "MBBank", number: "**** 5678", logo: "/mbbank.png" },
  { name: "Techcombank", number: "**** 9012", logo: "/techcom.png" },
];
const banknew:Bank[] =[
   { name: "Vietcombank", number: "**** 1234", logo: "/vcb.png" },
  { name: "MBBank", number: "**** 5678", logo: "/mbbank.png" },
  { name: "Techcombank", number: "**** 9012", logo: "/techcom.png" },
   { name: "Viettinbank", number: "**** 1234", logo: "/vcb.png" },
  { name: "Cakebank", number: "**** 5678", logo: "/mbbank.png" },
  { name: "Sacombank", number: "**** 9012", logo: "/techcom.png" },
   { name: "Huuphuocbank", number: "**** 1234", logo: "/vcb.png" },
  { name: "Haichanbank", number: "**** 5678", logo: "/mbbank.png" },
  { name: "BankBankBank", number: "**** 9012", logo: "/techcom.png" },
]
export default function BalancePage() {
    const [selectedBank, setSelectedBank] = useState<string>("");

  const [openNap,setOpenNap] = useState(false);
    const [openAddbank,setOpenAddbank] = useState(false);

    const [openRut,setOpenRut] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Tiêu đề */}

      {openNap && (
        <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
        <div className="relative z-30 w-[600px] bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

          {/* Nút đóng */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
            <X className="hover:cursor-pointer" onClick={() =>setOpenNap(false)}/>
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center">Nạp tiền</h2>

          {/* Input số tiền */}
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Nhập số tiền cần nạp</label>
            <input
              type="number"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ví dụ: 500,000"
            />
          </div>

          {/* Chọn ngân hàng */}
              <div className="space-y-3">
                {banks.map((bank) => {
                  const isSelected = selectedBank === bank.name;
                  return (
                    <div
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.name)}
                      className={`
                        flex items-center gap-4 p-3 border rounded-lg cursor-pointer
                        ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                        transition-colors duration-200
                      `}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={bank.logo}
                        alt={bank.name}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{bank.name}</p>
                        <p className="text-gray-500">{bank.number}</p>
                      </div>

                      {/* Dấu tick */}
                      {isSelected && (
                        <span className="text-blue-600 font-bold">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button> Nạp </Button>
            <Button variant="secondary" onClick={() =>setOpenNap(false)}> Hủy </Button>
          </div>
        </div>
      </div>
      )}

      {openRut && (
        <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
        <div className="relative z-30 w-[600px] bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

          {/* Nút đóng */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
            <X className="hover:cursor-pointer" onClick={() =>setOpenRut(false)}/>
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center">Rút tiền</h2>

          {/* Input số tiền */}
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Nhập số tiền cần rút</label>
            <input
              type="number"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ví dụ: 500,000"
            />
          </div>

          {/* Chọn ngân hàng */}
              <div className="space-y-3">
                {banks.map((bank) => {
                  const isSelected = selectedBank === bank.name;
                  return (
                    <div
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.name)}
                      className={`
                        flex items-center gap-4 p-3 border rounded-lg cursor-pointer
                        ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                        transition-colors duration-200
                      `}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={bank.logo}
                        alt={bank.name}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{bank.name}</p>
                        <p className="text-gray-500">{bank.number}</p>
                      </div>

                      {/* Dấu tick */}
                      {isSelected && (
                        <span className="text-blue-600 font-bold">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button> Rút </Button>
            <Button variant="secondary" onClick={() =>setOpenRut(false)}> Hủy </Button>
          </div>
        </div>
      </div>
      )}


        {openAddbank && (
          <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
          <div className="relative z-30 w-[600px] max-w-full bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

            {/* Nút đóng */}
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
              onClick={() => setOpenAddbank(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center">Thêm ngân hàng</h2>

            {/* Chọn ngân hàng */}
            <div className="flex flex-wrap gap-3">
              {banknew.map((bank) => {
                const isSelected = selectedBank === bank.name;
                return (
                  <div
                    key={bank.name}
                    onClick={() => setSelectedBank(bank.name)}
                    className={`
                      flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer
                      ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                      hover:bg-blue-50 transition-colors duration-200 w-[120px]
                    `}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={bank.logo}
                      alt={bank.name}
                      className="rounded-md"
                    />
                    <p className="font-semibold text-center text-sm">{bank.name}</p>

                    {/* Dấu tick */}
                    {isSelected && (
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input số tài khoản */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Nhập số tài khoản</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: 123456789"
              />
            </div>

            {/* Input tên tài khoản */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Nhập tên tài khoản</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button>Thêm</Button>
              <Button
                variant="secondary"
                onClick={() => setOpenAddbank(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
        )}




      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Ví của tôi
      </h1>

      {/* Phần số dư chính */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-wrap items-center justify-between mb-6">
        {/* Thông tin số dư */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Wallet className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Số dư khả dụng</p>
            <p className="text-3xl font-bold text-gray-800">₫ 2,560,000</p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button className=" rounded-lg " onClick={() => setOpenNap(true)}>
            Nạp thêm
          </Button>
          <Button className=" rounded-lg " variant="secondary" onClick={() => setOpenRut(true)}>
            Rút tiền
          </Button>
        </div>
      </div>

      {/* 2 cột nội dung phụ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lịch sử giao dịch */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <History className="text-orange-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Lịch sử giao dịch</p>
              <p className="text-sm text-gray-500">
                Xem chi tiết các giao dịch gần đây
              </p>
            </div>
          </div>

          <button className="self-start px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition">
            Xem lịch sử
          </button>
        </div>

        {/* Ngân hàng liên kết */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Ngân hàng liên kết</p>
                <p className="text-sm text-gray-500">
                  Quản lý tài khoản ngân hàng đã kết nối
                </p>
              </div>
            </div>

            {/* Danh sách ngân hàng */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">Vietcombank</p>
                  <p className="text-sm text-gray-500">**** 4321</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Gỡ liên kết
                </button>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition hover:cursor-pointer" onClick={() => setOpenAddbank(true)}>
            + Thêm ngân hàng mới
          </button>
        </div>
      </div>
    </div>
  );
}
