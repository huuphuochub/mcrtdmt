import axiosClient from "@/lib/axiosclient";

const sendmailorder = async(body:any) =>{
    try {
        const email = await axiosClient.post("/order/sendemailorder",body)
        return email
    } catch (error) {
        return{
            data:null,
            success:false,
            message:error
        }
    }
}

export {sendmailorder}