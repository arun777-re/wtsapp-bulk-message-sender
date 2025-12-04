const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const ROUTES = {
  WHATSAPPURL:"whatsapp://send?phone=",
    API:{
        UPLOAD_FILE:`${baseUrl}/api/csv/upload-csv`,
        GET_WHATSAPP_QR_CODE:`${baseUrl}/api/auth/qr-code`,
        SEND_SINGLE_MESSAGE:`${baseUrl}/api/message/send-single`,
        SEND_BULK_MESSAGE:`${baseUrl}/api/message/send-bulk`
    }
}