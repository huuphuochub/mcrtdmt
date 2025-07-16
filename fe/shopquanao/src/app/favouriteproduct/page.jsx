import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import { Heart } from "lucide-react";
import Image from "next/image";
// import { FavouriteProduct } from "@/component/product/product";
export default function Favouriteproduct(){
  return(
    <div>
        <Header/>
        <div className="mt-[100px]">
                        <div className="px-8 py-6 max-w-[1200px] mx-auto mt-4 relative">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold mb-6">Dành cho bạn</h1>
                </div>

                <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
                    {[1, 2, 3, 4].map((_, index) => (
                    <div
                        key={index}
                        className=" rounded-2xl relative shadow hover:shadow-md transition duration-300"
                    >
                        <Heart className="absolute right-2 top-2 text-red-500 fill-red-500 hover:cursor-pointer"/>
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
        </div>
        <FooterPage/>
    </div>
  )
}