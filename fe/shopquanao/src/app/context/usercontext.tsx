"use client"

import {createContext,useContext,useState,useEffect } from 'react'
import { Getuserbyid } from '@/service/userservice';
// import { interfaceuser } from '@/interface/user.interface';
import { updateuser } from '@/service/userservice';
interface UserHeader {
    username: string;
    // image: string;
    avatarUrl: string;
    // phone:string;
    email:string;
    address:string;
    provinceId:number;
    districtId:number;
    wardsId:number;
    phoneorder:string,
    // address:string;
}
// interface noteorder{
//     note:string;
// }

interface UserContextType {
    user: UserHeader | null;
    setUser: (user: UserHeader | null) => void;
  Updateuser: (data: UserHeader) => Promise<any>; 
  setnote: (note:string) =>void
  note:string | null;
}

const Usercontext = createContext<UserContextType | undefined>(undefined); 

export const UserProvider =({children} : { children: React.ReactNode}) =>{
    const [user,setUser] = useState<UserHeader | null>(null);
        const [note,setNote] = useState<string | null>(null);



        useEffect(() =>{
            const fetchUser = async () =>{
                const userData = await Getuserbyid();
                console.log(userData.data);
                
                setUser(userData.data.data);
            }
            if(!user){
                fetchUser();
            }
        },[user])

        const Updateuser =async(data:UserHeader)=>{
            setUser(data);
            const res  = await updateuser(data);
            return res;
        }
        const setnote =(note:string)=>{
                setNote(note)
        }
        return(
            <Usercontext.Provider value = {{ user, setUser,Updateuser,setnote ,note}}>
                {children}
            </Usercontext.Provider>
        )
       
}

export const useUser = () =>{
    const context = useContext(Usercontext);
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}