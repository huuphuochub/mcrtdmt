    import axiosClient from "@/lib/axiosclient";
// import { interfaceuser } from "@/interface/user.interface";

type RegisterInput = {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
interface inforuser {
    // username: string;
    email: string;
    // phone: string;
    phoneorder:string;
    address: string;
    provinceId: number;
    districtId: number;
    wardsId: number;
}
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

const updateuser=async(data:FormData)=>{
    try {
        const result = await axiosClient.post(`/users/settinginfor`,data);
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

    const resetPassword=async(body:{password:string,newpassword:string})=>{
        try {
            const result = await axiosClient.post(`/users/resetpassword`,body);
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
    const CheckMail=async(email:string)=>{
        try {
            const result = await axiosClient.post(`/users/checkmail`,  { email });
            return result;
        } catch (error) {
            return {
                success: false,
                code: 'UNKNOWN_ERROR',
                message: error,
                data: null
            };
        }
    }
    const CheckVerifyCode=async(code:string)=>{
        try {
            const result = await axiosClient.post(`/users/verifyotp`,  { code });

            return result;
        }
            catch (error) {
            return {
                success: false,
                code: 'UNKNOWN_ERROR',
                message: error,
                data: null
            };
        }
    }
    const resetPasswordemail = async(email:string,newpassword:string)=>{
        try {
            const result = await axiosClient.post(`/users/resetpasswordemail`,{email,newpassword}); 
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

export {Registrationuser,resetPasswordemail,resetPassword,CheckMail,CheckVerifyCode, Postloginuser,Getuserbyid,Logout,updateuser};