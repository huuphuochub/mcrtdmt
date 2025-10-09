import axiosClient from "@/lib/axiosclient"


const AddNotufication = async(body:any) =>{
    try {
        const add = await axiosClient.post('noti/addnoti',body);
        return add
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}

export {AddNotufication}