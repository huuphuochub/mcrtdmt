import axiosClient from "@/lib/axiosclient";

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

export {getListProduct,SearchProduct};