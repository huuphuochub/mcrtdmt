import React from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import Image from "next/image";
import Button from "@/component/ui/button";
import { Star,Heart,EllipsisVertical } from "lucide-react";
export default function Productdetailpage(){
return(
<div>
     <div id="Particles">
            <canvas id="fluid"></canvas>
              <FluidSimulation/>
          </div>
   <Header/>
   <div className="mt-[100px] max-w-[1200px] mx-auto ">
      <div className="flex py-2 px-1">
         <p>san pham 1</p>
         &gt;
         <p>san pham 2</p>
         &gt;
         <p>san pham 3</p>
      </div>
      <div className="flex shadow">
         <div className="max-w-[500px] p-2 ">
            <div className=" relative">
               <Image
                  width={500}
                  height={500}
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
                  alt=""
                  ></Image>
               <div className="absolute top-0 right-0 bg-red-400 rounded-l-2xl">
                  <p className="text-white">-25%</p>
               </div>
            </div>
            <div  className="flex gap-5 mt-2">
               <div className="border">
                  <Image
                     width={150}
                     height={150}
                     src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
                     alt=""
                     ></Image>
               </div>
               <div className="border">
                  <Image
                     width={150}
                     height={150}
                     src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
                     alt=""
                     ></Image>
               </div>
               <div className="border">
                  <Image
                     width={150}
                     height={150}
                     src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1751188419/images__1_-removebg-preview_x6duym.png"
                     alt=""
                     ></Image>
               </div>
            </div>
         </div>
         <div className="flex-1  p-4 bg-white rounded-xl ">
            <div className="space-y-4">
               {/* Tên sản phẩm */}
               <p className="text-2xl font-bold leading-snug">
                  Chiếc áo nam nữ có thể mặc cả nam cả nữ và có size là freestyle
               </p>
               {/* Đánh giá */}
               <div className="flex items-center gap-2">
                  <p className="text-yellow-600 font-medium">3.0</p>
                  <ul className="flex gap-1">
                     <li>
                        <Star size={20} className="text-yellow-500 fill-yellow-500" />
                     </li>
                     <li>
                        <Star size={20} className="text-yellow-500 fill-yellow-500" />
                     </li>
                     <li>
                        <Star size={20} className="text-yellow-500 fill-yellow-500" />
                     </li>
                     <li>
                        <Star size={20} className="text-yellow-500" />
                     </li>
                     <li>
                        <Star size={20} className="text-yellow-500" />
                     </li>
                  </ul>
                  <p className="text-sm text-gray-600">(100 lượt đánh giá)</p>
               </div>
               {/* Giá */}
               <div className="flex items-baseline gap-4">
                  <p className="text-lg text-gray-500 line-through">140.000đ</p>
                  <p className="text-2xl text-red-600 font-bold">120.000đ</p>
               </div>
               {/* Thời gian khuyến mãi */}
               <div className="bg-yellow-100 p-3 rounded-md text-sm">
                  <p>Thời gian khuyến mãi: <span className="font-medium">17/10 - 27/10</span></p>
                  <p className="text-red-600">Còn lại: <span className="font-semibold">10 ngày 16 giờ 10 phút 6 giây</span></p>
               </div>
               {/* Chọn size/màu */}
               <div className="flex gap-4">
                  <select className="border rounded-md px-3 py-2 w-1/2">
                     <option>Chọn size</option>
                     <option>S</option>
                     <option>L</option>
                  </select>
                  <select className="border rounded-md px-3 py-2 w-1/2">
                     <option>Chọn màu</option>
                     <option>Đỏ</option>
                     <option>Trắng</option>
                  </select>
               </div>
               {/* Số lượng */}
               <div>
                  <label className="block mb-1 font-medium">Số lượng</label>
                  <div className="flex items-center border w-fit rounded-md overflow-hidden">
                     <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                     <span className="px-4">10</span>
                     <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
               </div>
               {/* Hành động */}
               <div className="flex items-center gap-4 mt-4">
                  <Button variant="primary">Them vao gio hang</Button>
                  <Button variant="secondary">mua ngay</Button>
                  <Heart className="text-red-500 hover:scale-110 transition" />
               </div>
               <div className="flex gap-4">
                  <p>2,4k da ban</p>
                  <p>109 con lai</p>
               </div>
            </div>
         </div>
      </div>
      {/* nguoi ban */}
      <div className="shadow mt-4 p-2 flex">
         {/* img */}
         <div className="flex gap-2 items-center max-w-[350px] w-[350px] border-r border-gray-300">
            <div>
               <Image
                  width={70}
                  height={70}
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
                  alt=""
                  className="rounded-full"
                  >
               </Image>
            </div>
            <div className="">
               <div className="">
                  <p className="text-xl font-semibold">ten shop</p>
                  <div className="flex items-center gap-1">
                     <ul className="flex">
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                     </ul>
                     <p className="m-0 p-0 ">3,4k</p>
                  </div>
               </div>
               <div className="flex gap-2 mt-2">
                  <Button variant="primary">chat ngay</Button>
                  <Button variant="secondary">theo gioi</Button>
               </div>
            </div>
         </div>
         {/* thong tin khac */}
         <div className="flex-1 flex items-center justify-between p-2">
            <div className="">
               <p className="mb-2">san pham: 100</p>
               <p>dia chi: HCM</p>
            </div>
            <div>
               <p className="mb-2">san pham da ban: 10k</p>
               <p>ngay tham gia: 6 thang truoc</p>
            </div>
            <div>
               <EllipsisVertical/>
            </div>
         </div>
      </div>
      {/*  mo ta*/}
      <div className="shadow mt-4 p-2">
         <div>
            <div >
               <h1 className="text-2xl font-semibold">chi tiet san pham</h1>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-y-2 bg-white p-4 rounded-md border-b border-gray-200">
               <p className="font-medium text-gray-700">Tên sản phẩm:</p>
               <p>san pham xin vcl haha haha haha</p>
               <p className="font-medium text-gray-700">Danh mục:</p>
               <p>quần áo</p>
               <p className="font-medium text-gray-700">Xuất xứ:</p>
               <p>Trung Quốc</p>
               <p className="font-medium text-gray-700">Ngày sản xuất:</p>
               <p>10/20/2020</p>
            </div>
            <div>
               <h1 className="text-2xl font-semibold">mo ta san pham</h1>
            </div>
            <div className="">
               <p className="p-4">a lkns asjkh askjdh aslkj sdljj adlha sdlaiidh iudu addihas aosijdhoi hdahd adshaiod hadh a lkns asjkh askjdh aslkj sdljj adlha sdlaiidh iudu addihas aosijdhoi hdahd adshaiod hadh a lkns asjkh askjdh aslkj sdljj adlha sdlaiidh iudu addihas aosijdhoi hdahd adshaiod hadh a lkns asjkh askjdh aslkj sdljj adlha sdlaiidh iudu addihas aosijdhoi hdahd adshaiod hadh a lkns asjkh askjdh aslkj sdljj adlha sdlaiidh iudu addihas aosijdhoi hdahd adshaiod hadh asdj </p>
            </div>
         </div>
      </div>
      {/* danh gia */}
      <div className="shadow mt-4 p-2">
         <div>
            <h1 className="text-2xl font-semibold">danh gia san pham</h1>
         </div>
         <div className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2 border-r border-gray-200 pr-2">
               <p className="text-5xl">4.7</p>
               <Star size={50} className="text-yellow-500"/>
            </div>
            <div>
               <div className="flex gap-4">
                  <Button variant="primary">tat ca</Button>
                  <Button variant="secondary">5 sao</Button>
                  <Button variant="secondary">4 sao</Button>
                  <Button variant="secondary">3 sao</Button>
                  <Button variant="secondary">2 sao</Button>
                  <Button variant="secondary">1 sao</Button>
               </div>
            </div>
         </div>
         <div className="mt-4">
            {/* user danh gia */}
            <div className="flex gap-2 border border-gray-200 mb-4">
               <div className="min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] m-2">
                <Image 
                  width={50}
                  height={50}
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
                  alt=""
                  className="rounded-full"
                  >
               </Image>
               </div>
               <div>
                  <div>
                     <p>ten nguoi danh gia</p>
                     <ul className="flex">
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                     </ul>
                  </div>
                  <div className="mt-4">
                     <p className="bg-gray-200 m-2 p-2">Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượ Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượ Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻</p>
                    <div className="flex gap-2 justify-end mr-2">
                        <p className="border-r border-gray-200 pr-2">20/20/2020</p>
                        <p className="border-r border-gray-200 pr-2">san pham da mua: ao khoac nam</p>
                        <EllipsisVertical/>
                    </div>
                  </div>
               </div>
            </div>

{/* user 2 danh gia */}

                        <div className="flex gap-2 border border-gray-200 mb-4">
               <div className="min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] m-2">
                <Image 
                  width={50}
                  height={50}
                  src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
                  alt=""
                  className="rounded-full"
                  >
               </Image>
               </div>
               <div>
                  <div>
                     <p className="font-semibold text-xl">ten nguoi danh gia</p>
                     <ul className="flex">
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                        <li>
                           <Star size={15} className="text-yellow-500 fill-yellow-500"/>
                        </li>
                     </ul>
                  </div>
                  <div className="mt-4">
                     <p className="bg-gray-200 m-2 p-2">Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượ Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượ Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻 Giao nhanh, đủ số lượng, có bảo hành đầy đủ 👍🏻</p>
                    <div className="flex gap-2 justify-end mr-2">
                        <p className="border-r border-gray-200 pr-2">20/20/2020</p>
                        <p className="border-r border-gray-200 pr-2">san pham da mua: ao khoac nam</p>
                        <EllipsisVertical/>
                    </div>
                  </div>
               </div>
            </div>

            {/* end user danh gia */}
         </div>
         <div className="w-full text-center">
            <Button variant="primary" >xem them</Button>
         </div>
      </div>
      {/* form dien binh luan */}

         <div className="shadow mt-4 p-4 bg-white rounded-md space-y-4 ">
         <h3 className="text-lg font-semibold text-gray-800 ">Viết bình luận của bạn</h3>

         {/* Tên người dùng */}
         <div>
            <ul className="flex gap-1 relative">
               <li><Star className="text-yellow-500 hover:cursor-pointer" /></li>
               <li><Star className="text-yellow-500 hover:cursor-pointer"/></li>
               <li><Star className="text-yellow-500 hover:cursor-pointer"/></li>
               <li><Star className="text-yellow-500 hover:cursor-pointer"/></li>
               <li><Star className="text-yellow-500 hover:cursor-pointer"/></li>
            </ul>
         </div>

         {/* Nội dung bình luận */}
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bình luận</label>
            <textarea
               rows={4}
               className="w-full relative border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
               placeholder="Hãy chia sẻ cảm nghĩ của bạn về sản phẩm..."
            ></textarea>
         </div>

         {/* Gửi */}
         <div className="text-right">
            <Button variant="primary">gui binh luan</Button>
         </div>
         </div>



{/* san pham tuong tu */}
   <div className="shadow mt-4 p-4">
      <div>
         <h1 className="text-2xl font-semibold">
            san pham tuong tu
         </h1>
      </div>
      <div>
                         <div className="grid py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
                             {[1, 2, 3, 4].map((_, index) => (
                             <div
                                 key={index}
                                 className=" rounded-2xl shadow hover:shadow-md transition duration-300"
                             >
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
      <div className="w-full text-end">
         <Button variant="primary">xem them</Button>
      </div>
   </div>

   </div>
   <FooterPage/>
</div>
)
}