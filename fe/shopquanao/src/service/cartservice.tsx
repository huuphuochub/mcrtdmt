
import axiosClient from "@/lib/axiosclient";

interface body{
    product_id:number,
    color_id:number ,
    quantity:number,
    size_id:number,
}

const addcart =async(data:body) =>{
    // console.log('da goi add cảt');
    
     try {
            const result = await axiosClient.post('/cart/addcart',data);
            // console.log(result);
            
            return result
        } catch (error) {
            //  const errRes = error.response?.data;
            return {
            success: false,
            code:  'UNKNOWN_ERROR',
            message:  error,
            data:null,
            };
        }
}
const Getallcartitem = async() =>{
    try {
        const result = await axiosClient.get('/cart/getcartheader');
        return result
    } catch (error) {
        return{
             success: false,
            code:  'UNKNOWN_ERROR',
            message:  error,
            data:null,
        }
    }
}
const Getdetailallcart = async(data:body[]) =>{
    try {
        const result = await axiosClient.post('/cart/getcartdetail',data);
        return result
    } catch (error) {
        return{
            success: false,
            code:  'UNKNOWN_ERROR',
            message:  error,
            data:null,
        }
    }
}
const updateCartItem = async (data: body[]) => {
    try {
        const result = await axiosClient.post('/cart/updatecartitem', data);
        return result;
    } catch (error) {
        return {
            success: false,
            code: 'UNKNOWN_ERROR',
            message: error,
            data: null,
        };
    }
};
const deletecart = async() =>{
    try {
        const result = await axiosClient.post('/cart/deletecart');
        return result
    } catch (error) {
        return{
            success: false,
            code: 'UNKNOWN_ERROR',
            message: error,
            data: null,
        }
    }
}

export{addcart,Getallcartitem,Getdetailallcart,updateCartItem,deletecart}