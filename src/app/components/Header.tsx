"use client";
import React from "react";
import { FaDatabase } from "react-icons/fa";
import WhatsAppQR from "./WhatsAppQR";

const Header = () => {
const [isTrue,setIsTrue] = React.useState<boolean>(false)

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaDatabase className="text-primary text-2xl" />
          <span className="text-xl font-semibold text-gray-800 tracking-wide">
            LeadScraper
          </span>
        </div>

        {/* Center Options */}
        <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <button onClick={()=> setIsTrue((p) => !p)} className="text-main cursor-pointer">Connect Whatsapp</button>
        </div>
 {
  isTrue && (
    <>
    <WhatsAppQR/>
    </>
  )
 }
        {/* CTA Button */}
        <div>
          <button className="bg-primary hover:bg-primaryDark px-5 py-2 rounded-lg text-white font-medium transition-all">
            Get Leads
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
