"use client"

import { Target } from "lucide-react";
import './css.css'
import React, { useEffect, useState } from "react";
import { Check,Circle,CircleX } from "lucide-react";
import Button from "@/component/ui/button";

const OrderProgress = ({ status }: { status: number }) => {
  const steps = ["Đã thanh toán", "Đang soạn hàng", "Đang vận chuyển", "Đã giao xong"];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // tính % theo status
    const target = ((status - 1) / (steps.length - 1)) * 100;
    console.log(target);
    
    setProgress(target);
  }, [status]);

  return (
    <div>
      {status !== 0 ?(
           <div className="mt-[50px]">
        {status === 1 ? (
          <div className="progress-bar flex justify-between relative mb-[30px] bg-gray-300 h-[6px] items-center">
                <div className="progress-lines absolute  left-0 h-[6px] bg-green-600 z-10 rounded-[3px] w-[0%]" ></div>
                <div className="progress-line absolute  left-[0] h-[6px] bg-green-600 z-10 rounded-[3px] w-[33%]"></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Circle/></div></div>
                <div className="step completed bg-gray-300 rounded-[50px] z-20"><div className="circle rounded-[50px] text-white"><Circle/></div></div>
                <div className="step completed bg-gray-300 rounded-[50px] z-20"><div className="circle rounded-[50px] text-white"><Circle/></div></div>

        </div>
        ) : status === 2 ?(
          <div className="progress-bar flex justify-between relative mb-[30px] bg-gray-300 h-[6px] items-center">
                <div className="progress-lines absolute  left-0 h-[6px] bg-green-600 z-10 rounded-[3px] w-[33%]" ></div>
                {/* <div className="progress-lines absolute  left-[33%] h-[6px] bg-green-600 z-10 rounded-[3px] w-[0%]" ></div> */}

                <div className="progress-line absolute  left-[33%] h-[6px] bg-green-600 z-10 rounded-[3px] w-[33%]"></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Circle/></div></div>
                <div className="step completed bg-gray-300 rounded-[50px] z-20"><div className="circle rounded-[50px] text-white"><Circle/></div></div>

        </div>
        ) : status === 3 ? (
          <div className="progress-bar flex justify-between relative mb-[30px] bg-gray-300 h-[6px] items-center">
                <div className="progress-lines absolute  left-0 h-[6px] bg-green-600 z-10 rounded-[3px] w-[66%]" ></div>
                <div className="progress-line absolute  left-[66%] h-[6px] bg-green-600 z-10 rounded-[3px] w-[33%]"></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Circle/></div></div>

        </div>
        ) : status === 4 ?(
          <div className="progress-bar flex justify-between relative mb-[30px] bg-gray-300 h-[6px] items-center">
                <div className="progress-lines absolute  left-0 h-[6px] bg-green-600 z-10 rounded-[3px] w-[100%]" ></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>
                <div className="step completed relative z-20"><div className="circle w-[28px] h-[28px] bg-green-600 rounded-[50px] m-auto flex justify-center items-center text-[16px] text-white"><Check/></div></div>

        </div>
        ) : (
          <div className="progress-bar flex justify-between relative mb-[30px] bg-gray-300 h-[6px] items-center">
                <div className="progress-lines absolute  left-0 h-[6px] bg-red-600 z-10 rounded-[3px] w-[100%]" ></div>
                {/* <div className="progress-line absolute  left-[0] h-[6px] bg-green-600 z-10 rounded-[3px] w-[33%]"></div> */}
                
                <div className="step completed bg-red-600 rounded-[50px] z-20"><div className="circle rounded-[50px] text-white"><Circle/></div></div>
                <div className="step completed bg-red-600 rounded-[50px] z-20"><div className="circle rounded-[50px] text-white"><CircleX/></div></div>

        </div>
        )}

        {status !== 5 ? (
          <div className="flex justify-between">
          <div>Đã đặt hàng</div>
          <div>đang soạn hàng</div>
          <div>đang vận chuyển</div>
          <div>đã hoàn thành</div>
        </div>
        ) : (
          <div  >
            <div className="flex justify-between">
                <div>đã thanh toán</div>
                <div>đã hủy</div>
            </div>
          <div className="text-center">

            <Button>xem lý do</Button>
          </div>
          
        </div>
        )}
    </div>
      ) : (
        <div className="text-red-600 font-bold flex justify-center items-center"> 
          chưa thanh toán
        </div>
      )}
    </div>
  );
};

export default OrderProgress;
