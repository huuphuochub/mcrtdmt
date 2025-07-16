// import Image from "next/image";
// import Button from "@/component/ui/button";
import FluidSimulation from '../component/FluidSimulation/FluidSimulation';
import Header from "@/component/header";
import HomePage from "@/component/home/home";
import FooterPage from "@/component/footer";

export default function Home() {
  return (
    <div className="">
      <div className="" >
          <div id="Particles">
            <canvas id="fluid"></canvas>
              <FluidSimulation/>
          </div>
      </div>
      <Header/>
      <div className="mt-[100px]">
          <HomePage/>
      </div>
      <FooterPage/>

    </div>
  );
}
