'use client'
import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, History, X } from "lucide-react";
import Button from "@/component/ui/button";
import Image from "next/image";
import { AddWallet, Deposit, FetchWallet, Withdraw } from "@/service/wallet.service";
import toast from "react-hot-toast";
import Link from "next/link";
type Wallettype = {
  id:number;
  availableBalance:number;
  bank:Banks[] 
}
type Banks = {
  id?:number;
  wallet_id:number;
  namebank: string;
  account_number: string;
  account_name:string;
  image: string;
};
type Bank = {
  namebank:string;
  image:string
}


// const banks: Banks[] = [
//   { namebank: "Vietcombank",wallet_id:1,account_name:'nguyen van a',account_number:'11111111', image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_2_uba5bk.jpg" },
//   { namebank: "MBBank", wallet_id:1,account_name:'nguyen van a',account_number:'11111111', image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_ean30c.jpg" },
//   { namebank: "Techcombank",wallet_id:1,account_name:'nguyen van a',account_number:'11111111', image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_c0kccf.png" },
// ];
const banknew:Bank[] =[
   { namebank: "Vietcombank", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_2_uba5bk.jpg" },
  { namebank: "MBBank", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_ean30c.jpg" },
  { namebank: "Techcombank",  image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_c0kccf.png" },
   { namebank: "Viettinbank", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_1_bc0p9s.jpg" },
  { namebank: "VIB",  image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526375/t%E1%BA%A3i_xu%E1%BB%91ng_5_xzaquv.png" },
  { namebank: "Sacombank",  image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_1_nmyfct.png" },
   { namebank: "VPbank", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_2_rphqkt.png" },
  { namebank: "BIDV", image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_3_nrfzws.png" },
  { namebank: "ACB",  image: "https://res.cloudinary.com/dnjakwi6l/image/upload/v1763526265/t%E1%BA%A3i_xu%E1%BB%91ng_4_kx6mno.png" },
]
export default function BalancePage() {
    const [selectedBankrut, setSelectedBankrut] = useState<string>("");
        const [selectedBanknap, setSelectedBanknap] = useState<string>("");
const [selectedBankthem, setSelectedBankthem] = useState<Bank | null>(null);
const [wallet, setWallet] = useState<Wallettype>({ id:0, availableBalance:0, bank:[] });
const [loading,setLoading] = useState(true);
const [banks,setBanks] = useState<Banks[]>([])
const [totalnap,setTotalnap] = useState(0);
const [totalrut,setTotalrut] = useState(0);
const [deletebank,setDeletebank] = useState(false)
const [bankdelete,setBankdelete] = useState<Banks | null>(null);
const [loadnap,setLoadnap] = useState(false);
const [loadrut,setLoadrut] = useState(false);



  const [openNap,setOpenNap] = useState(false);
    const [openAddbank,setOpenAddbank] = useState(false);

    const [openRut,setOpenRut] = useState(false);
    const [account_name,setAccount_name] = useState<string>('')
    const [account_number,setAccount_number] = useState<string>('')

    useEffect(() =>{
      fetchWallet()
    },[])

    const fetchWallet =async() =>{
      try {
        const wallet = await FetchWallet()
      console.log(wallet);
      if(wallet.data.success === true){
        setWallet(wallet.data.data)
        setBanks(wallet.data.data.bank)
      }
      } catch (error) {
        setLoading(false)
      }finally{
        setLoading(false)
      }
      
    }

    const HandleAdd = async() =>{
      console.log(account_name);
      console.log(account_number);
      console.log(selectedBankthem);
      if(account_name === ''){
        alert('vui lòng nhập tên tài khoản')
        return;
      }else if(account_number === ''){
        alert('vui long nhập số tài khoản')
        return;
      }else if(!selectedBankthem?.namebank){
        alert('vui lòng chọn ngân hàng')
        return;
      }
      const body ={
        wallet_id:wallet.id,
        namebank:selectedBankthem.namebank,
        account_number:account_number,
        account_name:account_name.toUpperCase(),
        image:selectedBankthem.image,
      }
      // console.log(body);

      try {
        const add = await AddWallet(body);
        console.log(add);
        if(add.data.success){
          toast.success('da them ngan hang')
          setBanks((prev) => [...prev,add.data.data])
          setOpenAddbank(false)
        }else{
          toast.error('da co loi xay ra')
        }
        
      } catch (error) {
        
      }
    }

    const DeleteBank=async()=>{
      console.log(bankdelete);
      
    }
    const handleRemoveBank = async(banks:Banks | undefined) =>{
        setDeletebank(true)
        setBankdelete(banks || null);
    }

    const HandleNap = async() =>{
      if(totalnap <= 50000) {
        alert('vui long nap tu 50000 tro len')
        return;
      }
      setLoadnap(true);
      const body = {
        wallet_id:wallet.id,
        total_amount:totalnap
      }
      try {
        const nap = await Deposit(body);
        console.log(nap);
        if(nap.data.success){
          toast.success('nap thanh cong');
          setWallet((prev) => ({
            ...prev,
            availableBalance:prev.availableBalance + totalnap
          }))
        }
        
      } catch (error) {
        setLoadnap(false)
        toast.error('loi khi nap')
      }finally{
        setLoadnap(false);
      }
    }
function maskAccountNumber(account: string) {
  // Loại bỏ khoảng trắng, dấu gạch nếu có
  const clean = account.replace(/\D/g, "");
  
  // Lấy 4 số cuối
  const last4 = clean.slice(-4);
  
  // Nếu dưới 4 số thì hiện nguyên, còn lại thì mask
  if (clean.length <= 4) return clean;
  
  return `•••• •••• •••• ${last4}`;
}
    const HandleRut = async() =>{
      if(totalrut <= 50000) {
        alert('vui long rut tu 50000 tro len')
        return;
      }
      setLoadrut(true);
      const body = {
        wallet_id:wallet.id,
        total_amount:totalrut
      }
      try {
        const rut = await Withdraw(body);
        console.log(rut);
        if(rut.data.success){
          toast.success('rut thanh cong')
          setWallet((prev) => ({
            ...prev,
            availableBalance:prev.availableBalance - totalrut
          }))
        }
        
      } catch (error) {
        setLoadrut(false)
        toast.error('loi khi rut')
      }finally{
        setLoadrut(false);
      }
      
      
    }


    if(loading) return(
      <div>
        loading
      </div>
    )
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Tiêu đề */}

          {deletebank  && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
  {/* Overlay mờ + blur đẹp */}
  <div
    className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
    onClick={(e) => setDeletebank(false)} // tránh đóng khi click vào modal
  >
    {/* Header */}
    <div className="px-8 pt-8 pb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Bạn có chắc muốn gỡ liên kết ngân hàng?
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Hành động này không thể hoàn tác.
      </p>
    </div>


    {/* Thông tin ngân hàng */}
    {bankdelete && (
       <div className="px-8 pb-6">
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <div className="flex-shrink-0">
          <Image
            width={80}
            height={80}
            src={bankdelete.image}
            alt={bankdelete.namebank}
            className="w-20 h-20 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">{bankdelete.namebank}</p>
          <p className="text-2xl font-bold  tracking-wider">
            {maskAccountNumber(bankdelete.account_number)}
          </p>
        </div>
      </div>
    </div>
    )}
   

    {/* Nút hành động */}
    <div className="flex justify-end gap-3 px-8 pb-8">
      <Button
        variant="secondary"
        onClick={() => setDeletebank(false)}
        className=""
      >
        Hủy
      </Button>
      <Button
        variant="primary" // hoặc variant="primary" nếu bạn dùng màu đỏ cho xóa
        onClick={() => {
          // xử lý gỡ liên kết ở đây
          DeleteBank();
        }}
        className=""
      >
        Gỡ liên kết
      </Button>
    </div>

    {/* Nút đóng nhỏ xíu góc trên (tùy chọn) */}
    <button
      onClick={() => setOpenAddbank(false)}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
          )}


      

      {openNap && (
        <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
        <div className="relative z-30 w-[600px] bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

          {/* Nút đóng */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
            <X className="hover:cursor-pointer" onClick={() =>setOpenNap(false)}/>
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center">Nạp tiền</h2>

          {/* Input số tiền */}
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Nhập số tiền cần nạp</label>
            <input
            type="text"
            value={totalnap}
            onChange={(e) => {
              // Chỉ cho nhập số
              const val = e.target.value.replace(/\D/g, ""); 
              setTotalnap(Number(val));
            }}
            className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: 500,000"
          />
          </div>

          {/* Chọn ngân hàng */}
              <div className="space-y-3">
                {banks.map((bank) => {
                  const isSelected = selectedBanknap === bank.namebank;
                  return (
                    <div
                      key={bank.namebank}
                      onClick={() => setSelectedBanknap(bank.namebank)}
                      className={`
                        flex items-center gap-4 p-3 border rounded-lg cursor-pointer
                        ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                        transition-colors duration-200
                      `}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={bank.image}
                        alt={bank.namebank}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{bank.namebank}</p>
                        <p className="text-gray-500">{maskAccountNumber(bank.account_number)}</p>
                      </div>

                      {/* Dấu tick */}
                      {isSelected && (
                        <span className="text-blue-600 font-bold">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {/* <Button onClick={HandleNap}> Nạp </Button> */}
             <button
      onClick={HandleNap}
      disabled={loadnap}
      className={`flex items-center justify-center px-4 py-2 rounded bg-blue-500 text-white font-medium
        hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {loadnap ? "Đang xử lý..." : "Nạp"}
    </button>
            
            <Button variant="secondary" onClick={() =>setOpenNap(false)}> Hủy </Button>
          </div>
        </div>
      </div>
      )}

      {openRut && (
        <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
        <div className="relative z-30 w-[600px] bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

          {/* Nút đóng */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
            <X className="hover:cursor-pointer" onClick={() =>setOpenRut(false)}/>
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center">Rút tiền</h2>

          {/* Input số tiền */}
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Nhập số tiền cần rút</label>
            <input
            type="text"
            value={totalrut}
            onChange={(e) => {
              // Chỉ cho nhập số
              const val = e.target.value.replace(/\D/g, ""); 
              setTotalrut(Number(val));
            }}
            className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: 500,000"
          />
          </div>

          {/* Chọn ngân hàng */}
              <div className="space-y-3">
                {banks.map((bank) => {
                  const isSelected = selectedBankrut === bank.namebank;
                  return (
                    <div
                      key={bank.namebank}
                      onClick={() => setSelectedBankrut(bank.namebank)}
                      className={`
                        flex items-center gap-4 p-3 border rounded-lg cursor-pointer
                        ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                        transition-colors duration-200
                      `}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={bank.image}
                        alt={bank.namebank}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{bank.namebank}</p>
                        <p className="text-gray-500">{maskAccountNumber(bank.account_number)}</p>
                      </div>

                      {/* Dấu tick */}
                      {isSelected && (
                        <span className="text-blue-600 font-bold">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
             <button
                onClick={HandleRut}
                disabled={loadrut}
                className={`flex items-center justify-center px-4 py-2 rounded bg-blue-500 text-white font-medium
                  hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loadrut ? "Đang xử lý..." : "Rút"}
              </button>
              <Button variant="secondary" onClick={() =>setOpenRut(false)}> Hủy </Button>
          </div>
        </div>
      </div>
      )}


        {openAddbank && (
          <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-start pt-[100px]">
          <div className="relative z-30 w-[600px] max-w-full bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

            {/* Nút đóng */}
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
              onClick={() => setOpenAddbank(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center">Thêm ngân hàng</h2>

            {/* Chọn ngân hàng */}
            <div className="flex flex-wrap gap-3">
              {banknew.map((bank) => {
                const isSelected = selectedBankthem?.namebank === bank.namebank;
                return (
                  <div
                    key={bank.namebank}
                    onClick={() => setSelectedBankthem(bank)}
                    className={`
                      flex flex-col items-center gap-2 p-3 border rounded-lg cursor-pointer
                      ${isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"}
                      hover:bg-blue-50 transition-colors duration-200 w-[120px]
                    `}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={bank.image}
                      alt={bank.namebank}
                      className="rounded-md"
                    />
                    <p className="font-semibold text-center text-sm">{bank.namebank}</p>

                    {/* Dấu tick */}
                    {isSelected && (
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input số tài khoản */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Nhập số tài khoản</label>
              <input
                type="text"
                value={account_number}
                onChange={(e) =>setAccount_number(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: 123456789"
              />
            </div>

            {/* Input tên tài khoản */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Nhập tên tài khoản</label>
              <input
                type="text"
                value={account_name}
                onChange={(e) => setAccount_name(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button onClick={HandleAdd}>Thêm</Button>
              <Button
                variant="secondary"
                onClick={() => setOpenAddbank(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
        )}




      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Ví của tôi
      </h1>

      {/* Phần số dư chính */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-wrap items-center justify-between mb-6">
        {/* Thông tin số dư */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Wallet className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Số dư khả dụng</p>
            <p className="text-3xl font-bold text-gray-800">₫ {wallet?.availableBalance.toLocaleString()}</p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button className=" rounded-lg " onClick={() => setOpenNap(true)}>
            Nạp thêm
          </Button>
          {wallet.availableBalance <= 99999 ? (
            <Button className=" rounded-lg " variant="danger" >
            Rút tiền
          </Button>
          ) : (
            <Button className=" rounded-lg " variant="secondary" onClick={() => setOpenRut(true)}>
            Rút tiền
          </Button>
          )}
          
        </div>
      </div>

      {/* 2 cột nội dung phụ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lịch sử giao dịch */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <History className="text-orange-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Lịch sử giao dịch</p>
              <p className="text-sm text-gray-500">
                Xem chi tiết các giao dịch gần đây
              </p>
            </div>
          </div>

          <Link href={'/admin/page/balance/history'} className="self-start px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50 transition">
            Xem lịch sử
          </Link>
        </div>

        {/* Ngân hàng liên kết */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
  <div>
    {/* Header */}
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-green-100 rounded-full">
        <CreditCard className="text-green-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-gray-800 font-medium">Ngân hàng liên kết</p>
        <p className="text-sm text-gray-500">
          Quản lý tài khoản ngân hàng đã kết nối
        </p>
      </div>
    </div>

    {/* Danh sách ngân hàng */}
    <div className="border-t border-gray-200 pt-4 space-y-3">
      {banks.length > 0 ? (
        banks.map((b,index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-medium">{b.namebank}</p>
              <p className="text-sm text-gray-500">{maskAccountNumber(b.account_number)}</p>
            </div>
            <button
              className="text-blue-600 text-sm font-medium hover:underline"
              onClick={() => handleRemoveBank(b)}
            >
              Gỡ liên kết
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">Chưa có ngân hàng nào liên kết.</p>
      )}
    </div>
  </div>

  {/* Nút thêm ngân hàng */}
  <button
    className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition cursor-pointer"
    onClick={() => setOpenAddbank(true)}
  >
    + Thêm ngân hàng mới
  </button>
</div>

      </div>
    </div>
  );
}
