import {
  createCountryRepository,
  createRoleRepository,
  createUserRepository,
} from "@/repositories";
import { createAxios } from "@/libs";

import type { AxiosRequestConfig } from "axios";
import type { HttpClient } from "@/types";
import { createModalClient } from "./modalClient";
import { createQueryParamsClient } from "./queryParamsClient";

const createInfrastructure = () => {
  const instance = createAxios();
  const httpClient: HttpClient<AxiosRequestConfig> = {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    remove: instance.delete,
  };
  const modalClient = createModalClient();
  const userRepository = createUserRepository(httpClient);
  const countryRepository = createCountryRepository(httpClient);
  const roleRepository = createRoleRepository(httpClient);
  return {
    userRepository,
    countryRepository,
    roleRepository,
    modalClient,
    createQueryParamsClient,
  };
};

const infrastructure = createInfrastructure();

export { infrastructure };
