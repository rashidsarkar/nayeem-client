import axios from "axios";

const axiosInstancePublic = axios.create({
  // baseURL: "https://server-livid-eight.vercel.app", // Your API base URL
  // baseURL: "https://ass-12-v2.vercel.app", // Your API base URL
  // baseURL: "http://localhost:5000", // Your API base URL
  baseURL: "https://nayeem-server.vercel.app", // Your API base URL
  withCredentials: true,
});

export default axiosInstancePublic;
