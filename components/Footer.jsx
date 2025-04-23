'use client';

import Image from 'next/image';
import { Mail, Phone, Send, Home } from 'lucide-react';

export default function Footer() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#e6e1da] font-satoshi py-12 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-[#000000]/10 p-4 rounded-full">
            <Home size={48} className="text-black" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-lg md:max-w-md">Find The Right Home For Your Budget</h1>
        </div>
        <div className="flex gap-4 mt-6 lg:mt-0">
          <button className="border border-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition">
            GET PRE-QUALIFIED!
          </button>
          <button className="bg-[#3a3a3a] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#363636] transition">
            CALL US! 970-828-1610
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#1a1a1a] text-white px-6 md:px-12 lg:px-24 py-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">MORTGAGE</h3>
            <div className="flex items-center gap-2 text-[#90c69c]">
              <Phone size={16} />
              <span className="font-medium">970-828-1610</span>
            </div>
            <p className="text-[#90c69c] uppercase text-xs">Free Consultations</p>
            <p>License: CO:100009365<br />NMLS: 404172<br />AMM NMLS: 1742747</p>
            <p>1099 Main Avenue, Ste 305<br />Durango, CO 81301</p>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>ppritchard@animasmountainmortgage.com</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-base mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Purchase</li>
              <li>Refinance</li>
              <li>Get Pre-Approved</li>
              <li>Loan Products</li>
              <li>Calculators</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-base mb-2">Our Info</h4>
            <ul className="space-y-1">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Legal Disclaimer</li>
              <li>Licensing</li>
              <li>NMLS Consumer</li>
              <li>Access</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-base mb-2">Stay Connected:</h4>
            <form className="flex items-center gap-2 border-b border-white pb-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none text-white placeholder:text-white text-sm w-full"
              />
              <button type="submit" className="text-white font-bold text-sm flex items-center gap-1">
                SUBMIT <Send size={16} />
              </button>
            </form>
            <p className="text-[#aaa] text-xs">
              Get our newsletter, event invites, plus product insights and research
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
