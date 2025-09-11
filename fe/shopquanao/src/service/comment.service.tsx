import axiosClient from "@/lib/axiosclient"

interface bodyaddcomment{
    content:string;
    star:number;
    product_id:number;


}

const addComment=async(body:bodyaddcomment)=>{
    try {
        const add = await axiosClient.post('/commentproduct/addcomment',body)
        return add
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi k gui dc'
        }
    }
}
const GetallCommentByProduct = async(product_id:number,page:number)=>{
    try {
        const body = {
            product_id,page
        }
        const cmt = await axiosClient.post('/commentproduct/getall',body)
        return cmt
    } catch (error) {
        return{
            success:true,
            data:null,
            message:'loi k gui dc'
        }
    }
}

export {addComment,GetallCommentByProduct}