import React from "react";
import { SellerProvider } from "./context/sellercontext";

import { Headeradmin1,Headeradmin2 } from "./component/header";

export default function Adminlayout({children}:{children : React.ReactNode}){
    return(
        <SellerProvider>
           <div className="h-screen w-screen flex flex-col bg-gray-200">
  {/* Header ngang */}
  <header className="fixed top-0 left-0 w-full h-[60px]  z-20">
    <Headeradmin1 />
  </header>

  <div className="flex flex-1 pt-[60px]">
    {/* Sidebar */}
    <aside className="fixed top-[60px] left-0 w-[280px] h-[calc(100vh-60px)]  border-r p-4 z-10">
      <Headeradmin2 />
    </aside>

    {/* Main content */}
    <main className="ml-[280px]  h-[calc(100vh-60px)] flex-1 overflow-y-auto p-2 ">
      {children}
    </main>
  </div>
</div>
</SellerProvider>

    )
}