import { API_URL_ROUTES, type ApiClientType } from "@/types";
import type { IRole } from "./types";

const createRoleRepository = (api: ApiClientType) => {
  return {
    getRoles: () => {
      return api.get<IRole[]>(API_URL_ROUTES.ROLES);
    },
  };
};

export { createRoleRepository };
