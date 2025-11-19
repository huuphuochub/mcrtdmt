// import Image from "next/image";
// import Button from "@/component/ui/button";
import HomePage from "@/component/home/home";
import FooterPage from "@/component/footer";
import Chat from "./chat";

export default function Home() {
  return (
    <div className="">
     
      <div className="mt-[80px]">
          <HomePage/>
          {/* <Chat/> */}
      </div>
      <FooterPage/>

    </div>
  );
}
