"use client"

import React , { useState, useEffect }from "react";
import FooterPage from "@/component/footer";
import {getprovince,getDistrict, getWards} from "@/service/getlocation";
import { useCart } from "../context/cartcontext";
import { getshipfee,creatqrpayos,createorderservice, updateordermail } from "@/service/order.service";
import Button from "@/component/ui/button";
import { useUser } from "../context/usercontext";
import Link from "next/link";
import { deletecart } from "@/service/cartservice";
import { AddNotufication } from "@/service/notification.service";
import { sendmailorder } from "@/service/mail.service";


interface Province {
  PROVINCE_ID: number;
  PROVINCE_NAME: string;
}

interface District {
  DISTRICT_ID: number;
  DISTRICT_NAME: string;
}

interface Ward {
  WARDS_ID: number;
  WARDS_NAME: string;
}
export default function CheckoutPage() {
  const { cartdetail,loading } = useCart();
  const {user,Updateuser,setnote} = useUser();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [shipfees, setShipfees] = useState(0);

    const [loadingProv, setLoadingProv] = useState(false);
    const [loadingDist, setLoadingDist] = useState(false);
    const [loadingWard, setLoadingWard] = useState(false);
    const [error,setError] = useState<string | null>(null);

const [formData, setFormData] = useState<{
  username: string;
  email: string;
  address: string,
  // phone:string,
  streetAddress: string,
  provinceId: number;
  districtId: number;
  wardsId: number;
  note:string,
  phoneorder:string,
  paymentmethod:number,
}>({
  username:  '',
  email:  '',
  address:  '',
  // phone: '',
  streetAddress: "",
  provinceId: 0,
  districtId: 0,
  wardsId: 0,
  note:'',
  phoneorder:'',
  paymentmethod:0
});

useEffect(() => {
  if (user) {
    // console.log(user);
    
    setFormData((prev) => ({
      ...prev,
      username: user.username || "",
      email: user.email || "",
      phoneorder: user.phoneorder || "",
      address: user.address || "",
      provinceId: user.provinceId || 0,
      districtId: user.districtId || 0,
      wardsId: user.wardsId || 0,
    }));
  }else{
    window.location.href = '/login'
  }
}, [user]);

  type FormKeys = keyof typeof formData;

const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]:value,
        }));
    }

    const handlechangetextarea=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {name,value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]:value,
        }));
    }


useEffect(() => {
    async function loadProvinces() {
      setLoadingProv(true);
      const res = await getprovince();
      // console.log(res);
      
      const data = await res.data;
      setProvinces(data);
      setLoadingProv(false);
      
    }
    loadProvinces();
  }, []);

useEffect(() => {
  const fetchDistricts = async () => {
    if (!formData.provinceId) {
      setDistricts([]);
      return;
    }

    setLoadingDist(true);
    try {
      const distric = await getDistrict(formData.provinceId);
    //   console.log(distric);
      
      setDistricts(distric.data);
    } catch (error) {
      console.error("Lỗi lấy quận:", error);
      setDistricts([]);
    } finally {
      setLoadingDist(false);
    }
  };

  fetchDistricts();
}, [formData.provinceId]);

useEffect(() => {
  // console.log(formData.wardsId);
  
  if (formData.wardsId !== 0) {
    const sendData = async () => {
      const productdata = cartdetail.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
        color_id: item.color_id,
        size_id: item.size_id,
        weight: item.product.weigth,
        id_seller: item.product.idSeller,
        name: item.product.name,
        price: item.product.price,
        discountprice: item.product.discountprice,
      }));

      const bodydata = {
        username: formData.username,
        email: formData.email,
        address: formData.address,
        // phone: formData.phone,
        phoneorder: formData.phoneorder,
        streetAddress: formData.streetAddress,
        provinceId: formData.provinceId,
        districtId: formData.districtId,
        wardsId: formData.wardsId,
        note: formData.note,
        product: productdata,
      };
      // console.log(bodydata);
      
      try {
        const response = await ok(bodydata);
        // console.log(response);
          const allData = response.map((item:any) => item.data);
          // console.log(allData);

          const shipfee = (allData.reduce((total:any,item:any) => total + item.MONEY_TOTAL_FEE,0));
          
          setShipfees(shipfee);

        
      } catch (error) {
        console.error(error);
      }
    };

    sendData();
  }
}, [formData.wardsId,cartdetail]);


