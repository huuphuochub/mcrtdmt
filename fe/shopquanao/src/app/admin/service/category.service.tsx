import axiosClient from "@/lib/axiosclient";

const getAllcate=async() =>{
    try {
        const allcate = await axiosClient.get('/category/getall');
        return allcate 
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'khong gui dc'
        }
    }
}

export {getAllcate}