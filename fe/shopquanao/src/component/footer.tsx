import React from "react";
import Chat from "./chat/chat";

export default function FooterPage() {
  return (
    <div  className="bg-gray-200 text-gray-700 py-10 px-6 mt-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1: Logo + mô tả */}
              <Chat />

        <div>
          <h2 className="text-xl font-bold mb-2">Shop Quần Áo</h2>
          <p className="text-sm">
            Chúng tôi cung cấp sản phẩm thời trang chất lượng, hợp xu hướng dành cho bạn.
          </p>
        </div>

        {/* Cột 2: Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Danh mục</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-black cursor-pointer">Trang chủ</li>
            <li className="hover:text-black cursor-pointer">Cửa hàng</li>
            <li className="hover:text-black cursor-pointer">Liên hệ</li>
            <li className="hover:text-black cursor-pointer">Bài viết</li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Liên hệ</h3>
          <p className="text-sm">Email: support@shopquanao.vn</p>
          <p className="text-sm">SĐT: 0123 456 789</p>
          <p className="text-sm">Địa chỉ: 123 Lê Văn Sỹ, Q.3, TP.HCM</p>
        </div>
      </div>

      {/* Đường gạch và bản quyền */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
        © 2025 Shop Quần Áo. All rights reserved.
      </div>
    </div>
  );
}
