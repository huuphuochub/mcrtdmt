"use client"

import React,{useEffect,useMemo,useState} from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import Image from "next/image";
import Button from "@/component/ui/button";
import { interfaceProduct } from "@/interface/product.interface";
import { Star,Heart,EllipsisVertical } from "lucide-react";
import { interfaceSeller } from "@/interface/user.interface";
import { interfaceuser } from "@/interface/user.interface";
import { interfacesubimg } from "@/interface/subimg.interface";
import { Category,Subcategory } from "@/interface/category.interface";
// import { getproductdetail } from "@/service/product.service";
import { getsizebyidproduct } from "@/service/product.service";
import { interfacecolor } from "@/interface/interfacecolor";
import { interfacesize } from "@/interface/interfacesize";
import { addcart } from "@/service/cartservice";
import { Getuserbyid } from "@/service/userservice";
import { useCart } from "@/app/context/cartcontext";
import { useUser } from "@/app/context/usercontext";
import { CheckHasBought } from "@/service/order.service";
import { addComment } from "@/service/comment.service";
   import { GetallCommentByProduct } from "@/service/comment.service";
   import { Comment } from "@/interface/comment.interface";
import toast from "react-hot-toast";
import { ImagePreview } from "@/components/ui/enlargeimg";

// import { interfacesize } from "@/interface/interfacesize";
interface ProductResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

interface ProductDetailData {
   product:{
      success:boolean,
      data:interfaceProduct | null,
   }
   images:{
      success:boolean,
      data:interfacesubimg[]
   };
   category:{
      success:boolean,
      data:Category | null,  
   }
   subcategory:{
      success:boolean,

      data:Subcategory | null,
   }
   countlproduct:number,

   seller:{
      success:boolean,
      data:interfaceSeller | null,
   }

}
interface ProductDetailProps {
   itemid: number;
  shopid: number;
  productprop: ProductResponse<ProductDetailData>;
}

interface RatingStarsProps {
  ratingSum: number;
  ratingCount: number;
}
// interface res {
//    data:[],
//    message:string,
//    success:boolean,
//    code:number
// }
// interface productprop {
//    success:Bollen;
//    data:Object

interface ResponseSizeItem {
  color: interfacecolor;
  size: interfacesize;
  quantity: number;
  id: number;
}
interface commentdetail extends Comment{
   user:interfaceuser;
}
type ResponseSize = ResponseSizeItem[]; 




// }
// interface ResponseSize {
//   data: Array<{
//     id: number;
//     color: interfacecolor;
//     size: interfacesize;
//     quantity: number;
//   }>,
//   status:number
// }

