"use client"

import {createContext,useContext,useState,useEffect } from 'react'
import { Getuserbyid } from '@/service/userservice';
interface UserHeader {
    username: string;
    image: string;
    avatarUrl: string;
}

interface UserContextType {
    user: UserHeader | null;
    setUser: (user: UserHeader | null) => void;
}

const Usercontext = createContext<UserContextType | undefined>(undefined); 

export const UserProvider =({children} : { children: React.ReactNode}) =>{
    const [user,setUser] = useState<UserHeader | null>(null);

        useEffect(() =>{
            const fetchUser = async () =>{
                const userData = await Getuserbyid();
                setUser(userData.data[0]);
            }
            if(!user){
                fetchUser();
            }
        },[user])
        return(
            <Usercontext.Provider value = {{ user, setUser }}>
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