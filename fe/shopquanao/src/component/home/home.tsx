

import React from "react";
import Banner from "../banner";
import CategoryHome from "../category/category";
import CommentHome from "../comment/comment";
import {BesellingProduct,NewProduct,Foruser,DiscountProduct} from "../product/product";
export default function HomePage(){
    return(
        <div className="">
            <Banner/>
            <CategoryHome/>
            <BesellingProduct/>
            <DiscountProduct/>
            <NewProduct/>
            <CommentHome/>
            <Foruser/>
        </div>
    )
}