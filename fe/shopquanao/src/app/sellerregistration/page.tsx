"use client";

import React, { useState, useEffect } from "react";
import FooterPage from "@/component/footer";
import { Registrationseller } from "@/service/sellerservice";
import {getprovince,getDistrict, getWards} from "@/service/getlocation";
import { useUser } from "../context/usercontext";

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

export default function SellerRegisterForm() {
const [formData, setFormData] = useState<{
  usernameseller: string;
  email: string;
  address: string,
  streetAddress: string,
  provinceId: number;
  districtId: number;
  wardId: number;
}>({
  usernameseller: "",
  email: "",
  address: "",
  streetAddress: "",
  provinceId: 0,
  districtId: 0,
  wardId: 0,
});

  type FormKeys = keyof typeof formData;


  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const {user} = useUser();

  const [loadingProv, setLoadingProv] = useState(false);
  const [loadingDist, setLoadingDist] = useState(false);
  const [loadingWard, setLoadingWard] = useState(false);

  useEffect(() =>{
    if(!user) window.location.href ='/registration'
  },[user])

  useEffect(() => {
    async function loadProvinces() {
      setLoadingProv(true);
      const res = await getprovince();
      console.log(res);
      
      const data = await res.data;
      setProvinces(data);
      setLoadingProv(false);
      
    }
    loadProvinces();
  }, []);

useEffect(() => {
  const fetchDistricts = async () => {
    if (!formData.provinceId) {
      setDistricts([]);
      return;
    }

    setLoadingDist(true);
    try {
      const distric = await getDistrict(formData.provinceId);
    //   console.log(distric);
      
      setDistricts(distric.data);
    } catch (error) {
      console.error("Lỗi lấy quận:", error);
      setDistricts([]);
    } finally {
      setLoadingDist(false);
    }
  };

  fetchDistricts();
}, [formData.provinceId]);


useEffect(() => {
  const fetchWards = async () => {
    if (!formData.districtId) {
      setWards([]);
      return;
    }

    setLoadingWard(true);
    try {
      const wardsData = await getWards(formData.districtId);
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
}, [formData.districtId]);

  // Hàm tạo địa chỉ đầy đủ
  const buildFullAddress = (streetAddress: string, provinceId: number, districtId: number, wardId: number) => {
    // console.log(typeof provinceId,typeof districtId,typeof wardId);
    
    const province = provinces.find((p: Province) => p.PROVINCE_ID === provinceId);
    const district = districts.find((d: District) => d.DISTRICT_ID === districtId);
    const ward = wards.find((w: Ward) => w.WARDS_ID === wardId);
    
    const parts = [streetAddress];
    
    if (ward) parts.push(ward.WARDS_NAME);
    if (district) parts.push(district.DISTRICT_NAME);
    if (province) parts.push(province.PROVINCE_NAME);
    // console.log(parts);

    
    return parts.filter(Boolean).join(", ");
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(s => {
      const newData = {
        ...s,
        [name]: value,
        ...(name === "provinceId" ? { districtId: 0, wardId: 0 } : {}),
        ...(name === "districtId" ? { wardId: 0 } : {}),
      };
      
      // Tự động cập nhật địa chỉ đầy đủ khi thay đổi tên đường hoặc địa chỉ hành chính
      if (name === "streetAddress" || name === "provinceId" || name === "districtId" || name === "wardId") {
        newData.address = buildFullAddress(
          name === "streetAddress" ? value : newData.streetAddress,
          name === "provinceId" ? Number(value) : Number(newData.provinceId),
          name === "districtId" ? Number(value) : Number(newData.districtId),
          name === "wardId" ? Number(value) : Number(newData.wardId)
        );
      }
      // console.log(Number(value));
      
      return newData;
    });
  }

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    // console.log("Submit data:", formData);
    const result = await Registrationseller(formData);

    console.log(result);
    

  }

  return (
        <div>
            <Header/>
            <div className="mt-[100px]">
<form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-6">
  <h2 className="text-2xl font-semibold">Đăng ký bán hàng</h2>

  {(["usernameseller",  "email" ] as FormKeys[]).map((key) => (
    <div key={key}>
      <label className="block font-medium mb-1">
        {key === "usernameseller" ? "Tên cửa hàng của bạn" :
        
         "Email"}
      </label>
      <input
        name={key}
        type="text"
        required
        value={formData[key]}
        onChange={handleChange}
        className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ))}

  {/* Tên đường / địa chỉ cụ thể */}


  {/* Mật khẩu và Nhập lại mật khẩu */}


  {/* Địa chỉ hành chính */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label className="block font-medium mb-1">Tỉnh/Thành</label>
      <select
        name="provinceId"
        required
        value={formData.provinceId}
        onChange={handleChange}
        className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

    <div>
      <label className="block font-medium mb-1">Quận/Huyện</label>
      <select
        name="districtId"
        required
        value={formData.districtId}
        onChange={handleChange}
        disabled={!formData.provinceId || loadingDist}
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

    <div>
      <label className="block font-medium mb-1">Xã/Phường</label>
      <select
        name="wardId"
        required
        value={formData.wardId}
        onChange={handleChange}
        disabled={!formData.districtId || loadingWard}
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
  </div>
  <div>
    <label className="block font-medium mb-1">Tên đường / địa chỉ cụ thể</label>
    <input
      name="streetAddress"
      type="text"
      required
      value={formData.streetAddress}
      onChange={handleChange}
      className="w-full px-4 py-2 border relative border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  
  {/* Hiển thị địa chỉ đầy đủ */}
  {formData.address && (
    <div className="bg-gray-50 p-3 rounded-lg">
      <label className="block font-medium mb-1 text-sm text-gray-600">Địa chỉ đầy đủ:</label>
      <p className="text-gray-800">{formData.address}</p>
    </div>
  )}
  {/* Nút submit */}
  <button
    type="submit"
    className="w-full bg-blue-600 relative text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    Đăng ký
  </button>
</form>

            </div>
            <FooterPage/>
        </div>
  );
}
