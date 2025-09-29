"use client"

import { EllipsisVertical, Eye, Images, Paperclip, X,Check  } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@/app/context/chat.context";
import Button from "../ui/button";
import { GetChatItem, SendMessage } from "@/service/chat.service";
import { ChatIteminterface } from "@/interface/chat.interface";
import { ProductTag } from "../product/product";
import Link from "next/link";
import { socket } from "@/service/chat.service";

interface chatiteminfor extends ChatIteminterface{
    role:string
}
export default function ChatItem() {
        const chatCacheRef = useRef<Record<string, { items: any[]; page: number; scrollTop: number }>>({});

    
    const [pos, setPos] = useState({ x: -700, y: -500 });
      const [dragging, setDragging] = useState(false);
      const [offset, setOffset] = useState({ x: 0, y: 0 });
      const [visible, setVisible] = useState(true);
    const listRef = useRef<HTMLDivElement | null>(null);

      const [message,setMessage] = useState('');
      const [tag,setTag] = useState(0);
    const { roomchat, itemchat,sellerId, roomId, selleravatar,usernameseller,setItemchatcontext} = useChat();
      const [images, setImages] = useState<File[]>([])  ;
      const [isSelecttag,setIsSelecttag] = useState(false);
      const [itemschat,setItemChat] = useState<ChatIteminterface[]>([])
      const [loadingitem,setLoadingitem] =useState(true) 
      const [page,setPage] = useState(1)
      const [nametag,setNametag] = useState<string>()
      const [imagetag,setImagetag] = useState<string>()
        const bottomRef = useRef<HTMLDivElement>(null);
        const [loadingMore, setLoadingMore] = useState(false);


    
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
    
useEffect(() => {
  if (!loadingMore && bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [itemschat, loadingMore]);



  useEffect(() =>{
    // if(!roomId) return
    console.log(roomId);
    
    const handleMessage = (msg:chatiteminfor) =>{
        console.log(msg);
        if(msg.role ==="user" && roomId === msg.room){
            const newdata = {
                id:msg.id,
                message:msg.message,
                imageurl:msg.imageurl,
                tag:msg.tag,
                user:msg.user,
                seller:null,
                createdAt:msg.createdAt,
                status:msg.status,
                room:msg.room,
                role:msg.role,
            }
                    setItemChat((prev) => [...prev,newdata])
                    // watchmess(newdata)

        }else if(msg.role ==="seller" && roomId === msg.room){
            const newdata = {
                id:msg.id,
                message:msg.message,
                imageurl:msg.imageurl,
                tag:msg.tag,
                user:null,
                seller:msg.seller,
                createdAt:msg.createdAt,
                status:itemchat ? 1 : msg.status,
                room:msg.room,
                role:msg.role,
            }
                    setItemChat((prev) => [...prev,newdata])
                watchmess(newdata)


        }

    }
    socket.on("new_message",handleMessage)
        
        return () =>{
            socket.off("new_message",handleMessage)
        }
        
    
  },[roomId])
  const watchmess =(newdata:chatiteminfor) =>{
        socket.emit('watch_mess',newdata)
  }


function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}
        
    const handleAddTag=() =>{
        setIsSelecttag(!isSelecttag);
    }

    useEffect(() =>{
        if(roomId){
            FetchChat()
            // console.log(roomId);
            
        }
    },[roomId,page])
    useEffect(() =>{
        setPage(1)
                setLoadingMore(false);

    },[roomId])
    const FetchChat = async() =>{
        if(!roomId) return
          const prevScrollHeight = listRef.current?.scrollHeight || 0;

        try {
            const chatitem = await GetChatItem(roomId,page);
            console.log(chatitem.data);
            
        if(chatitem.data.success && page === 1){
            setItemChat([...chatitem.data.data].reverse())

        }else{
            setItemChat((prev) => [...chatitem.data.data.reverse(), ...prev])
            requestAnimationFrame(() => {
                if (listRef.current) {
                    const newScrollHeight = listRef.current.scrollHeight;
                    listRef.current.scrollTop =
                    newScrollHeight - prevScrollHeight;
                }
                });
            
        }
        } catch (error) {
            setLoadingitem(false)
        }finally{
            setLoadingitem(false)
        }
        // console.log(chatitem);
        
    }

      const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop } = listRef.current;

    // khi scroll tới đỉnh
    if (scrollTop === 0) {
      const prevScrollHeight = listRef.current.scrollHeight;

      setPage((prev) => prev + 1);
        setLoadingMore(true);


      // trick: chờ render xong rồi giữ nguyên vị trí scroll
      setTimeout(() => {
        if (listRef.current) {
          const newScrollHeight = listRef.current.scrollHeight;
          listRef.current.scrollTop = newScrollHeight - prevScrollHeight;
        }
      }, 0);
    }
  };

