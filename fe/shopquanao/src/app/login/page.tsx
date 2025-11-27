"use client"
import React,{useState} from "react";
import FooterPage from "@/component/footer";
import Button from "@/component/ui/button";
import { Postloginuser } from "@/service/userservice";
import { useRouter } from "next/navigation";

export default function Loginuser(){
    const [error,setError] = useState('');
    const router =useRouter();
    const [userTest,setUserTest] = useState(false);
      const [selectedOption, setSelectedOption] = useState<string>("");
    const TEST_ACCOUNT = {
    phone: "0852517046",
    password: "11111111",
  };
    const [formData,setFormdata] = useState<{
        phone:string,
        password:string,
        
    }>(
        {
        phone:'',
        password:'',
    })

      const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    setSelectedOption(value);

    if (value === "test-account-login") {
      // gán dữ liệu test
      setFormdata(TEST_ACCOUNT);
    } else {
      // reset lại form nếu chọn loại khác
      setFormdata({
        phone: "",
        password: "",
      });
    }
  };

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

    const Submitregistration =( ) =>{
        router.push('/registration')
    }
    return(
               <div>
        
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
                                className="w-full relative px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
                                    className="w-full relative px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                               
                            </div>
                            {/* button */}

                            <div className="flex  relative items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer w-fit">
                                <input 
                                    type="radio"
                                    id="test-account-login" 
                                    name="login-option"
                                    checked={selectedOption === "test-account-login"}
                                    onChange={handleRadioChange}
                                    className="
                                        form-radio 
                                        h-4 w-4 
                                        text-blue-600 
                                        border-gray-300 
                                        focus:ring-blue-500 
                                        cursor-pointer
                                    "
                                />
                                <label 
                                    htmlFor="test-account-login" 
                                    className="
                                        text-sm 
                                        font-medium 
                                        text-gray-700 
                                        select-none 
                                        cursor-pointer
                                    "
                                >
                                    Đăng nhập bằng tài khoản thử nghiệm
                                </label>
                            </div>
        
                           <div className="flex justify-between">
                                 <Button variant="primary">dang nhap</Button>
                                <Button type="button" variant="secondary" onClick={() =>Submitregistration()} >dang ki</Button>
                           </div>
        
                        </form>
                    </div>
                    <FooterPage/>
                </div>
    )
}