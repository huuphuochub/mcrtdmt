"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@/app/context/chat.context";
import FooterPage from "@/component/footer";
import Image from "next/image";
import { AddFl, CheckFl, UnFl } from "@/service/folower.service";
import Button from "@/component/ui/button";
import { interfaceProduct } from "@/interface/product.interface";
import { Star, Heart, EllipsisVertical, Trash, Images, X } from "lucide-react";
import { SellerInterface } from "@/interface/seller.interface";
import { interfaceuser } from "@/interface/user.interface";
import { interfacesubimg } from "@/interface/subimg.interface";
import { Category, Subcategory } from "@/interface/category.interface";
// import { getproductdetail } from "@/service/product.service";
import {
  AddFavourite,
  CheckFv,
  deLeteFv,
  getsizebyidproduct,
} from "@/service/product.service";
import { interfacecolor } from "@/interface/interfacecolor";
import { interfacesize } from "@/interface/interfacesize";
import { addcart } from "@/service/cartservice";
import { Getuserbyid } from "@/service/userservice";
import { useCart } from "@/app/context/cartcontext";
import { useUser } from "@/app/context/usercontext";
// import CreateRoomchat from "@/service/chat.service";
import { checkRoom, CreateRoomchat } from "@/service/chat.service";

import { CheckHasBought } from "@/service/order.service";
import { addComment } from "@/service/comment.service";
import { GetallCommentByProduct } from "@/service/comment.service";
import { Comment } from "@/interface/comment.interface";
import toast from "react-hot-toast";
import { ImagePreview } from "@/components/ui/enlargeimg";
import { DeleteCmtProduct } from "@/service/comment.service";
import Link from "next/link";
import PromotionTimer from "@/component/ui/formattime";
import { Similarproducts } from "@/component/product/product";
// import { useCart } from "@/app/context/cartcontext";
// import { interfacesize } from "@/interface/interfacesize";
interface ProductResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

interface ProductDetailData {
  product: {
    success: boolean;
    data: interfaceProduct | null;
  };
  images: {
    success: boolean;
    data: interfacesubimg[];
  };
  category: {
    success: boolean;
    data: Category | null;
  };
  subcategory: {
    success: boolean;

    data: Subcategory | null;
  };
  countlproduct: number;

