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

    export {Getallcategory,Getsubcatygorybyid}