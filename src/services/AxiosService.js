import axios from "axios";
import { getToken, getRefrest, doLoginLocalStorage } from "../helper/auth"; // helper must manage token storage

export const publicApi = axios.create({
  baseURL: "https://file-sharing-application-bg9n.onrender.com",
});

export const privateApi = axios.create({
  baseURL: "https://file-sharing-application-bg9n.onrender.com",
});

// Attach access token to each private request
privateApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return privateApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = getRefrest();

        const response = await publicApi.post("/auth/regenerate-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data || response.data;
        console.log(response.data)
        doLoginLocalStorage(newAccessToken);

        privateApi.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        window.location.href = "/login";
        console.log(err)
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default privateApi;
