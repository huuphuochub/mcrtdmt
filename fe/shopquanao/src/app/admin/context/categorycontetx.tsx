"use client"

import { createContext,useState,useEffect, useContext } from "react"
import { Category,Subcategory } from "@/interface/category.interface"
// import { Getseller } from "../service/seller.service"

// import { SellerInterface } from "@/interface/seller.interface"

interface CategoryContextType {
    category: Category | null
}
