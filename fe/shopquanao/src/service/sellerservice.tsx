    import axiosClient from "@/lib/axiosclient";


type RegisterInput = {
  usernameseller: string;
    email:string;
    provinceId:number;
    districtId:number;
    wardId:number;
    address:string;
};


const Registrationseller = async(data:RegisterInput) =>{
    try {
        const response = await axiosClient.post(`/seller/register`, data);
        // console.log(reponse);
        return(response)
        
    } catch (error) {
        
    return Promise.reject(error);
    }
}
const searchNameSeller = async(name:string) =>{
    try {
        const data = await axiosClient.post('seller/searchname',{name:name})
        return data;
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const getseller = async()=>{
    try {
        const sellser= await axiosClient.get('seller/getseller')
        return sellser.data
    } catch (error) {
        return{
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
        }
    }
}
const getAllSeller=async() =>{
    try {
        const sellers = await axiosClient.get('/seller/all');
        return sellers 
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'khong gui dc'
        }
    }
}

const GetAllProductBySeller = async(id:number,page:number, limit:number)=>{
    try {
        const data = await axiosClient.get(`/seller/allproduct/${id}`,{
            params:{
                limit,page
            }
        })
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'khong gui dc'
        }
    }
}
export {searchNameSeller,Registrationseller,getseller,getAllSeller,GetAllProductBySeller};