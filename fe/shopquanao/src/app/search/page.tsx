"use client";

import React, { useState } from "react";
import Header from "@/component/header";
import { useSearchParams } from "next/navigation";
import { searchproduct } from "@/service/product.service";
import { interfaceProduct } from "@/interface/product.interface";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [page, setPage] = useState(1);

  // React Query fetch
const { data, isLoading, isError, isFetching } = useQuery<interfaceProduct[]>({
  queryKey: ["search", keyword, page],
  queryFn: async () => {
    const body = { page, keyword };
    const products = await searchproduct(body);
    return products.data.data as interfaceProduct[];
  },
  placeholderData: (prev) => prev, // thay cho keepPreviousData
  enabled: !!keyword,
});


  function toSlug(name: string) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div>
      <Header />

      <div className="mt-[100px] max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
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
            <p className="text-center text-gray-500 py-20">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500 py-20">
              Lỗi khi tải sản phẩm
            </p>
          ) : (
            <div className="flex gap-6">
              {/* Sidebar bộ lọc */}
              <aside className="w-[280px] h-fit border rounded-xl shadow-md p-4 sticky top-24">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Bộ lọc tìm kiếm
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="cursor-pointer hover:text-red-500">Danh mục</p>
                  <p className="cursor-pointer hover:text-red-500">Giá</p>
                  <p className="cursor-pointer hover:text-red-500">Đánh giá</p>
                </div>
              </aside>

              {/* Grid sản phẩm */}
              <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {data?.length === 0 ? (
                  <div className="text-center text-gray-500 py-6">
                    Không tìm thấy sản phẩm
                  </div>
                ) : (
                  data?.map((item) => {
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
                                {item.averageRating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </main>
            </div>
          )}

          {isFetching && (
            <p className="text-center text-gray-400 mt-4">Đang cập nhật...</p>
          )}
        </div>
      </div>
    </div>
  );
}
