<template>
  <AntTable
    :dataSource="data?.result ?? []"
    :loading="isLoading"
    :columns="[
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
    ]"
  />
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { inject } from "vue";
import AntTable from "./components/AntTable.vue";
interface IUserRepo {
  getUsers: () => Promise<IResponseWithPagination<IUser>>;
  getUser: (id: number) => Promise<IUser>;
  removeUser: (id: number) => Promise<void>;
}
import type { RepositoryQueryType } from "./plugins/apiClient";
import type { IResponseWithPagination } from "./types/pagination.types";
import type { IUser } from "./repositories";
const client = inject<RepositoryQueryType>("apiLayerProvider")!;
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => {
    return client<IUserRepo>("apiClient/users").repository.getUsers();
  },
});
</script>

<style scoped></style>
