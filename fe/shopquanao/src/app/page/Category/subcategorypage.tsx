
"use client"
import React, { useEffect, useState } from "react";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import Header from "@/component/header";
import { useRouter } from 'next/navigation';

import FooterPage from "@/component/footer";
import { Category } from "@/interface/category.interface";
import { Subcategory } from "@/interface/category.interface";
import { interfaceProduct } from "@/interface/product.interface";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryPageResponse<T>{
  success:boolean,
  data:T| null,
  message?:string,
}

interface Categorydata{
  products:{
    success:boolean
    data:interfaceProduct[] | null
  }
  allsubcate:{
    success:boolean,
    data:Subcategory[] | null
  }
  allcate:{
    success:boolean,
    data:Category[] | null
  }
  categorydetail:Category,
  subcatedetail:Subcategory,
}

interface propDetailCategoryPage{
  categoryprop:CategoryPageResponse<Categorydata>
}

export default function Categorypage({categoryprop} : propDetailCategoryPage) {
  console.log(categoryprop);
    const router = useRouter();

  const [subcates,setSubcates] = useState<Subcategory[] | null>(null)
  const [allcates,setAllcates] = useState<Category[] | null>(null);
  const [productss, setProductss] = useState<interfaceProduct[] |null>(null);
  const [cate,setCate] = useState<Category | null>(null);
    const [subcatedetail,setsubCatedetail] = useState<Subcategory | null>(null);

//  hàm tạo slug
function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}
  useEffect(() =>{
    // console.log(categoryprop);
    
    setAllcates(categoryprop.data?.allcate.data ?? []);
    setCate(categoryprop.data?.categorydetail ?? null);
    setsubCatedetail(categoryprop.data?.subcatedetail ?? null);

    setProductss(categoryprop.data?.products.data ?? []);
    setSubcates(categoryprop.data?.allsubcate.data ?? []);
  },[categoryprop])
  const selectcate=(e:React.ChangeEvent<HTMLSelectElement>) =>{
    const id = Number(e.target.value);
    const dcate = allcates?.find(c=>c.id === id);
    if(dcate){
      const slug = `${toSlug(dcate?.name)}-cat.${dcate?.id}`
      router.push(`/${slug}`);
    }
    
  } 
  return (
    <div>
      {/* Background hiệu ứng */}
      <div id="Particles">
        <canvas id="fluid"></canvas>
        <FluidSimulation />
      </div>

      <Header />

      <div className="mt-[100px] max-w-[1200px] mx-auto px-4 min-h-[700px]">
         <div className="flex py-2 px-1 relative">
         <p className="hover:cursor-pointer hover:text-red-300">Trang chủ </p>
         &gt;
         <p className="hover:cursor-pointer hover:text-red-300">{cate?.name} </p>
         &gt;
         <p className="hover:cursor-pointer hover:text-red-300">{subcatedetail?.name} </p>
      </div>
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
            <select className="w-full md:w-1/3 py-2 px-4 relative border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={ selectcate}>
              <option value="">Chọn danh mục</option>

              {allcates && allcates.map((cate) =>(
                <option value={cate.id}


                key={cate.id}>{cate.name}</option>

              ))}
              
            </select>
          </div>
        </div>

        {/* Gợi ý sản phẩm hoặc kết quả */}
        <div className="mb-12 flex gap-4 ">
          <div className="max-w-[300px] w-[300px] shadow rounded-xl p-2">
              <div>
                <div className="flex  gap-2 border-b border-gray-200 pb-2" >
                    <h3 className="text-xl font-semibold ">{cate?.name}</h3>
                         &gt;

                <h3 className="text-xl  ">{subcatedetail?.name}</h3>
                </div>
                <div>
                  <ul>
                     {subcates && subcates.map((cate) =>{
                      const slug = `${toSlug(cate?.name)}-subcat.${cate?.id}`
                      return(
                        <Link href={`/${slug}`} key={cate.id}>
                          <li  className="hover:cursor-pointer hover:underline relative">{cate.name}</li>
                        </Link>
                      )
                     })}
                    
                  </ul>
                </div>
              </div>
          </div>
         <div className="flex-1">
           <div className="flex gap-2 mb-4">
            
            <h3 className="text-xl font-semibold py-2 px-4 relative rounded-sm bg-blue-100 hover:cursor-pointer">Sản phẩm nổi bật</h3>
            <h3 className="text-xl font-semibold py-2 px-4 relative rounded-sm  bg-red-100 hover:cursor-pointer">Sản phẩm gia re</h3>

            <h3 className="text-xl font-semibold py-2 px-4 relative rounded-sm bg-yellow-100 hover:cursor-pointer">Sản phẩm ban chay </h3>
            <h3 className="text-xl font-semibold py-2 px-4 relative rounded-sm  bg-pink-100 hover:cursor-pointer">Sản phẩm chat luong</h3>

           </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productss && productss.map((prd) =>{
              const slug = `${toSlug(prd.name)}-i.${prd.idSeller}.${prd.id}`
              return(
                <Link href={`/${slug}`} key={prd.id}>
                  <div
                  className="bg-white p-4 rounded-xl relative shadow hover:shadow-lg transition cursor-pointer"
                >

                  
                  <div className="flex justify-between">
                      <div>
                          <h4 className="font-semibold text-lg mb-1">
                          {prd.name}
                        </h4>
                        
                        <p className="text-sm text-gray-600">{prd.price} đ</p>
                      </div>
                        <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={prd?.image || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                          alt={prd.name}
                          width={100}
                          height={100}
                          className="object-contain w-full h-full"
                        />
                      </div>

                  </div>
                </div>
                
                </Link>
              )
            })}
            
          </div>
         </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
