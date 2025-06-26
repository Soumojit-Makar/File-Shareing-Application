import axios from "axios";
import { getToken } from "../helper/auth";
import { use } from "react";

export const publicApi = axios.create({
    baseURL: "https://file-sharing-application-bg9n.onrender.com",
});
export const privateApi = axios.create({
    baseURL: "https://file-sharing-application-bg9n.onrender.com/",
  });
  privateApi.interceptors.request.use(
    config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  privateApi.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
      }
      return Promise.reject(error);
    }
  );
  
  export default privateApi;