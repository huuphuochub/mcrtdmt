import { Home, Search } from "lucide-react";
import React from "react";
import { ProductListVariant } from "@/app/admin/component/product";
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

                
            </div>
            <div >
                <ProductListVariant/>
            </div>
        </div>
    )
}