const handleProductId = (id: number,name:string,image:string) => {
    setIsSelecttag(false)
//   console.log("Sản phẩm con truyền lên:", id);
  setNametag(name);
  setImagetag(image);

  
  
  setTag(id)
//   setSelectedProductId(id); // lưu vào state cha
};

useEffect(() => {
  const handleMessage = (msg: any) => {
    console.log(msg);

    setItemChat((prev) =>
      prev.map((chat) => ({
        ...chat,
        status: 1, // gán hết = 1
      }))
    );
  };

  socket.on("watched_mess", handleMessage);

  return () => {
    socket.off("watched_mess", handleMessage);
  };
}, [roomId]);

const handleSenMess=async()=>{

    
    const formdata = new FormData();

    if(roomId){
        formdata.append('room_id',roomId.toString())
    }
    if(imagetag){
        formdata.append('imagetag',imagetag)
    }
    if(nametag){
        formdata.append('nametag',nametag)
    }
    if(tag){
        formdata.append('tag',tag.toString())
    }
    if(images && images.length>0){
        images.forEach((file:File,index:number) =>{
            formdata.append('files',file)
        })
    }
    // formdata.append('user',)
    if(sellerId){
        formdata.append('seller_id',sellerId?.toString())

    }
    // formdata.append('')
    formdata.append('message',message)
    
      const localId = crypto.randomUUID();
    formdata.append('localid',localId)
    formdata.append('role','user')


    try {
            await SendMessage(formdata)

    } catch (error) {
        
    }finally{
        setMessage("");
        setImagetag("");
        setNametag("");
        setTag(0);      // nếu tag là number/string thì set null
        setImages([]); 
    }
}

