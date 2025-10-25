"use client"

import { Bell, X } from "lucide-react";
import React from "react";
import { NotificationInterface } from "@/interface/notification.interface";
import { getNoti, updateRead } from "@/service/notification.service";
import { useUser } from "@/app/context/usercontext";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface NotificationHeaderProps {
   isOpenNoti: boolean;
   setIsOpenNoti: (isOpen: boolean) => void;
    OpenNoti: () => void;
}

export default function NotificationHeader({ OpenNoti, isOpenNoti, setIsOpenNoti }: NotificationHeaderProps) {
    const [notifications, setNotifications] = React.useState<NotificationInterface[]>([]);
    const {user,loading} = useUser();
    const router = useRouter();

        React.useEffect(() => {
        if (user === undefined) return; // context chưa khởi tạo xong
        if (!user) return; // chưa đăng nhập

        fetchNoti();
        }, [user]);


    const fetchNoti =async() =>{
        const noti = await getNoti();
        console.log(noti);
        
        if(noti.data.success){
            setNotifications(noti.data.data);
        }
    }
    const handReadnoti = async(id:number,order_id:number) =>{

        const updatereadnoti = notifications.map((noti) => {
            if (noti.id === id) {
                return { ...noti, isRead: true };
            }
            return noti;
        });
        setNotifications(updatereadnoti);
        const update = await updateRead(id);
        console.log(update);
        
        router.push(order_id ? `/order/orderdetail/?id=${order_id}` : '#');
    }

  return (
    <div className="relative">
            <Bell
              className="size-7 hover:cursor-pointer"
              onClick={() => OpenNoti()}
            />
            {isOpenNoti && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-xl shadow-lg  z-10">
                <div className="">
                  <div className="p-2 border-b flex items-center justify-between">
                    <p className="font-semibold text-lg">Thông báo</p>
                    <X
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setIsOpenNoti(false)}
                    />
                  </div>
                  <div className=" h-[400px] overflow-y-auto hide-scrollbar">

                    {notifications.length === 0 ? (
                        <div>Không có thông báo</div>
                        ) : (
                        notifications.map((noti) => (
                            <div
                            key={noti.id}
                            onClick={() =>handReadnoti(noti.id,noti.order_id)}
                                // 👈 thêm key vào đây để React không cảnh báo
                                className="border-b p-2 relative hover:cursor-pointer hover:bg-gray-100"
                                >
                                <div>
                                    <p className="p-0 m-0 text-[17px]">
                                    {noti.content}
                                    </p>
                                    <span className="text-sm text-gray-500 p-0 m-0">
                                    <p>{noti.createdAt || "10 phút trước"}</p>
                                    </span>
                                </div>
                                {!noti.isRead && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-2xl absolute bottom-[15px] right-2"></div>
                                )}
                            </div>
                        
                        ))
                        )}

                   
                  </div>
                </div>
              </div>
            )}
          </div>
  );
}