'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Getallcategory } from "@/service/categoryservice";
import { Category } from "@/interface/category.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import useCategoryStore from "@/app/context/categorycontext";



export default function CategorySlider() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  // const [categorys,setCategorys] = useState<Category[] | null>([])
  const { categorys, loading, error } = useCategoryStore();

  useEffect(() => {
    // Simulate loading time and ensure all images are loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);






  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  
  function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}

  // const allImagesLoaded = imagesLoaded >= categories.length;

  if (!isLoaded ) {
    return (
      <div className="px-8 py-6 max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lựa chọn danh mục</h1>
        <div className="grid grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[200px] w-full flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm border border-gray-200 animate-pulse">
              <div className="w-20 h-20 bg-gray-200   rounded-full mb-3"></div>
              <div className="h-4 bg-gray-200  rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 max-w-[1200px] mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Lựa chọn danh mục</h1>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={6}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="category-swiper"
      >
       {(categorys ?? []).map((cat) => {
        const slug = `${toSlug(cat.name)}-cat.${cat.id}?page=1&keyword=&bestselling=0&rating=0&discount=0&newdate=0&minprice=0&maxprice=0`

        return(
              <SwiperSlide key={cat.id}>
            <Link href={`/${slug}`} >


            <div className="h-[200px] w-full hover:cursor-pointer flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200">
              <div className="w-20 h-20 flex items-center justify-center mb-3">
                {/* {imagesLoaded } */}
                {cat.urlimage ? (
                  <Image
                  height={150}
                  width={150}
                  src={cat.urlimage}
                  alt={cat.name}
                  className="object-contain max-w-full max-h-full"
                  style={{ aspectRatio: '1 / 1' }}
                  onLoad={handleImageLoad}
                />
                ) : (
                  <Image
                  height={150}
                  width={150}
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                  alt={cat.name}
                  className="object-contain max-w-full max-h-full"
                  style={{ aspectRatio: '1 / 1' }}
                  onLoad={handleImageLoad}
                />
                )}
              </div>
              <p className="text-sm font-medium text-center text-gray-700 px-2">
                {cat.name}
              </p>
            </div>
            </Link>
          </SwiperSlide>
          
        )


       })}


        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next ">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>
    </div>
  );
}
