import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import { Search } from "lucide-react";

export default function Shop() {
  return (
    <div>
      <div id="Particles ">
        <canvas id="fluid"></canvas>
        <FluidSimulation />
      </div>

      <Header />

      <div className="mt-[100px] max-w-[1200px] mx-auto px-4">
        {/* PHẦN TÌM KIẾM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Tìm nhà bán hàng</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Ô tìm theo tên */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Nhập tên nhà bán hàng..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Dropdown danh mục sản phẩm */}
            <select className="w-full md:w-1/3 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Chọn danh mục sản phẩm</option>
              <option value="fashion">Thời trang</option>
              <option value="electronics">Điện tử</option>
              <option value="home">Đồ gia dụng</option>
              <option value="beauty">Làm đẹp</option>
            </select>
          </div>
        </div>

        {/* GỢI Ý NHÀ BÁN HÀNG NỔI BẬT */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Nhà bán hàng nổi bật</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                <h4 className="font-semibold text-lg mb-1">Shop {item}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Danh mục: Thời trang
                </p>
                <p className="text-gray-500 text-sm">Đánh giá: ★★★★☆ (124)</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
