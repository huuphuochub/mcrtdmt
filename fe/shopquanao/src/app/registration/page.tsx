"use client"
import React ,{useState} from "react";
import FooterPage from "@/component/footer";
import Button from "@/component/ui/button";
import { Registrationuser } from "@/service/userservice";
export default function Registration(){
    const [error, setError] = useState("");

    const [formData, setFormData] = useState<{
        username:string,
        phone:string,
        password:string,
        confirmPassword:string


    }>({
        username:"",
        phone:"",
        password:"",
        confirmPassword:""

    });
    const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]:value,
        }));
    }
    const isValidPhone =(phone:string)=>{
        const phoneRegex = /^(0|\+84)[0-9]{9}$/; // Bắt đầu bằng 0 hoặc +84, sau đó 9 chữ số
        return phoneRegex.test(phone);
    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setError("mat khau nhap lai khong khop")
            return;
        }
        if(!isValidPhone(formData.phone)){
            setError('sdt khong hop le')
            return
        }
        setError('')
        const response = await Registrationuser(formData)
        console.log(response.data);
        if(response.data.success === false){
            setError(response.data.message);
        }else{
            window.location.href = '/login';
        }
        
        
    }
    return(
        <div>

            <div className="mt-[100px] max-w-[1200px] mx-auto">
                <form action="" onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-6">
                    <h2 className="text-2xl font-semibold">dang ki</h2>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* ten tai khoan */}
                    <div>
                        <label htmlFor="" className="block font-medium mb-1">
                            ten tai khoan
                        </label>
                        <input type="text"
                        name="username"  
                        onChange={handlechange}
                        value={formData.username}
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
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
                        <div>
                        <label className="block font-medium mb-1">Nhập lại mật khẩu</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handlechange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                    </div>
                    {/* button */}

                   <div className="flex justify-between">
                         <Button variant="primary">dang ki</Button>
                        <Button variant="secondary">dang nhap</Button>
                   </div>

                </form>
            </div>
            <FooterPage/>
        </div>
    )
}