"use client";

import React, { useEffect, useState } from "react";
import FluidSimulation from "@/component/FluidSimulation/FluidSimulation";
import { useSmokeStore } from "@/app/context/smoke";
export default function FluidSimulations() {
  const { isOn } = useSmokeStore();

useEffect(() =>{
    console.log(isOn);
    
},[isOn])

  return (
    <div>
      {isOn && (
        <div>
          <div id="Particles">
            <canvas id="fluid"></canvas>
            <FluidSimulation />
          </div>
        </div>
      )}
    </div>
  );
}
