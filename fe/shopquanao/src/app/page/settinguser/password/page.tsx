"use client";

import React, { useState } from "react";

export default function ChangePasswordSection() {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [step, setStep] = useState<"email" | "verify">("email");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    verifyCode: "",
  });

  const [sentCode, setSentCode] = useState(""); // Mã xác minh server gửi về (giả lập)
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 số ngẫu nhiên
  };

  const handleSendCode = () => {
    const code = generateRandomCode();
    setSentCode(code);
    console.log("Mã xác nhận (giả lập):", code);
    setStep("verify");
  };

  const handleVerifyCode = () => {
    if (form.verifyCode === sentCode) {
      setMessage("✅ Mã xác nhận chính xác. Bạn có thể đặt lại mật khẩu.");
    } else {
      setMessage("❌ Mã xác nhận không đúng. Vui lòng kiểm tra lại.");
    }
  };

  const handleSubmitChangePassword = () => {
    if (form.newPassword !== form.confirmNewPassword) {
      setMessage("❌ Mật khẩu mới không khớp.");
      return;
    }
    // TODO: Gửi API đổi mật khẩu ở đây
    setMessage("✅ Đổi mật khẩu thành công.");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10 relative">
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
              <label className="block text-sm mb-1 text-gray-600">Nhập mã xác nhận (4 số)</label>
              <input
                type="text"
                name="verifyCode"
                value={form.verifyCode}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded text-center tracking-widest text-xl"
                maxLength={4}
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
        </>
      )}

      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
}