  seller: {
    success: boolean;
    data: SellerInterface;
  };
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
interface commentdetail extends Comment {
  user: interfaceuser;
}
type ResponseSize = ResponseSizeItem[];

type ProductProps = { imgUrl: string };

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

export default function Productdetailpage({ productprop }: ProductDetailProps) {
  const { addToCart, getCartRect } = useCart();
  const { setItemchatcontext, setRoom, setSellerchat } = useChat();
  const [product, setProduct] = useState<interfaceProduct | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [subimg, setSubimg] = useState<interfacesubimg[] | null>(null);
  // const [userseler,setUserseller] = useState<interfaceuser | null>(null);
  const [seller, setSeller] = useState<SellerInterface | null>(null);
  const [responsesize, setResponsesize] = useState<ResponseSize>([]);
  const [arrsize, setArrsize] = useState<interfacesize[]>([]);
  const [arrcolor, setArrColor] = useState<interfacecolor[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [quantityitem, setQuantityitem] = useState<number | 1>(1);
  const [countlproduct, setCountlproduct] = useState<number | 0>(0);
  const { user, seller_id } = useUser();
  const [hasbought, setHasbought] = useState(false);
  const [rating, setRating] = useState(0);
  const [contencomment, setContetncomment] = useState<string | null>(null);
  const [pagecomment, setPagecomment] = useState(1);
  const [cmts, setCmts] = useState<commentdetail[]>([]);
  const [loadingcmt, setLoadingcmt] = useState(true);
  const [favourted, setFavourited] = useState(false);
  const [ischatroom, setIschatroom] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [isFl, setIsFl] = useState(false);
  const [loadingseller, setLoadinfseller] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  const [starfill, setStarfill] = useState(0);

  // const average = ratingCount > 0 ? ratingSum / ratingCount : 0;
  //   const cartRef = useRef<HTMLDivElement>(null);

  const HandleAddFavourite = async (product_id: number) => {
    try {
      const add = await AddFavourite(product_id);
      setFavourited(true);
    } catch (error) {}
  };

  // mở chat item
  const HandleOpenChat = () => {
    // if(!seller) return;
    console.log("mo chat");

    if (!user) return;
    setItemchatcontext(true);
    setRoom(roomId);
    // setSellerchat(seller.id);
  };
  const Createchat = async (seller_id: number) => {
    console.log("toa phong");

    if (!user) return;
    const room = await CreateRoomchat(seller_id);
    console.log(room);
    if (room.data.success) {
      setRoom(room.data.data.id);
      setItemchatcontext(true);
    }

    // setItemchat(true);
    //  setRoom(roomId);
    // setSellerchat(seller_id);
  };

  const handleDeleteFv = async (product_id: number) => {
    try {
      const dlt = await deLeteFv(product_id);
      setFavourited(false);
    } catch (error) {}
  };

  const handleAddToCartcss = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cartRect = getCartRect();
    if (!cartRect) return;

    // Lấy vị trí button làm điểm xuất phát
    const btnRect = e.currentTarget.getBoundingClientRect();

    // tạo ảnh bay từ product.img
    const flyingImg = document.createElement("img");
    if (product) {
      flyingImg.src = product.image;
    } // dùng url từ product
    flyingImg.classList.add("fixed", "z-[9999]", "rounded-xl");
    flyingImg.style.left = btnRect.left + "px";
    flyingImg.style.top = btnRect.top + "px";
    flyingImg.style.width = "80px";
    flyingImg.style.transition = "all 1s ease-in-out";

    document.body.appendChild(flyingImg);

    // animate đến giỏ hàng
    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "30px";
      flyingImg.style.opacity = "0.5";
    });

    flyingImg.addEventListener("transitionend", () => {
      flyingImg.remove();
    });

