    import axiosClient from "@/lib/axiosclient";


    const Addproduct =async(data:FormData)=>{
        try {
            const result = await axiosClient.post('/product/add',data);
            return{success:true,data:result.data}
        } catch (error:any) {
             const errRes = error.response?.data;
    return {
      success: false,
      code: errRes?.code || 'UNKNOWN_ERROR',
      message: errRes?.message || 'Đã xảy ra lỗi',
    };
        }
    }

    export {Addproduct}