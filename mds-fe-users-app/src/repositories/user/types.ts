import type { ICountry } from "../countries/types";
import type { IRole } from "../roles/types";

export interface IUser {
  avatar: string | null;
  country: ICountry;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: IRole;
}
