"use client";
import UploadForm from "./UploadForm";
import useCSVHook from "@/hooks/useCSVHook";
import Link from "next/link";

const Main = () => {
  const {  uploadDataFile, loading } = useCSVHook();
 
  return (
    <main className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center bg-bgSoft px-4 flex-col gap-8 ">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-10 border border-gray-200
      flex flex-col items-center justify-center gap-4">
        <UploadForm onUpload={uploadDataFile} loading={loading} />
        <Link
          href={"/send-msg"}
          className="px-10 py-2 border-main bg-button cursor-pointer text-white font-semibold rounded-lg shadow-sm transition-all duration-300
           hover:bg-main leading-loose hover:text-white/80 hover:shadow-md"
        >
          send message
        </Link>
      </div>
    </main>
  );
};

export default Main;
