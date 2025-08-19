    import axiosClient from "@/lib/axiosclient";


    type Category ={
        id:number;
        name:string;
        imageurl:string;

    }

    type Subcategory = {
        id:number;
        name:string;
        categoryId:number;
    }

    const Getallcategory = async() =>{
        try {
            const result = await axiosClient.get('/category/getall');
            return result
        } catch (error:any) {
             const errRes = error.response?.data;
            return {
            success: false,
            code: errRes?.code || 'UNKNOWN_ERROR',
            message: errRes?.message || 'Đã xảy ra lỗi',
            data:null,
            };
        }
    }
    const Getsubcatygorybyid = async(id:number) =>{
        try {
            const result = await axiosClient.get(`/subcategory/${id}`);
             return {
                success: true,
                data: result.data,
             }
        } catch (error:any) {
             const errRes = error.response?.data;
            return {
            success: false,
            code: errRes?.code || 'UNKNOWN_ERROR',
            message: errRes?.message || 'Đã xảy ra lỗi',
            };
        }
    }
    const getcategory = async() =>{
        try {
            const result = await axiosClient.get('/getallcategory');
            return result;
        } catch (error) {
            return error;
        }
    }
    const getjsonbycategory = async(id:number) =>{
        try {
            const reslut = await axiosClient.get(`/category/getjsoncategory/${id}`);
            return reslut;
        } catch (error) {
            return error
        }
    }
    export {Getallcategory,Getsubcatygorybyid,getcategory,getjsonbycategory}