import {
  CLIENT_QUERY_PARAMS_PARAMS,
  DEFAULT_QUERY_PARAMS,
  SERVER_QUERY_PARAMS_MAP,
  SORT_ORDER_MAP,
} from "@/types";

const createQueryParamsClient = ({
  mutateUrl,
  get,
  entries,
}: {
  mutateUrl: (
    items: {
      method: "set" | "delete";
      value: string;
      key: string;
    }[]
  ) => void;
  get: (key: string) => string | null;
  entries: URLSearchParams["entries"];
}) => {
  function parseSearchParams(clientParams: Record<string, string>) {
    const queryParams = {} as { [key: string]: string };
    Object.keys(clientParams).forEach((key) => {
      queryParams[SERVER_QUERY_PARAMS_MAP[key]] = clientParams[key];
    });
    return queryParams;
  }
  return {
    getSearchParams: () => {
      const clientParams = {
        ...DEFAULT_QUERY_PARAMS,
        ...Object.fromEntries(entries()),
      };
      const params = parseSearchParams(clientParams);
      return params;
    },
    setPagination: (page: number, pageSize: number) => {
      mutateUrl([
        {
          method: "set",
          value: page.toString(),
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE,
        },
        {
          method: "set",
          value: pageSize.toString(),
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE,
        },
      ]);
    },
    getRole: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.ROLE) ?? null;
    },
    setRole: (role: string) => {
      mutateUrl([
        {
          method: role ? "set" : "delete",
          value: role,
          key: CLIENT_QUERY_PARAMS_PARAMS.ROLE,
        },
        {
          method: "delete",
          value: "",
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE,
        },
        {
          method: "delete",
          value: "",
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE,
        },
      ]);
    },
    getCountry: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.COUNTRY) ?? null;
    },
    setCountry: (country: string) => {
      mutateUrl([
        {
          method: country ? "set" : "delete",
          value: country,
          key: CLIENT_QUERY_PARAMS_PARAMS.COUNTRY,
        },
        {
          method: "delete",
          value: "",
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE,
        },
        {
          method: "delete",
          value: "",
          key: CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE,
        },
      ]);
    },
    setSort: (field: string | null, order: "ascend" | "descend" | null) => {
      mutateUrl([
        {
          method: field || order ? "set" : "delete",
          value: field ?? "",
          key: CLIENT_QUERY_PARAMS_PARAMS.SORT,
        },
        {
          method: order ? "set" : "delete",
          value: SORT_ORDER_MAP[order!],
          key: CLIENT_QUERY_PARAMS_PARAMS.ORDER,
        },
      ]);
    },
    getSort: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.SORT) ?? null;
    },
    getOrder: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.ORDER) ?? null;
    },
  };
};

export { createQueryParamsClient };
