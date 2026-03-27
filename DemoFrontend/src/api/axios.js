import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_UR || "https://demoproject-vhvc.onrender.com/api",
});

// request interceptor (auto token)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;