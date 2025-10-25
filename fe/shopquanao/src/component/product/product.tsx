"use client"

import React,{useEffect,useRef,useState} from "react";
import Image from "next/image";
import { GetAllProductSeller, getBesellerproduct, GetBestsell, GetNewProduct, GetProductByCategory, GetRating } from "@/service/product.service";
import Link from "next/link";
// import { Star } from 'lucide-react';
import { interfaceProduct } from "@/interface/product.interface";
import { Star, X } from "lucide-react";
import Button from "../ui/button";

interface PropProductTag{
  handleAddTag:() =>void;
  seller_id:number;
  handleProductId: (id: number,name:string,image:string) => void; 

}
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
        {[1, 2, 3, 4,5,6,7,8].map((_, index) => (
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




// const BesellingProduct = () => {
//   const [prd, setPrd] = useState<interfaceProduct[]>([]);
//   const [loading, setLoading] = useState(true); // Thêm state 'loading', mặc định là true khi component mount

//   const getAllProductData = async () => {
//     try {
//       setLoading(true); 

//       const product = await getBesellerproduct();
//       // const products = await getBesellerproduct()
//       // console.log(product);
//       // console.log(products);
      
//       setPrd(product?.data?.data ?? []); // fallback mảng trống nếu không có data
//     } catch (error) {
//       console.error('Lỗi lấy sản phẩm:', error);
//     } finally{
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProductData();
//   }, []);

//   if (loading) {
//     return <Htmlload />    ; 
//   }
  
//   // Hiển thị thông báo nếu không có sản phẩm nào
//   if (prd.length === 0) {
//     return <div>Không tìm thấy sản phẩm bán chạy.</div>;
//   }
//   return (
    
//       <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] mx-auto mt-6 relative">
//         <div className="w-full text-center">
//           <h1 className="text-3xl font-bold mb-10 text-gray-800">Sản phẩm bán chạy</h1>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//           {prd.map((prdd: interfaceProduct, index: number) => {
//             const slug = `${toSlug(prdd.name)}-i.${prdd.idSeller}.${prdd.id}`;
//             const avg = prdd.ratingCount > 0 ? prdd.ratingSum / prdd.ratingCount : 0;

//             return (
//               <Link
//                 key={index}
//                 href={`/${slug}`}
//                 className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white overflow-hidden block"
//               >
//                 {/* Ảnh sản phẩm */}
//                 <div className="w-full h-[200px] sm:h-[220px] flex justify-center items-center relative bg-gray-50">
//                   <Image
//                     width={160}
//                     height={160}
//                     src={prdd.image}
//                     alt={prdd.name}
//                     className="object-contain transition-transform duration-300 group-hover:scale-105"
//                   />

//                   {/* Tag giảm giá */}
//                   <div className="absolute top-2 right-2 bg-red-500 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold shadow">
//                     -{Math.round((1 - prdd.discountprice / prdd.price) * 100)}%
//                   </div>
//                 </div>

//                 {/* Nội dung */}
//                 <div className="p-3 sm:p-4 space-y-1 sm:space-y-2 text-center">
//                   <p className="font-medium text-gray-800 line-clamp-2">{prdd.name}</p>

//                   {/* Rating sao */}
//                   <div className="flex items-center justify-center gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         className={
//                           i < Math.round(avg)
//                             ? "text-yellow-400 fill-yellow-400"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                     <span className="text-xs sm:text-sm text-gray-500 ml-1">
//                       ({prdd.ratingCount || 0})
//                     </span>
//                   </div>

//                   <p className="text-xs sm:text-sm line-through text-gray-400">
//                     {prdd.price.toLocaleString("vi-VN")} đ
//                   </p>
//                   <p className="text-base sm:text-xl text-red-600 font-bold">
//                     {prdd.discountprice.toLocaleString("vi-VN")} đ
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//           <div className="flex justify-end mt-2">
//             <Button variant='primary'>xem thêm</Button>
//           </div>

//       </div>
      


//   );
// };

 const  BesellingProduct=()=>{
   const [prd, setPrd] = useState<interfaceProduct[]>([]);
  const [loading, setLoading] = useState(true); // Thêm state 'loading', mặc định là true khi component mount
  const [page,setPage] = useState(1);

function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}

useEffect(() => {
  // if (calledOnce.current[page]) return; // nếu page này đã gọi rồi thì bỏ qua
  // calledOnce.current[page] = true;

  const Getbestsell = async () => {
    try {
      const product = await GetBestsell(page);
      if (product.data.success) {
        if (page === 1) {
          setPrd(product.data.data); // load mới
        } else {
          setPrd((prev) => [...prev, ...product.data.data]); // nối thêm
        }
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  Getbestsell();
}, [page]);


  const nextPage=() =>{
    setPage(page + 1)
  }


  if (loading) {
    return <Htmlload />    ; 
  }
  
  // Hiển thị thông báo nếu không có sản phẩm nào
  if (prd.length === 0) {
    return <div>Không tìm thấy sản phẩm bán chạy.</div>;
  }
    return(
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] mx-auto mt-6 relative">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">sản phẩm bán chạy</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {prd.map((prdd: interfaceProduct, index: number) => {
            const slug = `${toSlug(prdd.name)}-i.${prdd.idSeller}.${prdd.id}`;
            const avg = prdd.ratingCount > 0 ? prdd.ratingSum / prdd.ratingCount : 0;

            return (
              <Link
                key={index}
                href={`/${slug}`}
                className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white overflow-hidden block"
              >
                {/* Ảnh sản phẩm */}
                <div className="w-full h-[200px] sm:h-[220px] flex justify-center items-center relative bg-gray-50">
                  <Image
                    width={160}
                    height={160}
                    src={prdd.image}
                    alt={prdd.name}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Tag giảm giá */}
                    {(isInPromotion(prdd.promo_start,prdd.promo_end)) ? (
                        <div className="absolute top-2 right-2 bg-red-500 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold shadow">
                          -{Math.round((1 - prdd.discountprice / prdd.price) * 100)}%
                        </div>
                    ) : (
                      <div>

                      </div>
                    )}
                    
                  </div>

                {/* Nội dung */}
                <div className="p-3 sm:p-4 space-y-1 sm:space-y-2 text-center">
                  <p className="font-medium text-gray-800 line-clamp-2 m-0 p-0" >{prdd.name}</p>

                  {/* Rating sao */}
                  <div className="flex items-center justify-center gap-1 my-0 py-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(avg)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-1 my-0 py-0">
                      ({prdd.ratingCount || 0})
                    </span>
                  </div>
                    {isInPromotion(prdd.promo_start,prdd.promo_end) ? (
                     <div>
                       <p className="text-xs sm:text-sm line-through text-gray-400 my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.discountprice.toLocaleString("vi-VN")} đ
                  </p>
                     </div>
                    ) : (
                      <div>
                       <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p >
                    
                  </p>
                     </div>
                    )}


                    
                 
                </div>
              </Link>
            );
          })}
        </div>
          <div className="flex justify-end mt-2">
            <Button variant='primary' onClick={nextPage}>xem thêm</Button>
          </div>

      </div>
    )
}



 const  NewProduct=()=>{
   const [prd, setPrd] = useState<interfaceProduct[]>([]);
  const [loading, setLoading] = useState(true); // Thêm state 'loading', mặc định là true khi component mount
  const [page,setPage] = useState(1);


const calledOnce = useRef<{ [key: number]: boolean }>({});
function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}
useEffect(() => {
  if (calledOnce.current[page]) return; // nếu page này đã gọi rồi thì bỏ qua
  calledOnce.current[page] = true;
      const Getbestsell = async() =>{
        try {
          const product = await GetNewProduct(page);
        console.log(product);
        if(product.data.success){
          if (page === 1) {
            setPrd(product.data.data); // load mới
          } else {
            setPrd((prev) => [...prev, ...product.data.data]); // nối thêm
          }
        }
        } catch (error) {
          setLoading(false)
        }finally{
          setLoading(false)
        }
        
      }
      Getbestsell();
  },[page]);

    const nextPage=() =>{
    setPage(page + 1)
  }
  if (loading) {
    return <Htmlload />    ; 
  }
  
  // Hiển thị thông báo nếu không có sản phẩm nào
  if (prd.length === 0) {
    return <div>Không tìm thấy sản phẩm bán chạy.</div>;
  }
    return(
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] mx-auto mt-6 relative">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">sản phẩm mới</h1>
        </div>


          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {prd.map((prdd: interfaceProduct, index: number) => {
            const slug = `${toSlug(prdd.name)}-i.${prdd.idSeller}.${prdd.id}`;
            const avg = prdd.ratingCount > 0 ? prdd.ratingSum / prdd.ratingCount : 0;

            return (
              <Link
                key={index}
                href={`/${slug}`}
                className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white overflow-hidden block"
              >
                {/* Ảnh sản phẩm */}
                <div className="w-full h-[200px] sm:h-[220px] flex justify-center items-center relative bg-gray-50">
                  <Image
                    width={160}
                    height={160}
                    src={prdd.image}
                    alt={prdd.name}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Tag giảm giá */}
                  {(isInPromotion(prdd.promo_start,prdd.promo_end)) ? (
                        <div className="absolute top-2 right-2 bg-red-500 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold shadow">
                          -{Math.round((1 - prdd.discountprice / prdd.price) * 100)}%
                        </div>
                    ) : (
                      <div>

                      </div>
                    )}
                </div>

                {/* Nội dung */}
                <div className="p-3 sm:p-4 space-y-1 sm:space-y-2 text-center">
                  <p className="font-medium text-gray-800 line-clamp-2 m-0 p-0" >{prdd.name}</p>

                  {/* Rating sao */}
                  <div className="flex items-center justify-center gap-1 my-0 py-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(avg)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-1 my-0 py-0">
                      ({prdd.ratingCount || 0})
                    </span>
                  </div>

                  {isInPromotion(prdd.promo_start,prdd.promo_end) ? (
                     <div>
                       <p className="text-xs sm:text-sm line-through text-gray-400 my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.discountprice.toLocaleString("vi-VN")} đ
                  </p>
                     </div>
                    ) : (
                      <div>
                       <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p >
                    
                  </p>
                     </div>
                    )}
                </div>
              </Link>
            );
          })}
        </div>
          <div className="flex justify-end mt-2">
            <Button variant='primary' onClick={nextPage}>xem thêm</Button>
          </div>

      </div>
    )
}


 const  Ratingproduct=()=>{

   const [prd, setPrd] = useState<interfaceProduct[]>([]);
  const [loading, setLoading] = useState(true); // Thêm state 'loading', mặc định là true khi component mount
  const [page,setPage] = useState(1);


const calledOnce = useRef<{ [key: number]: boolean }>({});
function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}
useEffect(() => {
  if (calledOnce.current[page]) return; // nếu page này đã gọi rồi thì bỏ qua
  calledOnce.current[page] = true;
      const Getbestsell = async() =>{
        try {
          const product = await GetRating(page);
        console.log(product);
        if(product.data.success){
          if (page === 1) {
            setPrd(product.data.data); // load mới
          } else {
            setPrd((prev) => [...prev, ...product.data.data]); // nối thêm
          }
        }
        } catch (error) {
          setLoading(false)
        }finally{
          setLoading(false)
        }
        
      }
      Getbestsell();
  },[page]);

    const nextPage=() =>{
    setPage(page + 1)
  }
    if (loading) {
    return <Htmlload />    ; 
  }
  
  // Hiển thị thông báo nếu không có sản phẩm nào
  if (prd.length === 0) {
    return <div>Không tìm thấy sản phẩm bán chạy.</div>;
  }
    return(
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] mx-auto mt-6 relative">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">Sản phấm xếp hạng</h1>
        </div>


                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {prd.map((prdd: interfaceProduct, index: number) => {
            const slug = `${toSlug(prdd.name)}-i.${prdd.idSeller}.${prdd.id}`;
            const avg = prdd.ratingCount > 0 ? prdd.ratingSum / prdd.ratingCount : 0;

            return (
              <Link
                key={index}
                href={`/${slug}`}
                className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white overflow-hidden block"
              >
                {/* Ảnh sản phẩm */}
                <div className="w-full h-[200px] sm:h-[220px] flex justify-center items-center relative bg-gray-50">
                  <Image
                    width={160}
                    height={160}
                    src={prdd.image}
                    alt={prdd.name}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Tag giảm giá */}
                  {(isInPromotion(prdd.promo_start,prdd.promo_end)) ? (
                        <div className="absolute top-2 right-2 bg-red-500 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold shadow">
                          -{Math.round((1 - prdd.discountprice / prdd.price) * 100)}%
                        </div>
                    ) : (
                      <div>

                      </div>
                    )}
                </div>

                {/* Nội dung */}
                <div className="p-3 sm:p-4 space-y-1 sm:space-y-2 text-center">
                  <p className="font-medium text-gray-800 line-clamp-2 m-0 p-0" >{prdd.name}</p>

                  {/* Rating sao */}
                  <div className="flex items-center justify-center gap-1 my-0 py-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(avg)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-1 my-0 py-0">
                      ({prdd.ratingCount || 0})
                    </span>
                  </div>

                  {isInPromotion(prdd.promo_start,prdd.promo_end) ? (
                     <div>
                       <p className="text-xs sm:text-sm line-through text-gray-400 my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.discountprice.toLocaleString("vi-VN")} đ
                  </p>
                     </div>
                    ) : (
                      <div>
                       <p className="text-base sm:text-xl text-red-600 font-bold my-0 py-0">
                    {prdd.price.toLocaleString("vi-VN")} đ
                  </p>
                  <p >
                    
                  </p>
                     </div>
                    )}
                </div>
              </Link>
            );
          })}
        </div>
          <div className="flex justify-end mt-2">
            <Button variant='primary' onClick={nextPage}>xem thêm</Button>
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

