const API_URL_ROUTES = {
  USERS: "/users",
  COUNTRIES: "/countries",
  ROLES: "/roles",
};

const X_TOTAL_COUNT = "x-total-count";

const CLIENT_QUERY_PARAMS_PARAMS = {
  PAGE: "page",
  PAGE_SIZE: "pageSize",
  ROLE: "role",
  COUNTRY: "country",
  SORT: "sort",
  ORDER: "order",
};

const SERVER_QUERY_PARAMS = {
  PAGE: "_page",
  PAGE_SIZE: "_limit",
  ROLE: "role.name",
  COUNTRY: "country.name",
  SORT: "_sort",
  ORDER: "_order",
};

const SERVER_QUERY_PARAMS_MAP = {
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE]: SERVER_QUERY_PARAMS.PAGE,
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE]: SERVER_QUERY_PARAMS.PAGE_SIZE,
  [CLIENT_QUERY_PARAMS_PARAMS.ROLE]: SERVER_QUERY_PARAMS.ROLE,
  [CLIENT_QUERY_PARAMS_PARAMS.COUNTRY]: SERVER_QUERY_PARAMS.COUNTRY,
  [CLIENT_QUERY_PARAMS_PARAMS.SORT]: SERVER_QUERY_PARAMS.SORT,
  [CLIENT_QUERY_PARAMS_PARAMS.ORDER]: SERVER_QUERY_PARAMS.ORDER,
};

const DEFAULT_QUERY_PARAMS = {
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE]: "1",
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE]: "10",
};

const SORT_ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

const OBSERVER_SCOPES = {
  MODAL: "modal",
};

const MODAL_NAMES = {
  REMOVE_USER: "removeUser",
};

const REACT_QUERY_KEYS = {
  USERS: "users",
  COUNTRIES: "countries",
  ROLES: "roles",
};

const AVATAR_PLACEHOLDER =
  "https://agcnwo.com/wp-content/uploads/2020/09/avatar-placeholder.png";

const SORT_VALUES = {
  ASC: "ascend",
  DESC: "descend",
} as const;

const SORT_PARAMS_VALUES = {
  ASC: "asc",
  DESC: "desc",
};

export {
  API_URL_ROUTES,
  X_TOTAL_COUNT,
  CLIENT_QUERY_PARAMS_PARAMS,
  SERVER_QUERY_PARAMS,
  DEFAULT_QUERY_PARAMS,
  OBSERVER_SCOPES,
  SERVER_QUERY_PARAMS_MAP,
  SORT_ORDER_MAP,
  MODAL_NAMES,
  REACT_QUERY_KEYS,
  AVATAR_PLACEHOLDER,
  SORT_VALUES,
  SORT_PARAMS_VALUES,
};
