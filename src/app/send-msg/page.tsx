"use client";
import React from "react";
import SingleMsgForm from "../components/SingleMsgForm";
import BulkMessage from "../components/BulkMessage";

const Page = () => {
const [data,setData] = React.useState<any[]>([])
        React.useEffect(()=>{
      const raw = localStorage.getItem("data");
      if(raw) setData(JSON.parse(raw));
        },[]);
     console.log("data in main",data)
  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
    <BulkMessage data={data}/>

        {/* Data List */}
        <div className="flex flex-col gap-4">
          {data &&
            data.length > 0 &&
            data.map((value, key) => (
              <div
                key={key}
                className="bg-white p-5 rounded-xl shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {value.title}
                  </p>
                  <p className="text-sm text-gray-500">{value.category}</p>
                  <a
                    href={value.website}
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    {value.website}
                  </a>
                </div>
                <a
                  href={`tel:${value.rawphone.replace(/\D/g, "")}`}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition w-max"
                >
                  Call Now
                </a>
               <SingleMsgForm phoneno={value.rawphone}/>
             
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
