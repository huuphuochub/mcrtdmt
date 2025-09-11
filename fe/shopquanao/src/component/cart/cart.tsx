"use client"

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";
import Link from "next/link";
import Button from "../ui/button";

interface CartheaderProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function Cartheader({ onClose, isOpen }: CartheaderProps) {
  const { cart, savecart, cartdetail, deleteCart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  const clicksavecart = async () => {
    try {
      setLoading(true);
      await savecart();
    } finally {
      setLoading(false);
    }
  };

  const deletecart = async (product_id: number, size_id: number, color_id: number) => {
    if (cartdetail.length === 1) {
      const xacnhan = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng?");
      if (xacnhan) {
        removeFromCart(product_id, size_id, color_id);
        deleteCart();
      }
    } else {
      removeFromCart(product_id, size_id, color_id);
    }
  };

  return (
    <>
      {/* Overlay (luôn render) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-500
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer (luôn render) */}
      <div
        className={`fixed right-0 top-0 z-50 w-[400px] h-full bg-white shadow-xl overflow-y-auto
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : cartdetail.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white z-50 p-4 border-b border-gray-200 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-800">Giỏ hàng của bạn</h1>
              <X
                onClick={onClose}
                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              />
            </div>

            {/* Danh sách sản phẩm */}
            <div className="p-4 space-y-6">
              {cartdetail.map((cat) => (
                <div
                  className="flex gap-4 border-b pb-4"
                  key={`${cat.product.id}-${cat.color_id}-${cat.size_id}`}
                >
                  <Image
                    width={100}
                    height={100}
                    src={cat.product.image}
                    alt="cart"
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{cat.product.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 line-through">
                      {cat.product.price.toLocaleString()} đ
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-red-500 font-semibold text-base">
                        {cat.product.discountprice.toLocaleString()} đ
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {cat.size && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Size:</span>
                            <span className="px-2 py-0.5 border rounded-lg bg-gray-50">
                              {cat.size.name}
                            </span>
                          </span>
                        )}
                        {cat.color && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Màu:</span>
                            <span className="px-2 py-0.5 border rounded-lg bg-gray-50">
                              {cat.color.name}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                        onClick={() => {
                          if (cat.quantity > 1) {
                            updateQuantity(
                              cat.product.id,
                              cat.size_id,
                              cat.color_id,
                              cat.quantity - 1
                            );
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="text-sm">{cat.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(
                            cat.product.id,
                            cat.size_id,
                            cat.color_id,
                            cat.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <X
                    className="cursor-pointer text-gray-400 hover:text-red-500 transition"
                    onClick={() =>
                      deletecart(cat.product.id, cat.size_id, cat.color_id)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="p-4 border-t border-gray-300 space-y-2">
              <p className="text-gray-700">
                Tổng: <span className="font-semibold">{cart?.length || 0} sản phẩm</span>
              </p>
              <p className="text-gray-700">
                Thành tiền:{" "}
                <span className="font-semibold text-lg text-green-600">
                  {cartdetail
                    ?.reduce((total, item) => {
                      const price = item.product.discountprice || 0;
                      return total + price * item.quantity;
                    }, 0)
                    .toLocaleString("vi-VN")}
                  ₫
                </span>
              </p>
              <p className="text-gray-500">
                Tiết kiệm:{" "}
                <span className="text-red-500">
                  {cartdetail
                    ?.reduce((total, item) => {
                      const originalPrice = item.product.price || 0;
                      const discountPrice = item.product.discountprice || 0;
                      return total + (originalPrice - discountPrice) * item.quantity;
                    }, 0)
                    .toLocaleString("vi-VN")}
                  ₫
                </span>
              </p>

              <Button
                className="w-full rounded-2xl"
                variant="primary"
                onClick={clicksavecart}
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Cập nhật giỏ hàng"}
              </Button>

              <Link
                href="/cart"
                className="block mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-center"
              >
                Trang giỏ hàng
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
