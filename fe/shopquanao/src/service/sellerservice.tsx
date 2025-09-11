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

export {Registrationseller,getseller};