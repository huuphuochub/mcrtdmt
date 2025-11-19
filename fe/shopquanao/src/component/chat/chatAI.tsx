"use client"

import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { interfaceProduct } from "@/interface/product.interface";
import { ChatAIService } from "@/service/chat.service";
interface ChatAIprop{
    openCHatAi:() => void;
}
interface chatBoxAI{
    role:"user" | "AI";
    message:string;
    products:interfaceProduct[] | null;

}
export default function ChatAI({openCHatAi}:ChatAIprop){

        // const chatCacheRef = useRef<Record<string, { items: any[]; page: number; scrollTop: number }>>({});
        const bottomRef = useRef<HTMLDivElement>(null);

        const [datachat, setDatachat] = useState<chatBoxAI[]>([
        {
            role: "AI",
            message: "Chào bạn 👋, mình là LeftFashion AI. Bạn cần mình giúp gì ạ?",
            products: null,
        },
        ]);    
    const [pos, setPos] = useState({ x: -500, y: -100 });
      const [dragging, setDragging] = useState(false);
      const [offset, setOffset] = useState({ x: 0, y: 0 });
    //   const [visible, setVisible] = useState(true);
    // const listRef = useRef<HTMLDivElement | null>(null);
    const [loadingchatai,setLoadingchatai] = useState(false);





    // const [message,setMessage] = useState<string>('');



const [input, setInput] = useState("");

useEffect(() => {
  if ( bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [datachat]);

// ham chỉnh vị trí chat
 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setPos({ x: -80, y: -60 });
      } else {
        setPos({ x: -500, y: -100 });
      }
    };

    handleResize(); // chạy 1 lần khi mở
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
const handleSend = async (message?: string) => {
  if (!input.trim()) return;

  const newMessage: chatBoxAI = {
    role: "user",
    message: input,
    products: null,
  };

  setDatachat(prev => [...prev, newMessage]);

  try {
    setLoadingchatai(true);
          setInput("");

    const res = await ChatAIService({prompt:input})
    

      console.log(res);
      

    // const data = await res.data.json();

    const aiResponse: chatBoxAI = {
      role: "AI",
      message: res.data.message || "Xin lỗi, mình chưa hiểu rõ câu hỏi của bạn ạ 😅",
      products: res.data.products || null,
    };

    setDatachat(prev => [...prev, aiResponse]);
  } catch (err) {
    console.error(err);
    setDatachat(prev => [
      ...prev,
      { role: "AI", message: "Đã có lỗi xảy ra, bạn thử lại nhé 😢", products: null },
    ]);
  }finally{
    setLoadingchatai(false)
  }
};


function toSlug(name: string) {
  return name
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '');    
}

const quickchat = (value:string) =>{
    setInput(value);
  handleSend(value);
}

          const onMouseDown = (e: React.MouseEvent) => {
            setDragging(true);
            setOffset({
              x: e.clientX - pos.x,
              y: e.clientY - pos.y,
            });
          };
        
          const onMouseMove = (e: React.MouseEvent) => {
            if (!dragging) return;
            setPos({
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            });
          };
        
          const onMouseUp = () => setDragging(false);
    return(
        <div 
                        style={{
                        position: "absolute",
                        left: pos.x,
                        top: pos.y,
                        zIndex:100,
                        width: 370,
                        border: "1px solid gray",
                        borderRadius: "8px",
                        background: "white",
                        userSelect: "none",
                        }}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                    
                    >
                    <div 
                         onMouseDown={onMouseDown}
                        style={{
                        background: "#e5e7eb ",
                        padding: "8px",
                        cursor: "grab",
                        borderBottom: "1px solid #aaa",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}
                    
                    >
                        <div className="flex gap-2 items-center"
                        
                        >
                            
                            <div>
                                <p className="font-bold">Chat AI</p>
                                <div className="flex gap-2 items-center">
                                    <p>Online</p>
                                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <X className="hover:text-red-500 hover:cursor-pointer" onClick={openCHatAi}/>
                            
                        
                        </div>
                    </div>




                    <div className="h-[458px] overflow-y-auto p-2">
                        <ul className="flex flex-col gap-2 mt-2">
                                {datachat && datachat.map((item,index) =>(
                                    <li className={`${item.role === "AI" ? "self-start" : "self-end"}  items-start flex flex-col `} key={index}>
                                    <p className={`  ${item.role === "AI" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}   px-3 py-2 rounded-xl inline-block`}>
                                    {item.message}
                                </p>

                                 {item.products && item.products?.length > 0 ?(
                                    <div className="grid grid-cols-2 gap-2">
                                   

                                             {item.products.map((product) =>(
                                                <Link href={`/${toSlug(product.name)}-i.${product.id}.${product.id}`} key={product.id}>
                                                <div className="flex justify-end">
                                                <div className="bg-gray-200 p-2 rounded-lg mt-1">
                                                <Image
                                                    width={150}
                                                    height={150}
                                                    src={`${product.image}`}
                                                    alt="Chat Image"
                                                    className="rounded-xl mt-2 max-w-[150px] max-h-[150px]"
                                                />
                                                <div>
                                                    <p className="font-bold hover:text-red-500">{product.name}</p>
                                                </div>
                                                 <div>
                                                    <p className="font-bold hover:text-red-500">{product.price} đ</p>
                                                </div>
                                                </div>
                                                </div>
                                            </Link>
                                             ))}
                                </div>
                                 ) : (
                                    <div>

                                    </div>
                                 )}
                                </li>
                                )) }
                               {loadingchatai && (
                                <li>
                                     <div className="bg-gray-200 inline-block  px-4 py-2 rounded-2xl">
                                    <span className="flex space-x-1">
                                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
                                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
                                    </span>
                                    </div>
                               </li>
                               )}
                        </ul>
                                                        <div ref={bottomRef}></div>

                    </div>



                   <div className="flex  gap-2 flex-nowrap w-auto overflow-x-auto">
                      <p className="p-2 border rounded-xl whitespace-nowrap hover:cursor-pointer" onClick={() => quickchat("shop có trang sức nào giá 500k đổ lại k ạ")}>
                        shop có trang sức nào giá 500k đổ lại k ạ
                      </p>
                      <p className="p-2 border rounded-xl whitespace-nowrap hover:cursor-pointer" onClick={() => quickchat("shop có trương chình khuyến mãi nào không ạ")}>
                        shop có trương chình khuyến mãi nào không ạ
                      </p>
                      <p className="p-2 border rounded-xl whitespace-nowrap hover:cursor-pointer" onClick={() => quickchat("Phí ship tính sao ạ")}>
                        Phí ship tính sao ạ
                      </p>
                      <p className="p-2 border rounded-xl whitespace-nowrap hover:cursor-pointer" onClick={() => quickchat("Mình muốn mua quần jean nam")}>
                        Mình muốn mua quần jean nam
                      </p>
                    </div>

                    <div className="border-t p-2">
                        {/* Preview ảnh */}



                        <div className="flex items-center gap-2">
                            {/* Nút chọn file */}
                          


                          


                           {/* sản phẩm tag */}

                           <div className="absolute bottom-[50px] left-0 bg-white border p-2 rounded-lg  hidden">
                               
                           </div>
                          
                            <input
                            type="text"
                            // placeholder="Type your message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSend()}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border rounded-xl px-3 py-2 outline-none"
                            // className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // onChange={(e) => setMessage(e.target.value)}
                             

                            />
                        
                            {/* Nút gửi */}
                            <Button className=" rounded-full " >
                                Send
                            </Button>
                        </div>
                    </div>

                </div>
    )
}