"use client"

import React, { useEffect, useState } from "react";
import { getListProduct } from "../service/product.service";
import { interfaceProduct } from "@/interface/product.interface";
import Button from "@/component/ui/button";

const ProductList = () =>{
    const [page,setPage] = useState(1)
    const [products, setProducts] = useState<interfaceProduct[]>([])
    const [loading,setLoading] = useState(true);
    useEffect(() =>{
        getProductlist()
    },[page])
    const getProductlist = async() =>{
        try {
            const prd = await getListProduct(15,page)
            console.log(prd);
            
            if(prd.data.success){
                if(page === 1){
                    setProducts(prd.data.data)
                }else{
                    setProducts((prev) => [...prev,...prd.data.data])
                }
            }
            
        } catch (error) {
            setLoading(false)
        } finally{
            setLoading(false)
        }
    }
    const Clickprev=() =>{
        setPage(page + 1);
    }

    return(
            <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-3 border-b">Ảnh</th>
                    <th className="px-4 py-3 border-b">Tên sản phẩm</th>
                    <th className="px-4 py-3 border-b">Giá</th>
                    <th className="px-4 py-3 border-b">Giá Khuyến Mãi</th>

                    <th className="px-4 py-3 border-b">Tồn kho</th>
                    <th className="px-4 py-3 border-b">Trạng thái</th>
                    <th className="px-4 py-3 border-b text-center">Thao tác</th>
                    </tr>
                </thead>
                    {loading ? (
                    <tbody>
                        <tr>
                        <td colSpan={7} className="text-center py-4">
                            Đang tải dữ liệu...
                        </td>
                        </tr>
                    </tbody>
                    ) : products.length === 0 ? (
                    <tbody>
                        <tr>
                        <td colSpan={7} className="text-center py-4">
                            Không có sản phẩm
                        </td>
                        </tr>
                    </tbody>
                    ) : (
                    <tbody>
                        {products.map((product, i) => (
                        <tr
                            key={product.id || i}
                            className="hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-3 border-b">
                            <img
                                src={product.image || "https://via.placeholder.com/50"}
                                alt="product"
                                className="w-12 h-12 object-cover rounded"
                            />
                            </td>
                            <td className="px-4 py-3 border-b font-medium">{product.name}</td>
                            <td className="px-4 py-3 border-b text-green-600 font-semibold">
                            {product.price.toLocaleString()} đ
                            </td>
                             
                            <td className="px-4 py-3 border-b">{product.discountprice}</td>
                            <td className="px-4 py-3 border-b  font-semibold">
                            {product.quantity}
                            </td>
                            <td className="px-4 py-3 border-b">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                                {product.status === 1 ? "Đang bán" : "Ngừng bán"}
                            </span>
                            </td>
                            <td className="px-4 py-3 border-b text-center space-x-2">
                            <button className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600">
                                Sửa
                            </button>
                            <button className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
                                Xóa
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    )}

                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Hiển thị 1 - 10 / 100 sản phẩm</p>
                <div className="flex space-x-2">
                <Button  className="px-3 py-1 text-sm rounded border hover:bg-gray-100" onClick={Clickprev}>
                    xem thêm
                </Button>
                
                
                </div>
            </div>
            </div>

    )
}

export {ProductList}