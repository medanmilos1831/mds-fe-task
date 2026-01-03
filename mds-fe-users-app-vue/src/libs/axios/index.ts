import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptors";

const createAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });
  requestInterceptor(instance);
  responseInterceptor(instance);
  return instance;
};

export { createAxios, type AxiosRequestConfig, type AxiosInstance };
