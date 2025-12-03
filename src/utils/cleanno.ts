export function formatPhone(phone: string) {
  return phone
    .replace(/[^\d]/g, "") // sirf digits rakho
    .replace(/^91?/, "91"); // ensure 91 prefix only once
}
