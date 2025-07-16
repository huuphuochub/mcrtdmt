import React from "react";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { Search } from "lucide-react";

export default function Categorypage() {
  return (
    <div>
      {/* Background hiệu ứng */}
      <div id="Particles">
        <canvas id="fluid"></canvas>
        <FluidSimulation />
      </div>

      <Header />

      <div className="mt-[100px] max-w-[1200px] mx-auto px-4">
        {/* Bộ lọc */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Tìm kiếm & lọc sản phẩm</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Ô tìm kiếm theo tên sản phẩm */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Tìm sản phẩm theo tên..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Dropdown danh mục sản phẩm */}
            <select className="w-full md:w-1/3 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Chọn danh mục</option>
              <option value="fashion">Thời trang</option>
              <option value="electronics">Điện tử</option>
              <option value="home">Gia dụng</option>
              <option value="beauty">Làm đẹp</option>
              <option value="food">Thực phẩm</option>
            </select>
          </div>
        </div>

        {/* Gợi ý sản phẩm hoặc kết quả */}
        <div className="mb-12 flex gap-4 ">
          <div className="max-w-[300px] w-[300px] shadow rounded-xl p-2">
              <div>
                <h3 className="text-xl font-semibold mb-1 border-b border-gray-200 pb-2">Dien thoai va phu kien</h3>
                <div>
                  <ul>
                    <li>tai nghe</li>
                    <li>sac</li>
                    <li>sac du phong</li>
                    <li>loa bluehtool</li>
                    <li>op lung</li>
                  </ul>
                </div>
              </div>
          </div>
         <div className="flex-1">
           <div className="flex gap-2 mb-4">
            <h3 className="text-xl font-semibold py-2 px-4 rounded-sm bg-blue-100">Sản phẩm nổi bật</h3>
            <h3 className="text-xl font-semibold py-2 px-4 rounded-sm  bg-red-100">Sản phẩm gia re</h3>

            <h3 className="text-xl font-semibold py-2 px-4 rounded-sm bg-yellow-100">Sản phẩm ban chay </h3>
            <h3 className="text-xl font-semibold py-2 px-4 rounded-sm  bg-pink-100">Sản phẩm chat luong</h3>

           </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                <h4 className="font-semibold text-lg mb-1">
                  Sản phẩm {item}
                </h4>
                <p className="text-sm text-gray-600">Giá: 250.000đ</p>
              </div>
            ))}
          </div>
         </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
