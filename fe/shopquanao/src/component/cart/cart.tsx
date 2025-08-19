import React from "react";
import Image from "next/image";
import { X } from 'lucide-react';


interface CartheaderProps {
  onClose: () => void;
}
export default function Cartheader({ onClose }: CartheaderProps) {
  return (
    <div>
      {/* Overlay mờ */}
      <div
        className="fixed inset-0 bg-black/30 cursor-not-allowed z-40"
        onClick={onClose}
      ></div>

      {/* Giỏ hàng */}
      <div className="fixed right-0 top-0 z-50 w-[400px] h-full bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-50 p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Giỏ hàng của bạn</h1>
          <X onClick={onClose} className="cursor-pointer text-gray-500 hover:text-red-500 transition" />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="p-4 space-y-6">
          {/* Sản phẩm */}
          <div className="flex gap-4 border-b pb-4">
            <Image
              width={100}
              height={100}
              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
              alt="cart"
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Sản phẩm 1</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 line-through">290.000₫</div>
              <div className="flex flex-col gap-1">
                <p className="text-red-500 font-semibold text-base">250.000₫</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="px-2 py-0.5 border rounded-lg bg-gray-50">{`L`}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Màu:</span>
                    <span className="px-2 py-0.5 border rounded-lg bg-gray-50">{`Trắng`}</span>
                  </span>
                </div>
              </div>

              

              <div className="flex items-center gap-2 mt-3">
                <button className="px-2 py-1 border rounded text-sm">-</button>
                <span className="text-sm">10</span>
                <button className="px-2 py-1 border rounded text-sm">+</button>
              </div>
            </div>
            <X className="cursor-pointer text-gray-400 hover:text-red-500 transition" />
          </div>


          <div className="flex gap-4 border-b pb-4">
            <Image
              width={100}
              height={100}
              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
              alt="cart"
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Sản phẩm 1</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 line-through">290.000₫</div>
              <p className="text-red-500 font-semibold">250.000₫</p>

              <div className="flex items-center gap-2 mt-3">
                <button className="px-2 py-1 border rounded text-sm">-</button>
                <span className="text-sm">10</span>
                <button className="px-2 py-1 border rounded text-sm">+</button>
              </div>
            </div>
            <X className="cursor-pointer text-gray-400 hover:text-red-500 transition" />
          </div>


          <div className="flex gap-4 border-b pb-4">
            <Image
              width={100}
              height={100}
              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
              alt="cart"
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Sản phẩm 1</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 line-through">290.000₫</div>
              <p className="text-red-500 font-semibold">250.000₫</p>

              <div className="flex items-center gap-2 mt-3">
                <button className="px-2 py-1 border rounded text-sm">-</button>
                <span className="text-sm">10</span>
                <button className="px-2 py-1 border rounded text-sm">+</button>
              </div>
            </div>
            <X className="cursor-pointer text-gray-400 hover:text-red-500 transition" />
          </div>


          <div className="flex gap-4 border-b pb-4">
            <Image
              width={100}
              height={100}
              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
              alt="cart"
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Sản phẩm 1</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 line-through">290.000₫</div>
              <p className="text-red-500 font-semibold">250.000₫</p>

              <div className="flex items-center gap-2 mt-3">
                <button className="px-2 py-1 border rounded text-sm">-</button>
                <span className="text-sm">10</span>
                <button className="px-2 py-1 border rounded text-sm">+</button>
              </div>
            </div>
            <X className="cursor-pointer text-gray-400 hover:text-red-500 transition" />
          </div>

          {/* Thêm sản phẩm khác nếu cần */}
        </div>

        {/* Tổng tiền */}
        <div className="p-4 border-t border-gray-300 space-y-2">
          <p className="text-gray-700">Tổng: <span className="font-semibold">4 sản phẩm</span></p>
          <p className="text-gray-700">Thành tiền: <span className="font-semibold text-lg text-green-600">400.000₫</span></p>
          <p className="text-gray-500">Tiết kiệm: <span className="text-red-500">50.000₫</span></p>

          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
