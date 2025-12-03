'use client'
import React from "react";
import UploadForm from "./UploadForm";
import useCSVHook from "@/hooks/useCSVHook";
import Link from "next/link";

const Main = () => {
    const [isTrue,setIsTrue] = React.useState<boolean>(false)
    const {data,uploadDataFile,loading} = useCSVHook();
    const handleTrue = (e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
e.stopPropagation();
setIsTrue((p)=>!p)
alert(isTrue)
    }
  return (
    <main className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center bg-bgSoft px-4 flex-col gap-8 ">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-10 border border-gray-200">
        <UploadForm onUpload={uploadDataFile} loading={loading}/>
      </div>
      <div className="h-auto w-full">
        <Link href={'/send-msg'} className="px-10 py-4 border-main bg-main cursor-pointer text-text rounded-sm "
      >
           View
        </Link>
        
      </div>
    </main>
  );
};

export default Main;
