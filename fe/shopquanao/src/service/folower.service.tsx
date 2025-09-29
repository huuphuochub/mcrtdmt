import axiosClient from "@/lib/axiosclient";


const AddFl = async(seller_id:number) =>{
    try {
        const add = await axiosClient.post('follower/addfl',{seller_id:seller_id})
        return add
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi k gui dc'
        }
    }
}

const CheckFl = async(seller_id:number) =>{
    try {
        const add = await axiosClient.post('follower/checkfl',{seller_id:seller_id})
        return add
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi k gui dc'
        }
    }
}
const UnFl = async(seller_id:number)=>{
    try {
        const un = await axiosClient.post('follower/unfl',{seller_id:seller_id});
        return un
    } catch (error) {
        return{
            success:false,
            message:'loi',
            data:null
        }
    }
}

export {AddFl,CheckFl,UnFl}