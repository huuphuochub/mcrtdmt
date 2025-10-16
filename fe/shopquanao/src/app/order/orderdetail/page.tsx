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
import { interfaceProduct } from "@/interface/product.interface";
import { OrderInterface,OrderItemInterface } from "@/interface/order.interface";
import { interfaceuser } from "@/interface/user.interface";
import { interfacesize } from "@/interface/interfacesize";
import { interfacecolor } from "@/interface/interfacecolor";
import { SellerInterface } from "@/interface/seller.interface";
import Link from "next/link";
 

interface DetailOrder extends OrderInterface{
    items:OrderItemInterface[];
    user:interfaceuser;
}
interface ProductOrderItem{
    color_id:number;
    size_id:number;
    product_id:number;
    quantity:number;
    size:interfacesize;
    color:interfacecolor;
    product:interfaceProduct;
    seller:SellerInterface;
}

interface GroupedBySeller {
  sellerId: number;
  seller: SellerInterface; // nếu bạn đã có object seller thì dùng interface riêng
  products: (ProductOrderItem )[];
  status:number;
  cancel_reason:string;
}

export default function OrderDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // sẽ ra "8" từ ?id=8
      const [orders,setOrders] = useState<DetailOrder >();
      const [items,setItems] = useState<OrderItemInterface[]>([]);
      const [products,setProducts] = useState<ProductOrderItem[] |[]>([])
      const [existorder,setExistorder] = useState<boolean>(false)
      const [sellerItem,setSellerItem] = useState<GroupedBySeller[]>([])
      const  [cancelreason,setCancelreason] = useState(false);
    //   const {user} = useUser()
    //   const [login,setLogin] = useState<boolean>(false)
      const [loading,setLoading] = useState<boolean>(true);


    //   useEffect(() =>{
    //     if(user){
    //         setLogin(true);
    //     }
    //   },[user])

            function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}

useEffect(() => {
  if (!id) return;

  const fetchOrder = async () => {
    try {
      const ok = await Getorderitembyid(Number(id));
      console.log("Getorderitembyid:", ok.data);

      if (ok.data.success) {
        const order: DetailOrder = ok.data.data.order;
        console.log(ok.data.data.order);
        
        setOrders(order);
        setExistorder(true);

        // set items (OrderItemInterface[])
        setItems(order.items);
      } else {
        setExistorder(false);
        setLoading(false);
      }
    } catch (err) {
      console.error("Lỗi khi lấy order:", err);
      setExistorder(false);
      setLoading(false);
    }
  };

  fetchOrder();
}, [id]);

