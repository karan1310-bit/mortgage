'use client'
import Content from '@/components/Content';
import Content2 from '@/components/Content2';
import Content3 from '@/components/Content3';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Lenis from 'lenis';
import React, { useEffect } from 'react';

const Page = () => {

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
      <Navbar />
      <Hero />
      <Content2 />
      <Content />
      <Content3 />
      <Footer />
    </main>

  )
}

export default page