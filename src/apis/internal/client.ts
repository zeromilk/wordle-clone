import { container } from "@/apis/core/di-container";
import axiosInstance from "@/apis/core/axios.config";

const BASE_URL = "http://localhost:3000/api";

const createClient = () => {
  const { config } = container.getContext();

  const instance = axiosInstance({
    baseURL: BASE_URL,
    headers: {
      ...config?.headers,
    },
    ...config,
  });

  instance.interceptors.request.use((config) => {
    return config;
  });

  return instance;
};

export default createClient;
