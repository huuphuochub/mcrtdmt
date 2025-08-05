    import axiosClient from "@/lib/axiosclient";


type RegisterInput = {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
type Loginuser = {
    phone:string;
    password:string;
}

const Registrationuser = async(data:RegisterInput) =>{
    try {
        const result = await axiosClient.post(`/users/register`, data);
        // console.log(reponse);
         return result;
        
    } catch (error:any) {
        const errRes = error.response?.data;
    return {
      success: false,
      code: errRes?.code || 'UNKNOWN_ERROR',
      message: errRes?.message || 'Đã xảy ra lỗi',
    };
    }
}
const Postloginuser = async(data:Loginuser)=>{
    try {
        const result = await axiosClient.post(`/users/login`,data);
        return result
        ;
    } catch (error:any) {
        const errRes = error.response?.data;
    return {
      success: false,
      code: errRes?.code || 'UNKNOWN_ERROR',
      message: errRes?.message || 'Đã xảy ra lỗi',
    };
    }
}
const Getuserbyid = async() =>{
    try {
        const result = await axiosClient.get(`/users/me`);
        return {
      success: true,
      data: result.data,
    };

    } catch (error:any) {
        //  console.error("loi lay user");
         const errRes = error.response?.data;
    return {
      success: false,
      code: errRes?.code || 'UNKNOWN_ERROR',
      message: errRes?.message || 'Đã xảy ra lỗi',
    };
    }
}
const Logout = async() =>{
    try {
        const result = await axiosClient.post(`/users/logout`);
        return result;

    } catch (error:any) {
        //  console.error("loi lay user");
         const errRes = error.response?.data;
    return {
      success: false,
      code: errRes?.code || 'UNKNOWN_ERROR',
      message: errRes?.message || 'Đã xảy ra lỗi',
    };
    }
}
export {Registrationuser, Postloginuser,Getuserbyid,Logout};