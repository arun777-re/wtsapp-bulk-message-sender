"use client";
import React from "react";
import useCSVHook from "@/hooks/useCSVHook";
import Spinner from "./Spinner";

type Props = {
  data?: any[];
};

const BulkMessage: React.FC<Props> = ({ data }) => {

    
  const [message, setMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { sendBulkMessage } = useCSVHook();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return alert("Message cannot be blank!");
    if (!data || data.length === 0) return alert("No contacts uploaded!");
console.log("data",data);
    try {
      setLoading(true);
      await sendBulkMessage({ message, phonenos: data });
      alert("Messages successfully sent!");
    } catch (err) {
      alert("Failed to send messages!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label className="text-lg font-semibold text-gray-700">
        Enter Message
      </label>

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="px-4 py-3 rounded-lg border border-gray-300 outline-none 
        focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-10 py-4 rounded-md bg-main border-secondary text-white 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Spinner/> : "Send Message to All"}
      </button>
    </form>
  );
};

export default BulkMessage;
