"use client";
import React, { useContext } from "react";

interface ChatContextType {
  roomchat: boolean;
  itemchat: boolean;
  setRoomchat: (roomchat: boolean) => void;
  setItemchatcontext: (itemchat: boolean) => void;
  selleravatar:string;
  usernameseller:string;
  // userId: number | null;
  roomId:number | null
  sellerId: number | null;
  // setUser: (user_id: number) => void;
  setRoom:(room_id:number) => void;
  setavt:(avatar:string) => void;
  setusn:(username:string) =>void;
  setSellerchat: (seller_id: number) => void;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomchat, setRoomchat] = React.useState(false);
  const [itemchat, setItemchatcontext] = React.useState(false);
  // const [userId, setUserId] = React.useState<number | null>(null);
  const [roomId,setRoomId] = React.useState<number | null>(null)
  const [sellerId, setSellerId] = React.useState<number | null>(null);
  const [selleravatar,setSelleravatar] = React.useState('')
  const [usernameseller,setUsernameseller] = React.useState('')

  // const setUser = (user_id: number) => setUserId(user_id);
  const setRoom = (room_id:number) => setRoomId(room_id);
  const setSellerchat = (seller_id: number) => setSellerId(seller_id);
  console.log(roomId);
  // console.log();
  const setavt =(avatar:string) => setSelleravatar(avatar);
  const setusn =(username:string) => setUsernameseller(username);
  
  return (
    <ChatContext.Provider
      value={{
        roomchat,
        setavt,
        selleravatar,
        usernameseller,
        setusn,
        itemchat,
        setRoomchat,
        setItemchatcontext,
        // userId,
        sellerId,
        // setUser,
        setRoom,
        roomId,
        setSellerchat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
