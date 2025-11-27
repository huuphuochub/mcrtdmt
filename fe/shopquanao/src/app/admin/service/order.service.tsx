import axiosClient from "@/lib/axiosclient"


interface variants {
    product_id:number;
    quantity:number;
    color_id:number;
    size_id:number;
} 
const getOrderItemBySller = async(page:number,limit:number,month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/orderitembyseller',{page:page,limit:limit,month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi k gui dc'
        }
    }
}
const getOrderDetailbySeller = async(order_id:number) =>{
    try {
        const data = await axiosClient.post('order/orderdetailseller',{order_id:order_id})
        return data
    } catch (error) {
        return{
            success:false,
            message:'k gui dc',
            data:null
        }
    }
}

const UpdateStatusOrderItem = async(order_id:number,status:number,variant:variants[],cancelReason:string,totalRevenue:number) =>{
    try {
        const up = await axiosClient.post('order/updatestatusorderitem',{order_id:order_id,status:status,variant:variant,cancelReason:cancelReason,totalRevenue:totalRevenue})
        return up
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe',
        }
    }
}

const CountOrderBySeller = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/countorder',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const CountCustomerBySeller = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/countcustomer',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const CountRevenueBySeller = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/countrevenue',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const CountProductBySeller = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/countproduct',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}


const DoashboardRevenue = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/doashboardrevenue',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}

const Doashboardtopproductsell = async(month:number,year:number,limit:number) =>{
    try {
        const data = await axiosClient.post('order/doashboardtopproductsell',{month:month,year:year,limit:limit})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}

const Doashboardtopproductrevenue = async(month:number,year:number) =>{
    try {
        const data = await axiosClient.post('order/doashboardtopproductrevenue',{month:month,year:year})
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
export {Doashboardtopproductrevenue,Doashboardtopproductsell,DoashboardRevenue,getOrderItemBySller,getOrderDetailbySeller,UpdateStatusOrderItem,CountOrderBySeller,CountProductBySeller,CountRevenueBySeller,CountCustomerBySeller}