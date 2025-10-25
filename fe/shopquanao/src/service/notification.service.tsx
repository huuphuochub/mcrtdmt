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

const getNoti = async()=>{
    try {
        const data = await axiosClient.get('noti/getnoti');
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const updateRead = async(id:number) =>{
     try {
        const data = await axiosClient.post(`noti/updatenoti/${id}`);
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
export {AddNotufication,getNoti,updateRead}