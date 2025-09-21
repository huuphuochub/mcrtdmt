"use client";

import React, { useEffect, useState } from "react";
import Header from "@/component/header";
import { useSearchParams } from "next/navigation";
import { searchproduct,FilterPrd } from "@/service/product.service";
import { interfaceProduct } from "@/interface/product.interface";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Button from "@/component/ui/button";
import FooterPage from "@/component/footer";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";


// import { FilterPrd } from "@/service/product.service";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [page, setPage] = useState(1);
  const [bestselling,setBestselling] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [star,setStar] = useState(0);
  const [minprice,setMinPriceFilter] = useState(0);
    const [maxprice,setMaxPriceFilter] = useState(0);
const [debouncedMin] = useDebounce(minprice, 500);
const [debouncedMax] = useDebounce(maxprice, 500);

  const [newprd,setNewprd] = useState(0);
  const [Productsss,setProductssss] = useState<interfaceProduct[]>([])

  // React Query fetch
const { data, isLoading, isError, isFetching } = useQuery<interfaceProduct[]>({
  queryKey: [
    "search",
    keyword,
    page,
    bestselling,
    discount,
    // category:0,
    // subcate:0,
    star,
    // sort,
    debouncedMin,
    debouncedMax,
  ],
  queryFn: async () => {
    const body = {
      page,
      keyword,
      category:0,
      subcate:0,
      bestselling,
    discount,
      rating: star,
      // sort,        // gộp bestselling/discount/newprd thành 1 trường
      // minprice,
      newdate:newprd,
       minprice: debouncedMin,
      maxprice: debouncedMax,
    };
    const products = await FilterPrd(body);
    return products.data.data as interfaceProduct[];
  },
  placeholderData: (prev) => prev, // giữ data cũ khi loading page mới
  enabled: !!keyword, // chỉ fetch khi có keyword
});

useEffect(() => {
  if (!data) return; // tránh lỗi khi data chưa có
console.log(data);

  if (page === 1) {
    // Reset khi filter thay đổi hoặc load lần đầu
    setProductssss(data);
  } else {
    // Append khi load thêm trang mới
        setProductssss((prev) => {
          const newItems = data.filter(
            (item) => !prev.some((p) => p.id === item.id)
          );
          return [...prev, ...newItems];
        });
      }
}, [data, page]);

// Handler đổi trang
const nextPage = () => setPage((prev) => prev + 1);
const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

// Handler đổi filter (khi click checkbox, radio…)
const handleFilterChange = () => {
  setPage(1); // reset về trang 1 khi filter thay đổi
  // React Query sẽ tự refetch do queryKey thay đổi
};

const DeleteFilter =() =>{
  setPage(1);
  setBestselling(0);
  setDiscount(0);
  setStar(0);
  setMinPriceFilter(0)
  setMaxPriceFilter(0);

}
useEffect(() =>{
  console.log(Productsss);
  
},[Productsss])

  function toSlug(name: string) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div className="mb-4">
      <Header />

      <div className="mt-[80px] max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          <Link
            href="/"
            className="hover:cursor-pointer hover:text-red-600 transition-colors"
          >
            Trang chủ
          </Link>
          <span>&gt;</span>
          <p className="text-gray-800 font-medium">Tìm kiếm</p>
        </div>

        {/* Nội dung */}
        <div>
          {isLoading ? (
            <p className="text-center text-gray-500 h-[800px] py-20">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500 py-20">
              Lỗi khi tải sản phẩm
            </p>
          ) : (
            <div className="flex gap-6">
              {/* Sidebar bộ lọc */}
              <aside className="w-[280px] h-fit border rounded-xl shadow-md p-4 sticky top-[80px] bg-white">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Bộ lọc tìm kiếm
                </h3>

                <div className="space-y-4 text-sm text-gray-700">
                  {/* Bán chạy */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" className="accent-indigo-600 w-4 h-4" onChange={(e) =>setBestselling(e.target.checked ? 1 : 0)}/>
                    Bán chạy
                  </label>

                  {/* Giảm giá */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" className="accent-indigo-600 w-4 h-4" onChange={(e) => setDiscount(e.target.checked ? 1 : 0)}/>
                    Giảm giá
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" className="accent-indigo-600 w-4 h-4" onChange={(e) => setNewprd(e.target.checked ? 1 : 0)}/>
                    Mới nhất
                  </label>

                  {/* Xếp hạng */}
                  {/* Xếp hạng */}
                  <label className="block font-medium text-gray-800 mt-2">Xếp hạng</label>
                  <div className="space-y-2 pl-2">
                    {[5, 4, 3, 2, 1,0].map((star) => (
                      <label
                        key={star}
                        className="flex items-center gap-2 cursor-pointer hover:text-indigo-600"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          className="accent-indigo-600 w-4 h-4"
                          onChange={(e) => setStar(Number(e.target.value))}
                        />
                        <span className="flex items-center gap-1">
                          {star === 0 ? (
                            <p>tất cả</p>
                          ) : (
                            <p>{star}</p>
                          )} 
                          
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </span>
                      </label>
                    ))}
                  </div>


                  {/* Giá */}
                <div className="pt-2">
                  <label className="block font-medium text-gray-800 mb-1">Khoảng giá</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minprice}
                      placeholder="Từ"
                      onChange={(e) => setMinPriceFilter(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                    />
                    <span className="text-gray-600">-</span>
                    <input
                      type="number"
                      value={maxprice}
                      placeholder="Đến"
                      onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                    />
                  </div>
                </div>

                </div>
                <div className="flex justify-end">
                  <Button className="mt-2" onClick={() =>DeleteFilter()}>xóa bộ lọc</Button>
                </div>
              </aside>


              {/* Grid sản phẩm */}
              <div className="flex-1">
                <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full " >
                {Productsss?.length === 0 ? (
                  <div className="text-center text-gray-500 h-[800px] py-6">
                    Không tìm thấy sản phẩm
                  </div>
                ) : (
                  Productsss?.map((item) => {
                    const slug = `${toSlug(item.name)}-i.${item.idSeller}.${item.id}`;

                    return (
                      <Link
                        href={`/${slug}`}
                        key={item.id}
                        className="group border rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col hover:cursor-pointer"
                      >
                        {/* Hình ảnh */}
                        <div className="relative w-full aspect-square bg-gray-50">
                          <Image
                            fill
                            src={item.image || ""}
                            alt={item.name}
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="bg-red-500 text-white absolute right-0">
                            -{Math.round((1 - item.discountprice / item.price) * 100)}%
                          </div>
                        </div>

                        {/* Thông tin */}
                        <div className="p-3 flex flex-col flex-1 justify-between">
                          <p className="text-gray-800 font-medium line-clamp-2 mb-2">
                            {item.name}
                          </p>

                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-sm line-through text-gray-400">
                                {item.price.toLocaleString()}đ
                              </p>
                              <p className="text-lg text-red-500 font-semibold">
                                {item.discountprice.toLocaleString()}đ
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm text-gray-600">
                                {item.averageRating ? Number(item.averageRating).toFixed(1) : '0.0'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
                
              </main>
              <div className="flex w-full justify-end mt-2">
                  <Button onClick={nextPage}>xem thêm</Button>
              </div>
              </div>
                
            </div>
            
          )}
          

          {isFetching && (
            <p className="text-center text-gray-400 mt-4">Đang cập nhật...</p>
          )}
        </div>
      </div>
      <FooterPage/>
    </div>
  );
}
