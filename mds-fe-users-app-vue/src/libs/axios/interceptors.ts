import type { AxiosInstance } from "axios";

import { createErrorClient } from "./errorClient";
import {
  CLIENT_QUERY_PARAMS_PARAMS,
  DEFAULT_QUERY_PARAMS,
  SERVER_QUERY_PARAMS,
  X_TOTAL_COUNT,
} from "@/types/constants";

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
    function (response): any {
      if (response.headers[X_TOTAL_COUNT]) {
        const config = response.config;
        const params = config.params || {};
        return {
          result: response.data,
          [CLIENT_QUERY_PARAMS_PARAMS.PAGE]: parseInt(
            params[SERVER_QUERY_PARAMS.PAGE] ??
              DEFAULT_QUERY_PARAMS[SERVER_QUERY_PARAMS.PAGE]
          ),
          [CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE]: parseInt(
            params[SERVER_QUERY_PARAMS.PAGE_SIZE] ??
              DEFAULT_QUERY_PARAMS[SERVER_QUERY_PARAMS.PAGE_SIZE]
          ),
          total: parseInt(response.headers[X_TOTAL_COUNT]),
        };
      }
      return {
        result: response.data,
      };
    },
    function (error) {
      const errorClient = createErrorClient(error);
      return Promise.reject(errorClient);
    }
  );
}

export { requestInterceptor, responseInterceptor };
