"use client";
import useCSVHook from "@/hooks/useCSVHook";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import React from "react";

const WhatsAppQR = ({ onClose }: { onClose: () => void }) => {
  const { getQRCode } = useCSVHook();
  const [qr, setQr] = React.useState("");
  const ref = React.useRef(false);

  React.useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    let interval = setInterval(async () => {
      const res = await getQRCode();
      if (res?.success && res.data && !Array.isArray(res.data)) {
        setQr(res.data);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [getQRCode]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999 animate-fadeIn">
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-[320px] md:w-[350px] flex flex-col items-center animate-scaleIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <IoClose size={26} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Connect WhatsApp
        </h2>

        {/* QR */}
        <div className="border-2 border-green-500 rounded-lg p-2 shadow-md bg-white">
          {qr ? (
            <Image
              src={qr}
              alt="whatsapp qr"
              height={220}
              width={220}
              priority
              className="object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500 py-8 animate-pulse">
              Loading QR Code...
            </p>
          )}
        </div>

        {/* Text */}
        <p className="text-sm mt-4 text-gray-600 text-center leading-5">
          Scan the QR using your WhatsApp <br />
          <span className="font-medium text-green-600">
            WhatsApp → Linked Devices → Link a new device
          </span>
        </p>
      </div>
    </div>
  );
};

export default WhatsAppQR;
