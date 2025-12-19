import type { AxiosInstance } from "axios";

import { createErrorClient } from "./errorClient";

function requestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}

function responseInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const errorClient = createErrorClient(error);
      return Promise.reject(errorClient);
    }
  );
}

export { requestInterceptor, responseInterceptor };
