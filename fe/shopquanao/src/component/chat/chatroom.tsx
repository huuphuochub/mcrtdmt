"use client"

import { EllipsisVertical, Eye, Paperclip, X } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/app/context/chat.context";
import React, { useEffect, useState } from "react";
import ChatItem from "./chatitem";

import { GetChatRoom, socket } from "@/service/chat.service";
import { Chatroominterface } from "@/interface/chat.interface";
export default function ChatRoom({user_id} : {user_id:number}) {
    const { setavt,setusn ,setRoomchat,setItemchatcontext,setSellerchat,setRoom} = useChat();
    const [loading,setLoading] = useState(true);
    const [lastrole,setLastrole] = useState();
    const [roomchats,setRoomchats] = useState<Chatroominterface[]>([])
// const [isOpen, setIsOpen] = React.useState(false);
    // const [isOpenItem, setIsOpenItem] = React.useState(false);
    const ClickOpenChatItem=(room_id:number,avatar:string,username:string,seller_id:number) =>{
        // if(!roomId) return
        setavt(avatar);
        setusn(username)
        setItemchatcontext(true);
        setRoom(room_id);
        setSellerchat(seller_id);
        if(lastrole === 'seller'){
            senMessItemClick(room_id)
        }

    }

    const senMessItemClick=(room_id:number)=>{
        socket.emit('watchitem_click',{room_id:room_id})
    }

    
    useEffect(() => {
      const handleMessage = (msg: any) => {
        console.log(msg);
    
        setRoomchats((prev) =>
          prev.map((chat) =>
            chat.id === msg.room_id
              ? { ...chat, status: 1 } // cập nhật status
              : chat // giữ nguyên nếu không match
          )
        );
      };
    
      socket.on("watched_mess", handleMessage);
    
      return () => {
        socket.off("watched_mess", handleMessage);
      };
    }, []);


      useEffect(() =>{
    const handleMessage = (msg:any) =>{
        console.log(msg);
        setLastrole(msg.role)
       setRoomchats((prev) => {
        const updated = prev.map((room) =>
            room.id === msg.room 
            ? { ...room, lastmessage: msg.message, status: msg.role === "user" ? 1 : 0 }
            : room
        );

        // đẩy phòng vừa update lên đầu
        return updated.sort((a, b) => (a.id === msg.room ? -1 : b.id === msg.room ? 1 : 0));
        });

    }
    socket.on("new_message",handleMessage)
        
        return () =>{
            socket.off("new_message",handleMessage)
        }
        
    
  },[])

    useEffect(() =>{
        fetchroom()
    },[user_id])
    const fetchroom = async() =>{
        try {
            const rooms = await GetChatRoom();
            console.log(rooms);
            
            if(rooms.data.success){
                setRoomchats(rooms.data.data)
            }
            

        } catch (error) {
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    return(
                    <div className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-2 w-[300px] h-[500px]">
                <div className="border-b pb-2 flex justify-between items-center">
                    <p className="text-2xl ">Đoạn chat</p>
                    <X className="hover:text-red-500 hover:cursor-pointer" onClick={() => setRoomchat(false)}/> 
                </div>
                <div className="h-[438px] overflow-y-auto">
                    {loading ? (
                        <div>
                            loading
                        </div>
                    ) : (
                        <ul>
                        {roomchats.length>0 && roomchats.map((item) =>(
                            <li className="mt-2 relative" onClick={() => ClickOpenChatItem(item.id,item.seller.avatar,item.seller.usernameseller,item.seller.id)} key={item.id}>
                            <div className=" flex justify-between items-center p-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                                <div className=" flex gap-2 ">
                                    <Image 
                                        width={50}
                                        height={50}
                                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                        alt="Chat Image"
                                        className="rounded-full"
                                    ></Image>
                                    <div>
                                        <p className="font-bold">{item.seller.usernameseller}</p>
                                        <div className="flex gap-2 items-center">
                                            <p>
                                            {item.lastmessage.length > 15
                                                ? item.lastmessage.substring(0, 20) + "..."
                                                : item.lastmessage}
                                            </p>
                                            {item.status === 0 ?(
                                            <div className="bg-red-500 rounded-2xl p-0 w-2 h-2  tex-xs absolute right-[25px]">
                                                
                                            </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </li>
                        ))}

                        
                    </ul>
                    )}
                    
                </div>
                
                
            
            </div>
    )
}