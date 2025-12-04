"use client";
import React from "react";
import SingleMsgForm from "../components/SingleMsgForm";
import BulkMessage from "../components/BulkMessage";
import ContactCard from "../components/ContactCard";

const Page = () => {
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    const raw = localStorage.getItem("data");
    if (raw) setData(JSON.parse(raw));
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem("data");
    setData([])
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <BulkMessage data={data} />
        <button
          onClick={handleDelete}
          className="bg-red-400 text-black rounded-md px-4 py-4 cursor-pointer transition-colors
          hover:bg-red-400/90 hover:text-text"
        >
          Delete Data
        </button>
        {/* Data List */}
        <div className="flex flex-col gap-4">
          {data &&
            data.length > 0 &&
            data.map((value, key) => (
             <ContactCard key={key} {...value}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
