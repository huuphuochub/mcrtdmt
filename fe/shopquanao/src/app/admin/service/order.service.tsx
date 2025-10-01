import axiosClient from "@/lib/axiosclient"

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

const UpdateStatusOrderItem = async(order_id:number,status:number) =>{
    try {
        const up = await axiosClient.post('order/updatestatusorderitem',{order_id:order_id,status:status})
        return up
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe',
        }
    }
}

export {getOrderItemBySller,getOrderDetailbySeller,UpdateStatusOrderItem}