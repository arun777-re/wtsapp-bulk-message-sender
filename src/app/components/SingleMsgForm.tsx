"use client";
import useCSVHook from "@/hooks/useCSVHook";
import { formatPhone } from "@/utils/cleanno";
import React from "react";

type Props = {
  phoneno: number;
};

const SingleMsgForm: React.FC<Props> = ({ phoneno }) => {
  const [singleMessage, setSingleMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { sendSingleMesage } = useCSVHook();

  const cleanno = formatPhone(String(phoneno));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // <-- PAGE RELOAD KO ROKTA HAI

    if (!singleMessage.trim()) return alert("Message cannot be empty!");

    try {
      setLoading(true);
      await sendSingleMesage({
        message: singleMessage,
        phone: Number(cleanno),
      });
      alert("Message sent successfully!");
      setSingleMessage("");
    } catch (err) {
      alert("Failed to send message");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-2"
    >
      <input
        type="text"
        name="singlemessage"
        placeholder="Send Message"
        value={singleMessage}
        onChange={(e) => setSingleMessage(e.target.value)}
        className="bg-gray-50 border-2 border-gray-400 rounded-md px-2 placeholder:text-text"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition w-max disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send WhatsApp"}
      </button>
    </form>
  );
};

export default SingleMsgForm;
