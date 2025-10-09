"use client"

import React, { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getListProduct, SearchProduct,filterprd, GetDetailProduct, GetSizeColor } from "../service/product.service";
import { interfaceProduct, Subimginterface } from "@/interface/product.interface";
import Button from "@/component/ui/button";
import { Funnel, Search  } from "lucide-react";
import { getAllcate } from "../service/category.service";
import { Category } from "@/interface/category.interface";
import SearchPage from "@/app/search/page";
import { interfacecolor } from "@/interface/interfacecolor";
import { interfacesize } from "@/interface/interfacesize";
// import { interfaceProduct } from "@/interface/product.interface";
interface variant_product{
  product_id:number,
  id:number,
  color_id:number,
  size_id:number,
  quantity:number,
}

interface variant extends variant_product{
  idvariant:variant_product['id'],
  color:interfacecolor,
  size:interfacesize,
  quantity:variant_product['quantity'],


}
interface productdetail extends interfaceProduct{
  variants:variant[],
}

import { useSearchParams } from "next/navigation";

// import Router from "next/router";
import Link from "next/link";
interface bodyfilter{
    status:number,
    category:number,
    quantity:number,
    // seller_id:number,
    page:number
}


const ProductList = () =>{
    const [page, setPage] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [pagefilter,setPagefilter] = useState(1);

  const [products, setProducts] = useState<interfaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [pagesearch, setPagesearch] = useState(1);



  const [filters, setFilters] = useState({
  category: 0,
  quantity: 0,
  status: 0,
  page:page
//   keyword: ""
});

    const [queryFilters, setQueryFilters] = useState<bodyfilter>(filters);

useEffect(() =>{
    console.log(filters);
    
},[filters])
    
    
    
    
  // --- Fetch categories ---
  const { data: cateData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllcate,
  });


        const fetchfilter =async() =>{
            try {
                const productfilter = await filterprd(filters);
                console.log(productfilter);
                
                if (productfilter.data?.success) {
                    if (pagefilter === 1) {
                    setProducts(productfilter.data.data);
                    } else {
                setProducts((prev) => [...prev, ...productfilter.data.data]);
                }
            }
            } catch (error) {
                
            }
        }
        useEffect(() =>{
            console.log('da thay doi');
            
            fetchfilter()
        },[queryFilters])

  // cập nhật categorys khi có data
  useEffect(() => {
    if (cateData?.data?.success) {
      setCategorys(cateData.data.data);
    }
  });

  // --- Fetch product list ---
    const { data: listData, isLoading: listLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getListProduct(10, page),
    enabled: !keyword && filters.category === 0 && filters.quantity === 0 && filters.status === 0, 
    placeholderData: keepPreviousData,
  });


  // cập nhật products khi có data list
  useEffect(() => {
    if (listData?.data?.success) {
      if (page === 1) {
        setProducts(listData.data.data);
      } else {
        setProducts((prev) => [...prev, ...listData.data.data]);
      }
    }
    setLoading(listLoading);
  }, [listData, listLoading]);

  // --- Search products ---
  const { data: searchData, isLoading: searchLoading, refetch: Handlesearch } =
    useQuery({
      queryKey: ["search", keyword, pagesearch],
      queryFn: () => SearchProduct(keyword, pagesearch),
      enabled: !!keyword, // chỉ chạy khi có keyword
      placeholderData: keepPreviousData,
    });

  // cập nhật products khi có data search
  useEffect(() => {
    console.log('goi nè');
    
    if (searchData?.data?.success) {
      if (pagesearch === 1) {
        setProducts(searchData.data.data);
      } else {
        setProducts((prev) => [...prev, ...searchData.data.data]);
      }
    }
    setLoading(searchLoading);
  }, [searchData, searchLoading]);

  // --- giữ nguyên tên hàm ---


  const Clickprev = () => {
    setPage((prev) => prev + 1);
  };

    return(
            <div className="bg-white rounded-xl shadow p-6 mt-6">
            <div className="flex items-center  gap-4 sticky top-[-8px] bg-white">
                
                <h2 className="text-xl font-semibold ">Danh sách sản phẩm</h2>
                
                <div className="flex items-center gap-4 border rounded-xl shadow p-2">
                    <div>
                            <select name="" id="" 
                            
                            value={filters.category}
                            onChange={(e) => setFilters((prev) => ({ ...prev, category: Number(e.target.value )}))}
                            >
                                <option value={0}>Tất cả</option>
                                {categorys && categorys.map((item) =>(
                                <option value={item.id} key={item.id}>{item.name}</option>

                                ))}

                            </select>
                    </div>
                    <div>
                            <select name="" id="" 
                            value={filters.status}
                            onChange={(e) => setFilters((prev) => ({ ...prev, status: Number(e.target.value )}))}

                            
                            >
                                <option value={0}>Tất cả</option>
                                <option value={1}>Đang bán</option>
                                <option value={2}>Ngừng bán</option>
                                {/* <option value="">chọn trạng thái</option> */}

                            </select>
                    </div>
                    <div>
                            <select name="" id="" 
                            value={filters.quantity}
                            onChange={(e) => setFilters((prev) => ({ ...prev, quantity: Number(e.target.value )}))}

                            >
                                <option value={0}>Tất cả</option>
                                <option value={1}>Sắp hết</option>
                                <option value={2}>Hết hàng</option>
                                {/* <option value="">chọn trạng thái</option> */}

                            </select>
                    </div>
                    <div>
                        {/* <Funnel  className="hover:text-blue-500 hover:cursor-pointer  rounded-l"/> */}
                        <button
                        onClick={() => {
                            setQueryFilters(filters);
                            // refetchFilter();
                        }}
                        className="bg-black px-4 text-white  py-1 rounded hover:cursor-pointer 
                                    border border-transparent
                                    hover:bg-white hover:text-black hover:border-black transition"
                        >
                        Tìm
                        </button>
                    </div>
                </div>
                <div className=" ">
                                    <div className="relative w-full max-w-[300px] bg-white rounded-2xl shadow ">
                                    <input
                                        type="text"
                                        value = {inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter') {
                                                e.preventDefault();

                                                setKeyword(inputValue);   

                                                setPagesearch(1)
                                            }
                                        }}
                                        placeholder="Tìm sản phẩm theo tên..."
                                        className="w-full pl-4 pr-10 py-1 border border-gray-300 rounded-full 
                                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-200 text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-3 border-b">Ảnh</th>
                    <th className="px-4 py-3 border-b">Tên sản phẩm</th>
                    <th className="px-4 py-3 border-b">Giá</th>
                    <th className="px-4 py-3 border-b">Giá Khuyến Mãi</th>

                    <th className="px-4 py-3 border-b">Tồn kho</th>
                    <th className="px-4 py-3 border-b">Trạng thái</th>
                    <th className="px-4 py-3 border-b text-center">Thao tác</th>
                    </tr>
                </thead>
                    {loading ? (
                    <tbody>
                        <tr>
                        <td colSpan={7} className="text-center py-4">
                            Đang tải dữ liệu...
                        </td>
                        </tr>
                    </tbody>
                    ) : products.length === 0 ? (
                    <tbody>
                        <tr>
                        <td colSpan={7} className="text-center py-4">
                            Không có sản phẩm
                        </td>
                        </tr>
                    </tbody>
                    ) : (
                    <tbody>
                        {products.map((product, i) => (
                        <tr
                            key={`${product.id}-${i}`}
                            className="hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-3 border-b">
                            <img
                                src={product.image || "https://via.placeholder.com/50"}
                                alt="product"
                                className="w-12 h-12 object-cover rounded"
                            />
                            </td>
                            <td className="px-4 py-3 border-b font-medium">{product.name}</td>
                            <td className="px-4 py-3 border-b text-green-600 font-semibold">
                            {product.price.toLocaleString()} đ
                            </td>
                             
                            <td className="px-4 py-3 border-b">{product.discountprice}</td>
                            <td className="px-4 py-3 border-b  font-semibold">
                            {product.quantity}
                            </td>
                            <td className="px-4 py-3 border-b">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                                {product.status === 1 ? "Đang bán" : "Ngừng bán"}
                            </span>
                            </td>
                            <td className="px-4 py-3 border-b text-center space-x-2">
                            <Link href={`/admin/page/product/edit/?id=${product.id}`} className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer relative">
                                Sửa
                            </Link>
                            <button className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
                                Xóa
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    )}

                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Hiển thị 1 - 10 / 100 sản phẩm</p>
                <div className="flex space-x-2">
                {keyword !== '' ? (
                    <Button  className="px-3 py-1 text-sm rounded border hover:bg-gray-100" onClick={() =>setPagesearch(pagesearch + 1)}>
                    xem thêm
                </Button>
                ) : (
                    <Button  className="px-3 py-1 text-sm rounded border hover:bg-gray-100" onClick={Clickprev} >
                    xem thêm
                </Button>
                )}
                
                
                
                </div>
            </div>
            </div>

    )
}

interface ProductDetailEdit extends productdetail{
  subImages:Subimginterface[];
  
}
const Editproduct=() =>{
  const searchParams = useSearchParams();
  const [productdetail,setProductdetail] = useState<ProductDetailEdit | null>(null)
  const [id,setId] = useState<String | null> (null)
  const [addvarriant,setAddvariant] = useState(0)
  const [sizes,setSizes] = useState<interfacesize[]>([])
  const [colors,setColors] = useState<interfacecolor[]>([]);
  useEffect(() =>{
    const id = searchParams.get("id")
    if(id){
      setId(id)
    }
    fetch()
  },[id])

  const Clickaddvariant = async(i:number) =>{
    const data = await GetSizeColor()
    console.log(data.data.success);
    
    if(data.data.success){
      // console.log(data.data.color[1]);
      setColors(data.data.data.color);
      setSizes(data.data.data.size);
    }
    
    setAddvariant(addvarriant + i);

  }
  // useEffect(() =>{
  //   console.log(sizes);
    
  // },[sizes])

  const fetch = async() =>{
    if(id){
      console.log('goi fetch');
      
      const product = await GetDetailProduct(Number(id));
      console.log(product);
      
      if(product.data.success){
        setProductdetail(product.data.data)
      }
      // console.log(product);
      
    }
  }
    return(
  <div className="w-full mx-auto p-6 relative">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
          Chỉnh sửa sản phẩm
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* LEFT: Info (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <input
                type="text"
                defaultValue={productdetail?.name}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Price + Discount + Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá gốc
                </label>
                <input
                  type="number"
                  defaultValue={productdetail?.price}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá giảm
                </label>
                <input
                  type="number"
                  defaultValue={productdetail?.discountprice}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số lượng
                </label>
                <input
                  type="number"
                  defaultValue={productdetail?.quantity}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Category + Subcategory + Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  
                  <option>Quần áo</option>
                  <option>Giày dép</option>
                  <option>Phụ kiện</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại phụ
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Áo thun</option>
                  <option>Áo sơ mi</option>
                  <option>Áo khoác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option value="1">Hiển thị</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xuất xứ
                </label>
                <input
                  type="text"
                  defaultValue='trung quốc'
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày sản xuất
                </label>
                <input
                  type="text"
                  defaultValue='15/02/2024'
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
              Cân nặng (gram)
                </label>
                <input
                  type="number"
                  defaultValue={productdetail?.weigth}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả sản phẩm
              </label>
              <div className="border rounded-lg bg-white shadow-sm">
                <textarea
                  rows={10}
                  defaultValue="cungx ddc nha cac ban Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word"
                  className="w-full px-4 py-3 outline-none resize-none"
                />
              </div>
              {/* <p className="text-xs text-gray-400 mt-1">
                (Bạn có thể nhập mô tả chi tiết, nội dung sẽ hiển thị giống trình soạn thảo Word)
              </p> */}
            </div>


                {/* variant */}
            <div className="w-full bg-white shadow rounded-lg p-6">
                <p className="block text-base font-semibold text-gray-800 mb-4 border-b pb-2">
                  Biến thể
                </p>

                <div className="space-y-4">
                  {/* 1 item */}
                  {productdetail?.variants.map((item) =>(
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div>
                      <span className="text-sm text-gray-500">Size:</span>
                      <p className="font-medium text-gray-800">{item.size.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Màu:</span>
                      <p className="font-medium text-gray-800">{item.color.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Số lượng:</span>
                      <p className="font-medium text-gray-800">{item.quantity}</p>
                    </div>
                  </div>
                  ))}

                  {addvarriant > 0 && (
                    <div className="space-y-4">
                      {Array.from({ length: addvarriant }).map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div>
                            <span className="text-sm text-gray-500">Size:</span>
                            <p className="font-medium text-gray-800">
                              <select className="w-full border rounded-lg py-2">
                                {sizes.length > 0 &&
                                  sizes.map((item) => (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            </p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-500">Màu:</span>
                            <p className="font-medium text-gray-800">
                              <select className="w-full border rounded-lg py-2">
                                {colors.length > 0 &&
                                  colors.map((item) => (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            </p>
                          </div>

                          <div>
                            <span className="text-sm text-gray-500">Số lượng:</span>
                            <input
                              type="number"
                              className="w-full border rounded-lg py-2"
                              placeholder="Nhập số lượng"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  

                </div >
                <div className="flex gap-4">
                  <Button variant="primary" className="mt-2" onClick={() =>Clickaddvariant(1)}>Thêm biến thể</Button>
                {addvarriant >=1 && (
                  <div>
                      <Button variant="primary" className="mt-2" onClick={() => Clickaddvariant(-1)}>xóa bớt</Button>
                  </div>
                  
                )}
                </div>
              </div>

          </div>

          {/* RIGHT: Images (30%) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh chính
              </label>
              <div className="w-full h-64 bg-gray-100 border rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={productdetail?.image}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Sub images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh phụ
              </label>
              <div className="grid grid-cols-3 gap-3">
                {productdetail?.subImages.map((url, i) => (
                  <div
                    key={i}
                    className="w-full h-24 border rounded-lg overflow-hidden"
                  >
                    <img
                      src={url.url}
                      alt={`sub-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full h-24 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400 hover:text-indigo-500 hover:border-indigo-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
export {ProductList,Editproduct}