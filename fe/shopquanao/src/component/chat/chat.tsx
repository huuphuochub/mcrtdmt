"use client";
import { useChat } from "@/app/context/chat.context";
import { useUser } from "@/app/context/usercontext";
import { MessageCircleMore } from "lucide-react";
import ChatRoom from "./chatroom";
import ChatItem from "./chatitem";

export default function Chat() {
  const { user } = useUser();
  const { roomchat, itemchat, roomId, sellerId,setRoomchat } = useChat();

  return (
    <div className="fixed bottom-4 right-0 z-30 m-4">
      {/* Icon chat */}
      <div className="bg-gray-300 p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-400 relative" onClick={() =>setRoomchat(true)}>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          1
        </div>
        <MessageCircleMore size={35} />
      </div>

     
        <div>
          {roomchat && <ChatRoom user_id={user?.id ?? null} />}
          {itemchat && roomId  && (
            <ChatItem/>
          )}
        </div>
    </div>
  );
}
