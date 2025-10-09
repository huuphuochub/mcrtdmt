import axiosClient from "@/lib/axiosclient"

const Getnoti = async() =>{
    try {
        const data = await axiosClient.get('noti/notiseller')
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            messgae:'loi fe',
        }
    }
}


export {Getnoti}