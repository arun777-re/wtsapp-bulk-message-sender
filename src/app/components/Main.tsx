"use client";
import UploadForm from "./UploadForm";
import useCSVHook from "@/hooks/useCSVHook";
import Link from "next/link";

const Main = () => {
  const {  uploadDataFile, loading } = useCSVHook();
 
  return (
    <main className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center bg-bgSoft px-4 flex-col gap-8 ">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-10 border border-gray-200">
        <UploadForm onUpload={uploadDataFile} loading={loading} />
        <Link
          href={"/send-msg"}
          className="px-10 py-4 border-main bg-main cursor-pointer text-text rounded-sm transition-colors duration-300
           hover:bg-secondary hover:text-white"
        >
          View
        </Link>
      </div>
    </main>
  );
};

export default Main;
