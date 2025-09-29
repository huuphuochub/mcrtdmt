import axiosClient from "@/lib/axiosclient"

const GetRoomSeller = async()=>{
    try {
        const room = await axiosClient.get('chat/roomseller')
        return room
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi k guiwr dc'
        }
    }
}
const GetChatItem = async(room_id:number,page:number)=>{
  try {
    const chatitems = await axiosClient.get(`chat/chatitems`,{
      params:{room_id:room_id,page:page}
    })
    return chatitems
  } catch (error) {
    return{
      success:false,
      message:'k gui dc',
      data:null
    }
  }
}

const SendMessageseller = async(formdata:FormData) =>{

  try {
    const send = await axiosClient.post('chat/sendmesseller',formdata)
    return send
  } catch (error) {
    return{
      success:false,
      data:null,
      message:'loi k gui dc'
    }
  }
}


export {GetRoomSeller,GetChatItem,SendMessageseller}