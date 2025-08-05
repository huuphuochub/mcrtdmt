import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

export default axiosClient;
 