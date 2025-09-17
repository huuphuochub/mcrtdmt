"use client"
import React, { useEffect, useState } from "react";
import Header from "@/component/header";
import { Getorderitembyid } from "@/service/order.service";
import { useSearchParams } from "next/navigation";
import { Getdetailallcart } from "@/service/cartservice";
// import { useUser } from "@/app/context/usercontext";
import OrderProgress from "@/app/test/page";


import FooterPage from "@/component/footer";
import Image from "next/image";
export default function OrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // sẽ ra "8" từ ?id=8
      const [orders,setOrders] = useState<any | null>(null);
      const [items,setItems] = useState<any[] | []>([]);
      const [products,setProducts] = useState<any[] |[]>([])
      const [existorder,setExistorder] = useState<boolean>(false)
    //   const {user} = useUser()
    //   const [login,setLogin] = useState<boolean>(false)
      const [loading,setLoading] = useState<boolean>(true);


    //   useEffect(() =>{
    //     if(user){
    //         setLogin(true);
    //     }
    //   },[user])
    useEffect(() =>{
        
        if(!id) return;
        
        const order = async() =>{
            const ok = await Getorderitembyid(Number(id));
            console.log(ok.data);
            if(ok.data.success){
                setOrders(ok.data.data.order)
                console.log(ok.data.data.order);
                // console.log(orders);
                setExistorder(true);
                setItems(ok.data.data.order.items)
                
                
            }else{
                setExistorder(false);
                // alert("không tìm thấy order");
                setLoading(false);

            }

        }   
        order()
    },[id])
        useEffect(() => {
        if (items.length === 0) return;

        const data = items.map((pr) => ({
            product_id: Number(pr.id_product),
            color_id: Number(pr.color_id),
            size_id: Number(pr.size_id),
            quantity: pr.quantity
        }));
        console.log(data);
        
        const fetchCartDetail = async () => {
            try {
            const product = await Getdetailallcart(data);
            setProducts(product.data.data)
            console.log(product.data.data);
            
            
            } catch (err) {
            console.error("Lỗi khi lấy chi tiết giỏ hàng:", err);
            setLoading(false);

            }finally{
                setLoading(false);
            }
        };

        fetchCartDetail();
        }, [items]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main content */}
            <div className="mt-[100px] max-w-[1200px] mx-auto p-4">
                {loading ? (
                    <div>
                     <div className="bg-white shadow rounded-2xl p-6 mb-6 animate-pulse">
                        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="h-4 w-48 bg-gray-200 rounded"></div>
                            <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-56 bg-gray-200 rounded"></div>
                            <div className="h-4 w-48 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="px-4 py-2 text-left">Tên sản phẩm</th>
                            <th className="px-4 py-2 text-left">hình</th>
                            <th className="px-4 py-2 text-left">Giá</th>
                            <th className="px-4 py-2 text-left">Size</th>
                            <th className="px-4 py-2 text-left">Màu</th>
                            <th className="px-4 py-2 text-left">Số lượng</th>
                            <th className="px-4 py-2 text-left">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">

                                        <tr className="border-t animate-pulse">
                                            <td className="h-[5px] w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"> <Image 
                                                alt=""
                                                src='https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'
                                                height={100}
                                                width={100}
                                                className=""
                                            ></Image></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            </tr>
                                            <tr className="border-t animate-pulse">
                                            <td className="h-[5px] w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"> <Image 
                                                alt=""
                                                src='https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'
                                                height={100}
                                                width={100}
                                                className=""
                                            ></Image></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            </tr>
                                            <tr className="border-t animate-pulse">
                                            <td className="h-[5px] w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"> <Image 
                                                alt=""
                                                src='https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'
                                                height={100}
                                                width={100}
                                                className=""
                                            ></Image></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded"></td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            <td className="h-4 w-24 bg-gray-200 rounded">{}</td>
                                            </tr>

                                

                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                ) : (
                    <div>
                    <div className="bg-white shadow rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
                    {existorder ? (
                        <div className="space-y-6 text-gray-700">
                        {/* Thông tin khách hàng */}

                        <div className=" bg-white p-6 rounded-2xl shadow-sm">
                            <p><span className="font-semibold">Mã đơn hàng: 
                                <span className="text-blue-500">#{orders?.ordercode}</span></span></p>
                            

                            <span className="font-semibold">Trạng thái: </span>
                                <span><OrderProgress status={orders?.status} /></span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-sm">
                            <div className="space-y-2">
                            <p><span className="font-semibold">Khách hàng: </span>{orders?.user_id}</p>
                            <p><span className="font-semibold">Email: </span>{orders?.email || "không có"}</p>
                            <p><span className="font-semibold">SĐT: </span>{orders?.phone}</p>
                            </div>
                            <div className="space-y-2">
                            <p><span className="font-semibold">Địa chỉ: </span>{orders?.address}</p>
                            
                                


                                {/* {orders?.status === 1 ? (
                                <span className="text-green-600 font-bold">Đã thanh toán</span>
                                ) : orders?.status === 0 ? (
                                <span className="text-red-600 font-bold">Chưa thanh toán</span>
                                ) : orders?.status === 2 ? (
                                <span className="text-blue-600 font-bold">Đang soạn hàng</span>
                                ) : orders?.status === 3 ? (
                                <span className="text-yellow-600 font-bold">Đang vận chuyển</span>
                                ) : (
                                <span className="text-green-700 font-bold">Đã giao xong</span>
                                )} */}
                            
                            <p><span className="font-semibold">Ghi chú: </span>{orders?.note}</p>
                            </div>
                        </div>

                        {/* Thông tin đơn hàng */}

                        </div>

                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            không tìm thấy đơn hàng
                        </div>
                    )}
                </div>

                <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                        <th className="px-4 py-2 text-left">Tên sản phẩm</th>
                        <th className="px-4 py-2 text-left">hình</th>
                        <th className="px-4 py-2 text-left">Giá</th>
                        <th className="px-4 py-2 text-left">Size</th>
                        <th className="px-4 py-2 text-left">Màu</th>
                        <th className="px-4 py-2 text-left">Số lượng</th>
                        <th className="px-4 py-2 text-left">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.length > 0 ? (
                                products.map((pr,index)=>(
                                    <tr className="border-b" key={`${pr.product}-${pr.color_id}-${pr.size_id}`}>
                                        <td className="px-4 py-2">{pr.product.name}</td>
                                        {/* <td></td> */}
                                        <td className="px-4 py-2"> <Image 
                                            alt=""
                                            src={pr.product.image}
                                            height={100}
                                            width={100}
                                            className=""
                                        ></Image></td>
                                        <td className="px-4 py-2">{pr.product.discountprice.toLocaleString()} đ</td>
                                        {pr.size ? (
                                            <td className="px-4 py-2">{pr.size.name}</td>
                                        ) : (
                                            <td className="px-4 py-2">khoong co</td>

                                        )}
                                        {pr.color ? (
                                            <td className="px-4 py-2">{pr.color.name}</td>
                                        ) : (
                                            <td className="px-4 py-2">khon co</td>

                                        )}
                                        <td className="px-4 py-2">{pr.quantity}</td>
                                        <td className="px-4 py-2">{(pr.product.discountprice * pr.quantity).toLocaleString()} đ</td>
                                        </tr>
                                ))
                         ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                Không có sản phẩm
                                </td>
                            </tr>
                         )}
                         <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                

                            </td>
                            <td><p>Tổng: {products?.reduce((total,item) =>total + (item.product.discountprice || 0 )* item.quantity,0 ).toLocaleString() }đ</p></td>
                         </tr>

                    </tbody>
                    </table>
                    
                </div>
                
                </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-sm">
                            <p><span className="font-semibold">Phí ship: </span>{orders?.ship_fee.toLocaleString()} đ</p>
                            <p>
                            <span className="font-semibold">Phương thức thanh toán: </span>
                            {orders?.payment_method === 1 ? (
                                <span className="uppercase tracking-wide">COD</span>
                            ) : orders?.payment_method === 2 ? (
                                <span className="capitalize">Chuyển khoản</span>
                            ) : (
                                <span>Khác</span>
                            )}
                            </p>
                            <p>
                            <span className="font-semibold">Tổng tiền: </span>
                            <span className="font-bold text-red-500 text-lg">{orders?.total_amount.toLocaleString()} đ</span>
                            </p>
                            <p>
                            <span className="font-semibold">Số tiền cần thanh toán: </span>
                             <span className="font-bold text-red-500 text-lg">{orders?.payable_amount.toLocaleString()} đ</span>

                            </p>
                        </div>
                </div>
                
                )}
                
            </div>

            {/* Footer */}
            <FooterPage />
            </div>

    )
}