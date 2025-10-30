"use client";

import Button from "@/component/ui/button";
import { CheckMail, CheckVerifyCode, resetPassword, resetPasswordemail } from "@/service/userservice";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/usercontext";
// import router from "next/router";

export default function ChangePasswordSection() {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [loading,setLoading] = useState(false);
  const {user} = useUser();
  const [email,setEmail] = useState("");
  

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    verifyCode: "",
    newpasswordreset:'',
    confirmNewPasswordReset: ""
  });



  // const [sentCode, setSentCode] = useState(""); // Mã xác minh server gửi về (giả lập)
  const [message, setMessage] = useState("");


    useEffect(() => {
    if(!user ){
      window.location.href = '/';
    }
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  const handleSendCode = async() => {
    if(form.email === "") {
      setMessage("Vui lòng nhập email.");
      return;
    }

    try {
      const sendmail =await CheckMail(form.email);
      console.log(sendmail);
      if(sendmail.data.success){
        setStep("verify");
      setMessage("Mã xác nhận đã được gửi đến email của bạn.");
      }else{
        setMessage("❌ " + sendmail.data.message);
      }
    } catch (error) {
      setMessage("❌ Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const handleVerifyCode = async() => {
    if(form.verifyCode.length !== 6) {
      setMessage("Mã xác nhận phải gồm 6 số.");
      return;
    }

    try {
      const verify = await CheckVerifyCode(form.verifyCode);
      console.log(verify);
      if(verify.data.success){
        setEmail(verify.data.data);
        setStep("reset");
        setMessage("✅ Mã xác nhận chính xác. Bạn có thể đặt lại mật khẩu.");
      } else {
        setMessage("❌ " + verify.data.message);
      }
    } catch (error) {
      
    }



    // if (form.verifyCode === sentCode) {
    //   setMessage("✅ Mã xác nhận chính xác. Bạn có thể đặt lại mật khẩu.");
    // } else {
    //   setMessage("❌ Mã xác nhận không đúng. Vui lòng kiểm tra lại.");
    // }
  };
    const HandleResetPasswordEmail = async()=>{
      setStep("reset");
      if(form.newpasswordreset === "") {
        setMessage("Mật khẩu mới không được để trống");
        return;
      }
      if(form.newpasswordreset.length < 6) {
        setMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
        return;
      }
      if (form.newpasswordreset !== form.confirmNewPasswordReset) {
        setMessage("❌ Mật khẩu mới không khớp.");
        return;
      }
      const result = await resetPasswordemail(email,form.newpasswordreset);
      if(result.data.success){
        setMessage("✅ Đặt lại mật khẩu thành công.");
        setStep("email");
      }else{
        setMessage("❌ " + result.data.message);
      }
    }
  const handleSubmitChangePassword = async() => {
    if(form.currentPassword === "") {
      setMessage("Mật khẩu hiện tại không được để trống");
      return;
    }
    if(form.newPassword === "") {
      setMessage("Mật khẩu mới không được để trống");
      return;
    }
    if(form.confirmNewPassword === "") {
      setMessage("Vui lòng xác nhận lại mật khẩu mới");
      return;
    }
    if(form.currentPassword === form.newPassword) {
      setMessage("Mật khẩu mới phải khác mật khẩu hiện tại.");
      return;
    }
    if(form.newPassword.length < 6) {
      setMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (form.newPassword !== form.confirmNewPassword) {
      setMessage("❌ Mật khẩu mới không khớp.");
      return;
    }

    const body = {
      password: form.currentPassword,
      newpassword: form.newPassword
    }
    try {
      setLoading(true);
      const data = await resetPassword(body);
      console.log(data);
      
    if(data.data.success){
      setMessage("✅ Đổi mật khẩu thành công.");
      setLoading(false);
    } else {
      setMessage("❌ " + data.data.message);
    }

    } catch (error) {
      console.log(error);
      setMessage("❌ Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }finally {
      setLoading(false);
    }

    // TODO: Gửi API đổi mật khẩu ở đây
    // setMessage("✅ Đổi mật khẩu thành công.");
  };



  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-[80px] relative">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {isForgotMode ? "Quên mật khẩu" : "Đổi mật khẩu"}
      </h2>

     

      {!isForgotMode ? (
        // 👉 Form đổi mật khẩu
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">Mật khẩu hiện tại</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Nhập lại mật khẩu mới</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={form.confirmNewPassword}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              onClick={handleSubmitChangePassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
            >
              Đổi mật khẩu
            </button>
            <p className="text-sm text-right text-blue-600 cursor-pointer" onClick={() => setIsForgotMode(true)}>
              Quên mật khẩu?
            </p>
          </div>
        </>
      ) : (
        // 👉 Form quên mật khẩu
        <>
          {step === "email" && (
            <div className="space-y-4">
              <label className="block text-sm mb-1 text-gray-600">Nhập email của bạn</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={handleSendCode}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Gửi mã xác nhận
              </button>
              <p className="text-sm text-gray-600">* Một mã xác nhận gồm 4 số sẽ được gửi tới email của bạn.</p>
              <p className="text-sm text-blue-500 cursor-pointer" onClick={() => setIsForgotMode(false)}>
                🔙 Quay lại
              </p>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-4">
              <label className="block text-sm mb-1 text-gray-600">Nhập mã xác nhận (6 số)</label>
              <input
                type="text"
                name="verifyCode"
                value={form.verifyCode}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded text-center tracking-widest text-xl"
                maxLength={6}
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Xác nhận
              </button>
              <p className="text-sm text-blue-500 cursor-pointer" onClick={() => setStep("email")}>
                🔁 Gửi lại mã
              </p>
            </div>
          )}


          {step === "reset" && (
            <div className="space-y-4">
              <label className="block text-sm mb-1 text-gray-600">Nhập mật khẩu mới của bạn</label>
              <input
                type="password"
                name="newpasswordreset"
                value={form.newpasswordreset}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
              <label className="block text-sm mb-1 text-gray-600">Nhập lại mật khẩu mới của bạn</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={form.confirmNewPasswordReset}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={HandleResetPasswordEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Gửi
              </button>
              
            </div>
          )}
        </>
      )}

      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
}
