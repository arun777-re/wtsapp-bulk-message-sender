'use client';
import useCSVHook from '@/hooks/useCSVHook';
import Image from 'next/image'
import React from 'react';

const WhatsAppQR = () => {
 const {getQRCode} = useCSVHook();
  const [qr, setQr] = React.useState<string>('');
const ref = React.useRef<boolean>(false)
    
    React.useEffect(() => {
      if (ref.current) return;   // stops running again on re-renders
      ref.current = true;        // <- IMPORTANT!!
    
      const interval = setInterval(async () => {
        const res = await getQRCode();
        if (res?.success && res.data && !Array.isArray(res.data)) {
          setQr(res.data);
          clearInterval(interval); // stop polling after QR received
        }
      }, 3000);
    
      return () => clearInterval(interval);
    }, [getQRCode]);
  return <Image src={qr} alt='qr-code'
  height={180}
  width={180}
  priority
  className='object-fill'
  />
}

export default WhatsAppQR