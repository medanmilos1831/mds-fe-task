import type { AxiosRequestConfig } from "@/libs/axios";

export interface HttpClient<Config = any> {
  get: <T = any>(url: string, config?: Config) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: Config) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: Config) => Promise<T>;
  remove: <T = any>(url: string, config?: Config) => Promise<T>;
}

export type ApiClientType = HttpClient<AxiosRequestConfig>;
