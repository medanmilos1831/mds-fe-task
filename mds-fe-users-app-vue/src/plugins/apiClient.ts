import { createAxios } from "@/libs";
import { createUserRepository } from "@/repositories";
import type { HttpClient } from "@/types";
import { repositoryManager } from "@med1802/repository-manager";
import type { App } from "vue";
type RepositoryQueryType = ReturnType<typeof repositoryManager>["query"];
const apiClient = {
  install: (app: App) => {
    const manager = repositoryManager();
    const axios = createAxios();
    const httpClient: HttpClient = {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      remove: axios.delete,
    };
    const repository = manager.workspace(httpClient, {
      id: "apiClient",
    });
    repository.defineRepository("users", createUserRepository);
    app.provide("apiLayerProvider", manager.query);
  },
};

export { apiClient, type RepositoryQueryType };
