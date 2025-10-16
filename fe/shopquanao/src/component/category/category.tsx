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
    const [count, setCount] = useState(0)


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

    useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setCount(2)      // mobile
      else if (width < 768) setCount(3) // tablet nhỏ
      else if (width < 1024) setCount(4) // laptop
      else setCount(6)                  // desktop
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  
  
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
       <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          Lựa chọn danh mục
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="h-[180px] sm:h-[200px] w-full flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-sm border border-gray-200 animate-pulse"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

    );
  }

  return (
     <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] mx-auto relative">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        Lựa chọn danh mục
      </h1>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="category-swiper"
        >
          {(categorys ?? []).map((cat) => {
            const slug = `${toSlug(cat.name)}-cat.${cat.id}?page=1&keyword=&bestselling=0&rating=0&discount=0&newdate=0&minprice=0&maxprice=0`;

            return (
              <SwiperSlide key={cat.id}>
                <Link href={`/${slug}`}>
                  <div className="group h-[180px] sm:h-[200px] w-full cursor-pointer flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.05]">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-2">
                      <Image
                        height={100}
                        width={100}
                        src={
                          cat.urlimage ||
                          "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                        }
                        alt={cat.name}
                        className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-gray-700 text-center px-2">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

          {/* Nút điều hướng */}
          <div className="swiper-button-prev !absolute !top-1/2  !z-20  !rounded-full !p-2  transition">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="swiper-button-next !absolute !top-1/2  !z-20 !rounded-full !p-2 transition">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
