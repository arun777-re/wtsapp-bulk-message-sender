"use client";
import React from "react";
import toast from "react-hot-toast";
import useCSVHook from "@/hooks/useCSVHook";
import Spinner from "./Spinner";

type Props = {
  data?: any[];
};

const BulkMessage: React.FC<Props> = ({ data }) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { sendBulkMessage } = useCSVHook();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return toast.error("Message cannot be blank!");
    if (!data || data.length === 0) return toast.error("No contacts uploaded!");

    try {
      setLoading(true);
      await sendBulkMessage({ message, phonenos: data });

      toast.success("Messages sent successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send messages!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label className="text-lg font-semibold text-gray-700">Enter Message</label>

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        className="px-4 py-3 rounded-lg border border-gray-300 outline-none 
        disabled:bg-gray-100 disabled:cursor-not-allowed 
        focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-10 py-3 rounded-md bg-main border-secondary text-white 
        font-semibold shadow hover:shadow-md transition 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner /> Sending…
          </div>
        ) : (
          "Send Message to All"
        )}
      </button>
    </form>
  );
};

export default BulkMessage;
