import {
  CLIENT_QUERY_PARAMS_PARAMS,
  DEFAULT_QUERY_PARAMS,
  SERVER_QUERY_PARAMS_MAP,
  SORT_ORDER_MAP,
} from "@/types";

/**
 * Creates a query params client that manages URL query parameters.
 * Handles transformation between client-side and server-side query param formats.
 * Automatically resets pagination when filters change.
 *
 * @param {Object} params - Configuration object
 * @param {Function} params.mutateUrl - Function to update URL search params
 * @param {Function} params.get - Function to get a query param value by key
 * @param {Function} params.entries - Function to get all query param entries
 * @returns {Object} Query params client with getter/setter methods
 *
 * @example
 * const queryParamsClient = createQueryParamsClient({
 *   mutateUrl: (items) => { setSearchParams(prev => { ... }); },
 *   get: (key) => searchParams.get(key),
 *   entries: () => searchParams.entries()
 * });
 */
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
  /**
   * Transforms client-side query params to server-side format.
   * Maps client param keys (e.g., "page") to server keys (e.g., "_page").
   *
   * @private
   * @param {Record<string, string>} clientParams - Client-side query parameters
   * @returns {Record<string, string>} Server-side query parameters
   */
  function parseSearchParams(clientParams: Record<string, string>) {
    const queryParams = {} as { [key: string]: string };
    Object.keys(clientParams).forEach((key) => {
      queryParams[SERVER_QUERY_PARAMS_MAP[key]] = clientParams[key];
    });
    return queryParams;
  }

  return {
    /**
     * Gets all search parameters in server-side format.
     * Merges default params with current URL params.
     *
     * @returns {Record<string, string>} Server-side query parameters
     *
     * @example
     * const params = queryParamsClient.getSearchParams();
     * // Returns: { _page: "1", _limit: "10", role.name: "Administrator" }
     */
    getSearchParams: () => {
      const clientParams = {
        ...DEFAULT_QUERY_PARAMS,
        ...Object.fromEntries(entries()),
      };
      const params = parseSearchParams(clientParams);
      return params;
    },

    /**
     * Sets pagination parameters (page and pageSize) in the URL.
     *
     * @param {number} page - Page number (1-indexed)
     * @param {number} pageSize - Number of items per page
     *
     * @example
     * queryParamsClient.setPagination(2, 25);
     * // Sets: ?page=2&pageSize=25
     */
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

    /**
     * Gets the current role filter value from URL.
     *
     * @returns {string | null} Role name or null if not set
     *
     * @example
     * const role = queryParamsClient.getRole();
     * // Returns: "Administrator" or null
     */
    getRole: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.ROLE) ?? null;
    },

    /**
     * Sets or removes the role filter in the URL.
     * Automatically resets pagination when filter changes.
     *
     * @param {string} role - Role name to filter by, or empty string to remove filter
     *
     * @example
     * queryParamsClient.setRole("Administrator");
     * // Sets: ?role=Administrator (and removes page/pageSize)
     *
     * queryParamsClient.setRole("");
     * // Removes role filter from URL
     */
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

    /**
     * Gets the current country filter value from URL.
     *
     * @returns {string | null} Country name or null if not set
     *
     * @example
     * const country = queryParamsClient.getCountry();
     * // Returns: "Serbia" or null
     */
    getCountry: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.COUNTRY) ?? null;
    },

    /**
     * Sets or removes the country filter in the URL.
     * Automatically resets pagination when filter changes.
     *
     * @param {string} country - Country name to filter by, or empty string to remove filter
     *
     * @example
     * queryParamsClient.setCountry("Serbia");
     * // Sets: ?country=Serbia (and removes page/pageSize)
     *
     * queryParamsClient.setCountry("");
     * // Removes country filter from URL
     */
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

    /**
     * Sets or removes sort parameters (field and order) in the URL.
     *
     * @param {string | null} field - Field name to sort by (e.g., "lastName"), or null to remove
     * @param {"ascend" | "descend" | null} order - Sort order, or null to remove
     *
     * @example
     * queryParamsClient.setSort("lastName", "ascend");
     * // Sets: ?sort=lastName&order=asc
     *
     * queryParamsClient.setSort(null, null);
     * // Removes sort parameters from URL
     */
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

    /**
     * Gets the current sort field from URL.
     *
     * @returns {string | null} Sort field name or null if not set
     *
     * @example
     * const sortField = queryParamsClient.getSort();
     * // Returns: "lastName" or null
     */
    getSort: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.SORT) ?? null;
    },

    /**
     * Gets the current sort order from URL.
     *
     * @returns {string | null} Sort order ("asc" or "desc") or null if not set
     *
     * @example
     * const sortOrder = queryParamsClient.getOrder();
     * // Returns: "asc" or null
     */
    getOrder: () => {
      return get(CLIENT_QUERY_PARAMS_PARAMS.ORDER) ?? null;
    },
  };
};

export { createQueryParamsClient };
