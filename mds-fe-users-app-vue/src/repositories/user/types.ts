import type {
  IResponse,
  IResponseWithPagination,
} from "@/types/pagination.types";

export interface IUser {
  avatar: string | null;
  country: any;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: any;
}
export interface IUserRepo {
  getUsers: () => Promise<IResponseWithPagination<IUser>>;
  getUser: (id: number) => Promise<IResponse<IUser>>;
  removeUser: (id: number) => Promise<void>;
}
