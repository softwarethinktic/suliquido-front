import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const suliquidoApi = axios.create({
  baseURL: VITE_API_URL,
});

suliquidoApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
  }

  return config;
});

export default suliquidoApi;
