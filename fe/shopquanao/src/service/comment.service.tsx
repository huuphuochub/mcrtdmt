import axiosClient from "@/lib/axiosclient"

// interface bodyaddcomment{
//     content:string;
//     star:number;
//     product_id:number;


// }

const addComment=async(body:FormData)=>{
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

const GetCmtSeller =async(seller_id:number,page:number) =>{
    try {
        const cmts = await axiosClient.get(`commentproduct/getcmtseller/${seller_id}`,{params:{page:page}})
        return cmts
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}


const addCmtSeller=async(body:FormData)=>{
    try {
        const add = await axiosClient.post('/commentproduct/addcmtseller',body)
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

const DeleteCmtProduct = async(id:number)=>{
    try {
        const decmt = await axiosClient.delete(`/commentproduct/delete/${id}`)
        return decmt
    } catch (error) {
        return{     
            success:true,
            data:null,
            message:'loi k gui dc'
        }
    }
}

export {addComment,addCmtSeller,GetallCommentByProduct,DeleteCmtProduct,GetCmtSeller}