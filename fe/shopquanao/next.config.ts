import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com',"encrypted-tbn0.gstatic.com"], // thêm tên miền bạn muốn cho phép tải ảnh
  },
};

export default nextConfig;