    handleAddToCart();
  };

  const GetallCmt = async () => {
    if (!product) return null;

    try {
      const cmt = await GetallCommentByProduct(
        product.id,
        pagecomment,
        starfill
      );

      if (cmt) {
        if (pagecomment === 1) {
          setCmts(cmt.data.data);
        } else {
          setCmts((prev) => [...prev, ...cmt.data.data]);
        }
      }
    } catch (error) {
      setLoadingcmt(false);
    } finally {
      setLoadingcmt(false);
    }
  };

  const clickpagecmt = () => {
    setPagecomment(pagecomment + 1);
  };
  // const PageCmt = async () => {
  // if (!product) return null;

  // const nextPage = pagecomment + 1;
  // setPagecomment(nextPage);

  // try {
  //    const cmt = await GetallCommentByProduct(product.id, nextPage,starfill);
  //    if (cmt) {
  //       setCmts(prev => [...prev, ...cmt.data.data]);

  //    }
  // } catch (error) {
  //    setLoadingcmt(false);
  // } finally {
  //    setLoadingcmt(false);
  // }
  // };

  useEffect(() => {
    GetallCmt();
  }, [product, starfill, pagecomment]);

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
      setSubcategory(productprop.data.subcategory.data);
      setCountlproduct(productprop.data.countlproduct);
      setSubimg(productprop.data.images.data);
      setSeller(productprop.data.seller.data);
    }
  }, [productprop]);

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

  const CheckRoom = async () => {
    try {
      if (!seller) return;
      const check = await checkRoom(seller.id);
      

      if (check.data.success) {
        setIschatroom(true);
        setRoomId(check.data.data.id);
      }
      const checkfl = await CheckFl(seller.id);
      console.log(checkfl);

      if (checkfl.data.success) {
        setIsFl(true);
      } else {
        setIsFl(false);
      }
    } catch (error) {
      setLoadinfseller(false);
    } finally {
      setLoadinfseller(false);
    }
  };
  useEffect(() => {
    if (seller) {
      CheckRoom();
    }
  }, [seller]);

  const CheckFavotite = async () => {
    if (!product) return;
    try {
      const ok = await CheckFv(product.id);
      if (ok.data.success) {
        setFavourited(ok.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (product) {
      CheckFavotite();
      size(product.id);
      checkhasbought(product.id);
    }
  }, [product]);

  const checkhasbought = async (product_id: number) => {
    const hasbought = await CheckHasBought(product_id);
    if (hasbought.data.data) {
      setHasbought(true);
    } else {
      setHasbought(false);
    }
  };

  const size = async (id: number) => {
    const sizes = await getsizebyidproduct(id);

    if (sizes.data.success === true) {
      setResponsesize(sizes.data.data);
    } else {
      setResponsesize([]);

      setSelectedColorId(1000);
      setSelectedSizeId(1000);
    }
  };

  function getcolorbysize(sizeId: number) {
    return Array.from(
      new Map(
        responsesize
          .filter((item) => item.size.id === sizeId)
          .map((item) => [item.color.id, item.color])
      ).values()
    );
  }
  const handlechangesize = (e: number) => {
    setSelectedSizeId(e);
    const ARcolor = getcolorbysize(e);
    setArrColor(ARcolor);
  };
  const handleAddToCart = async () => {
    const add = await Getuserbyid();

    if (product && selectedSizeId && selectedColorId) {
      if (add.data.code === 404) {
        saveCartToLocalStorage({
          product_id: product.id,
          size_id: selectedSizeId!,
          color_id: selectedColorId!,
          quantity: quantityitem,
        });
        addToCart({
          product_id: product.id,
          size_id: selectedSizeId!,
          color_id: selectedColorId!,
          quantity: quantityitem,
        });
        // alert("chua dang nhap")
      } else {
        const add = {
          product_id: product.id,
          size_id: selectedSizeId,
          color_id: selectedColorId,
          quantity: quantityitem,
        };
        addToCart(add);
        // alert(quantityitem)
        await addcart(add);
      }
    }
  };
  const handleplusitem = () => {
    setQuantityitem(quantityitem + 1);
  };
  const handleminusitem = () => {
    setQuantityitem(quantityitem - 1);
  };
  const handleerrminusitem = () => {
    alert("k đủ số lượng size và màu, bui lòng chọn size hoặc màu khác");
  };

  const handleAddFl = async (seller_id: number) => {
    try {
      const add = await AddFl(seller_id);
      // console.log(add);

      setIsFl(true);
    } catch (error) {}
  };

  const formatVN = (n: number) => new Intl.NumberFormat("vi-VN").format(n);

  const selectedQuantity = useMemo(() => {
    if (
      selectedSizeId &&
      selectedSizeId !== 1000 &&
      selectedColorId &&
      selectedColorId !== 1000
    ) {
      const found = responsesize.find(
        (item) =>
          item.size.id === selectedSizeId && item.color.id === selectedColorId
      );
      return found?.quantity || 0;
    } else if (responsesize.length === 0 && product) {
      return product?.quantity;
    }
    return 0;
  }, [selectedSizeId, selectedColorId, responsesize]);

  useEffect(() => {
    if (responsesize?.length >= 1) {
      const arsize = Array.from(
        new Map(responsesize.map((item) => [item.size.id, item.size])).values()
      );
      setArrsize(arsize);
    }
  }, [responsesize]);
  if (productprop.success === false) {
    return <div>{productprop.message ?? "Không tìm thấy sản phẩm"}</div>;
  }

  const LoginComent = () => {
    window.location.href = "/login";
  };
  const handleDeleteCmt = async (id: number) => {
    const de = await DeleteCmtProduct(id);
    if (de.data.success) {
      toast.success("da xoa binh luan");
      setCmts((prevCmts) => prevCmts.filter((item) => item.id !== id));
    }
  };

  const HanfleFl = async (seller_id: number) => {
    setIsFl(false);
    const ok = await UnFl(seller_id);
    console.log(ok);
  };
  // kiem tra thoi gian khuyen mai
  function isInPromotion(promo_start: string, promo_end: string) {
    const today = new Date(); // ngày hiện tại
    const start = new Date(promo_start);
    const end = new Date(promo_end);

    return today >= start && today <= end;
  }

  function fomartdaymonth(time: string) {
    const now = new Date(time);
    console.log(time);

    const day = now.getDate();
    const month = now.getMonth() + 1;

    return `${day}/${month}`;
  }

  const PostComment = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault(); // chặn reload trang
    if (!product) return null;

    if (rating === 0) {
      alert("vui lòng chọn sao");
      return;
    } else if (!contencomment) {
      alert("vui lòng nhập bình luận");
      return;
    } else {
      const formdata = new FormData();
      formdata.append("star", rating.toLocaleString());
      formdata.append("content", contencomment);
      formdata.append("product_id", product.id.toLocaleString());
      if (images && images.length > 0) {
        images.forEach((file: File, index: number) => {
          formdata.append("files", file);
        });
      }
      // const body = {
      //    star:rating,
      //    content:contencomment,
      //    product_id:product?.id
      // }
      try {
        const post = await addComment(formdata);
        if (post.data.data.success) {
          toast.success("đã gửi bình luận");
        } else {
          toast.error("lỗi khi gửi");
        }
      } catch (error) {}
    }
  };
  return (
    <div>
      <div className="mt-[100px] max-w-[1200px] mx-auto ">
        <div className="flex py-2 px-1 ">
          <p>trang chu</p>
          &gt;
          <p>{category?.name}</p>
          &gt;
          <p>{subcategory?.name}</p>
        </div>
        <div className="grid  lg:flex shadow">
          <div className="max-w-[500px] p-2 ">
            <div className=" relative">
              <ImagePreview
                src={
                  product?.image ||
                  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                }
                alt={product?.name || "product"}
                width={500}
                height={500}
                className="max-h-[500px] min-h-[500px] hover:cursor-pointer"
              />
              {/* <div className="absolute top-0 right-0 bg-red-400 rounded-l-2xl">
                  <p className="text-white">-25%</p>
               </div> */}

              {product ? (
                <div>
                  {isInPromotion(product.promo_start, product.promo_end) ? (
                    <div className="absolute top-0 right-0 bg-red-500 rounded-l-2xl text-white">
                      -
                      {Math.round(
                        (1 - product.discountprice / product.price) * 100
                      )}
                      %
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex gap-5 mt-2">
              {subimg ? (
                subimg.map((urlimg, index) => (
                  <div className="border relative" key={urlimg.url || index}>
                    <ImagePreview
                      src={
                        urlimg?.url ||
                        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                      }
                      alt=""
                      width={150}
                      height={150}
                      className="max-h-[150px] hover:cursor-pointer"
                    />
                  </div>
                ))
              ) : (
                <div className="flex gap-5">
                  <div className="border relative">
                    <Image
                      width={150}
                      height={150}
                      src={
                        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                      }
                      alt=""
                      className="max-h-[150px]"
                    ></Image>
                  </div>
                  <div className="border relative">
                    <Image
                      width={150}
                      height={150}
                      src={
                        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                      }
                      alt=""
                      className="max-h-[150px]"
                    ></Image>
                  </div>
                  <div className="border relative">
                    <Image
                      width={150}
                      height={150}
                      src={
                        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
                      }
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
                <p className="text-2xl font-bold leading-snug">
                  {product.name}
                </p>
              )}

              {/* Đánh giá */}
              {!product ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                      ></div>
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
                <div>
                  {isInPromotion(product.promo_start, product.promo_end) ? (
                    <div className="flex items-baseline gap-4">
                      <p className="text-lg text-gray-500 line-through">
                        {formatVN(product.price)} đ
                      </p>
                      <p className="text-2xl text-red-600 font-bold">
                        {formatVN(product.discountprice)} đ
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-4">
                      <p className="text-2xl text-red-600 font-bold">
                        {formatVN(product.price)} đ
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Thời gian khuyến mãi */}
              {!product ? (
                <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <div>
                  {isInPromotion(product.promo_start, product.promo_end) ? (
                    <PromotionTimer
                      start={product.promo_start}
                      end={product.promo_end}
                    />
                  ) : (
                    <div></div>
                  )}
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
                  {responsesize.length > 0 ? (
                    <select
                      className="border rounded-md relative px-3 py-2 w-1/2"
                      onChange={(e) => handlechangesize(Number(e.target.value))}
                    >
                      <option>Chọn size</option>
                      {arrsize.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div></div>
                  )}
                  {/* Select màu */}
                  {responsesize.length > 0 ? (
                    <select
                      className="border rounded-md px-3 py-2 relative w-1/2"
                      onChange={(e) =>
                        setSelectedColorId(Number(e.target.value))
                      }
                    >
                      <option>Chọn màu</option>
                      {arrcolor.length > 0 ? (
                        arrcolor.map((color) => (
                          <option key={color.id} value={color.id}>
                            {color.name}
                          </option>
                        ))
                      ) : (
                        <option value="">vui lòng chọn size</option>
                      )}
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
                      {quantityitem >= 2 ? (
                        <button
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-pointer"
                          onClick={handleminusitem}
                        >
                          -
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-not-allowed">
                          -
                        </button>
                      )}
                      <span className="px-4">{quantityitem}</span>
                      {quantityitem >= selectedQuantity ? (
                        <button
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-not-allowed"
                          onClick={handleerrminusitem}
                        >
                          +
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 relative hover:cursor-pointer"
                          onClick={handleplusitem}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Tồn kho</label>
                    <div className="flex items-center border w-fit rounded-md overflow-hidden">
                      <span className="px-4 py-1">{product.quantity}</span>
                    </div>
                  </div>
                  {responsesize.length > 0 && (
                    <div>
                      <label className="block mb-1 font-medium">
                        Số lượng size và màu
                      </label>
                      <div className="flex items-center border w-fit rounded-md overflow-hidden">
                        <span className="px-4 py-1">{selectedQuantity}</span>
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
                  <span className="text-red-600 text-2xl font-bold">
                    {isInPromotion(product.promo_start, product.promo_end)
                      ? formatVN(product.discountprice * quantityitem)
                      : formatVN(product.price * quantityitem)}{" "}
                    đ
                  </span>
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
                    <Button variant="primary" onClick={handleAddToCartcss}>
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                  {favourted ? (
                    <Heart
                      className="text-red-500 fill-red-500 hover:scale-110 transition hover:cursor-pointer relative"
                      onClick={() => handleDeleteFv(product.id)}
                    />
                  ) : (
                    <Heart
                      className="text-red-500 hover:scale-110 transition hover:cursor-pointer relative"
                      onClick={() => HandleAddFavourite(product.id)}
                    />
                  )}

                  <span>đã bán: {product.totalsold}</span>
                </div>
              )}
              <div>Hãy đăng nhập để có thể truy cập giỏ hàng bất cứ đâu</div>
            </div>
          </div>
        </div>
        {/* nguoi ban */}
        {loadingseller ? (
          <div className="grid shadow mt-4 p-2 lg:flex animate-pulse">
            {/* avatar + tên */}
            <div className="flex gap-2 items-center max-w-[350px] w-[350px] border-r border-gray-300">
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-5 w-40 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gray-200 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* info khác */}
            <div className="flex-1 flex items-center justify-between p-2">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ) : !seller ? (
          <div></div>
        ) : (
          // === UI thật ===
          <div className="shadow mt-4 p-4 rounded-lg bg-white grid gap-4 lg:flex">
  {/* Avatar + Seller Info */}
  <div className="flex gap-3 items-center w-full lg:max-w-[350px] lg:w-[350px] lg:border-r border-gray-200 pr-4">
    <Image
      width={70}
      height={70}
      src={
        seller?.avatar ||
        "https://res.cloudinary.com/dnjakwi6l/image/upload/v1749022337/default-product_dpmryd.jpg"
      }
      alt="Seller avatar"
      className="rounded-full border border-gray-300 object-cover"
    />

    <div className="flex-1">
      <Link
        href={`/page/sellerinfor?id=${seller.id}`}
        className="hover:underline"
      >
        <p className="text-lg font-semibold">{seller?.usernameseller}</p>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <p className="font-medium">
          {seller?.ratingCount && seller.ratingCount > 0
            ? (seller.ratingSum! / seller.ratingCount).toFixed(1)
            : "0.0"}
        </p>
        <ul className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
            </li>
          ))}
        </ul>
        <p className="ml-1">{seller?.ratingCount || 0} đánh giá</p>
      </div>

      {/* Buttons */}
      {seller.id === seller_id ? (
        <div className="mt-2">
          <Button variant="secondary" className="text-sm px-3 py-1">
            Cửa hàng của bạn
          </Button>
        </div>
      ) : (
        <div className="flex  gap-1">
          {ischatroom ? (
            <Button variant="primary" onClick={HandleOpenChat}>
              Chat ngay
            </Button>
          ) : (
            <Button variant="primary" onClick={() => Createchat(seller?.id)}>
              Chat ngay
            </Button>
          )}

          {isFl ? (
            <Button variant="secondary" onClick={() => HanfleFl(seller.id)}>
              Đang theo dõi
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => handleAddFl(seller.id)}>
              Theo dõi
            </Button>
          )}
        </div>
      )}
    </div>
  </div>

  {/* Seller Details */}
  <div className="flex-1 grid grid-cols-2 gap-4 items-center justify-between text-sm sm:text-base">
    <div>
      <p className="mb-1">Sản phẩm: <span className="font-medium">100</span></p>
      <p>Địa chỉ: {seller?.address || "Đang cập nhật"}</p>
    </div>
    <div>
      <p className="mb-1">Đã bán: <span className="font-medium">{seller?.soldCount || 0}</span></p>
      <p>Tham gia: <span className="font-medium">ngày trước</span></p>
    </div>
  </div>
</div>

        )}

        {/*  mo ta*/}
        {!product ? (
          <div className="shadow mt-4 p-2 animate-pulse">
            {/* tiêu đề */}
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>

            {/* grid thông tin */}
            <div className="grid grid-cols-[200px_1fr] gap-y-2 bg-white p-4 rounded-md border-b border-gray-200">
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-5 w-48 bg-gray-200 rounded"></div>

              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-5 w-40 bg-gray-200 rounded"></div>

              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-5 w-36 bg-gray-200 rounded"></div>

              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-5 w-52 bg-gray-200 rounded"></div>
            </div>

            {/* mô tả */}
            <div className="h-6 w-44 bg-gray-200 rounded mt-4 mb-2"></div>
            <div className="space-y-2 p-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="shadow mt-4 p-2">
            <div>
              <div>
                <h1 className="text-2xl font-semibold">Chi tiết sản phẩm</h1>
              </div>
              <div className="grid grid-cols-[200px_1fr] gap-y-2 bg-white p-4 rounded-md border-b border-gray-200">
                <p className="font-medium text-gray-700">Tên sản phẩm:</p>
                <p>{product?.name}</p>
                <p className="font-medium text-gray-700">Danh mục:</p>
                <p>{category?.name}</p>
                <p className="font-medium text-gray-700">Xuất xứ:</p>
                <p>Trung Quốc</p>
                <p className="font-medium text-gray-700">Ngày sản xuất:</p>
                <p>{/* Ngày sản xuất ở đây */}</p>
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Mô tả sản phẩm</h1>
              </div>
              <div className="">
                <p className="p-4">{product?.describe}</p>
              </div>
            </div>
          </div>
        )}

        {/* form dien binh luan */}
        <form onSubmit={PostComment}>
          <div className="shadow mt-4 p-4 bg-white rounded-md space-y-4 ">
            <h3 className="text-lg font-semibold text-gray-800 ">
              Viết bình luận của bạn
            </h3>

            {/* Tên người dùng */}
            <div>
              <ul className="flex gap-1 relative">
                {[1, 2, 3, 4, 5].map((value) => (
                  <li key={value} onClick={() => setRating(value)}>
                    <Star
                      className={`text-yellow-500 hover:cursor-pointer ${
                        value <= rating ? "fill-yellow-500" : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Nội dung bình luận */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bình luận
              </label>
              <textarea
                name="contentcomment"
                value={contencomment || ""}
                onChange={(e) => setContetncomment(e.target.value)}
                rows={4}
                className="w-full relative border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Hãy chia sẻ cảm nghĩ của bạn về sản phẩm..."
              ></textarea>
            </div>

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

            {user ? (
              hasbought ? (
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
              ) : (
                <div className="text-right">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    mua san pham de binh luan
                  </Button>
                </div>
              )
            ) : (
              <div>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => LoginComent()}
                >
                  dang nhap de binh luan
                </Button>
              </div>
            )}
          </div>
        </form>
        {/* danh gia */}
        <div className="shadow mt-4 p-2">
          <div>
            <h1 className="text-2xl font-semibold">danh gia san pham</h1>
          </div>
          <div className=" items-center gap-4 p-4">
            {product && (
              <div className="flex items-center gap-2 sm:border-r border-gray-200 sm:pr-4">
                <p className="text-5xl font-bold text-yellow-600 leading-none">
                  {product.ratingCount > 0
                    ? (product.ratingSum / product.ratingCount).toFixed(1)
                    : "0.0"}
                </p>
                <Star size={36} className="text-yellow-500 fill-yellow-500" />
              </div>
            )}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
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
          <div className="mt-4">
            {/* user danh gia */}
            {!cmts || cmts.length === 0 ? (
              <div>chưa có bình luận nào</div>
            ) : (
              <div>
                {cmts.map((item) => (
                  <div
                    className="flex gap-2 border border-gray-200 mb-4 "
                    key={item.id}
                  >
                    <div className="min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] m-2">
                      <Image
                        width={50}
                        height={50}
                        src={item.user.avatarUrl}
                        alt={item.user.username}
                        className="rounded-full"
                      ></Image>
                    </div>

                    <div className="flex-1">
                      <div>
                        <div className="flex justify-between items-center">
                          <div>
                              <p>{item.user.username}</p>
                              <RatingStarscmt star={item.star} />
                          </div>
                          <span className="text-sm text-gray-500">
                            {item.createAt.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-4">
                          <p className="  rounded-2xl">{item.content}</p>
                          <div className="flex gap-2 mt-2">
                            {item.imageurl &&
                              item.imageurl.map((items) => (
                                <Image
                                  width={100}
                                  height={100}
                                  src={items}
                                  alt=""
                                  key={items}
                                  className=" max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px] rounded "
                                ></Image>
                              ))}
                          </div>
                          <div className="flex gap-2 justify-end mr-2">
                            
                            {user && item.user.id === user.id && (
                              <Trash
                                className="hover:cursor-pointer relative"
                                onClick={() => handleDeleteCmt(item.id)}
                              />
                            )}
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
            {product && cmts.length === product.ratingCount ? (
              <Button variant="danger">xem thêm</Button>
            ) : (
              <Button variant="primary" onClick={clickpagecmt}>
                xem thêm
              </Button>
            )}
          </div>
        </div>

        {/* san pham tuong tu */}
        {product && <Similarproducts category_id={product.idCategory} />}
      </div>
      <FooterPage />
    </div>
  );
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
                filled ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"
              }
            />
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">({ratingCount} lượt đánh giá)</p>
    </div>
  );
}
interface RatingStarscmtProps {
  star: number;
}
export function RatingStarscmt({ star }: RatingStarscmtProps) {
  return (
    <div>
      <ul className="flex">
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item}>
            <Star
              size={15}
              className={
                item <= star
                  ? `text-yellow-500 fill-yellow-500`
                  : "text-yellow-500"
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
