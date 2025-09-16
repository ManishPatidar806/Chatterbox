import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
