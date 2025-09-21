'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/component/ui/button";

const banners = [
  {
    title: "Amazing Product",
    subtitle: "new collection 2018",
    description:
      "Let's Fashion ád ád ádas đá jadc á ádjk ádk ád ạ  kjh  kjh kjh kjhg jhkg dd ạkdas dkas...",
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
    <div className="overflow-hidden bg-gray-200 w-full h-[400px] relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((item, i) => (
          <div key={i} className="min-w-full flex items-center justify-between px-[300px]">
            <div>
              <p className="font-mono">{item.subtitle}</p>
              <h3 className="text-3xl font-bold">{item.title}</h3>
              <div className="my-4">
                <i>{item.description}</i>
              </div>
              <Button variant="banner">Mua ngay</Button>
            </div>
            <Image
              src={item.image}
              alt="banner"
              height={400}
              width={0}
              style={{ height: 400, width: 'auto' }}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
