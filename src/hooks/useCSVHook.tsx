"use client";
import React from "react";
import { APIRequestFetch } from "../utils/api.utils";
import { ROUTES } from "@/constant/route";

const apifetchclass = new APIRequestFetch();

const useCSVHook = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any[]>([]);

  const uploadRef = React.useRef<boolean>(false);
  const qrcodeRef = React.useRef<boolean>(false);
  const sendsingleRef = React.useRef<boolean>(false);
  const sendbulkRef = React.useRef<boolean>(false);

  const uploadDataFile = React.useCallback(async (file: File) => {
    if (uploadRef.current) return;
    uploadRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("csvFile", file);
      const res = await apifetchclass.postRequest({
        data: formData,
        url: `${ROUTES.API.UPLOAD_FILE}`,
      });
      if (res.data && Array.isArray(res.data)) {
        setData(res.data ?? []);
      }
      localStorage.setItem("data", JSON.stringify(res.data));

      return res;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      uploadRef.current = false;
    }
  }, []);

  const getQRCode = React.useCallback(async () => {
    if (qrcodeRef.current) return;
    setLoading(true);
    setError(null);
    try {
      qrcodeRef.current = true;

      const data = await apifetchclass.getRequest(
        `${ROUTES.API.GET_WHATSAPP_QR_CODE}`
      );
      return data;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      qrcodeRef.current = false;
    }
  }, []);

  // send single message
  const sendSingleMesage = React.useCallback(async ({message,phone}:{message:string,phone:number}) => {
    if (sendsingleRef.current) return;
    setLoading(true);
    setError(null);
    try {
      sendsingleRef.current = true;
       const payload = {
        message:message,
        phone:phone
       }
      const data = await apifetchclass.postRequest(
        {url:`${ROUTES.API.SEND_SINGLE_MESSAGE}`,data:payload}
      );
      return data;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      sendsingleRef.current = false;
    }
  }, []);

  // send bulk messages
  const sendBulkMessage = React.useCallback(async ({message,phonenos}:{message:string,phonenos:string[]}) => {
    if (sendbulkRef.current) return;
    setLoading(true);
    setError(null);
    try {
      sendbulkRef.current = true;
        const payload = {
          message,
          phonenos:JSON.stringify(phonenos)
        }
      const data = await apifetchclass.postRequest({url:
        `${ROUTES.API.SEND_BULK_MESSAGE}`,
        data:payload

      }
      );
      return data;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      sendbulkRef.current = false;
    }
  }, []);

  return {
    uploadDataFile,
    data,
    error,
    loading,
    getQRCode,
    sendSingleMesage,
    sendBulkMessage
  };
};

export default useCSVHook;
