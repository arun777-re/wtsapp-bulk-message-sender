"use client";
import { ApiResponseFormat } from "@/types/response";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

interface OnUploadProps {
  onUpload:(file:File) => Promise<ApiResponseFormat | undefined>,
  loading:boolean
}

const UploadForm:React.FC<OnUploadProps> = ({onUpload,loading}) => {
  const [file, setFile] = useState<File | null>(null);


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.type !== "text/csv") {
      toast.error("Only CSV files allowed");
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!file) return toast.error("Please upload a CSV first!");
    try {
   await onUpload(file);
    } catch (error:any) {
        throw new Error(error)
    }
  };

if(loading){
    return 
      <Spinner/>
   
}


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-semibold text-main text-center">
        Upload CSV to Extract Leads
      </h1>

      {/* Upload Box */}
      <label
        className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:border-primary transition"
        htmlFor="csvFile"
      >
        <FaCloudUploadAlt className="text-4xl text-primary" />
        <span className="text-gray-600 font-medium text-center">
          {file ? file.name : "Click to upload CSV or drag & drop here"}
        </span>
        <input
          id="csvFile"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!file}
        className={`w-full text-center py-3 rounded-lg font-semibold transition ${
          file
            ? "bg-main hover:bg-primaryDark text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-600"
        }`}
      >
        Extract Leads
      </button>

      <p className="text-xs text-gray-500 text-center">
        Supported format: .csv • Max size: 5MB
      </p>
    </form>
  );
};

export default UploadForm;
