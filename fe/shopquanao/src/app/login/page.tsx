"use client"
import React,{useState} from "react";
import Header from "@/component/header";
import FooterPage from "@/component/footer";
import Button from "@/component/ui/button";
import { Postloginuser } from "@/service/userservice";
export default function Loginuser(){
    const [error,setError] = useState('');
    const [formData,setFormdata] = useState<{
        phone:string,
        password:string,
        
    }>(
        {
        phone:'',
        password:'',
    })
    const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setFormdata((prev)=>({
            ...prev,
            [name]:value
        }))
    }
        const isValidPhone =(phone:string)=>{
        const phoneRegex = /^(0|\+84)[0-9]{9}$/; // Bắt đầu bằng 0 hoặc +84, sau đó 9 chữ số
        return phoneRegex.test(phone);
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!isValidPhone(formData.phone)){
            setError('so dien thoai khong hop le')
            return
        }
        const response = await Postloginuser(formData);
        // console.log(response);
        
        if(response.data.success === false){
            setError(response.data.message);
        }else{
            // console.log(response);
            localStorage.removeItem('cart');
            
            window.location.href ="/"
        }


        
        
    }
    return(
               <div>
                    <Header/>
        
                    <div className="mt-[100px] max-w-[1200px] mx-auto">
                        <form action="" onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-6">
                            <h2 className="text-2xl font-semibold">dang nhap</h2>
                            {error && <p className="text-red-500">{error}</p>}
        
                            {/* ten tai khoan */}
                            
                            {/* sdt */}
        
                            <div>
                                <label htmlFor="" className="block font-medium mb-1">
                                    so dien thoai
                                </label>
                                <input type="text" 
                                onChange={handlechange}
        
                                value={formData.phone}
                                name="phone" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            {/* mat khau */}
                              <div >
                               
                                <label className="block font-medium mb-1">Mật khẩu</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handlechange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                               
                            </div>
                            {/* button */}
        
                           <div className="flex justify-between">
                                 <Button variant="primary">dang nhap</Button>
                                <Button variant="secondary">dang ki</Button>
                           </div>
        
                        </form>
                    </div>
                    <FooterPage/>
                </div>
    )
}