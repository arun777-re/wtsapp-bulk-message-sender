'use client';

import React from "react";
import SingleMsgForm from "./SingleMsgForm";

type ContactCardProps = {
    title:string;
    category:string;
    website:string;
    rawphone:string;
}

const ContactCard:React.FC<ContactCardProps> = ({
    title,
    category,
    rawphone,
    website
}) => {
  return (
     <div
                className="bg-white p-5 rounded-xl shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="w-full md:w-[36%] flex flex-col items-start justify-start ">
                  <p className="text-lg font-semibold text-gray-900">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500">{category}</p>
                  <a
                    href={website}
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    {website}
                  </a>
                </div>
                <a
                  href={`tel:${rawphone.replace(/\D/g, "")}`}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition w-max"
                >
                  Call Now
                </a>
                <SingleMsgForm phoneno={Number(rawphone)} />
              </div>
  )
}

export default ContactCard