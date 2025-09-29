"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // NestJS server

interface ChatMessage {
  user: string;
  message: string;
}

export default function Chat() {
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

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", { user: "me", message: input });
    setInput("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Realtime Chat</h1>
      <div className="border h-64 overflow-y-auto mb-4 p-2 bg-gray-50">
        {messages.map((m, i) => (
          <p key={i}>
            <span className="font-semibold">{m.user}:</span> {m.message}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
