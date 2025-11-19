"use client"

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderDetailbySeller } from "@/app/admin/service/order.service";
import { OrderInterface, OrderItemInterface } from "@/interface/order.interface";
import { interfaceuser } from "@/interface/user.interface";
import { Getdetailallcart } from "@/service/cartservice";
import { interfacesize } from "@/interface/interfacesize";
import { interfacecolor } from "@/interface/interfacecolor";
import { interfaceProduct } from "@/interface/product.interface";
import Image from "next/image";
import toast from "react-hot-toast";
import { UpdateStatusOrderItem } from "@/app/admin/service/order.service";
import Button from "@/component/ui/button";
interface DatadetailOrder extends OrderInterface{
    user:interfaceuser;
    items:OrderItemInterface[];

}
interface ProductOrderItem{
    color_id:number;
    size_id:number;
    product_id:number;
    quantity:number;
    size:interfacesize;
    color:interfacecolor;
    product:interfaceProduct;
    // seller:SellerInterface;
}
interface variants {
    product_id:number;
    quantity:number;
    color_id:number;
    size_id:number;
} 
export default function OrderDetailPage(){
         const searchParams = useSearchParams();
         const [loading,setLoading] = useState(true);
         const [orderdetails,setOrderdetails] = useState<DatadetailOrder>()
         const [products,setProducts] = useState<ProductOrderItem[]>([])
         const [status,setStatus] = useState<number>()
           const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [statusinput,setStatusinput] = useState(1);
  const [variantid,setVariantid] = useState<variants[]>([])


      const id = searchParams.get("id");
      console.log(id);
      useEffect(() =>{
        fetchorder()
      },[id])


      const handleStatusChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = Number(e.target.value);
    console.log(newStatus);
    

    // chỉ hiện input khi CHỌN Hủy, và status cũ KHÁC 3
    if (newStatus === 4 && status !== 4) {
      setShowCancelReason(true);
    } else {
      setShowCancelReason(false);
    }

    setStatusinput(newStatus);
    
    
    
  };

      const updatestatus = async() =>{
        if(!id) return
        if(statusinput === 4 && cancelReason === ''){
            alert('vui long nhap ly do')
            return;
        }
    //     console.log(status);
    // console.log(statusinput);
    try {
        const upda = await UpdateStatusOrderItem(Number(id),statusinput,variantid,cancelReason)
        console.log(upda);
        if(upda.data.success){
            toast.success('da cap nhat don hang')
        }else{
            toast.error('cap nhat that bai')
        }
        
    } catch (error) {
        toast.error('cap nhat that bai')
    }
        
      }
      const fetchorder = async() =>{
        try {
            const or = await getOrderDetailbySeller(Number(id));
            console.log(or.data.data);
            
            if(or.data.success){
                setOrderdetails(or.data.data)
            }else{
            setOrderdetails(undefined);

            }
        } catch (error) {
            
        }
      }


  function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}

      useEffect(() =>{
        console.log(orderdetails);
 
        if(!orderdetails) return

                if (orderdetails?.items.length > 0) {
      setStatus(orderdetails.items[0].status);
    }
         const data = orderdetails.items.map((pr) => ({
    product_id: Number(pr.id_product),
    color_id: Number(pr.color_id),
    size_id: Number(pr.size_id),
    quantity: pr.quantity,
  }));
//   console.log(data);
  setVariantid(data)
  
        okss(data)
      },[orderdetails])

      const okss = async(body:any) =>{
       try {
        const productRes = await Getdetailallcart(body);
             const productList: ProductOrderItem[] = productRes.data.data;
             console.log(productList);
             
             setProducts(productList)
       } catch (error) {
        setLoading(false)
       }finally{
        setLoading(false)
       }
             
        
      }


      
      

      

    return(
         <div className="p-6 space-y-6">
            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Mã đơn:</span> {orderdetails?.ordercode}</div>
                <div><span className="font-medium">Khách hàng:</span> {orderdetails?.user.username}</div>
                <div><span className="font-medium">SĐT:</span>{orderdetails?.phone}</div>
                <div><span className="font-medium">Email hóa đơn:</span> {orderdetails?.email}</div>
                <div><span className="font-medium">Email khách hàng:</span> {orderdetails?.user.email}</div>

                <div className="col-span-2"><span className="font-medium">Địa chỉ:</span> {orderdetails?.address}</div>
                <div className="col-span-2"><span className="font-medium">Ghi chú:</span> {orderdetails?.note}</div>
                <div><span className="font-medium">Ngày tạo:</span> {orderdetails?.created_at}</div>
                <div><span className="font-medium">Phương thức thanh toán:</span> {orderdetails?.payment_method}</div>
                {/* <div><span className="font-medium">Phí ship:</span> 30,000₫</div> */}
                {/* <div><span className="font-medium">Tổng tiền:</span> 530,000₫</div> */}
                </div>
            </div>

            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                    <tr>
                                                <th className="p-3 font-medium">STT</th>

                        <th className="p-3 font-medium">Tên sản phẩm</th>
                        <th className="p-3 font-medium">Hình</th>

                        <th className="p-3 font-medium">Màu</th>
                        <th className="p-3 font-medium">Size</th>
                        <th className="p-3 font-medium text-center">Số lượng</th>
                        <th className="p-3 font-medium text-right">Đơn giá</th>
                        <th className="p-3 font-medium text-right">Thành tiền</th>
                        {/* <th className="p-3 font-medium">Seller</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                            <td colSpan={7} className="p-3 text-center">Loading...</td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                            <td colSpan={7} className="p-3 text-center">Không có sản phẩm</td>
                            </tr>
                        ) : (
                            products.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                                                <td className="p-3">{index +1}</td>

                                <td className="p-3">{item.product.name}</td>
                                <td className="p-3"><Image
                                width={100}
                                height={100}
                                alt=''
                                src={item.product.image}
                                className="max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]"
                                ></Image></td>
                                {item.color ?  (
                                <td className="p-3">{item.color.name}</td>

                                ) : (
                                <td className="p-3">--</td>

                                )}
                                {item.size ?  (
                                <td className="p-3">{item.color.name}</td>

                                ) : (
                                <td className="p-3">--</td>

                                )}
                                {/* <td className="p-3">{item.size.name}</td> */}
                                <td className="p-3 text-center">{item.quantity}</td>
                                <td className="p-3 text-right">{item.product.discountprice}₫</td>
                                <td className="p-3 text-right">{item.quantity * item.product.discountprice}₫</td>
                                {/* <td className="p-3">{item.seller?.name || "N/A"}</td> */}
                            </tr>
                            ))
                        )}
                        </tbody>


                   
                </table>
                                        

                </div>
                   <table className="w-full border-t mt-4">
                    <tbody>
                        <tr>
                        <td className="p-3 font-medium text-gray-700">Tổng</td>
                        <td className="p-3 text-right">
                            {products
                                            .reduce(
                                            (total, p) =>{
                                              const  { price = 0, discountprice = 0, promo_start, promo_end } = p.product
                                              const ok = isInPromotion(promo_start,promo_end) ? discountprice : price;
                                              return total + ok * p.quantity;
                                            },
                                               
                                            0
                                            )
                                            .toLocaleString()}{" "}
                                        đ
                        </td>
                        </tr>
                        <tr>
                        <td className="p-3 font-medium text-gray-700">Chiết khấu (10%)</td>
                        <td className="p-3 text-right text-yellow-600">
                            {(products.reduce(
                                            (total, p) =>{
                                              const  { price = 0, discountprice = 0, promo_start, promo_end } = p.product
                                              const ok = isInPromotion(promo_start,promo_end) ? discountprice : price;
                                              return total + ok * p.quantity;
                                            },
                                               
                                            0
                                            ) * 0.1)
                                            .toLocaleString()}{" "}
                                        đ
                        </td>
                        </tr>
                        <tr>
                        <td className="p-3 font-semibold text-gray-800">Thu nhập</td>
                        <td className="p-3 text-right font-bold text-green-600">
                             {(products.reduce(
                                            (total, p) =>{
                                              const  { price = 0, discountprice = 0, promo_start, promo_end } = p.product
                                              const ok = isInPromotion(promo_start,promo_end) ? discountprice : price;
                                              return total + ok * p.quantity;
                                            },
                                               
                                            0
                                            ) * 0.9)
                                            .toLocaleString()}{" "}
                                        đ
                        </td>
                        </tr>
                    </tbody>
                </table>


            </div>

            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Trạng thái : 
                    <span>
                        {status === 1
                            ? "Chờ xử lý"
                            : status === 2
                            ? "Đã xác nhận"
                            : status === 3
                            ? "Hoàn thành"
                            : "Hủy"}
                        </span>
                        </h2>
                <div className="flex items-center gap-4">
                    
                {status ===1 ? (
                     <select
                    value={statusinput ?? ""} // hiển thị theo status trong state
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-xl p-2 w-60 focus:ring-2 focus:ring-blue-500 relative"
                >
                    <option value="1">Chờ xác nhận</option>

                    <option value="2">Xác nhận</option>
                    {/* <option value="2">Hoàn thành</option> */}
                    <option value="4">Hủy</option>
                </select>
                ) : status === 2 ? (
                     <select
                    value={statusinput} // hiển thị theo status trong state
                            onChange={handleStatusChange}
                    className="border border-gray-300 rounded-xl p-2 w-60 focus:ring-2 focus:ring-blue-500 relative"
                >                
                    <option value="2">Đã xác nhận</option>
                    <option value="3">Hoàn thành</option>
                    <option value="4">Hủy</option>
                </select>
                ) : status === 3 ? (
                     <span>
                        hoàn thành
                     </span>
                ) : (
                     <span>
                        Đã Hủy
                     </span>
                )}
                {showCancelReason && (
                    <input
                    type="text"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Nhập lý do hủy..."
                    className="border border-red-300 rounded-xl p-2 w-60 focus:ring-2 focus:ring-red-500 relative"
                    />
                )}
                {status === 3 || status === 4 ? (
                    <Button variant="danger" >
                    Cập nhật
                </Button>
                ) : (
                    <Button onClick={updatestatus}>
                    Cập nhật
                </Button>
                )}
                </div>
            </div>
        </div>

    )
}