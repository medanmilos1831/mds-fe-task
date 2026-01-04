import { SERVER_QUERY_PARAMS_MAP } from "@/types";
import type { App } from "vue";

interface IQueryParamsClient {
  setRole(value: string): void;
  removeRole(): void;
  setCountry(value: string): void;
  removeCountry(): void;
  getQueryParams(params: any): Record<string, string>;
}

const queryParamsClient = {
  install: (app: App) => {
    const router = app.config.globalProperties.$router;
    const route = app.config.globalProperties.$route;
    function parseSearchParams(clientParams: Record<string, string>) {
      const queryParams = {} as { [key: string]: string };
      Object.keys(clientParams).forEach((key) => {
        queryParams[(SERVER_QUERY_PARAMS_MAP as any)[key]] = clientParams[
          key
        ] as any;
      });
      return queryParams;
    }
    app.provide("queryParamsClient", {
      setRole(value: string) {
        router.push({
          query: {
            ...route.query,
            role: value,
          },
        });
      },
      removeRole() {
        router.push({
          query: {
            ...route.query,
            role: undefined,
          },
        });
      },
      setCountry(value: string) {
        router.push({
          query: {
            ...route.query,
            country: value,
          },
        });
      },
      removeCountry() {
        router.push({
          query: {
            ...route.query,
            country: undefined,
          },
        });
      },
      getQueryParams(params: Record<string, string>) {
        return parseSearchParams(params);
      },
    });
  },
};

export { queryParamsClient, type IQueryParamsClient };
