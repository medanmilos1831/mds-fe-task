import { API_URL_ROUTES, type ApiClientType } from "@/types";
import type { IResponseWithPagination } from "@/types/pagination.types";
import type { IUser } from "./types";

const createUserRepository = (api: ApiClientType) => {
  return {
    getUsers: (params: any) => {
      return api.get<IResponseWithPagination<IUser>>(API_URL_ROUTES.USERS, {
        params,
      });
    },
    getUser: (id: number) => {
      return api.get(`${API_URL_ROUTES.USERS}/${id}`);
    },
    removeUser: (id: number) => {
      return api.remove(`${API_URL_ROUTES.USERS}/${id}`);
    },
  };
};

export { createUserRepository };
