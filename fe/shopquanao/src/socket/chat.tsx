// "use client";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001"); // NestJS server

// interface ChatMessage {
//   localId: string;       // random id FE tạo trước
//   user: string;
//   message?: string;
//   fileUrl?: string;      // Cloudinary url sau này
//   filePreview?: string;  // ảnh preview (blob url)
//   status?: "pending" | "sent" | "uploaded";
// }

// // interface ChatMessage {
// //   localId: string;       // random id FE tạo trước
// //   user: string;
// //   message?: string;
// //   fileUrl?: string;      // Cloudinary url sau này
// //   filePreview?: string;  // ảnh preview (blob url)
// //   status?: "pending" | "sent" | "uploaded";
// // }


//  function Chat() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     socket.emit("getMessages");

//     socket.on("messages", (msgs: ChatMessage[]) => {
//       setMessages(msgs);
//     });

//     socket.on("receiveMessage", (msg: ChatMessage) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("messages");
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     socket.emit("sendMessage", { user: "me", message: input });
//     setInput("");
//   };


// }

// const SendMessage = (files: File[], text?: string) =>{
//   const localId = crypto.randomUUID();
//   const newMessage: ChatMessage = {
//     localId,
//     user: "me",
//     message: text,
//     filePreview: files.length > 0 ? URL.createObjectURL(files[0]) : undefined,
//     status: files.length > 0 ? "pending" : "sent",
//   };
//   socket.emit("sendMessage", newMessage);
// }
// const CreateRoomchat= async(seller_id:number) =>{
//   socket.emit("createRoomchat", { seller_id });
// }
// export default {Chat,SendMessage};
