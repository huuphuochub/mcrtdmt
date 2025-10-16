'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/component/ui/button";

const banners = [
  {
    title: "Amazing Product",
    subtitle: "new collection 2018",
    description:
      "Let's Fashion — nơi cập nhật xu hướng thời trang mới nhất dành cho bạn!",
    image:
      "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749191204/vrlafwtsyuceiekglvkv.jpg",
  },
  {
    title: "Modern Style",
    subtitle: "summer collection 2024",
    description:
      "Trendy fashion for you. Enjoy the latest designs now! New drops every week.",
    image:
      "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749191204/vrlafwtsyuceiekglvkv.jpg",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-auto bg-gray-200">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((item, i) => (
          <div
            key={i}
            className="min-w-full flex flex-col md:flex-row items-center justify-between md:px-[150px] lg:px-[250px]"
          >
            {/* Mobile: Ảnh nền chiếm full chiều cao */}
            <div className="relative w-full h-[400px] md:hidden">
              <Image
                src={item.image}
                alt="banner"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 space-y-3">
                <p className="text-sm uppercase tracking-widest opacity-80">
                  {item.subtitle}
                </p>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="italic text-sm">{item.description}</p>
                <Button variant="banner" className="mt-2">
                  Mua ngay
                </Button>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex w-full items-center justify-between">
              <div className="w-1/2 space-y-3 text-left">
                <p className="font-mono uppercase tracking-wider text-gray-500">
                  {item.subtitle}
                </p>
                <h3 className="text-4xl font-bold">{item.title}</h3>
                <p className="italic text-gray-700">{item.description}</p>
                <Button variant="banner" className="mt-4">
                  Mua ngay
                </Button>
              </div>
              <div className="relative w-1/2 h-[400px]">
                <Image
                  src={item.image}
                  alt="banner"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chấm tròn điều hướng */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-white md:bg-black scale-110"
                : "bg-white/50 md:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
