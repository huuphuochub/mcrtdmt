    import axiosClient from "@/lib/axiosclient";


    const Addproduct =async(data:FormData)=>{
        try {
            const result = await axiosClient.post('/product/add',data);
            return{success:true,data:result.data}
        } catch (error) {
    return {
          success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
        }
    }
    const getAllproduct = async() =>{
        try {
            const result = await axiosClient.get('/product/getallproduct');
            // console.log(result);
            
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
        }
    }

    const getBesellerproduct = async() =>{
        try {
            const result = await axiosClient.get('/product/bestseller');
            // console.log(result);
            
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
        }
    }
    const getproductdetail = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/productdetail/${id}`)
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            }; 
        }
    }
    const getsizebyidproduct = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/getsizebyproduct/${id}`);
            return result;
        } catch (error) {
            return {
              success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
            
        }
    }
    export {Addproduct,getAllproduct,getBesellerproduct,getproductdetail,getsizebyidproduct}