export default function Productdetailpage({productprop} :ProductDetailProps){
   const {  addToCart } = useCart();
   
   const [product,setProduct] = useState<interfaceProduct | null >(null)
   const [category,setCategory] = useState<Category | null >(null);
   const [subcategory,setSubcategory] = useState<Subcategory |null>(null);
   const [subimg, setSubimg] = useState<interfacesubimg[] | null>(null);
   // const [userseler,setUserseller] = useState<interfaceuser | null>(null);
   const [seller,setSeller] = useState<interfaceSeller | null>(null);
const [responsesize, setResponsesize] = useState<ResponseSize>([]);
   const [arrsize,setArrsize] = useState<interfacesize[]>([])
   const [arrcolor,setArrColor] = useState<interfacecolor[]>([])
   const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
   const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
   const [quantityitem,setQuantityitem] = useState<number | 1>(1);
   const [countlproduct,setCountlproduct] = useState<number|0>(0);
   const {user} =useUser();
   const [hasbought,setHasbought] = useState(false);
   const [rating,setRating] = useState(0);
   const [contencomment,setContetncomment] = useState<string | null >(null)
   const [pagecomment,setPagecomment] = useState(1);
   const [cmts,setCmts] = useState<commentdetail[] >([])
   const [loadingcmt,setLoadingcmt] = useState(true);
   // const average = ratingCount > 0 ? ratingSum / ratingCount : 0;



   const GetallCmt = async() =>{
      if(!product) return null;
      console.log(pagecomment);
      
      try {
         const cmt = await GetallCommentByProduct(product.id,pagecomment)
         console.log(cmt.data.data);
         
         if(cmt){
            setCmts(cmt.data.data);
         }
      } catch (error) {
         setLoadingcmt(false);
      } finally{
         setLoadingcmt(false);
      }

   }
      const PageCmt = async () => {
      if (!product) return null;

      const nextPage = pagecomment + 1;
      setPagecomment(nextPage);

      try {
         const cmt = await GetallCommentByProduct(product.id, nextPage);
         if (cmt) {
            setCmts(prev => [...prev, ...cmt.data.data]);
         }
      } catch (error) {
         setLoadingcmt(false);
      } finally {
         setLoadingcmt(false);
      }
      };


   useEffect(() =>{
      GetallCmt();
   },[product])
  
    // console.log(itemid,shopid);
   // console.log(productprop);
   // tính số ngày
   // const ddate = (date:Date)=>{
   //    const pasdate:Date = new Date(date);
   //    const now :Date= new Date();
   //    const s:number = now.getTime() - pasdate.getTime();
   //    const day:number = Math.floor(s/(1000*60*60*24))
   //    return day

   // }

   const CART_KEY = "cart";

   interface CartItem {
   product_id: number;
   color_id: string | number;
   size_id: string | number;
   quantity: number;
   }



      function saveCartToLocalStorage(item: CartItem) {
  // Lấy cart hiện tại từ localStorage (nếu có)
         const storedCart = localStorage.getItem(CART_KEY);
         const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

         // Kiểm tra sản phẩm cùng id_product + id_size + id_color đã có chưa
         const existingItem = cart.find(
            (cartItem) =>
               cartItem.product_id === item.product_id &&
               cartItem.size_id === item.size_id &&
               cartItem.color_id === item.color_id
         );

         if (existingItem) {
            // Nếu có rồi thì cộng dồn quantity
            existingItem.quantity += item.quantity;
         } else {
            // Nếu chưa có thì push thêm
            cart.push(item);
         }

         // Lưu lại vào localStorage
         localStorage.setItem(CART_KEY, JSON.stringify(cart));
         }
   useEffect(() => {
  
    if (productprop.success && productprop.data?.product.success) {
      setProduct(productprop.data.product.data);
      setCategory(productprop.data.category.data);
      setSubcategory(productprop.data.subcategory.data)
      setCountlproduct(productprop.data.countlproduct)
      setSubimg(productprop.data.images.data);
      setSeller(productprop.data.seller.data);
      console.log(productprop.data.product.data?.id);
      
  
    }
  }, [productprop]); 
         useEffect(()=>{
               if(product){
                  size(product.id)
                  checkhasbought(product.id)
               }
         },[product])

      const checkhasbought = async(product_id:number)=>{
         const hasbought = await CheckHasBought(product_id);
         console.log(hasbought);
         if(hasbought.data.data){
            setHasbought(true)
         }else{
            setHasbought(false)
         }
         
      }
         
  const size =async(id:number) =>{
   // console.log(id);
   
      const sizes =  await  getsizebyidproduct(id)
      
      if(sizes.data.success === true){
               setResponsesize(sizes.data.data)

      }else{
         setResponsesize([]);

         setSelectedColorId(1000)
         setSelectedSizeId(1000)
         
         
         
      }

      
  } 
  function getcolorbysize(sizeId:number){
         return Array.from(
            new Map(
               responsesize.filter(item=>item.size.id === sizeId)
               .map(item=> [ item.color.id,item.color])
            ).values()
         )
  }
  const handlechangesize =(e:number) =>{
   setSelectedSizeId(e);
      const ARcolor = getcolorbysize(e)
      // console.log(ARcolor);
      setArrColor(ARcolor);
      
  }
  const handleAddToCart =async() =>{
   // console.log(product?.id);
   // console.log(selectedColorId);
   // console.log(selectedSizeId);
   // console.log(quantityitem);
   
   const add = await Getuserbyid();

   // console.log(add.data);
   if(product && selectedSizeId && selectedColorId){
       if(add.data.code === 404){
      saveCartToLocalStorage({
         product_id:product.id,
         size_id:selectedSizeId!,
         color_id:selectedColorId!,
         quantity:quantityitem,

      })
      addToCart({
         product_id:product.id,
         size_id:selectedSizeId!,
         color_id:selectedColorId!,
         quantity:quantityitem,
      })
      // alert("chua dang nhap")
   }else{
      const add = {
            product_id:product.id,
            size_id:selectedSizeId,
            color_id:selectedColorId,
            quantity:quantityitem,
      }
      addToCart(add)
      // alert(quantityitem)
      await addcart(add);
      // console.log(adds);
      
   }
   }
   
   
   
  }
  const handleplusitem = () =>{
   setQuantityitem(quantityitem + 1);
  }
  const handleminusitem = () =>{
   setQuantityitem(quantityitem - 1)
  }
  const handleerrminusitem =() =>{
   alert("k đủ số lượng size và màu, bui lòng chọn size hoặc màu khác")
  }

  const formatVN = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

  const selectedQuantity = useMemo(() => {
  if (selectedSizeId && selectedSizeId !== 1000 && selectedColorId && selectedColorId !== 1000) {
    const found = responsesize.find(
      item => item.size.id === selectedSizeId && item.color.id === selectedColorId
    );
    return found?.quantity || 0;
  }else if(responsesize.length===0 && product){
   return product?.quantity
  }
  return 0;
}, [selectedSizeId, selectedColorId, responsesize]);


//   function getquantityproduct(sizeId:number,colorID:number){
//          const quantity = Array.from(
//             new Map(
//                responsesize.filter(item => item.size.id === sizeId)
//                .filter(item => item.color.id === colorID)
//             ).values()
//          )
//          console.log(quantity);
         
//   }
  useEffect(() =>{
   if(responsesize?.length >=1){
      // console.log(responsesize);
      const arsize = Array.from(
         new Map(responsesize.map(item =>[item.size.id,item.size])).values()
      );
      setArrsize(arsize);
      // console.log("size:",arsize);
      
      
  }
  },[responsesize])
   if(productprop.success === false){
      return <div>{productprop.message ?? "Không tìm thấy sản phẩm"}</div>
   }

   const LoginComent = () =>{
      window.location.href='/login'
   }
   
   const PostComment =async(e: React.FocusEvent<HTMLFormElement>) =>{
      e.preventDefault(); // chặn reload trang
      if (!product) return null;

      console.log(rating);
      console.log(contencomment);
      if(rating === 0){
         alert('vui lòng chọn sao')
         return
      }else if(!contencomment){
         alert('vui lòng nhập bình luận')
         return
      }else{
      const body = {
         star:rating,
         content:contencomment,
         product_id:product?.id
      }

      try {
         const post = await addComment(body);
      if(post.data.data.success){
         toast.success('đã gửi bình luận')
      }else{
         toast.error('lỗi khi gửi')
      }
      } catch (error) {
         
      }
      

      }
      

      
      
   }
return(
<div>
     {/* <div id="Particles">
            <canvas id="fluid"></canvas>
              <FluidSimulation/>
          </div> */}
   <Header/>
   <div className="mt-[100px] max-w-[1200px] mx-auto ">
      <div className="flex py-2 px-1 ">
         <p>trang chu</p>
         &gt;
         <p>{category?.name}</p>
         &gt;
         <p>{subcategory?.name}</p>
      </div>
      <div className="flex shadow">
         <div className="max-w-[500px] p-2 ">
            <div className=" relative">
               <ImagePreview
                  src={product?.image || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                  alt={product?.name || 'product'}
                  width={500}
                  height={500}
                  className="max-h-[500px] min-h-[500px] hover:cursor-pointer"

                  />

               {/* <Image
                  width={500}
                  height={500}
                  src={product?.image || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                  alt={product?.name || 'product'}
                  className="max-h-[500px]"
                  ></Image> */}
               <div className="absolute top-0 right-0 bg-red-400 rounded-l-2xl">
                  <p className="text-white">-25%</p>
               </div>
            </div>
            <div  className="flex gap-5 mt-2">
               {subimg ? subimg.map((urlimg,index) =>(
                  <div className="border relative" key={urlimg.url || index}>
                     <ImagePreview
                     src={urlimg?.url || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                     alt=""
                  width={150}
                  height={150}
                  className="max-h-[150px] hover:cursor-pointer"

                  />
                  {/* <Image
                     width={150}
                     height={150}
                     src={urlimg?.url || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                     alt=""
                     className="max-h-[150px]"
                     ></Image> */}
               </div>
               )) : (
                  <div className="flex gap-5">
                        <div className="border relative">
                  <Image
                     width={150}
                     height={150}
                     src={ 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                     alt=""
                     className="max-h-[150px]"
                     ></Image>
               </div>
               <div className="border relative">
                  <Image
                     width={150}
                     height={150}
                     src={ 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                     alt=""
                     className="max-h-[150px]"
                     ></Image>
               </div>
               <div className="border relative">
                  <Image
                     width={150}
                     height={150}
                     src={ 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                     alt=""
                     className="max-h-[150px]"
                     ></Image>
               </div>
                  </div>
               
               )}
            </div>
         </div>
         <div className="flex-1 p-4 bg-white rounded-xl">
  <div className="space-y-4">
    {/* Tên sản phẩm */}
    {!product ? (
      <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
    ) : (
      <p className="text-2xl font-bold leading-snug">{product.name}</p>
    )}

    {/* Đánh giá */}
    {!product ? (
      <div className="flex items-center gap-2">
        <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ) : (
      <RatingStars
         ratingSum={product.ratingSum}
         ratingCount={product.ratingCount}
         />
    )}

    {/* Giá */}
    {!product ? (
      <div className="flex gap-4">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ) : (
      <div className="flex items-baseline gap-4">
        <p className="text-lg text-gray-500 line-through">{formatVN(product.price)} đ</p>
        <p className="text-2xl text-red-600 font-bold">{formatVN(product.discountprice)} đ</p>
      </div>
    )}

    {/* Thời gian khuyến mãi */}
    {!product ? (
      <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
    ) : (
      <div className="bg-yellow-100 p-3 rounded-md text-sm">
        <p>Thời gian khuyến mãi: <span className="font-medium">17/10 - 27/10</span></p>
        <p className="text-red-600">Còn lại: <span className="font-semibold">10 ngày 16 giờ 10 phút 6 giây</span></p>
      </div>
    )}

    {/* Select size/màu */}
    {!product ? (
      <div className="flex gap-4">
        <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ) : (
      <div className="flex gap-4">
        {/* Select size */}
        {responsesize.length>0 ? (
         <select
          className="border rounded-md relative px-3 py-2 w-1/2"
          onChange={(e) => handlechangesize(Number(e.target.value))}
        >
          <option>Chọn size</option>
          {arrsize.map((size) => (
            <option key={size.id} value={size.id}>{size.name}</option>
          ))}
        </select>
        ) : (
         <div></div>
        )}
        {/* Select màu */}
        {responsesize.length>0 ? (
         <select
          className="border rounded-md px-3 py-2 relative w-1/2"
          onChange={(e) => setSelectedColorId(Number(e.target.value))}
        >
          <option>Chọn màu</option>
          {arrcolor.length > 0
            ? arrcolor.map((color) => (
                <option key={color.id} value={color.id}>{color.name}</option>
              ))
            : <option value="">vui lòng chọn size</option>}
        </select>
        ) : (
         <div></div>
        )}
      </div>
    )}

    {/* Số lượng */}
    {!product ? (
      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
    ) : (
      <div className="flex gap-2">
         <div>
            <label className="block mb-1 font-medium">Số lượng</label>
            <div className="flex items-center border w-fit rounded-md overflow-hidden">
               {quantityitem >=2 ? (
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-pointer" onClick={handleminusitem}>-</button>
               ) : (
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-not-allowed" >-</button>
               )}
               <span className="px-4">{quantityitem}</span>
               {quantityitem >= selectedQuantity ? (
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-not-allowed" onClick={handleerrminusitem}>+</button>
               ) : (
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-pointer" onClick={handleplusitem}>+</button>
               )}
            </div>
         </div>
         <div>
            <label className="block mb-1 font-medium">Tồn kho</label>
            <div className="flex items-center border w-fit rounded-md overflow-hidden">
              
               <span className="px-4 py-1">{product.quantity }</span>
               
            </div>
         </div>
               {responsesize.length>0 && (
                           <div>
            <label className="block mb-1 font-medium">Số lượng size và màu</label>
            <div className="flex items-center border w-fit rounded-md overflow-hidden">
              
               <span className="px-4 py-1">{selectedQuantity }</span>
               
            </div>
         </div>
               )}
      </div>
      
    )}

 {!product ? (
      <div className="flex gap-4">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ) : ( 

      <div className="flex gap-2 items-center">
         <span className="">Tổng:</span>
         <span className="text-red-600 text-2xl font-bold">{formatVN(product.discountprice * quantityitem)} đ</span>
      </div>
    )}



    {/* Hành động */}
    {!product ? (
      <div className="flex gap-4">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ) : (
      <div className="flex items-center gap-4 mt-4">
        {!selectedColorId || !selectedSizeId ? (
          <Button variant="danger">Chọn size và màu</Button>
        ) : selectedQuantity < 1 ? (
          <Button variant="danger">Hết hàng</Button>
        ) : (
          <Button variant="primary"  onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
          
        )}
        <Button variant="secondary">Mua ngay</Button>
        <Heart className="text-red-500 hover:scale-110 transition" />
        
      </div>
    )}
    <div>Hãy đăng nhập để có thể truy cập giỏ hàng bất cứ đâu</div>
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
                  src={seller?.avatar || 'https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg'}
                  alt=""
                  className="rounded-full"
                  >
               </Image>
            </div>
            <div className="">
               <div className="">
                  <p className="text-xl font-semibold">{seller?.usernameseller}</p>
                  <div className="flex items-center gap-1">
                        <p>
                        {seller?.ratingCount && seller.ratingCount > 0
                           ? (seller.ratingSum! / seller.ratingCount).toFixed(1) // làm tròn 1 chữ số
                           : 0}
                        </p>

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
                     <p className="m-0 p-0 ">{seller?.ratingCount} lượt đánh giá</p>
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
               <p className="mb-2">san pham: {countlproduct}</p>
               <p>dia chi: {seller?.address}</p>
            </div>
            <div>
               <p className="mb-2">san pham da ban: {seller?.soldCount}</p>
               <p>ngay tham gia: ngay truoc</p>
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
               <p>{product?.name}</p>
               <p className="font-medium text-gray-700">Danh mục:</p>
               <p>{category?.name}</p>
               <p className="font-medium text-gray-700">Xuất xứ:</p>
               <p>Trung Quốc</p>
               <p className="font-medium text-gray-700">Ngày sản xuất:</p>
               <p>{}</p>
            </div>
            <div>
               <h1 className="text-2xl font-semibold">mo ta san pham</h1>
            </div>
            <div className="">
               <p className="p-4">{product?.describe} </p>
            </div>
         </div>
      </div>



      {/* form dien binh luan */}
         <form onSubmit={PostComment}>
         <div className="shadow mt-4 p-4 bg-white rounded-md space-y-4 ">
         <h3 className="text-lg font-semibold text-gray-800 ">Viết bình luận của bạn</h3>

         {/* Tên người dùng */}
         <div>
            <ul className="flex gap-1 relative">
               {[1,2,3,4,5].map((value) =>(
                  <li
                  key={value}
                  onClick={() =>setRating(value)}
                  ><Star className={`text-yellow-500 hover:cursor-pointer ${value <= rating ? "fill-yellow-500" : ''}`} /></li>

               ))}
               
            </ul>
         </div>

         {/* Nội dung bình luận */}
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bình luận</label>
            <textarea
            name="contentcomment"
            value={contencomment || ''}

            onChange={(e) => setContetncomment(e.target.value)}
               rows={4}
               className="w-full relative border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
               placeholder="Hãy chia sẻ cảm nghĩ của bạn về sản phẩm..."
            ></textarea>
         </div>

         {user ? (
            hasbought ?(
               <div className="text-right">
            <Button variant="primary">gui binh luan</Button>
         </div>
            ) : (
               <div className="text-right">
            <Button variant="primary" type='button'
            
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}

            >mua san pham de binh luan</Button>
         </div>
            )
         ) : (
            <div>
               <Button variant="primary" type='button' onClick={() => LoginComent()}>dang nhap de binh luan</Button>
            </div>
         )}


         </div>
         </form>
      {/* danh gia */}
      <div className="shadow mt-4 p-2">
         <div>
            <h1 className="text-2xl font-semibold">danh gia san pham</h1>
         </div>
         <div className="flex items-center gap-4 p-4">
           {product && (
            <div className="flex items-center gap-2 border-r border-gray-200 pr-2">
               <p className="text-5xl font-bold text-yellow-600">
                  {product.ratingCount > 0 
                  ? (product.ratingSum / product.ratingCount).toFixed(1) 
                  : "0.0"}
               </p>
               <Star size={50} className="text-yellow-500 fill-yellow-500" />
            </div>
            )}
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
            {!cmts || cmts.length === 0 ?(
               <div>chưa có bình luận nào</div>
            ):(
               <div>
                  {cmts.map((item) =>(
                     <div className="flex gap-2 border border-gray-200 mb-4 " key={item.id}>
                        <div className="min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] m-2">
                        <Image 
                           width={50}
                           height={50}
                           src={item.user.avatarUrl}
                           alt={item.user.username}
                           className="rounded-full"
                           >
                        </Image>
                        </div>
                     
                     <div className="flex-1">
                        <div>
                           <div>
                              <p>{item.user.username}</p>
                              <RatingStarscmt
                              star={item.star}
                              />
                           </div>
                           <div className="mt-4">
                              <p className="  rounded-2xl">{item.content}</p>
                              <div className="flex gap-2 justify-end mr-2">
                                    <p className="border-r border-gray-200 pr-2">{item.createAt.toLocaleString()}</p>
                                    <EllipsisVertical/>
                              </div>
                           </div>
                        </div>
                     </div>
                        
                     </div>
                  ))}
               </div>
            )}



{/* user 2 danh gia */}


            {/* end user danh gia */}
         </div>
         <div className="w-full text-center">
            <Button variant="primary" onClick={() =>PageCmt()}>xem them</Button>
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

export function RatingStars({ ratingSum, ratingCount }: RatingStarsProps) {
  // 🔹 Logic
  const average = ratingCount > 0 ? ratingSum / ratingCount : 0;
  const averageDisplay = average.toFixed(1);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(average));

  // 🔹 UI
  return (
    <div className="flex items-center gap-2">
      <p className="text-yellow-600 font-medium">{averageDisplay}</p>
      <ul className="flex gap-1">
        {stars.map((filled, i) => (
          <li key={i}>
            <Star
              size={20}
              className={
                filled
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-yellow-500"
              }
            />
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">({ratingCount} lượt đánh giá)</p>
    </div>
  );
}
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
