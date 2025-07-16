import React from "react";
import Image from "next/image";
import { Star } from 'lucide-react';

export default function CommentHome(){
    return(
        <div className="max-w-[1200px] mx-auto">
            <div className="">
                    <h1 className="text-2xl font-bold mb-6">Dành cho bạn</h1>
            </div>
            <div className="flex flex-col items-start   h-[550px] justify-between">
                <div className=" bg-gray-200 p-4 rounded-3xl max-w-[380px] ">
                    <div className="flex gap-2">
                        <Image
                        width={70}
                        height={70}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188339/images-removebg-preview_gx5jgi.png"
                        alt=""
                        className=""
                        
                        >


                        </Image>
                        <div>
                            <p className="text-3xl font-bold">nguyen van a</p>
                            <ul className="flex ">
                                <li><Star className="text-yellow-500 fill-yellow-500"/></li>
                                <li><Star className="text-yellow-500 fill-yellow-500" /></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p>shop rất có tâm, sản phẩm nào cũng xịn, chúc shop bán càng nhiều đồ hơn</p>
                        <a href="">xem them</a>
                    </div>
                </div>
                <div className=" bg-gray-200 p-4 rounded-3xl max-w-[380px] self-center">
                    <div className="flex gap-2">
                        <Image
                        width={70}
                        height={70}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188339/images-removebg-preview_gx5jgi.png"
                        alt=""
                        className=""
                        
                        >


                        </Image>
                        <div>
                            <p className="text-3xl font-bold">nguyen van a</p>
                            <ul className="flex ">
                                <li><Star className="text-yellow-500 fill-yellow-500"/></li>
                                <li><Star className="text-yellow-500 fill-yellow-500" /></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p>shop rất có tâm, sản phẩm nào cũng xịn, chúc shop bán càng nhiều đồ hơn</p>
                                                <a href="">xem them</a>

                    </div>
                </div>
                <div className=" bg-gray-200 p-4 rounded-3xl max-w-[380px] self-end">
                    <div className="flex gap-2">
                        <Image
                        width={70}
                        height={70}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188339/images-removebg-preview_gx5jgi.png"
                        alt=""
                        className=""
                        
                        >


                        </Image>
                        <div>
                            <p className="text-3xl font-bold">nguyen van a</p>
                            <ul className="flex ">
                                <li><Star className="text-yellow-500 fill-yellow-500"/></li>
                                <li><Star className="text-yellow-500 fill-yellow-500" /></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                                <li><Star className="text-yellow-500"/></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p>shop rất có tâm, sản phẩm nào cũng xịn, chúc shop bán càng nhiều đồ hơn</p>
                                                <a href="">xem them</a>

                    </div>
                </div>
                
            </div>
        </div>
    )
}