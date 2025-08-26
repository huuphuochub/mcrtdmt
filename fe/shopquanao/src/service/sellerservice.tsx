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

export {Registrationseller};