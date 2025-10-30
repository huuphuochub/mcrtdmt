"use client";

import React, { useState, useRef, useEffect } from "react";
import FooterPage from "@/component/footer";
import Link from "next/link";
import { Camera } from "lucide-react";
// import { useUser } from "@/app/context/usercontext";
import { interfaceuser } from "@/interface/user.interface";
import { Getuserbyid, updateuser } from "@/service/userservice";
import { getDistrict, getprovince, getWards } from "@/service/getlocation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/usercontext";


interface Province {
  PROVINCE_ID: number;
  PROVINCE_NAME: string;
}

interface District {
  DISTRICT_ID: number;
  DISTRICT_NAME: string;
}

interface Ward {
  WARDS_ID: number;
  WARDS_NAME: string;
}
export default function SettingUserPage() {
//   const { user } = useUser();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
        const [wards, setWards] = useState<Ward[]>([]);
        const {user} = useUser();
    
  const [editableUser, setEditableUser] = useState<interfaceuser>();
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  // const [image,setImage] = useState<File[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
      const [loadingProv, setLoadingProv] = useState(false);
      const [loadingDist, setLoadingDist] = useState(false);
      const [loadingWard, setLoadingWard] = useState(false);
      const [idtinh,setIdtinh] = useState<number>(0)
      const [idquan,setIdquan] = useState<number>(0)
// const provinceId = editableUser?.provinceId;
// const districtId = editableUser?.districtId;

useEffect(() =>{
    fetch();
},[])
useEffect(()=>{
  if(!user) {
    window.location.href = '/';
  }
  
})
useEffect(() =>{
    console.log(editableUser);
    setIdtinh(Number(editableUser?.provinceId))
    setIdquan(Number(editableUser?.districtId))
    
},[editableUser])

useEffect(() => {
    async function loadProvinces() {
      setLoadingProv(true);
      const res = await getprovince();
      // console.log(res);
      
      const data = await res.data;
      setProvinces(data);
      setLoadingProv(false);
      
    }
    loadProvinces();
  }, []);

  useEffect(() => {
  const fetchDistricts = async () => {
    if (!idtinh) {
      setDistricts([]);
      return;
    }

    setLoadingDist(true);
    try {
      const distric = await getDistrict(idtinh);
      console.log(distric);
      
      setDistricts(distric.data);
    } catch (error) {
      console.error("Lỗi lấy quận:", error);
      setDistricts([]);
    } finally {
      setLoadingDist(false);
    }
  };

  fetchDistricts();
}, [idtinh]);


useEffect(() => {
        if(!editableUser) return;

  const fetchWards = async () => {
    if (!editableUser.districtId) {
      setWards([]);
      return;
    }

    setLoadingWard(true);
    try {
      const wardsData = await getWards(idquan);
    //   console.log(wardsData);
      
      setWards(wardsData.data);
    } catch (error) {
      console.error("Lỗi lấy phường:", error);
      setWards([]);
    } finally {
      setLoadingWard(false);
    }
  };

  fetchWards();
}, [idquan]);

const fetch =async()=>{
    const user = await Getuserbyid()
    console.log(user);
    if(user.data.success){
        setEditableUser(user.data.data)
        setIdtinh(user.data.data.provinceId)
        setIdquan(user.data.data.districtId)
    }
    
}

//   useEffect(() => {
//     if (user) {
//       setEditableUser(user);
//       setPreviewAvatar(user.avatarUrl || "");
//     }
//   }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!editableUser) return;
    setEditableUser({
      ...editableUser,
      [name]: name === "phone" || name === "provinceId" || name === "districtId" || name === "wardsId" || name === "role"
        ? Number(value)
        : value,

         ...(name === "provinceId" && {
                districtId: 0,
                wardsId: 0,
                
            }),

            ...(name === "districtId" && {
                wardsId: 0,
            }),
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editableUser) return;

    const formData = new FormData();
    formData.append("email", editableUser.email);
    formData.append("username", editableUser.username);
    // formData.append("password", editableUser.password);
    formData.append("phone", editableUser.phone.toString());
    formData.append("phoneorder", editableUser.phoneorder);
    formData.append("address", editableUser.address);
    // formData.append("role", editableUser.role.toString());
    formData.append("provinceId", editableUser.provinceId.toString());
    formData.append("districtId", editableUser.districtId.toString());
    formData.append("wardsId", editableUser.wardsId.toString());
    // formData.append("isActive", editableUser.isActive.toString());

    if (avatarFile) {
      formData.append("mainImage", avatarFile);
    }

    // TODO: Gửi formData tới server bằng fetch hoặc axios
    console.log("Submit data", editableUser, avatarFile);

    try {
      const up = await updateuser(formData);
      console.log(up);
      if(up.data.success){
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin người dùng:", error);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  if (!editableUser) {
    return <div className="text-center py-20">Đang tải thông tin người dùng...</div>;
  }

  return (
    <div>
      <div className="mt-[80px] min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Cài đặt thông tin người dùng
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Avatar */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-32 h-32">
                <img
                  src={previewAvatar || editableUser.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full border shadow"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full hover:bg-opacity-80 transition"
                >
                  <Camera />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    // setImage(e.target.files as unknown as File[])
                    if (file) {
                      setAvatarFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewAvatar(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                className="relative w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 text-gray-600">Tên người dùng</label>
              <input
                type="text"
                name="username"
                value={editableUser.username}
                onChange={handleChange}
                className="relative w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-gray-600">Số điện thoại</label>
              <input
                type="number"
                name="phone"
                value={editableUser.phone}
                onChange={handleChange}
                className="relative w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Phone order */}
            <div>
              <label className="block mb-1 text-gray-600">SĐT nhận đơn hàng</label>
              <input
                type="text"
                name="phoneorder"
                value={editableUser.phoneorder}
                onChange={handleChange}
                className="relative w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Address */}
           
            {/* Province */}
            <div>
              <label className="block text-sm font-medium mb-1">Tỉnh / Thành phố</label>
                <select
                  name="provinceId"
                  required
                  value={editableUser.provinceId}
                  onChange={handleChange}
                  className="w-full relative px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    {loadingProv ? "Đang tải..." : "Chọn Tỉnh/Thành"}
                  </option>
                  {provinces.map((p: Province) => (
                    <option key={p.PROVINCE_ID} value={p.PROVINCE_ID}>
                      {p.PROVINCE_NAME}
                    </option>
                  ))}
                </select>
            </div>

            {/* District */}
            <div>
             <label className="block text-sm font-medium mb-1">Quận</label>
                <select
                  name="districtId"
                  required
                  value={editableUser.districtId}
                  onChange={handleChange}
                  disabled={!editableUser.provinceId || loadingDist}
                  className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option>{loadingDist ? "Đang tải..." : "Chọn Quận/Huyện"}</option>
                  {districts.map((d: District) => (
                    <option key={d.DISTRICT_ID} value={d.DISTRICT_ID}>
                      {d.DISTRICT_NAME}
                    </option>
                  ))}
                </select>
            </div>

            {/* Wards */}
            <div>
              <label className="block text-sm font-medium mb-1">Xã/Phường</label>
                <select
                  name="wardsId"
                  required
                  value={editableUser.wardsId}
                  onChange={handleChange}
                  disabled={!editableUser.districtId || loadingWard}
                  className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  <option>{loadingWard ? "Đang tải..." : "Chọn Xã/Phường"}</option>
                  {wards.map((w: Ward) => (
                    <option key={w.WARDS_ID} value={w.WARDS_ID}>
                      {w.WARDS_NAME}
                    </option>
                  ))}
                </select>
            </div>
             <div>
              <label className="block mb-1 text-gray-600">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={editableUser.address}
                onChange={handleChange}
                className="relative w-full border px-4 py-2 rounded"
              />
            </div>


            {/* Active toggle */}
           

            {/* Link đổi mật khẩu */}
            <div className="md:col-span-2">
              <Link
                href="/page/settinguser/password"
                className="relative text-blue-500 hover:underline"
              >
                Đổi mật khẩu
              </Link>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Lưu thông tin
              </button>

              <button
                type="button"
                onClick={() => {
                  // TODO: xử lý xóa tài khoản ở đây
                  alert("Bạn có chắc muốn xóa tài khoản?");
                }}
                className="relative bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Xóa tài khoản
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}


