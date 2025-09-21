"use client";


import React, { useState } from "react";

import { SellerProvider } from "./context/sellercontext";

import { Headeradmin1,Headeradmin2 } from "./component/header";

export default function Adminlayout({children}:{children : React.ReactNode}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return(
        <SellerProvider>
           <div className="h-screen w-screen flex flex-col bg-gray-200">
  {/* Header ngang */}
  <header className="fixed top-0 left-0 w-full h-[60px]  z-20">
    <Headeradmin1 onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)}/>
  </header>

  <div className="flex flex-1 pt-[60px]">
    {/* Sidebar */}
    <aside
          className={`
            fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[280px] border-r p-4 z-10 bg-white shadow
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Headeradmin2 />
        </aside>

    {/* Main content */}
     <main
          className={`
            flex-1 h-[calc(100vh-60px)] overflow-y-auto p-2 transition-all duration-300
            ${isSidebarOpen ? "ml-[280px]" : "ml-0"}
          `}
        >
          {children}
        </main>
  </div>
</div>
</SellerProvider>

    )
}