"use client"

import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSeller } from "../context/sellercontext";
import { GetRoomSeller } from "../service/chat.service";
import { interfaceuser } from "@/interface/user.interface";
import ChatItem from "./chatitem";
import { socket } from "@/service/chat.service";

interface Roomchat{
    id:number;
    status:number;
    user:interfaceuser;
    date:string;
    lastmessage:string;
    userlast:string;
}
interface ChatProps {
  setIopen:() => void;
}
export default function Chat({setIopen}:ChatProps) {
  const [lastrole,setLastrole] = useState();
     const [isOpenChatItem, setIsOpenChatItem] = useState(false);
      const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

      const {seller} = useSeller();
      const [roomchats,setRoomchats] = useState<Roomchat[]>([])
      const [loadingroom,setLoadingRoom] = useState(true);
    
  const openChatitem = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsOpenChatItem(true);
    if(lastrole === 'user'){
            senMessItemClick(roomId)

    }

  };

    const senMessItemClick=(room_id:number)=>{
        socket.emit('watchitem_click',{room_id:room_id})
    }
  const closeChatitem = () => {
    setIsOpenChatItem(false);
    setSelectedRoomId(null);
  };

    useEffect(() =>{
        fetchchatrom()
    },[seller])
    const fetchchatrom =async() =>{
       try {
         const room = await GetRoomSeller();
            if(room.data.success){
                setRoomchats(room.data.data)
            }
       } catch (error) {
        console.log(error);
        
        setLoadingRoom(false)
       }finally{setLoadingRoom(false)}
        // console.log(room);
        
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
              ? { ...room, lastmessage: msg.message, status: msg.role === "user" ? 0 : 1 }
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
    
    return(
                    <div className="absolute bg-white w-[300px] right-0 h-[500px] border shadow rounded-lg">
                <div className="p-2 flex justify-between border-b">
                    <p className="text-xl font-bold">
                      Doan chat
                    </p>
                    <X onClick={setIopen} className="hover:cursor-pointer hover:text-red-500"/>
                </div>


                <div className="h-[450px] overflow-y-scroll">
                    {loadingroom ? (
                        <div>
                            loading
                        </div>
                    ) : (
                    <ul>

                    {/* chat item */}
                {roomchats.length>0 && roomchats.map((item) =>(
                    <li className="p-2 border-b hover:bg-gray-100 hover:cursor-pointer relative " key={item.id} onClick={() =>openChatitem(item.id)}>
                      <div className="flex gap-2">
                        <div>
                            <Image
                              width={50}
                              height={50}
                              src={item.user.avatarUrl}
                              alt="user"
                              className="rounded-full"
                            ></Image>
                        </div>
                        <div>
                          <p className="font-bold">
                            {item.user.username}
                          </p>
                          <p>
                            {item.lastmessage.length > 15
                                ? item.lastmessage.substring(0, 20) + "..."
                                : item.lastmessage}
                            </p>
                          
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-red-500 rounded-2xl absolute bottom-7 right-4">

                      </div>
                    </li>
                        ))}

                    


                  </ul>
                    )}

                  {isOpenChatItem && selectedRoomId !== null && (
                          <ChatItem isOpen={closeChatitem} room_id={selectedRoomId} 
                          user={roomchats.find(r => r.id === selectedRoomId)?.user}
                          />
                        )}
                </div>
            </div>
    )
}