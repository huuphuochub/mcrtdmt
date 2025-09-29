"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import Image from "next/image";
import Button from "@/component/ui/button";
import { GetAllProductBySeller } from "@/service/sellerservice";
import { SellerInterface } from "@/interface/seller.interface";
import { interfaceProduct } from "@/interface/product.interface";
import { GetAllProductSeller } from "@/service/product.service";
export default function Sellerinfor(){
    const param = useSearchParams();
    const id = param.get('id');
    const [seller,setSeller] = useState<SellerInterface>()
    const [product,setProduct] = useState<interfaceProduct[]>([])
    const [listprd,setlitsprd] = useState<interfaceProduct[]>([])
  const [loading,setloading] = useState(true);
  const [pageprd,setPageprd] = useState(1);
    const [page,setPage] = useState(1);


  useEffect(() =>{
fetchprd()
  },[id,pageprd])

  const Clickxemthem=()=>{
    setPageprd(pageprd + 1)
  }
  const fetchprd = async() =>{
    if(!id) return
    try {
      const prd =await GetAllProductSeller(Number(id),pageprd);
      // console.log(prd);
      if(prd.data.success){
        if(pageprd === 1){
          setlitsprd(prd.data.data)
        }else{
          setlitsprd((prev) => [...prev,...prd.data.data])
        }
      }
      
    } catch (error) {
      setloading(false)
    }finally{
      setloading(false);
    }
  }


    useEffect(() =>{
        fetchSeller();
    },[id])
    const fetchSeller = async() =>{
        if(id){
            const seller = await GetAllProductBySeller(Number(id),page,12)
            console.log(seller.data.data.seller.data);
            if(seller.data.success){
                setSeller(seller.data.data.seller.data)
                setProduct(seller.data.data.products.data)
            }
            
        }
    }

    const formataddress=(address:string)=>{
        const adr = address.split(',')
        return adr[adr.length - 1].trim();
    }
  const formatteddate = (date:string)=>{
    const dates = new Date(date);
    return  `${dates.getDate().toString().padStart(2, '0')}/${(dates.getMonth() + 1).toString().padStart(2, '0')}/${dates.getFullYear()}`
  }
    // useEffect(() =>{
    //     console.log(seller);
        
    // },[seller])
    // const [page,setPage] = useState(1);
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      avatar: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
      date: "20/09/2025",
      rating: 5,
      comment: "Sản phẩm rất đẹp, giao hàng nhanh. Shop tư vấn nhiệt tình!",
      images: ["https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg", "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"],
    },
    {
      id: 2,
      user: "Trần Thị B",
      avatar: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
      date: "18/09/2025",
      rating: 4,
      comment: "Chất lượng ổn, đóng gói cẩn thận nhưng giao hơi chậm.",
      images: [],
    },
]
  const products = [
    {
      id: 1,
      name: "Nhẫn bạc cao cấp",
      price: 250000,
      sold: 120,
      rating: 4.8,
      image: "/ring.jpg",
    },
    {
      id: 2,
      name: "Vòng tay phong thủy",
      price: 180000,
      sold: 95,
      rating: 4.6,
      image: "/bracelet.jpg",
    },
    {
      id: 3,
      name: "Dây chuyền nữ",
      price: 320000,
      sold: 210,
      rating: 5,
      image: "/necklace.jpg",
    },
    {
      id: 4,
      name: "Nhẫn bạc cao cấp",
      price: 250000,
      sold: 120,
      rating: 4.8,
      image: "/ring.jpg",
    },
    {
      id: 5,
      name: "Vòng tay phong thủy",
      price: 180000,
      sold: 95,
      rating: 4.6,
      image: "/bracelet.jpg",
    },
    {
      id: 6,
      name: "Dây chuyền nữ",
      price: 320000,
      sold: 210,
      rating: 5,
      image: "/necklace.jpg",
    },
    {
      id: 7,
      name: "Nhẫn bạc cao cấp",
      price: 250000,
      sold: 120,
      rating: 4.8,
      image: "/ring.jpg",
    },
    {
      id: 8,
      name: "Vòng tay phong thủy",
      price: 180000,
      sold: 95,
      rating: 4.6,
      image: "/bracelet.jpg",
    },
    {
      id: 9,
      name: "Dây chuyền nữ",
      price: 320000,
      sold: 210,
      rating: 5,
      image: "/necklace.jpg",
    },
    {
      id: 10,
      name: "Nhẫn bạc cao cấp",
      price: 250000,
      sold: 120,
      rating: 4.8,
      image: "/ring.jpg",
    },
    {
      id: 11,
      name: "Vòng tay phong thủy",
      price: 180000,
      sold: 95,
      rating: 4.6,
      image: "/bracelet.jpg",
    },
    {
      id: 12,
      name: "Dây chuyền nữ",
      price: 320000,
      sold: 210,
      rating: 5,
      image: "/necklace.jpg",
    },
  ];

  const categories = [
    { id: 1, name: "Nhẫn", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg" },
    { id: 2, name: "Vòng tay", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg" },
    { id: 3, name: "Dây chuyền", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg" },
    { id: 4, name: "Bông tai", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg" },
  ];

  const handlepage=(i:number) =>{
    setPage(i);
  }

    return(
        <div>
            <Header/>
            <div className="mt-[100px] max-w-[1200px] mx-auto ">
                     <div className="w-full mx-auto bg-white rounded-xl shadow p-6">
                        {/* Banner */}
                        <div className="h-40 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl relative">
                            <div className="absolute -bottom-12 left-6 flex items-center gap-4">
                            <Image
                                width={96}
                                height={96}
                                
                                
                                src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                alt="Shop Avatar"
                                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{seller?.usernameseller}</h1>
                                <p className="text-gray-600 text-sm">Ngayf tham gia :{formatteddate(seller?.createdAt || " ")}</p>
                            </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b pb-3">
                            <div>
                            <p className="text-xl font-semibold text-gray-800">4.8/5</p>
                            <p className="text-gray-500 text-sm">Đánh giá</p>
                            </div>
                            <div>
                            <p className="text-xl font-semibold text-gray-800">{seller?.totalproduct}</p>
                            <p className="text-gray-500 text-sm">Sản phẩm</p>
                            </div>
                            <div>
                            <p className="text-xl font-semibold text-gray-800">{formataddress(seller?.address || '')}</p>
                            <p className="text-gray-500 text-sm">Địa chỉ</p>
                            </div>
                            <div>
                            <p className="text-xl font-semibold text-gray-800">{seller?.follower}</p>
                            <p className="text-gray-500 text-sm">Người theo dõi</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-4 justify-center">
                            <Button className="">
                            💬 Chat ngay
                            </Button>
                            <Button className="">
                            ➕ Theo dõi
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="mt-8 border-b flex gap-8 text-black font-medium">
                            <button className={`${page ===1 ? "pb-2 border-b-2" : "hover:cursor-pointer hover:text-gray-400"} pb-2 border-black text-black relative`} onClick={() =>handlepage(1)}>
                            Sản phẩm
                            </button>
                            <button className={`${page ===2 ? "pb-2 border-b-2" : "hover:cursor-pointer hover:text-gray-400"} pb-2  border-black text-black relative`} onClick={() =>handlepage(2)}>Đánh giá</button>
                            <button className={`${page ===3 ? "pb-2 border-b-2" : "hover:cursor-pointer hover:text-gray-400"} pb-2  border-black text-black relative`} onClick={() =>handlepage(3)}>Giới thiệu shop</button>
                        </div>

                        {/* Content */}
                        <div className="mt-6">
                            {/* render theo tab đang chọn */}
                            {page === 1 ? (
                                <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    🛍️ Sản phẩm của shop
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {listprd.map((product) => (
                                    <div
                                        key={product.id}
                                        className="border rounded-xl shadow-sm hover:shadow-md transition bg-white relative hover:cursor-pointer"
                                    >
                                        <Image
                                        src={product.image}
                                        width={100}
                                        height={100}
                                        alt={product.name}
                                        className="w-full h-40 object-cover rounded-t-xl"
                                        ></Image>
                                        <div className="p-3 space-y-1">
                                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-red-600 font-semibold">
                                            {product.price.toLocaleString()}đ
                                        </p>
                                        <div className="flex items-center text-xs text-gray-500 gap-2">
                                            <span>⭐ {product.averageRating}</span>
                                            <span>• Đã bán {product.totalsold}</span>
                                        </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="w-full flex justify-end mt-4">
                                    <Button onClick={Clickxemthem}>xem thêm</Button>
                                </div>
                            </div>
                            ) : page ===2 ? (
                                 <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        ⭐ Đánh giá của khách hàng
                                    </h2>
                                    <div className="space-y-6">
                                        {reviews.map((r) => (
                                        <div
                                            key={r.id}
                                            className="border-b pb-4 last:border-none flex gap-4"
                                        >
                                            {/* Avatar */}
                                            <img
                                            src={r.avatar}
                                            alt={r.user}
                                            className="w-12 h-12 rounded-full object-cover"
                                            />

                                            {/* Nội dung */}
                                            <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium text-gray-800">{r.user}</h3>
                                                <span className="text-sm text-gray-500">{r.date}</span>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center text-yellow-500 text-sm mt-1">
                                                {"⭐".repeat(r.rating)}
                                                {"☆".repeat(5 - r.rating)}
                                            </div>

                                            {/* Bình luận */}
                                            <p className="text-gray-700 mt-2">{r.comment}</p>

                                            {/* Ảnh */}
                                            {r.images.length > 0 && (
                                                <div className="flex gap-2 mt-3">
                                                {r.images.map((img, idx) => (
                                                    <img
                                                    key={idx}
                                                    src={img}
                                                    alt="review-img"
                                                    className="w-16 h-16 rounded-md object-cover border"
                                                    />
                                                ))}
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    </div>
                            ) : (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    📂 Danh mục sản phẩm
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                                    >
                                        <div className="w-full h-32 overflow-hidden">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                                        />
                                        </div>
                                        <div className="p-2 text-center bg-white">
                                        <h3 className="text-gray-800 font-medium">{cat.name}</h3>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            )}                       
                                
                            </div>
                        </div>

            </div>

            <FooterPage/>
        </div>
    )
}

// 
