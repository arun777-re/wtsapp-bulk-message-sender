"use client";
import React from "react";
import { FaDatabase } from "react-icons/fa";
import WhatsAppQR from "./WhatsAppQR";
import { BsWhatsapp } from "react-icons/bs";

const Header = () => {
  const [openQR, setOpenQR] = React.useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* ---- Logo ---- */}
        <div className="flex items-center gap-2">
          <FaDatabase className="text-primary text-2xl" />
          <span className="text-xl font-semibold text-gray-800 tracking-wide">
            LeadScraper
          </span>
        </div>

        {/* ---- Center / Actions ---- */}
        <div className="flex items-center gap-6">
      <button
  onClick={() => setOpenQR((p) => !p)}
  className="text-button cursor-pointer flex items-center gap-1 px-4
   py-2 border-2 border-main rounded-md animate-bounce transition-all duration-300
    hover:animate-none hover:bg-green-600 hover:border-white hover:text-white "
>
  <BsWhatsapp size={20} /> connect
</button>

        </div>
      </div>

      {/* ---- WhatsApp QR Popup ---- */}
      {openQR && (
        <div className="absolute top-16 left-0 w-full flex items-center justify-center p-4">
          <WhatsAppQR onClose={()=>setOpenQR(false)}/>
        </div>
      )}
    </nav>
  );
};

export default Header;
