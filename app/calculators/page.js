'use client'

import MortCalculator from "@/components/MortCalculator";
import PurchaseCalculator from "@/components/PurchaseCalculator";

import Lenis from "lenis";
import { useEffect } from "react";

const page = () => {
    useEffect(() => {
        const lenis = new Lenis();
    
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
    
        requestAnimationFrame(raf);
      });
    
      return (
        
        <main className="bg-[#e6e1da] text-[#000000] font-Satoshi">
            <MortCalculator />
            <PurchaseCalculator />
        </main>
  )
}

export default page