const CLickOpenCancel = () =>{
  setCancelreason(!cancelreason)
}
useEffect(() => {
  if (items.length === 0) return;

  const data = items.map((pr) => ({
    product_id: Number(pr.id_product),
    color_id: Number(pr.color_id),
    size_id: Number(pr.size_id),
    quantity: pr.quantity,
  }));

  console.log("Payload gửi lên Getdetailallcart:", data);

  const fetchCartDetail = async () => {
    try {
      const productRes = await Getdetailallcart(data);
      const productList: ProductOrderItem[] = productRes.data.data;

      setProducts(productList);
      console.log("ProductOrderItem[]:", productList);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCartDetail();
}, [items]);

function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}

useEffect(() => {
  if (products.length === 0) return;

  const grouped = groupBySeller(items,products);
  console.log(grouped);
  
  setSellerItem(grouped);
}, [products]);



function groupBySeller(
  items: OrderItemInterface[],
  products: ProductOrderItem[]
): GroupedBySeller[] {
  const grouped: Record<number, GroupedBySeller> = {};

  for (const item of items) {
    // tìm product chi tiết tương ứng
    const productDetail = products.find(
      (p) =>
        p.product_id === item.id_product &&
        p.color_id === item.color_id &&
        p.size_id === item.size_id
    );

    if (!productDetail) continue;

    const sellerId = productDetail.product.idSeller;

    if (!grouped[sellerId]) {
      grouped[sellerId] = {
        sellerId,
        seller: item.seller, // bạn có thể thay bằng object seller riêng
        products: [],
        status:item.status,
        cancel_reason:item.cancel_reason,
      };
    }

    grouped[sellerId].products.push({
      ...productDetail
      // gắn thêm status từ OrderItem
    });
  }

  return Object.values(grouped);
}


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
                            

                            
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-sm">
                            <div className="space-y-2">
                            <p><span className="font-semibold">Khách hàng: </span>{orders?.user.username}</p>
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

                        <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Thông tin đơn hàng</h2>

                        {sellerItem.length > 0 &&
                            sellerItem.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl shadow-sm p-4 space-y-4"
                            >
                                {/* Trạng thái */}
                                <div className="">
                                <span className="font-semibold text-gray-700">Trạng thái:</span>
                                <div className="w-full">
                                    <OrderProgress status={item.status} CLickOpenCancel={CLickOpenCancel}/>
                                    {cancelreason && (
                                      <div className="w-full h-[200px] bg-white border mt-4 p-2">

                                            <p className="text-xl font-bold ">{item.cancel_reason}</p>
                                    </div>
                                    )}
                                    
                                </div>
                                </div>

                                {/* Cửa hàng */}
                                <Link href={`/page/sellerinfor?id=${item.seller.id}`} className="relative hover:cursor-pointer hover:bg-gray-200 hover:underline">
                                    <div className="bg-gray-50 rounded-lg p-3  flex gap-2 items-center">
                                      <Image
                                      width={50}
                                      height={50}
                                      alt=''
                                      src={item.seller.avatar}
                                      className="rounded-full"
                                      >


                                      </Image>
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-800">Cửa hàng:</span>{" "}
                                        {item.seller.usernameseller}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-800">Địa chỉ:</span>{" "}
                                        {item.seller.address}
                                    </p>
                                    </div>
                                    </div>
                                </Link>

                                {/* Bảng sản phẩm */}
                                <div className="overflow-x-auto mt-4 rounded-lg shadow">
                                  <table className="min-w-full border border-gray-200 text-sm bg-white">
                                    {/* Header */}
                                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                                      <tr>
                                        <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                                        <th className="px-4 py-3 text-center">Hình</th>
                                        <th className="px-4 py-3 text-center">Giá</th>
                                        <th className="px-4 py-3 text-center">Size</th>
                                        <th className="px-4 py-3 text-center">Màu</th>
                                        <th className="px-4 py-3 text-center">Số lượng</th>
                                        <th className="px-4 py-3 text-center">Thành tiền</th>
                                      </tr>
                                    </thead>

                                    {/* Body */}
                                    <tbody className="divide-y divide-gray-100">
                                      {item.products.length > 0 ? (
                                        item.products.map((pr, index) => {
                                          const { product, size, color, quantity } = pr;
                                          const { price, discountprice, promo_start, promo_end } = product;
                                          const isPromo = isInPromotion(promo_start, promo_end);
                                          const finalPrice = isPromo ? discountprice : price;

                                          return (
                                            <tr
                                              key={`${product.id}-${pr.color_id}-${pr.size_id}-${index}`}
                                              className="hover:bg-gray-50 transition-colors"
                                            >
                                              <td className="px-4 py-3 font-medium text-gray-800">
                                                <Link
                                                  href={`/${toSlug(product.name)}-i.${product.idSeller}.${product.id}`}
                                                  className="hover:text-blue-600 hover:underline"
                                                >
                                                  {product.name}
                                                </Link>
                                              </td>

                                              <td className="px-4 py-3 text-center">
                                                <Image
                                                  alt={product.name}
                                                  src={product.image}
                                                  height={70}
                                                  width={70}
                                                  className="rounded-md border object-cover mx-auto"
                                                />
                                              </td>

                                              <td className="px-4 py-3 text-center text-gray-700">
                                                {isPromo ? (
                                                  <div>
                                                    <span className="line-through text-gray-400 text-xs mr-1">
                                                      {price.toLocaleString()}đ
                                                    </span>
                                                    <span className="text-red-600 font-semibold">
                                                      {discountprice.toLocaleString()}đ
                                                    </span>
                                                  </div>
                                                ) : (
                                                  <span>{price.toLocaleString()}đ</span>
                                                )}
                                              </td>

                                              <td className="px-4 py-3 text-center text-gray-700">
                                                {size ? size.name : "—"}
                                              </td>

                                              <td className="px-4 py-3 text-center text-gray-700">
                                                {color ? color.name : "—"}
                                              </td>

                                              <td className="px-4 py-3 text-center text-gray-700">{quantity}</td>

                                              <td className="px-4 py-3 text-center font-semibold text-gray-900">
                                                {(finalPrice * quantity).toLocaleString()}đ
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                                            Không có sản phẩm nào trong đơn hàng
                                          </td>
                                        </tr>
                                      )}

                                      {/* Tổng tiền */}
                                      <tr className="bg-gray-50 font-semibold text-gray-900">
                                        <td colSpan={6} className="px-4 py-3 text-right">
                                          Tổng cộng:
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                          {item.products
                                            .reduce((total, p) => {
                                              const { price, discountprice, promo_start, promo_end } = p.product;
                                              const validPrice = isInPromotion(promo_start, promo_end)
                                                ? discountprice
                                                : price;
                                              return total + validPrice * p.quantity;
                                            }, 0)
                                            .toLocaleString()}{" "}
                                          đ
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                            </div>
                            ))}
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