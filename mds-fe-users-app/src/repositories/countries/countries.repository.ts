import { API_URL_ROUTES, type ApiClientType } from "@/types";
import type { ICountry } from "./types";

const createCountryRepository = (api: ApiClientType) => {
  return {
    getCountries: () => {
      return api.get<ICountry[]>(API_URL_ROUTES.COUNTRIES);
    },
  };
};

export { createCountryRepository };