const ProductTag=({seller_id,handleAddTag,handleProductId}:PropProductTag) =>{
    const [listprd,setlitsprd] = useState<interfaceProduct[]>([])
  const [loading,setloading] = useState(true);
  const [page,setPage] = useState(1);
  
  useEffect(() =>{
fetchprd()
  },[seller_id,page])

  const Clickxemthem=()=>{
    setPage(page + 1)
  }
  const fetchprd = async() =>{
    try {
      const prd =await GetAllProductSeller(seller_id,page);
      // console.log(prd);
      if(prd.data.success){
        if(page === 1){
          setlitsprd(prd.data.data)
        }else{
          setlitsprd((prev) => [...prev,...prd.data.data])
        }
      }
      
    } catch (error) {
      setloading(false)
    }finally{
      setloading(false);
    }
  }
  return(
                      <div className="absolute bottom-[50px] left-0 bg-white border p-2 rounded-lg shadow-lg w-[400px] h-[300px] ">
                               <div className="flex justify-between items-center border-b pb-2">
                                    <p>chọn sản phẩm</p>
                                    <X className="hover:cursor-pointer hover:text-red-500" onClick={handleAddTag} />
                               </div>
                               <div className="overflow-y-scroll h-[245px]">
                                {loading ? (
                                  <div>loading</div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 mt-2 ">
                                      {listprd.length > 0 && listprd.map((item) =>(
                                        <div className="border p-2 rounded-lg hover:cursor-pointer hover:shadow-lg" key={item.id} onClick={()=>handleProductId(item.id,item.name,item.image)}>
                                            <Image 
                                                width={100}
                                                height={100}
                                                src={item.image}
                                                alt="Chat Image"
                                                className="rounded-lg max-w-[100px] max-h-[100px]"
                                            ></Image>
                                            <p className="font-bold text-xs">{item.name}</p>
                                            <p className="text-red-500 font-bold">{item.discountprice} d</p>
                                        </div>
                                      ))}
                                    </div>

                                )}
                                      
                                    <div className="w-full flex justify-end mt-2">
                                        <Button onClick={Clickxemthem}>xem thêm</Button>
                                    </div>
                               </div>
                               <div>

                               </div>
                           </div>
  )
}
interface SimilarproductsProp{
  category_id:number;
}
const Similarproducts= ({category_id}:SimilarproductsProp) =>{
  const [page,setPage] = useState(1);
  const [products,setProducts] = useState<interfaceProduct[]>([])

  useEffect(() =>{
    fetchdata();
  },[category_id,page])

  const ClickPage =()=>{
    setPage(page + 1)
  }
  const fetchdata = async()=>{
    try {
      const data = await GetProductByCategory(category_id,page);
      if(page === 1) {
        if(data.data.data.products.success){
        setProducts(data.data.data.products.data)
      }
      }else{
        setProducts((prev) => [...prev,...data.data.data.products.data])
      }
      // console.log(data.data.data.products);
      
    } catch (error) {
      
    }
  }
  return(
    <div className="shadow mt-8 p-6 bg-white rounded-2xl">
      {/* Tiêu đề */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          Sản phẩm tương tự
        </h1>
      </div>

      {/* Grid sản phẩm */}
      <div className="grid py-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map((pr, index) => (
    <div
      key={index}
      className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Ảnh sản phẩm */}
      <div className="relative aspect-square bg-gray-50 flex justify-center items-center overflow-hidden">
        <Image
          src={
            pr.image ||
            "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
          }
          alt={pr.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 flex flex-col justify-between text-center p-3">
        <p className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
          {pr.name}
        </p>
        <div className="mt-1">
          <p className="text-xs sm:text-sm line-through text-gray-400">
            {pr.price} đ
          </p>
          <p className="text-base sm:text-lg text-red-500 font-bold">
            {pr.discountprice} đ
          </p>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Nút xem thêm */}
      <div className="w-full flex justify-end">
        <Button
          variant="primary"
          className=""
          onClick={ClickPage}
        >
          Xem thêm
        </Button>
      </div>
    </div>

  )

}
export{Similarproducts,ProductTag,BesellingProduct,NewProduct,Ratingproduct,DiscountProduct,FavouriteProduct};