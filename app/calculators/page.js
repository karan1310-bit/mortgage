'use client'

import MortgagePayCalc from "@/components/mortgage/MortgagePayCalc";
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
        
        <main className="min-h-screen w-full bg-[#e6e1da] text-[#000000] font-Satoshi">
            <MortgagePayCalc />
        </main>
  )
}

export default page