"use client";

import Banner from "../banner";
import CategoryHome from "../category/category";
import CommentHome from "../comment/comment";
import { BesellingProduct, NewProduct, Ratingproduct } from "../product/product";
import LazySection from "./LazySection";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <CategoryHome />

      {/* Bán chạy */}
      <LazySection placeholderHeight={800}>
        <BesellingProduct />
      </LazySection>

      {/* Theo đánh giá */}
      <LazySection placeholderHeight={800}>
        <NewProduct />
      </LazySection>

      {/* Yêu thích */}
      <LazySection placeholderHeight={800}>
        <Ratingproduct />
      </LazySection>

      <CommentHome />
    </div>
  );
}
