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
const createorderservice = async(body:any) => {
    try {
        const result = await axiosClient.post('/order/createorder' , body);
        return  result;

        
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi'
        }
    }
}
const getorderdetail = async(ordercode:number) =>{
    try {
            const response = await axiosClient.get(`/order/getorderitem/${ordercode}`);
        return response;
    } catch (error) {
         return{
            success:false,
            data:null,
            message:'loi'
        }
    }
}
const updatestatus = async(body:any)=>{
    try {
        const response = await axiosClient.post('/order/updatestatus',body)
        return response
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi'
        }
    }
}
const Getorderitembyid = async(id:number)=>{
    try {
        const response = await axiosClient.get(`/order/getorderitembyid/${id}`)
        return response
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi'
        }
    }
}

const getallorder = async() =>{
    try {
        const response = await axiosClient.get('/order/getallorder')
        return response
    } catch (error) {
         return{
            success:false,
            data:null,
            message:'loi'
        }
    }
}

const updateordermail = async(body:any) =>{
    try {
        const up = await axiosClient.post('/order/updateordermail',body)
        return up
    } catch (error) {
        return {
            success:false,
            message:'loi',
            data:null
        }
    }
}
const CheckHasBought =async(product_id:number)=>{
    try {
        const up = await axiosClient.get(`/order/checkhasbought/${product_id}`)
        return up
    } catch (error) {
        return {
            success:false,
            message:'loi',
            data:null
        }
    }
}
export {getshipfee,CheckHasBought,creatqrpayos,checkordercode,createorderservice,getorderdetail,updatestatus,Getorderitembyid,getallorder,updateordermail};