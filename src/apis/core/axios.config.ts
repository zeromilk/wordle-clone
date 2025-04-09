import axios, { CreateAxiosDefaults } from "axios";

export interface AxiosInstanceConfig extends CreateAxiosDefaults<any> {
  multipart?: boolean;
}

const axiosInstance = (_config: AxiosInstanceConfig) => {
  const { multipart, ...config } = _config;

  const instance = axios.create(config);

  axios.defaults.headers.post["Content-Type"] = multipart
    ? "multipart/form-data"
    : "application/json";

  axios.defaults.headers.patch["Content-Type"] = multipart
    ? "multipart/form-data"
    : "application/json";

  return instance;
};

export default axiosInstance;
