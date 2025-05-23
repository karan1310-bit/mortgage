'use client'

import MortgagePayCalc from "@/components/MortCalculator";
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
            <MortgagePayCalc />
        </main>
  )
}

export default page