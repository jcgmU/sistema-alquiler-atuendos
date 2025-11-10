import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const msg =
      error?.response?.data?.error || error?.message || "Unexpected error";
    return Promise.reject(new Error(msg));
  }
);