const ok = async (bodydata: any ) => {
  const response = await getshipfee(bodydata);
  return response;
};

useEffect(() => {
  const fetchWards = async () => {
    if (!formData.districtId) {
      setWards([]);
      return;
    }

    setLoadingWard(true);
    try {
      const wardsData = await getWards(formData.districtId);
    //   console.log(wardsData);
      
      setWards(wardsData.data);
    } catch (error) {
      console.error("Lỗi lấy phường:", error);
      setWards([]);
    } finally {
      setLoadingWard(false);
    }
  };

  fetchWards();
}, [formData.districtId]);

  // Hàm tạo địa chỉ đầy đủ
  const buildFullAddress = (streetAddress: string, provinceId: number, districtId: number, wardsId: number) => {
    // console.log(typeof provinceId,typeof districtId,typeof wardId);
    
    const province = provinces.find((p: Province) => p.PROVINCE_ID === provinceId);
    const district = districts.find((d: District) => d.DISTRICT_ID === districtId);
    const ward = wards.find((w: Ward) => w.WARDS_ID === wardsId);
    
    const parts = [streetAddress];
    
    if (ward) parts.push(ward.WARDS_NAME);
    if (district) parts.push(district.DISTRICT_NAME);
    if (province) parts.push(province.PROVINCE_NAME);
    // console.log(parts);

    
    return parts.filter(Boolean).join(", ");
  };
  // lưu địa chỉ khi có dữ liệu từ context

  const createorder = async() =>{
      const amount = (cartdetail.reduce((total,item) => total + item.product.discountprice * item.quantity,0) + 0) + shipfees
      const username = formData.username;
      const email = formData.email;
      // const phone = formData.phone;
      const orderCode= generateOrderCode()
      const phoneorder = formData.phoneorder;
      const note = formData.note;
      const addresss = formData.address;
      const provinceId = formData.provinceId;
      const districtId = formData.districtId;
      const wardsId = formData.wardsId;
      const paymentmethod = formData.paymentmethod;
      console.log(paymentmethod);
      

                if(!phoneorder){
            setError("Vui lòng nhập số điện thoại");
            return
          }
          else if(!addresss){
            setError("Vui lòng nhập địa chỉ");
            return
          }else if(!provinceId || !districtId || !wardsId){
            setError("Vui lòng chọn đầy đủ thông tin địa chỉ");
            return
          }else if(paymentmethod === 0){
            setError("Vui lòng chọn phuongw thuwcs thanh toans");
            return

          }else{

               const pr = cartdetail.map((item) =>{
                return{
                  name:item.product.name,
                  quantity:item.quantity,
                  price:item.product.discountprice
                }
              });

                if(!user) return
                  const update = {
                  id:user.id,
                  username,
                  email,
                  // phone,
                  address:addresss,
                  provinceId,
                  districtId,
                  wardsId,
                  phoneorder,
                  avatarUrl:user?.avatarUrl || "",
            }
            await Updateuser(update)
            setnote(note);
            // console.log(paymentmethod);
           
           
            

            if(String(paymentmethod) === "2"){
              // console.log('ck');
               const itemproduct = cartdetail.map(item =>{
              return{
                id_product:item.product.id,
                quantity:item.quantity,
                unitprice:((isInPromotion(item.product.promo_start,item.product.promo_end) ? item.product.discountprice : item.product.price) * item.quantity),
                productname:item.product.name,
                color_id:item.color_id,
                size_id:item.size_id,
                seller_id:item.product.idSeller,
                status:0

              }
            })

              const bodyorder = {
              total_amount:(cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0) + shipfees),
              phone:phoneorder,
              ordercode:orderCode,
              note:formData.note,
              address:addresss,
              status:0,
              ship_fee:shipfees,
              payment_method:paymentmethod,
              items:itemproduct,
              email:email,
              payable_amount:(cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0) + shipfees),
            }

            console.log(bodyorder);
            const orders =await createorderservice(bodyorder);




                const orderdata = {
                  orderCode: orderCode,
                  amount:amount,
                  description:"thanh toan don hang",
                  items:pr,
                  cancelUrl: "http://localhost:3000/thanhkyou",
                  returnUrl: "http://localhost:3000/thanhkyou",

                }
                const o  = await creatqrpayos(orderdata);
                const url = o.data.paymentLink.checkoutUrl;
                if(url){
                  window.location.href = url;
                }
            }else if(String(paymentmethod) === "1"){

              // console.log('tin mat');
               const itemproduct = cartdetail.map(item =>{
              return{
                id_product:item.product.id,
                quantity:item.quantity,
                unitprice:((isInPromotion(item.product.promo_start,item.product.promo_end) ? item.product.discountprice : item.product.price) * item.quantity),
                productname:item.product.name,
                color_id:item.color_id,
                size_id:item.size_id,
                seller_id:item.product.idSeller,
                status:1

              }
            })

               const bodyorder = {
              total_amount:(cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0) + shipfees),
              phone:phoneorder,
              ordercode:orderCode,
              note:formData.note,
              address:addresss,
              status:1,
              ship_fee:shipfees,
              payment_method:paymentmethod,
              items:itemproduct,
              email:email,
              payable_amount:(cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0) + shipfees),
            }
                        // console.log(bodyorder);

              const ok = confirm('xác nhận đặt đơn hàng')
              if(ok){
                const orders =await createorderservice(bodyorder);
                console.log(orders);
                const productlist = orders.data.items.map((prd:any) =>{
                  return {
                  name:prd.productname,
                  price:prd.unitprice,
                  quantity:prd.quantity,
                }
                })
                const bodyemail = {
                  customerName:user?.username,
                customerEmail:orders.data.email,
                orderDate:orders.data.created_at,
                products:productlist,
                totalPrice:orders.data.payable_amount,
                redirectUrl:`http://localhost:3000/order/orderdetail/?id=${orders.data.id}`,
                }
              const ok = await sendmailorder(bodyemail);
// console.log(ok);
              const akjdskja = {
                id:orders.data.id
              }
              await updateordermail(akjdskja);
              const databody =   splitOrderBySeller(orders.data);
              const addnoti = await AddNotufication(databody);

              
              
                

            await deletecart();
            window.location.href = `/order/orderdetail/?id=${orders.data.id}`;
              }else{
                return ;
              }


            }

            
          }

      // console.log(cartdetail);
     
        // console.log(formData.phoneorder);
        
      
      
      // 


            // console.log(username, email, phone, note, addresss, provinceId, districtId, wardsId);
            // console.log(pr);
            // console.log(user);
            // Updateuser
            


            

      
  }

  // const updateuser =()=>{

  // }
                function splitOrderBySeller(order:any) {
                // Nhóm items theo seller_id
                const grouped = order.items.reduce((acc:any, item:any) => {
                  const sid = item.seller_id;
                  if (!acc[sid]) acc[sid] = [];
                  acc[sid].push(item);
                  return acc;
                }, {});

                // Tạo danh sách order con cho từng seller
                return Object.entries(grouped).map(([seller_id, items]) => ({
                  content:'bạn có 1 đơn hàng mới',
                  title:'đơn hàng',
                  isRead:false,
                  order_id:order.id,
                  seller_id: Number(seller_id),
                }));
              }

  function generateOrderCode(): number {
  // Lấy timestamp cuối 6 chữ số + 3 chữ số random
  const timestampPart = Date.now() % 1000000; // 6 chữ số cuối của timestamp
  const randomPart = Math.floor(Math.random() * 900) + 100; // 3 chữ số random
  return Number(`${timestampPart}${randomPart}`);
}


        function isInPromotion(promo_start:string,promo_end:string) {
  const today = new Date(); // ngày hiện tại
  const start = new Date(promo_start);
  const end = new Date(promo_end);

  return today >= start && today <= end;
}
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(s => {
      const newData = {
        ...s,
        [name]: value,
        ...(name === "provinceId" ? { districtId: 0, wardsId: 0 } : {}),
        ...(name === "districtId" ? { wardsId: 0 } : {}),
      };
      
      // Tự động cập nhật địa chỉ đầy đủ khi thay đổi tên đường hoặc địa chỉ hành chính
      if (name === "streetAddress" || name === "provinceId" || name === "districtId" || name === "wardsId") {
        newData.address = buildFullAddress(
          name === "streetAddress" ? value : newData.streetAddress,
          name === "provinceId" ? Number(value) : Number(newData.provinceId),
          name === "districtId" ? Number(value) : Number(newData.districtId),
          name === "wardsId" ? Number(value) : Number(newData.wardsId)
        );
      }
      // console.log(Number(value));
      
      return newData;
    });
  }

  function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}



  return (
    <div>
      <div className="mt-[100px] max-w-[1200px] mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Thanh toán</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form thông tin khách hàng */}
          <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Thông tin khách hàng</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Họ và tên</label>
                <input
                disabled
                  name="username"  
                  onChange={handlechange}
                  value={formData.username}
                  type="text"
                  className="w-full border relative rounded-xl p-2 focus:ring focus:ring-blue-400"
                  placeholder={user?.username}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                name="phoneorder"  
                onChange={handlechange}
                value={formData.phoneorder}
                  type="text"
                  className="w-full border relative rounded-xl p-2 focus:ring focus:ring-blue-400"
                  placeholder={user?.phoneorder}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email (không bắt buộc)</label>
              <input
                name="email"
                onChange={handlechange}
                value={formData.email}
                type="email"
                className="w-full border relative rounded-xl p-2 focus:ring focus:ring-blue-400"
                placeholder={user?.email || 'email để nhận hóa đơn'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ghi chú</label>
              <textarea
                name="note"
                onChange={handlechangetextarea}
                value={formData.note}
                className="w-full border relative rounded-xl p-2 focus:ring focus:ring-blue-400"
                placeholder="Ghi chú của bạn"
              />
            </div>

            <h2 className="text-xl font-semibold border-b pb-2">Địa chỉ nhận hàng</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tỉnh / Thành phố</label>
                <select
                  name="provinceId"
                  required
                  value={formData.provinceId}
                  onChange={handleChange}
                  className="w-full relative px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    {loadingProv ? "Đang tải..." : "Chọn Tỉnh/Thành"}
                  </option>
                  {provinces.map((p: Province) => (
                    <option key={p.PROVINCE_ID} value={p.PROVINCE_ID}>
                      {p.PROVINCE_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quận</label>
                <select
                  name="districtId"
                  required
                  value={formData.districtId}
                  onChange={handleChange}
                  disabled={!formData.provinceId || loadingDist}
                  className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option>{loadingDist ? "Đang tải..." : "Chọn Quận/Huyện"}</option>
                  {districts.map((d: District) => (
                    <option key={d.DISTRICT_ID} value={d.DISTRICT_ID}>
                      {d.DISTRICT_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Xã/Phường</label>
                <select
                  name="wardsId"
                  required
                  value={formData.wardsId}
                  onChange={handleChange}
                  disabled={!formData.districtId || loadingWard}
                  className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option>{loadingWard ? "Đang tải..." : "Chọn Xã/Phường"}</option>
                  {wards.map((w: Ward) => (
                    <option key={w.WARDS_ID} value={w.WARDS_ID}>
                      {w.WARDS_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Đường / Số nhà</label>
                <input
                  name="streetAddress"
                  type="text"
                  required
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="w-full relative border rounded-xl p-2 focus:ring focus:ring-blue-400"
                  placeholder="123 Trần Duy Hưng"
                />
              </div>
              
            </div>
              <div className="flex gap-2 items-center">
                  <p className="block text-l font-medium mb-1">Địa chỉ:</p> <p className="block text-l text-red-600 font-medium mb-1">{formData.address && (<span>{formData.address}</span>)}</p>
                  
              </div>
              <span>{error && <p className="text-red-500">{error}</p>}</span>
            <h2 className="text-xl font-semibold border-b pb-2">Phương thức thanh toán</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="paymentmethod" className="accent-blue-500 relative" value={1}
                onChange={handlechange}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="paymentmethod" className="accent-blue-500 relative" value={2}
                onChange={handlechange}
                />
                Chuyển khoản ngân hàng
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="paymentmethod" className="accent-blue-500 relative" value={3}
                onChange={handlechange}
                />
                Thanh toán qua ví điện tử
              </label>
            </div>

            {cartdetail.length > 0 ? (
              <Button variant="primary" className="w-full  " onClick={createorder}>
                
              Đặt hàng
            </Button>
            ) : (
              <Button variant="danger" className="w-full  " >
                            Giỏ hàng trống
              </Button>
            )}
          </div>

          {/* Tóm tắt đơn hàng */}
{/* Tóm tắt đơn hàng */}
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-semibold border-b pb-2">
                <h2 className="">Đơn hàng của bạn</h2> <Link href='/cart' className="text-[15px]  relative hover:underline hover:cursor-pointer">xem giỏ hàng</Link>
              </div>
              
              <h2 className="text-l font-semibold ">{cartdetail.length} sản phẩm</h2>


              {/* Ví dụ sản phẩm */}
              {loading ? (
                <div className="border-b border-black">
                    loading...
              
              </div>
              ) : cartdetail.length === 0 ?(


                <div className="border-b border-black">
                    giỏ hàng của bạn đang trống !
              </div>
              ) : (
                <div className="border-b border-black">
                  {cartdetail.map((item) =>
                    {
                    const slug = `${toSlug(item.product.name)}-i.${item.product.idSeller}.${item.product.id}`;


                      return(
                    <div className="flex items-center justify-between border-b pb-2" key={item.product.id + item.size_id + item.color_id}>
                <Link className="relative hover:cursor-pointer hover:text-red-500" href={`/${slug}`}>{item.product.name} * {item.quantity}</Link>
                <div className="text-right">
                  {isInPromotion(item.product.promo_start,item.product.promo_end) ? (
                    <div>
                        <span className="line-through text-gray-400 text-sm block">{item.product.price.toLocaleString()} đ</span>
                  <span className="text-red-500 font-semibold">{item.product.discountprice.toLocaleString()} đ</span>
                    </div>
                  ) : (
                    <div>
                      {/* <span className="line-through text-gray-400 text-sm block">{item.product.price.toLocaleString()} đ</span> */}
                  <span className="text-red-500 font-semibold">{item.product.price.toLocaleString()} đ</span>
                    </div>
                  )}
                  
                </div>
              </div>
                  )
                    }
                  )}
              
              </div>
              )}
                {/* voucher */}
               <div className="border-b pb-4">
                <label className="block text-sm font-medium mb-1">Mã giảm giá</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded-xl p-2 focus:ring focus:ring-blue-400"
                    placeholder="Nhập mã..."
                  />
                  <button className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition">
                    Áp dụng
                  </button>
                </div>
              </div>


              {/* Tổng kết */}
              <div className="flex items-center justify-between border-b pb-2">
                <span>Tạm tính</span>
                <span>{cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0)
                     .toLocaleString("vi-VN")} đ</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2 text-green-600">
                <span>Tiết kiệm</span>
                <span> {cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // chỉ tính tiết kiệm nếu còn khuyến mãi
                     if (isInPromotion(promo_start, promo_end)) {
                        return total + (price - discountprice) * item.quantity;
                     }
                     return total;
                     }, 0)
                     .toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>Phí vận chuyển</span>
                <span>{shipfees.toLocaleString()} đ</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span>{(cartdetail
                     .reduce((total, item) => {
                     const { price = 0, discountprice = 0, promo_start, promo_end } = item.product;

                     // Nếu còn khuyến mãi → dùng discountprice, ngược lại dùng price
                     const effectivePrice = isInPromotion(promo_start, promo_end)
                        ? discountprice
                        : price;

                     return total + effectivePrice * item.quantity;
                     }, 0) + shipfees)
                     .toLocaleString("vi-VN")} đ</span>
              </div>
            </div>

        </div>
      </div>
      <FooterPage />
    </div>
  );
}
