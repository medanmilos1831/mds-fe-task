const API_URL_ROUTES = {
  USERS: "/users",
  COUNTRIES: "/countries",
  ROLES: "/roles",
};

const X_TOTAL_COUNT = "x-total-count";

const CLIENT_QUERY_PARAMS_PARAMS = {
  PAGE: "page",
  PAGE_SIZE: "pageSize",
};

const SERVER_QUERY_PARAMS = {
  PAGE: "_page",
  PAGE_SIZE: "_limit",
};

const DEFAULT_QUERY_PARAMS = {
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE]: "1",
  [CLIENT_QUERY_PARAMS_PARAMS.PAGE_SIZE]: "10",
};

const OBSERVER_SCOPES = {
  MODAL: "modal",
};

export {
  API_URL_ROUTES,
  X_TOTAL_COUNT,
  CLIENT_QUERY_PARAMS_PARAMS,
  SERVER_QUERY_PARAMS,
  DEFAULT_QUERY_PARAMS,
  OBSERVER_SCOPES,
};
