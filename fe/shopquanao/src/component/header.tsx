"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Cartheader from "./cart/cart";
import { Getuserbyid,Logout } from "@/service/userservice";
import { User,ShoppingCart,Heart,Search,ClockFading,X } from 'lucide-react';
export default function Header(){
const [isOpen, setIsOpen] = useState(false);
const [isOpenCartheader, setIsopencartheader] = useState(false);
const [isOpenprofile, setIsopenprofile] = useState(false);

const wrapperRef = useRef<HTMLDivElement>
(null);
interface Userheader  {
   username:string,
   image:string,
   avatarUrl:string,
}
const [users, setUsers] = useState<Userheader | null>(null);
useEffect(() =>{
   Getuser()
},[])
useEffect(() => {
  if (users) {
   //  console.log(users);
  }
}, [users]);
const Getuser = async() =>{
   const user = await Getuserbyid()
   // console.log(user);
   
   if( user.success){
      setUsers(user.data[0]);
      // console.log(user.data);

      // console.log(users);

      
   }
}
const logoutsubmit = async() =>{
   Logout();
   window.location.href="/login"
}
const Opencart =()=>{
    setIsopencartheader(!isOpenCartheader);
}
const Openprofile =()=>{
    setIsopenprofile(!isOpenprofile);
}
useEffect(() => {
function handleClickOutside(event: MouseEvent) {
if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
setIsOpen(false);
}
}
document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
return(
<header className="fixed top-0 z-10 w-full bg-white ">
   <div className="flex justify-between items-center max-w-[1200px] mx-auto">
      <div className="flex items-center gap-4">
         <div className="logo hover:cursor-pointer">
            <Image 
               width={100}
               height={100}
               src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748839286/snapedit_1748839238470_wz5cdf.png"
               alt=""
               ></Image>
         </div>
         <div>
            <ul className="flex gap-6 text-2xl font-semibold font-poppins ">
               <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                  <a href="http://localhost:3000">Trang chủ</a>
               </li>
               <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                  <a href="http://localhost:3000/Shop">Cửa hàng</a>
               </li>
               <div className="relative group inline-block py-[20px]">
                  <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300">
                  <a href="http://localhost:3000/Category">Danh mục</a>
                  </li>
                  <div className="fixed left-0 top-[80px] w-lvw  h-[300px] bg-white z-50 border  hidden group-hover:block">
                     <ul className="flex flex-wrap gap-4 p-4">
                        {Array(12)
                        .fill("quần áo")
                        .map((text, i) => (
                        <li key={i} className="w-[120px] text-gray-700 hover:text-black cursor-pointer">
                           <p>{text}</p>
                        </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <li className="hover:cursor-pointer hover:text-gray-400 transition-colors duration-300 py-[20px]">
                  <a href="http://localhost:3000/sellerregistration">Đăng kí bán hàng</a>
               </li>
            </ul>
         </div>
      </div>
      <div className="flex gap-4 text-2xl max-w-[400px]">
         <div ref={wrapperRef} className="relative w-full max-w-md">
            <input
               type="text"
               onFocus={() => setIsOpen(true)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-4 pr-10  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer" />
            {isOpen && (
            <div className="absolute w-full h-[600px] overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg mt-2 z-50">

                  <p className=" sticky top-0 p-3 font-semibold text-gray-700 border-b border-gray-200 z-10 bg-white">
                     Lịch sử tìm kiếm
                  </p>
               {[...Array(112)].map((_, i) => (
               <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition"
                  >
                  <div className="flex items-center gap-2 cursor-pointer text-gray-700">
                     <ClockFading />
                     <p className="text-xl">quần nam đẹp {i + 1}</p>
                  </div>
                  <X className="cursor-pointer text-gray-400 hover:text-red-500 transition" />
               </div>
               ))}
            </div>
            )}
         </div>
         <div className="relative">
            <ShoppingCart className="size-7 hover:cursor-pointer" onClick={()=>Opencart()}/>
            {isOpenCartheader && (
                <Cartheader  onClose={Opencart}/>
            )}
         </div>
         <div>
            <Heart className="size-7 hover:cursor-pointer"/>
         </div>
         <div>
            {/* <User className="size-7 hover:cursor-pointer"/> */}
            {users ? (
               <div className="relative">
                  <Image 
                     height={55}
                     width={55}
                     src={users.avatarUrl}
                     alt="avatar"
                     className="rounded-full"
                     onClick={() => Openprofile()}
                  />
                  {isOpenprofile && (
                     <div className="absolute w-[300px] h-[600px] bg-white">
                        <div onClick={() => logoutsubmit()}>
                           dang xuat
                        </div>
                  </div>
                  )}
               </div>
               ) : (
               <a href="http://localhost:3000/login"><User className="size-7 hover:cursor-pointer" /></a>
               )}

               

            
         </div>
      </div>
   </div>
</header>
)
}