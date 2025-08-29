import axiosClient from "@/lib/axiosclient";
import { interfaceProduct } from "@/interface/product.interface";
interface body{
    username:string,
    email:string,
    address:string,
    phone:string,
    wardsId:number,
    districtId:number,
    provinceId:number,
    note:string,
    product:[
        {
            id:number,
            quantity:number,
            color_id:number,
            size_id:number
            weigth:number,
            id_seller:number,
            price:number,
            name:string,
            discountprice:number,
        }
    ]
}


const getshipfee = async(body:body)=>{
    try {
        const response = await axiosClient.post('/order/getviettelpost', body);
        return response.data;
    } catch (error) {
        return { success: false, message: 'Failed to fetch shipping fee',data:null };
    }
}
const creatqrpayos = async(body:any)=>{
    try {
        const response = await axiosClient.post('/order/createqrpayos', body);
        return response
    } catch (error) {
        return { success: false, message: 'Failed to fetch shipping fee',data:null };
    }
}

const checkordercode = async(orderCode:string)=>{
     try {
        // console.log(orderCode);
        
        const response = await axiosClient.post('/order/checkordercode', {ordercode:orderCode});
        return response
    } catch (error) {
        return { success: false, message:error,data:null };
    }
}

export {getshipfee,creatqrpayos,checkordercode};