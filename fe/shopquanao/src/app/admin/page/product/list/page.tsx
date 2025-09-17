import { Home, Search } from "lucide-react";
import React from "react";
import { ProductList } from "@/app/admin/component/product";
// import { getListProduct } from "@/app/admin/service/product.service";
export default function ProductListPage(){

    return(
        <div className="m-4">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 hover:text-red-300 cursor-pointer">
                    <Home className=""/> <p className="">trang chủ</p>
                    </div> 
                    <p>/</p> <p className="hover:text-red-300 cursor-pointer">Danh sách sản phẩm</p>
                </div>

                <div className="">
                    <div className="relative w-full max-w-[300px] bg-white rounded-2xl shadow">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm theo tên..."
                        className="w-full pl-4 pr-10 py-1 border border-gray-300 rounded-full 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>
            <div>
                <ProductList/>
            </div>
        </div>
    )
}