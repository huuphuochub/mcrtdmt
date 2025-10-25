import React from "react";
import FooterPage from "@/component/footer";
import Image from "next/image";
import Button from "@/component/ui/button";
import { Star,EllipsisVertical } from "lucide-react";
export default function Foollowseller(){
    return(
        <div>
            <div className="mt-[100px] max-w-[1200px] mx-auto h-lvh">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white h-[150px] p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                <div>
                    <div className="flex justify-between ">
                        <div className="flex gap-2  ">
                            <Image
                            width={70}
                            height={70}
                            src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1749269293/qrxsh7wth8yhlczgogap.jpg"
                            alt=""
                            className="rounded-full"
                            >
                            </Image>
                            <div>
                                <h3 className="text-2xl font-semibold ">nguoi ban hang</h3>
                                <div className="mt-2">
                                    <ul className="flex gap-2">
                                        <li><Star className="text-yellow-500"/></li>
                                        <li><Star className="text-yellow-500"/></li>
                                        <li><Star className="text-yellow-500"/></li>
                                        <li><Star className="text-yellow-500"/></li>
                                        <li><Star className="text-yellow-500"/></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                            <div>
                                <EllipsisVertical />
                            </div>
                    </div>
                    <div className="w-full text-end mt-2">
                        <div>
                            <Button variant="primary">theo gioi</Button>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
            </div>
            <FooterPage/>
        </div>
    )
}