const deletetag =()=>{
      setNametag(undefined);
  setImagetag(undefined);
  
  
  setTag(0)
}

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Gộp ảnh cũ + ảnh mới nhưng không quá 3
    const newImages = [...images, ...files].slice(0, 3);
    setImages(newImages);

    // Reset input để chọn lại cùng file cũng được
    e.target.value = "";
  };

  const removeImage = (index:number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

        if (!visible) return null;

// const [isOpen, setIsOpen] = React.useState(false);
    // const [isOpenItem, setIsOpenItem] = React.useState(false);
    return(
                    <div 
                        style={{
                        position: "absolute",
                        left: pos.x,
                        top: pos.y,
                        width: 400,
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
                        <div className="flex gap-2 items-center">
                            <div>
                                <Image
                                    width={50}
                                    height={50}
                                    src='https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg'
                                    alt="Chat Image"
                                    className="rounded-full"
                                ></Image>
                            </div>
                            <div>
                                <p className="font-bold">{usernameseller}</p>
                                <div className="flex gap-2 items-center">
                                    <p>Online</p>
                                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <X className="hover:text-red-500 hover:cursor-pointer"
                            
                          style={{ cursor: "pointer", fontWeight: "bold" }}
                            onMouseDown={(e) => e.stopPropagation()} // ⬅ chặn kéo khi bấm vào X

                            
                            onClick={() => setItemchatcontext(false)}/>
                        </div>
                    </div>



                    <div className="h-[458px] overflow-y-auto p-2"
                         ref={listRef}
                                onScroll={handleScroll}
                    >
                        {loadingitem ? (
                            <div>
                                loading
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-2 mt-2"
                               
                            
                            >
                                {itemschat.length>0 && itemschat.map((item) =>(
                                <li className={` ${item.user ? 'self-end items-end' : 'self-start items-start'} flex flex-col `} key={item.id}>
                                <p className={`${item.user ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}  px-3 py-2 rounded-xl inline-block`}>
                                {item.message}
                                </p>
                                   {item.tag && (
                                        (() => {
                                            // Tạo biến nếu muốn
                                            const slug = `${toSlug(item.tag.name)}-i.${item.tag.id}.${item.tag.id}`;
                                            // const avg = prdd.ratingCount > 0 ? prdd.ratingSum / prdd.ratingCount : 0;// bạn có thể dùng toSlug(item.tag.name, item.tag.id) nếu muốn

                                            return (
                                            <Link href={`/${slug}`}>
                                                <div className="flex justify-end">
                                                <div className="bg-gray-200 p-2 rounded-lg mt-1">
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={item.tag.image}
                                                    alt="Chat Image"
                                                    className="rounded-xl mt-2 max-w-[200px] max-h-[200px]"
                                                />
                                                <div>
                                                    <p className="font-bold hover:text-red-500">{item.tag.name}</p>
                                                </div>
                                                </div>
                                            </div>
                                            </Link>
                                            );
                                        })()
                                        )}


                                    {item.imageurl && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.imageurl.map((ok) =>(
                                                <Image 
                                                width={150}
                                                height={150}
                                                src={ok}
                                                alt="Chat Image"
                                                className="rounded-xl mt-2 max-w-[150px] max-h-[150px]"
                                                key={ok}
                                            ></Image>
                                            ))}
                                            
                                           
                                </div>
                                    )}

                                   <div className="flex justify-end gap-2 text-xs text-gray-500 mt-1">
                                     <p>{item.createdAt}  </p>
                                    {item.status === 0 ? (
                                        <div className="flex gap-1 items-center">
                                                <Check size={12}/>
                                            <p>
                                                    Đã gửi
                                            </p>
                                    </div>
                                    ) : (
                                        <div className="flex gap-1 items-center">
                                                <Eye size={12}/>
                                     <p>
                                            Đã xem
                                    </p>
                                    </div>
                                    )}

                                    </div>
                          </li>
                                ))}
                                <div ref={bottomRef}></div>
                            </ul>
                        )}
                       
                    </div>



                    <div className="border-t p-2">
                        {/* Preview ảnh */}



                        <div className="flex items-center gap-2">
                            {/* Nút chọn file */}
                           { images.length < 3 && (
                             <label className="cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                                <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e)=>handleFileChange(e)}
                            />
                            <Images/>
                            </label>
                           )}


                           {/* chon sản phẩm để tag */}
                           {isSelecttag && sellerId &&(
                            <ProductTag handleAddTag={handleAddTag} seller_id={sellerId}  handleProductId={handleProductId}/>
                           )}


                           <label className="cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                               
                            <Paperclip onClick={handleAddTag}/>
                            </label>

                               {nametag && (
                                     <div className="absolute bg-blue-200 flex bottom-[60px] p-2 rounded-2xl gap-2">
                                    <p className="underline">#{nametag}</p>
                                    <X className="hover:cursor-pointer hover:text-red-500" onClick={deletetag}/>
                                </div>
                               )}


                           {/* sản phẩm tag */}

                           <div className="absolute bottom-[50px] left-0 bg-white border p-2 rounded-lg  hidden">
                               <div className="flex gap-2 items-start">
                               <div>
                                    <Image
                                        width={100}
                                        height={100}
                                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                        alt="Chat Image"
                                        className="rounded-lg mt-2"
                                    >
                                        
                                    </Image>
                                    <p>sản phẩm a</p>
                               </div>
                               <X className="cursor-pointer" />
                               </div>
                           </div>
                          
                            {/* Ô nhập text */}
                            <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setMessage(e.target.value)}
                             onKeyDown={(e) => {
                        if (e.key === "Enter") {
                           e.preventDefault();
                           handleSenMess();
                        }
                     }}

                            />
                         {images.length > 0 && (
                            <div className="flex bg-white gap-2 absolute bottom-[40px] mb-2">
                            {images.map((file, index) => (
                                <div key={index} className="relative ">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1"
                                >
                                    <X size={14} />
                                </button>
                                </div>
                            ))}
                            <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg text-gray-500">
                                {images.length}/3
                            </div>
                            </div>
                        )}
                            {/* Nút gửi */}
                            <Button className=" rounded-full " onClick={handleSenMess}>
                                Send
                            </Button>
                        </div>
                    </div>

                </div>
    )
}