"use client"

import Button from "@/component/ui/button";
import { Check, Eye, Images, Paperclip, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { GetChatItem, SendMessageseller } from "../service/chat.service";
import { ChatIteminterface } from "@/interface/chat.interface";
import { interfaceuser } from "@/interface/user.interface";
import {  socket } from "@/service/chat.service";
import { useSeller } from "../context/sellercontext";
import Link from "next/link";
import { ProductTag } from "@/component/product/product";
interface ChatItemProp{
    isOpen: () => void
    room_id:number;
     user?: interfaceuser;
}

interface chatiteminfor extends ChatIteminterface{
    role:string
}

export default function ChatItem({isOpen,room_id,user} : ChatItemProp) {
  const [pos, setPos] = useState({ x: -500, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [itemchats,setItemchats] = useState<ChatIteminterface[]>([])
  const [loadingitem,setLoadingitem] =useState(true);
      const [images, setImages] = useState<File[]>([])  ;
      const [isSelecttag,setIsSelecttag] = useState(false);
const [page,setPage] = useState(1)
        const bottomRef = useRef<HTMLDivElement>(null);
    const [message,setMessage] = useState('');
          const [imagetag,setImagetag] = useState<string>()
          const [nametag,setNametag] = useState<string>()
          const [tag,setTag] = useState(0);
          const {seller} = useSeller()
    
        

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [itemchats]);

  useEffect(() =>{
    const handleMessage = (msg:chatiteminfor) =>{
        console.log(msg);
        if(msg.role ==="user" && room_id === msg.room){
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
                    setItemchats((prev) => [...prev,newdata])
                    watchmess(newdata)

        }else if(msg.role ==="seller" && room_id === msg.room){
            const newdata = {
                id:msg.id,
                message:msg.message,
                imageurl:msg.imageurl,
                tag:msg.tag,
                user:null,
                seller:msg.seller,
                createdAt:msg.createdAt,
                status:msg.status,
                room:msg.room,
                                role:msg.role,

            }
                    setItemchats((prev) => [...prev,newdata])

        }

    }
    socket.on("new_message",handleMessage)
        
        return () =>{
            socket.off("new_message",handleMessage)
        }
        
    
  },[room_id])


useEffect(() => {
  const handleMessage = (msg: any) => {
    console.log(msg);

    setItemchats((prev) =>
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
}, [room_id]);

  const watchmess =(newdata:chatiteminfor) =>{
        socket.emit('watch_mess',newdata)
  }


  const handleSenMess=async()=>{

      
      const formdata = new FormData();
  
      if(room_id){
          formdata.append('room_id',room_id.toString())
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
      if(user?.id){
          formdata.append('user_id',user.id?.toString())
  
      }
      // formdata.append('')
      formdata.append('message',message)
      
        const localId = crypto.randomUUID();
      formdata.append('localid',localId)
      formdata.append('role','seller')
  
      try {
        await SendMessageseller(formdata)
      } catch (error) {
        
      }finally{
        setMessage("");
        setImagetag("");
        setNametag("");
        setTag(0);      // nếu tag là number/string thì set null
        setImages([]);   
      }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

    useEffect(() =>{
        fetchItems()
    },[room_id])

function toSlug(name: string) {
  return name
    .normalize('NFD') // xóa dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // thay khoảng trắng & ký tự đặc biệt thành -
    .replace(/^-+|-+$/g, '');    // xóa - thừa đầu/cuối
}

    const fetchItems = async() =>{
       try {
         const items = await GetChatItem(room_id,page)
         console.log(items);
         
         if(items.data.success){
            setItemchats([...items.data.data].reverse());
         }
        // console.log(items);
       } catch (error) {
        setLoadingitem(false)
       }finally{
        setLoadingitem(false)
       }
        
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

      const handleAddTag=() =>{
        setIsSelecttag(!isSelecttag);
    }

    const handleProductId = (id: number,name:string,image:string) => {
    setIsSelecttag(false)
//   console.log("Sản phẩm con truyền lên:", id);
  setNametag(name);
  setImagetag(image);

  
  
  setTag(id)
//   setSelectedProductId(id); // lưu vào state cha
};

const deletetag =()=>{
      setNametag(undefined);
  setImagetag(undefined);
  
  
  setTag(0)
}
useEffect(() =>{
    console.log(itemchats);
    
},[itemchats])
      const removeImage = (index:number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };
  const onMouseUp = () => setDragging(false);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: 400,
        height:600,
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
        <div className="flex gap-2 items-center" >
            <Image
                height={50}
                width={50}
                alt=''
                src={user ? user.avatarUrl : ''}
                className="rounded-full "
            ></Image>
            <div className="">
                <p className="font-bold">{user ? user.username : 'loading'}</p>
                <div className="flex gap-2 items-center">
                    <p>Online</p>
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full">                                    
                </div>
            </div>
            </div>
        </div>

        <X
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={isOpen} 
          onMouseDown={(e) => e.stopPropagation()} 
          className="hover:text-red-500"
          
        />
          
        
      </div>

                <div className="h-[470px] overflow-y-auto p-2">

                    {loadingitem ? (
                        <div>
                            loading
                        </div>
                    ) : (
                         <ul className="flex flex-col gap-2 mt-2">
                            {itemchats.length > 0 && itemchats.map((item) =>(
                                <li className={` ${item.seller ? 'self-end items-end' : 'self-start items-start'} flex flex-col `} key={item.id}>
                                      <p className={`${item.seller ? 'bg-blue-500 text-white ' : 'bg-gray-200 text-black'} px-3 py-2 rounded-xl inline-block`}>
                                      {item.message}
                                      </p>
                                          {item.tag  && (

                                            (() => {
                                                const slug = `${toSlug(item.tag.name)}-i.${item.tag.id}.${item.tag.id}`

                                                return (
                                            <Link href={`/${slug}`}>
                                            <div className="flex justify-end">
                                              <div className="bg-gray-200 p-2 rounded-lg mt-1">
                                                  <Image 
                                                      width={200}
                                                      height={200}
                                                      src={item.tag.image}
                                                      alt="Chat Image"
                                                      className="rounded-xl mt-2"
                                                  />
                                                  <div >
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
                                                    className="rounded-xl mt-2  max-w-[150px] max-h-[150px]"
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
                              {/* <ul className="flex flex-col gap-2 mt-2">
                                  <li className="self-start flex flex-col items-start">
                                      <p className="bg-gray-200 px-3 py-2 rounded-xl inline-block">
                                      Chào bạn, mình có thể giúp gì cho bạn không?
                                      </p>
                                      <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                          <p>20:20 15/12/2025   </p>
                                          
                                      </div>
                                  </li>
      
                                  <li className="self-end flex flex-col items-end">
                                      <p className="bg-blue-500 text-white px-3 py-2 rounded-xl inline-block">
                                      Dạ chào shop, mình muốn hỏi về sản phẩm A
                                      </p>
                                          <div className="flex justify-end">
                                              <div className="bg-gray-200 p-2 rounded-lg mt-1">
                                                  <Image 
                                                      width={200}
                                                      height={200}
                                                      src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                                      alt="Chat Image"
                                                      className="rounded-xl mt-2"
                                                  ></Image>
                                                  <div >
                                                      <p className="font-bold">sản phẩm a</p>
                                                  </div>
                                              </div>
                                          </div>
      
                                          <div className="flex justify-end gap-2 text-xs text-gray-500 mt-1">
                                              <p>20:20 15/12/2025   </p>
                                              
                                          </div>
                                         
                                </li>
      
      
                                <li className="self-start flex flex-col items-start">
                                      <p className="bg-gray-200 px-3 py-2 rounded-xl inline-block">
                                      Dạ sản phẩm A bên mình hiện đang có sẵn, bạn cần tư vấn gì thêm không ạ?
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                          <Image 
                                              width={150}
                                              height={150}
                                              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                              alt="Chat Image"
                                              className="rounded-xl mt-2"
                                          ></Image>
                                          <Image 
                                              width={150}
                                              height={150}
                                              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                              alt="Chat Image"
                                              className="rounded-xl mt-2"
                                          ></Image>
                                          <Image 
                                              width={150}
                                              height={150}
                                              src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                              alt="Chat Image"
                                              className="rounded-xl mt-2"
                                          ></Image>
                                      </div>
                                           <div className="flex  gap-2 text-xs text-gray-500 mt-1">
                                              <p>20:20 15/12/2025   </p>
                                              
                                          </div>
                                  </li>
      
                                  <li className="self-end flex flex-col items-end">
                                      <p className="bg-blue-500 text-white px-3 py-2 rounded-xl inline-block">
                                      Dạ chào shop, mình muốn hỏi về sản phẩm A
                                      </p>
                                          <div className="flex justify-end">
                                              <div>
                                                  <Image 
                                                      width={150}
                                                      height={150}
                                                      src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1748353867/qyrmbrtn9p6qminexg1n.jpg"
                                                      alt="Chat Image"
                                                      className="rounded-xl mt-2"
                                                  ></Image>
                                              </div>
                                          </div>
                                         <div className="flex justify-end gap-2 text-xs text-gray-500 mt-1">
                                              <p>20:20 15/12/2025   </p>
                                              
                                          </div>
                                </li>
      
                                <li className="self-end flex flex-col items-end">
                                      <p className="bg-blue-500 text-white px-3 py-2 rounded-xl inline-block">
                                          ok
                                      </p>
                                         
                                         <div className="flex justify-end gap-2 text-xs text-gray-500 mt-1">
                                              <p>20:20 15/12/2025   </p>
                                              <div className="flex gap-1 items-center">
                                                  <Eye size={12}/>
                                                  <p>
                                                      Đã xem
                                                  </p>
                                              </div>
                                          </div>
                                </li>
                              </ul> */}
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
                           {isSelecttag && seller?.id &&(
                            <ProductTag handleAddTag={handleAddTag} seller_id={seller?.id}  handleProductId={handleProductId}/>
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
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={message}

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
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                            Send
                            </button>
                        </div>
                    </div>
    </div>
  );
}
