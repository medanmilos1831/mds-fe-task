import {
  API_URL_ROUTES,
  type ApiClientType,
  type IResponseWithPagination,
} from "@/types";
import type { IUser } from "./types";

const createUserRepository = (api: ApiClientType) => {
  return {
    getUsers: (params: any) => {
      return api.get<IResponseWithPagination<IUser>>(API_URL_ROUTES.USERS, {
        params,
      });
    },
    getUser: (id: number) => {
      return api.get<IUser>(`${API_URL_ROUTES.USERS}/${id}`);
    },
    removeUser: (id: number) => {
      return api.remove<void>(`${API_URL_ROUTES.USERS}/${id}`);
    },
  };
};

export { createUserRepository };
