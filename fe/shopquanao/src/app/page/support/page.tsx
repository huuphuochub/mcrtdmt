
"use client"
import React, { useState } from "react";
import Header from "@/component/header";
import { X } from "lucide-react";
// import Footer from "@/component/footer";

export default function SupportPage() {
      const [images, setImages] = useState<File[]>([]);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // Gộp ảnh cũ + ảnh mới, giới hạn 3
    const newImages = [...images, ...files].slice(0, 3);
    setImages(newImages);

    // Reset input để chọn lại cùng file cũng được
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const categories = [
    {
      key: "product",
      title: "Sản phẩm",
      options: [
        "Sản phẩm giả",
        "Sản phẩm lỗi",
        "Sản phẩm không đúng mô tả",
        "Khác",
      ],
      select:[
        "Áo sơ mi",
        "Quần jean",
        "Váy đầm",
        "Giày thể thao",
        "Túi xách",
        "Phụ kiện",
        "Khác",
      ]
      
    },

    {
      key: "account",
      title: "Tài khoản",
      options: [
        "Không đăng nhập được",
        "Quên mật khẩu",
        "Lỗi thông tin tài khoản",
        "Khác",
      ],
    },
    {
      key: "order",
      title: "Đơn hàng",
      options: [
        "Chậm giao hàng",
        "Sai sản phẩm",
        "Muốn đổi trả",
        "Khác",
      ],
      select:[
        "Đơn hàng 1234567",
        "Đơn hàng 7654321",
        "Đơn hàng 1122334",
        "Đơn hàng 4433221",
        "Đơn hàng 9988776",
        "Đơn hàng 6677885",
        
      ]
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderForm = (categoryKey: string) => {
    const cat = categories.find((c) => c.key === categoryKey);
    if (!cat) return null;

    return (
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Hỗ trợ về {cat.title.toLowerCase()}
        </h2>

        {/* Select */}
        <label className="block text-sm font-medium mb-1">
          Vấn đề gặp phải
        </label>
        <select className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400">
          {cat.options.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>

        {cat.select && (
          <>
            <label className="block text-sm font-medium mb-1">
              Chọn {cat.key === "product" ? "sản phẩm" : "đơn hàng"} liên quan
            </label>
            <select className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400">
              {cat.select.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </>
        )}

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email liên hệ</label>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
        />

        {/* Mô tả */}
        <label className="block text-sm font-medium mb-1">Mô tả chi tiết</label>
        <textarea
          placeholder="Mô tả vấn đề bạn gặp phải..."
          rows={4}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
        ></textarea>

        {/* Ảnh */}
          <div className="mb-6 text-left">
      <label className="block text-sm font-medium mb-2">
        Hình ảnh minh họa
      </label>

      {/* Preview ảnh */}
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-3">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative w-24 h-24 border rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input chọn ảnh */}
      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition">
        <span className="text-gray-500 text-sm">
          {images.length < 3
            ? "Chọn tối đa 3 ảnh"
            : "Đã đạt giới hạn 3 ảnh"}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelectImage}
          disabled={images.length >= 3}
        />
      </label>
    </div>
        {/* Nút gửi */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Gửi yêu cầu
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-[80px] bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Hỗ trợ khách hàng</h1>
          <p className="text-gray-600 mb-10">
            Vui lòng chọn chủ đề bên dưới để được hỗ trợ chi tiết.
          </p>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {categories.map((item) => (
              <div
                key={item.key}
                onClick={() => setSelectedCategory(item.key)}
                className={`p-6 rounded-2xl shadow cursor-pointer transition ${
                  selectedCategory === item.key
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
            ))}
          </div>

          {/* Form */}
          {selectedCategory && renderForm(selectedCategory)}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
