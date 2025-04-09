import axiosInstance from "../core/axios.config";
import { container } from "../core/di-container";

const BASE_URL = "https://api.dictionaryapi.dev/api";

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
