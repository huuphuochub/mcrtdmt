import axiosClient from "@/lib/axiosclient";
// import SellerInterface
// import { SellerInterface } from "@/interface/seller.interface";
const Getseller = async() =>{
    try {
        const seller = await axiosClient.get('/seller/getseller')
        return seller;
        
    } catch (error) {
        return{
            success: false,
            code: 'UNKNOWN_ERROR',
            message: error,
            data: null,
        }
    }
}

export {Getseller}

