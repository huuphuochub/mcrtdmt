import axios from "axios";

// Browser luôn gọi qua host port (localhost:3001)
// Vì browser chạy trên máy host, không phải trong container
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const axiosClient = axios.create({
  baseURL: apiUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

export default axiosClient;
 