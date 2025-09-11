"use client"

import { createContext,useState,useEffect, useContext } from "react"

import { Getseller } from "../service/seller.service"

import { SellerInterface } from "@/interface/seller.interface"

interface SellerContextType {
    seller:SellerInterface | null;
    loading:boolean;
    
}

const  SellerContext = createContext<SellerContextType |undefined>(undefined);

export const SellerProvider = ({children}:{children : React.ReactNode})=>{

    const [seller,setSeller] = useState<SellerInterface | null>(null);
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        const fetchseller = async() =>{
           try {
             const seller = await Getseller();
              if(seller.data.success){
            setSeller(seller.data.data);

            }else{
                setSeller(null)
            }
           } catch (error) {
                setLoading(false)
           }finally{
            setLoading(false)
           }
            // console.log(seller);
            
           
        }
        fetchseller();
    },[])
    
    return(
        <SellerContext.Provider value = {{seller,loading}}>
            {children}
        </SellerContext.Provider>
    )
}

export const useSeller = () =>{
    const context = useContext(SellerContext);
    if(!context){
        throw new Error('khong co seller truyen vao context')

    }
    return context;
}