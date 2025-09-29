"use client";
import axiosClient from "@/lib/axiosclient";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { useUser } from "@/app/context/usercontext";
import { Chatroominterface } from "@/interface/chat.interface";
import { ChatIteminterface } from "@/interface/chat.interface";

// const {user} = useUser
 const socket = io("http://localhost:3001",{
  withCredentials: true,
  query:{user_id:1}
}); // NestJS server

interface ChatMessage {
  localId: string;       // random id FE tạo trước
  user: string;
  message?: string;
  fileUrl?: string;      // Cloudinary url sau này
  filePreview?: string;  // ảnh preview (blob url)
  status?: "pending" | "sent" | "uploaded";
}

// interface ChatMessage {
//   localId: string;       // random id FE tạo trước
//   user: string;
//   message?: string;
//   fileUrl?: string;      // Cloudinary url sau này
//   filePreview?: string;  // ảnh preview (blob url)
//   status?: "pending" | "sent" | "uploaded";
// }


 function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("getMessages");

    socket.on("messages", (msgs: ChatMessage[]) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("messages");
      socket.off("receiveMessage");
    };
  }, []);

  // const sendMessage = () => {
  //   if (!input.trim()) return;
  //   socket.emit("sendMessage", { user: "me", message: input });
  //   setInput("");
  // };


}

const SendMessage = async(formdata:FormData) =>{

  try {
    const send = await axiosClient.post('chat/sendmess',formdata)
    return send
  } catch (error) {
    return{
      success:false,
      data:null,
      message:'loi k gui dc'
    }
  }

  // const localId = crypto.randomUUID();
  // const newMessage: ChatMessage = {
  //   localId,
  //   user: "me",
  //   message: text,
  //   filePreview: files.length > 0 ? URL.createObjectURL(files[0]) : undefined,
  //   status: files.length > 0 ? "pending" : "sent",
  // };
  // socket.emit("sendMessage", formdata);
}
const CreateRoomchat= async(seller_id:number) =>{
  try {
    const room = await axiosClient.post('chat/creatroom',{seller_id:seller_id})
    return room
  } catch (error) {
    return{
      success:false,
      data:null,
      message:'loi k gui dc'
    }
  }
}

const checkRoom=async(seller_id:number)=>{
  console.log('goi lần n');
  
  try {
    const ccheck= await axiosClient.post('/chat/check',{seller_id:seller_id});
    return ccheck
  } catch (error) {
    return{
      success:false,
      message:'Lỗi hệ thống',
      data:null
    }
  }

}

const GetChatRoom = async() =>{
  try {
    const room= await axiosClient.post('/chat/rooms');
    return room
  } catch (error) {
    return{
      success:false,
      message:'Lỗi hệ thống',
      data:null
    }
  }
}

const GetChatItem = async(room_id:number,page:number)=>{
  try {
    const chatitems = await axiosClient.get(`chat/chatitems/`,{
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
export  {socket,Chat,SendMessage,CreateRoomchat,checkRoom,GetChatRoom,GetChatItem};
