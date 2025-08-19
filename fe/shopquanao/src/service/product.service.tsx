    import axiosClient from "@/lib/axiosclient";


    const Addproduct =async(data:FormData)=>{
        try {
            const result = await axiosClient.post('/product/add',data);
            return{success:true,data:result.data}
        } catch (error:any) {
             const errRes = error.response?.data;
    return errRes;
        }
    }
    const getAllproduct = async() =>{
        try {
            const result = await axiosClient.get('/product/getallproduct');
            // console.log(result);
            
            return result;
        } catch (error:any) {
            const errRes = error.response?.data;
            return errRes;
        }
    }

    const getBesellerproduct = async() =>{
        try {
            const result = await axiosClient.get('/product/bestseller');
            // console.log(result);
            
            return result;
        } catch (error:any) {
            const errRes = error.response?.data;
            return errRes;
        }
    }
    const getproductdetail = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/productdetail/${id}`)
            return result;
        } catch (error:any) {
            const errRes = error.response?.data;
            return errRes; 
        }
    }
    const getsizebyidproduct = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/getsizebyproduct/${id}`);
            return result;
        } catch (error) {
            return error;
            
        }
    }
    export {Addproduct,getAllproduct,getBesellerproduct,getproductdetail,getsizebyidproduct}