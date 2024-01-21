import axios from "axios";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const axiosInstanceSecure = axios.create({
  // baseURL: "https://server-livid-eight.vercel.app", // Your API base URL
  // baseURL: "https://ass-12-v2.vercel.app", //> Your API base URL
  baseURL: "http://localhost:5000", // Your API base URL
});

function useAxiosInstanceSecure() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  axiosInstanceSecure.interceptors.request.use(
    function (config) {
      console.log("SENDING TOKEN TO db");
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      console.log("TOKEN CAN NOT SENT");
      return Promise.reject(error);
    }
  );
  axiosInstanceSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      console.log("DB SESPONSE 401 403");
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/Login");
      }
      console.log("status error in interceptors", status);
      console.log("DB CAN NOT SENT TOKEN");
      return Promise.reject(error);
    }
  );

  return axiosInstanceSecure;
}

export default useAxiosInstanceSecure; // Export the function
