import React from "react";

import { Headeradmin1,Headeradmin2 } from "./component/header";

export default function Adminlayout({children}:{children : React.ReactNode}){
    return(
           <div className="bg-gray-200">
                       <Headeradmin1/>
                       <div className="flex">
                            <Headeradmin2/>
                            <main className="mt-[80px] flex-1">{children}</main>    
                       </div>
                               
                   </div> 
    )
}