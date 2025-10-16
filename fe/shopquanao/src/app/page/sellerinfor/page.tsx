"use client";
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
import { Images, Star, X } from "lucide-react";
import { OrderByUserWithSeller } from "@/service/order.service";
import { addCmtSeller, GetCmtSeller } from "@/service/comment.service";
import { Commentsellerinterface } from "@/interface/commentseller.interface";
import { interfaceuser } from "@/interface/user.interface";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/usercontext";

interface cmtseller extends Commentsellerinterface{
  user:interfaceuser;
}
export default function Sellerinfor() {
  const param = useSearchParams();
  const id = param.get("id");
  const {user} = useUser();
  const [seller, setSeller] = useState<SellerInterface>();
  const [product, setProduct] = useState<interfaceProduct[]>([]);
  const [listprd, setlitsprd] = useState<interfaceProduct[]>([]);
  const [loading, setloading] = useState(true);
  const [pageprd, setPageprd] = useState(1);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [isbounht, setIsbought] = useState(false);
  const [content,setContent] = useState<string | null>(null);
  const [pagecmt,setPagecmt] = useState(1);
  const [cmts,setCmts] = useState<cmtseller[]>([]);
  const [starfill,setStarfill] = useState(0)

  useEffect(() => {
    fetchprd();
  }, [id, pageprd]);

  const Clickxemthem = () => {
    setPageprd(pageprd + 1);
  };

   useEffect(() => {
    fetchcmt();
  }, [id, pagecmt,starfill]);



  const fetchcmt = async()=>{
    if(!id) return
    try {
      const cmt = await GetCmtSeller(Number(id),pagecmt,starfill);
      if(cmt.data.success){
        setCmts(cmt.data.data)
      }
      
    } catch (error) {
      
    }
  }

     const PostComment =async(e: React.FocusEvent<HTMLFormElement>) =>{
      e.preventDefault(); // chặn reload trang
      if (!id) return null;

      if(rating === 0){
        alert('vui long chon sao')
        return
      }else if(!content){
        alert('vui long nhap binhg luan')
        return
      }else{
        const formdata = new FormData()
        formdata.append('content',content);
        formdata.append('star',rating.toLocaleString())
        formdata.append('seller_id',id.toString())
         if(images && images.length>0){
        images.forEach((file:File,index:number) =>{
            formdata.append('files',file)
        })
      }
      try {
        const add = await addCmtSeller(formdata)
        console.log(add);
        
      } catch (error) {
        
      }finally{
        toast.success('da gui binh luan')
      }


      }

      

      
   }


  const fetchprd = async () => {
    if (!id) return;
    try {
      const prd = await GetAllProductSeller(Number(id), pageprd);
      // console.log(prd);
      if (prd.data.success) {
        if (pageprd === 1) {
          setlitsprd(prd.data.data);
        } else {
          setlitsprd((prev) => [...prev, ...prd.data.data]);
        }
      }
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
    CheckOrder();
  }, [id]);
  const fetchSeller = async () => {
    if (id) {
      const seller = await GetAllProductBySeller(Number(id), page, 12);
      console.log(seller.data.data.seller.data);
      if (seller.data.success) {
        setSeller(seller.data.data.seller.data);
        setProduct(seller.data.data.products.data);
      }
    }
  };
  const CheckOrder = async () => {
    if (id && user) {
      const ord = await OrderByUserWithSeller(Number(id));
      // console.log(ord);
      setIsbought(ord.data.success);
    }else{
      setIsbought(false);
    }

  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Gộp ảnh cũ + ảnh mới nhưng không quá 3
    const newImages = [...images, ...files].slice(0, 3);
    setImages(newImages);

    // Reset input để chọn lại cùng file cũng được
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const formataddress = (address: string) => {
    const adr = address.split(",");
    return adr[adr.length - 1].trim();
  };
  const formatteddate = (date: string) => {
    const dates = new Date(date);
    return `${dates.getDate().toString().padStart(2, "0")}/${(
      dates.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${dates.getFullYear()}`;
  };
  // useEffect(() =>{
  //     console.log(seller);

  // },[seller])
  // const [page,setPage] = useState(1);
  

  const categories = [
    {
      id: 1,
      name: "Nhẫn",
      image:
        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
    },
    {
      id: 2,
      name: "Vòng tay",
      image:
        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
    },
    {
      id: 3,
      name: "Dây chuyền",
      image:
        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
    },
    {
      id: 4,
      name: "Bông tai",
      image:
        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg",
    },
  ];

  const handlepage = (i: number) => {
    setPage(i);
  };

  return (
    <div>
      <Header />
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {seller?.usernameseller}
                </h1>
                <p className="text-gray-600 text-sm">
                  Ngayf tham gia :{formatteddate(seller?.createdAt || " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b pb-3">
            <div>
              <p className="text-xl font-semibold text-gray-800">
                  {seller?.ratingCount && seller.ratingCount > 0
                     ? (seller.ratingSum! / seller.ratingCount).toFixed(1)
                     : 0}</p>
              <p className="text-gray-500 text-sm">Đánh giá</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {seller?.totalproduct}
              </p>
              <p className="text-gray-500 text-sm">Sản phẩm</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {formataddress(seller?.address || "")}
              </p>
              <p className="text-gray-500 text-sm">Địa chỉ</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {seller?.follower}
              </p>
              <p className="text-gray-500 text-sm">Người theo dõi</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4 justify-center">
            <Button className="">💬 Chat ngay</Button>
            <Button className="">➕ Theo dõi</Button>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b flex gap-8 text-black font-medium">
            <button
              className={`${
                page === 1
                  ? "pb-2 border-b-2"
                  : "hover:cursor-pointer hover:text-gray-400"
              } pb-2 border-black text-black relative`}
              onClick={() => handlepage(1)}
            >
              Sản phẩm
            </button>
            <button
              className={`${
                page === 2
                  ? "pb-2 border-b-2"
                  : "hover:cursor-pointer hover:text-gray-400"
              } pb-2  border-black text-black relative`}
              onClick={() => handlepage(2)}
            >
              Đánh giá
            </button>
            <button
              className={`${
                page === 3
                  ? "pb-2 border-b-2"
                  : "hover:cursor-pointer hover:text-gray-400"
              } pb-2  border-black text-black relative`}
              onClick={() => handlepage(3)}
            >
              Giới thiệu shop
            </button>
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
            ) : page === 2 ? (
              <div className="mt-6">
                <div>
                  <form
                  onSubmit={PostComment}
                    action=""
                    className="bg-white p-4 rounded-2xl shadow-md space-y-4 w-full  relative"
                  >
                    {/* Rating */}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đánh giá
                      </label>

                      <ul className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <li
                            key={value}
                            onClick={() => setRating(value)}
                            className="hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-8 h-8 cursor-pointer ${
                                value <= rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Viết bình luận
                      </label>
                      <textarea
                       name="contentcomment"
            value={content || ''}

            onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:black resize-none"
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                      />
                    </div>
                    {isbounht ? (
                      <div>
                        {images.length > 0 && (
                          <div className="flex bg-white gap-2 ">
                            {images.map((file, index) => (
                              <div key={index} className="relative ">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="preview"
                                  className="w-20 h-20 object-cover rounded-lg border"
                                />

                                <X
                                  size={24}
                                  className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 hover:cursor-pointer"
                                  onClick={() => removeImage(index)}
                                />
                              </div>
                            ))}
                            <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg text-gray-500">
                              {images.length}/3
                            </div>
                          </div>
                        )}

                        {/* Upload */}
                        <div className="text-right flex gap-4 ">
                          <label className="cursor-pointer  p-2 rounded-full hover:bg-gray-100 relative">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleFileChange(e)}
                            />
                            <Images />
                          </label>
                          <Button variant="primary">gui binh luan</Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Upload */}
                        <div className="text-right flex gap-4 ">
                          <label className="cursor-pointer  p-2 rounded-full hover:bg-gray-100 relative">
                            <input
                              type="ok"
                              accept="image/*"
                              multiple
                              className="hidden"
                              //  onChange={(e)=>handleFileChange(e)}
                            />
                            <Images />
                          </label>
                          <Button variant="danger" type="button">
                            mua hang de danh gia
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b bg-white rounded-lg shadow-sm">
  {seller && (
    <div className="flex items-center gap-2 sm:border-r border-gray-200 sm:pr-4">
      <p className="text-5xl font-bold text-yellow-600 leading-none">
        {seller.ratingCount > 0 
          ? (seller.ratingSum / seller.ratingCount).toFixed(1)
          : "0.0"}
      </p>
      <Star size={36} className="text-yellow-500 fill-yellow-500" />
    </div>
  )}

  <div className="flex flex-wrap gap-2 sm:gap-3">
    {[
      { label: "Tất cả", value: 0 },
      { label: "5 sao", value: 5 },
      { label: "4 sao", value: 4 },
      { label: "3 sao", value: 3 },
      { label: "2 sao", value: 2 },
      { label: "1 sao", value: 1 },
    ].map((btn) => (
      <Button
        key={btn.value}
        variant={starfill === btn.value ? "primary" : "secondary"}
        onClick={() => setStarfill(btn.value)}
        className="text-sm sm:text-base px-4 py-2 transition-all"
      >
        {btn.label}
      </Button>
    ))}
  </div>
</div>

               
                <div className="space-y-6 mt-2">
                  {cmts.map((r) => (
                    <div
                      key={r.id}
                      className="border-b pb-4 last:border-none flex gap-4"
                    >
                      {/* Avatar */}
                      <img
                        src={r.user.avatarUrl}
                        alt={r.user.avatarUrl}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      {/* Nội dung */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-800">
                            {r.user.username}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {r.createdAt}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center text-yellow-500 text-sm mt-1">
                         <RatingStarscmt
                          star={r.star}
                         />
                        </div>

                        {/* Bình luận */}
                        <p className="text-gray-700 mt-2">{r.content}</p>

                        {/* Ảnh */}
                        {/* {r.imageurl.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {r.imageurl.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="review-img"
                                className="w-16 h-16 rounded-md object-cover border"
                              />
                            ))}
                          </div>
                        )} */}
                        
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button>xem thêm</Button>
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
                        <h3 className="text-gray-800 font-medium">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}

//
interface RatingStarscmtProps{
   star:number
}
export function RatingStarscmt({ star }: RatingStarscmtProps) {
  return (
    <div>
      <ul className="flex">
         {[1,2,3,4,5].map((item) =>(
            <li key={item}>
            <Star 
            size={15} 
            className={item <= star ? `text-yellow-500 fill-yellow-500` : 'text-yellow-500'}/>
         </li>
         ))}

         </ul>
    </div>
  );

}