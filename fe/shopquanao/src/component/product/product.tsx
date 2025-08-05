"use client"

import React,{useEffect,useState} from "react";
import Image from "next/image";
import { getAllproduct,getBesellerproduct } from "@/service/product.service";
import Link from "next/link";
// import { Star } from 'lucide-react';

//  hàm tạo slug
function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}

const Htmlload = () => {
  return (
    <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Dành cho bạn</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl shadow p-4 animate-pulse"
          >
            {/* Skeleton image */}
            <div className="w-full h-[200px] bg-gray-200 rounded-lg mb-4"></div>

            {/* Skeleton text */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




const BesellingProduct = () => {
  const [prd, setPrd] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Thêm state 'loading', mặc định là true khi component mount

  const getAllProductData = async () => {
    try {
      setLoading(true); 

      const product = await getBesellerproduct();
      // const products = await getBesellerproduct()
      console.log(product);
      // console.log(products);
      
      setPrd(product?.data?.data ?? []); // fallback mảng trống nếu không có data
    } catch (error) {
      console.error('Lỗi lấy sản phẩm:', error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductData();
  }, []);

  if (loading) {
    return <Htmlload />    ; 
  }
  
  // Hiển thị thông báo nếu không có sản phẩm nào
  if (prd.length === 0) {
    return <div>Không tìm thấy sản phẩm bán chạy.</div>;
  }
  return (
    
    <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4 relative">
      <div className="w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Sản phẩm bán chạy</h1>
      </div>

      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
    {prd.map((prdd: any, index: number) => {
      const slug = `${toSlug(prdd.name)}-i.${prdd.idSeller}.${prdd.id}`;
      return (
        <Link
          key={index}
          href={`/${slug}`}
          className="rounded-2xl shadow hover:shadow-md transition duration-300 hover:cursor-pointer block"
        >
          <div className="w-full h-[200px] flex justify-center items-center relative">
            <Image
              width={150}
              height={150}
              src={prdd.image}
              alt={prdd.name}
              className="object-contain"
            />
            <div className="absolute top-0 right-0 bg-red-400 rounded-l-2xl text-white">
              -{Math.round((1 - prdd.discountprice / prdd.price) * 100)}%
            </div>
          </div>

          <div className="mt-4 space-y-1 text-center">
            <p className="font-medium py-0 my-0">{prdd.name}</p>
            <p className="text-sm line-through text-gray-400 py-0 my-0">
              {prdd.price.toLocaleString('vi-VN')} đ
            </p>
            <p className="text-lg text-red-500 font-semibold py-0 my-0">
              {prdd.discountprice.toLocaleString('vi-VN')} đ
            </p>
          </div>
        </Link>
      );
    })}
</div>

    </div>

  );
};

 const  NewProduct=()=>{
    return(
            <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4 relative">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold mb-6">Sản phẩm mới</h1>
                </div>

                <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
                    {[1, 2, 3, 4].map((_, index) => (
                    <Link href="http://localhost:3000/dien-thoai-oppo-a57-i.123456.78910"
                    key={index}>
                        <div
                        
                        className=" rounded-2xl shadow hover:shadow-md transition duration-300"
                    >
                        <div className="w-full h-[200px] flex justify-center items-center  relative">
                        <Image
                            width={300}
                            height={300}
                            src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188339/images-removebg-preview_gx5jgi.png"
                            alt="product"
                            className="object-contain"
                        />
                        <div className="absolute top-0 right-0 bg-red-400 rounded-l-2xl text-white">-25%</div>
                        </div>

                        <div className="mt-4 space-y-1 text-center">
                        <p className="font-medium py-0 my-0">Vòng bạc</p>
                        <p className="text-sm line-through text-gray-400 py-0 my-0">200.000 đ</p>
                        <p className="text-lg text-red-500 font-semibold py-0 my-0">180.000 đ</p>
                        


                        </div>
                    </div>
                    </Link>
                    ))}
                </div>
                </div>
    )
}

 const  Foruser=()=>{
    return(
            <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4 relative">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold mb-6">Dành cho bạn</h1>
                </div>

                <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
                    {[1, 2, 3, 4].map((_, index) => (
                    <div
                        key={index}
                        className=" rounded-2xl shadow hover:shadow-md transition duration-300"
                    >
                        <div className="w-full h-[200px] flex justify-center items-center  ">
                        <Image
                            width={300}
                            height={300}
                            src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188519/17.3-removebg-preview_efb0ga.png"
                            alt="product"
                            className="object-contain"
                        />
                        </div>

                        <div className="mt-4 space-y-1 text-center">
                        <p className="font-medium py-0 my-0">Vòng bạc</p>
                        <p className="text-sm line-through text-gray-400 py-0 my-0">200.000 đ</p>
                        <p className="text-lg text-red-500 font-semibold py-0 my-0">180.000 đ</p>


                        </div>
                    </div>
                    ))}
                </div>
                </div>
    )
}


 const  FavouriteProduct=()=>{
    return(
            <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4 relative">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold mb-6">Dành cho bạn</h1>
                </div>

                <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
                    {[1, 2, 3, 4].map((_, index) => (
                    <div
                        key={index}
                        className=" rounded-2xl shadow hover:shadow-md transition duration-300"
                    >
                        <div className="w-full h-[200px] flex justify-center items-center  ">
                        <Image
                            width={300}
                            height={300}
                            src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188519/17.3-removebg-preview_efb0ga.png"
                            alt="product"
                            className="object-contain"
                        />
                        </div>

                        <div className="mt-4 space-y-1 text-center">
                        <p className="font-medium py-0 my-0">Vòng bạc</p>
                        <p className="text-sm line-through text-gray-400 py-0 my-0">200.000 đ</p>
                        <p className="text-lg text-red-500 font-semibold py-0 my-0">180.000 đ</p>


                        </div>
                    </div>
                    ))}
                </div>
                </div>
    )
}



const DiscountProduct=()=>{
    return(
        <div className="discount_product  max-w-[1200px] mx-auto py-10 ">
            <div className="w-full h-[400px] rounded-2xl shadow-lg flex overflow-hidden bg-gray-200">
                {/* Hình ảnh */}
                <div className="flex-1 flex items-center justify-center bg-gray-200">
                <Image
                    width={300}
                    height={300}
                    src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188339/images-removebg-preview_gx5jgi.png"
                    alt="Áo khoác nam"
                    className="object-contain relative"
                />
                </div>

                {/* Nội dung khuyến mãi */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-6 bg-gray-200">
                <h1 className="text-3xl font-bold mb-2">Áo khoác nam</h1>
                <p className="text-red-500 text-xl font-semibold">Giảm 25%</p>
                <p className="text-gray-600">Từ 20/10 đến 30/10</p>
                </div>

                {/* Đếm ngược + Button */}
                <div className="flex-1 flex flex-col justify-center items-center px-6 bg-gray-200 border-l">
                <p className="text-gray-700 font-medium">Còn lại</p>
                <div className="flex gap-2 text-center text-lg font-semibold my-2">
                    <div className="flex flex-col items-center">
                    <span className="text-2xl text-blue-600">10</span>
                    <span className="text-sm text-gray-500">ngày</span>
                    </div>
                    <div className="flex flex-col items-center">
                    <span className="text-2xl text-blue-600">22</span>
                    <span className="text-sm text-gray-500">giờ</span>
                    </div>
                    <div className="flex flex-col items-center">
                    <span className="text-2xl text-blue-600">10</span>
                    <span className="text-sm text-gray-500">phút</span>
                    </div>
                    <div className="flex flex-col items-center">
                    <span className="text-2xl text-blue-600">10</span>
                    <span className="text-sm text-gray-500">giây</span>
                    </div>
                </div>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-all relative">
                    Mua ngay
                </button>
                </div>
            </div>
        </div>

    )
}
export{BesellingProduct,NewProduct,Foruser,DiscountProduct,FavouriteProduct};