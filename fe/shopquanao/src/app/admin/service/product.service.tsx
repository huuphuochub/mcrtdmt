import { Variant } from "@/interface/interfacesize";
import axiosClient from "@/lib/axiosclient";


interface bodyfilter{
    status:number,
    category:number,
    quantity:number,
    // seller_id:number,
    page:number
}
const getListProduct = async(limit:number,page:number) =>{
    try {
        const Listprd = await axiosClient.get('/product/getallproductseller',{
            params:{
                limit,page
            }
        })
        return Listprd
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'k gui dc'
        }
    }
}

const SearchProduct= async(keyword:string,page:number)=>{
    try {
        const product = await axiosClient.post('/product/searchbyseller',{page,keyword});
        return product
    } catch (error) {
        return{
            success:false,
            data:null,
            messgae:'khong gui dc'
        }
    }
}

const AddVariants =async(variant:Variant[])=>{
    try {
        const product = await axiosClient.post('/product/addvariant',variant);
        return product
    } catch (error) {
        return{
            success:false,
            data:null,
            messgae:'khong gui dc'
        }
    }
}
const filterprd = async(body:bodyfilter) =>{
    // console.log(status,quantity,category,page);
    console.log('service');
    
    console.log(body);
    
    try {
        const product = await axiosClient.post('/product/filterproduct',{body});
        // console.log(product);
        
        return product
        
    } catch (error) {
        return{
            success:false,
            data:null,
            messgae:'khong gui dc'
        }
    }
}

const GetDetailProduct =async(id:number) =>{
    try {
        const product = await axiosClient.get(`/product/productdetailseller/${id}`);
        return product
    } catch (error) {
        return{
            success:false,
            message:'khong ui dc',
            data:null,
        }
    }
}

const GetSizeColor= async() =>{
    try {
        const ok = await axiosClient.get('/product/sizeandcolor')
        return ok
    } catch (error) {
        return{
            success:false,
            message:"khong ui dc",
            data:null
        }
    }
}

export {getListProduct,AddVariants,SearchProduct,filterprd,GetDetailProduct,GetSizeColor};