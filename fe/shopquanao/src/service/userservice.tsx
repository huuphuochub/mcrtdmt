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
        
    } catch (error) {
    return {
      success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
    }
}
const Postloginuser = async(data:Loginuser)=>{
    try {
        const result = await axiosClient.post(`/users/login`,data);
        return result
        ;
    } catch (error) {
    return {
          success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
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

    } catch (error) {
        //  console.error("loi lay user");
    return {
           success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
    }
}
const Logout = async() =>{
    try {
        const result = await axiosClient.post(`/users/logout`);
        return result;

    } catch (error) {
        //  console.error("loi lay user");
    return {
           success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
    }
}
export {Registrationuser, Postloginuser,Getuserbyid,Logout};