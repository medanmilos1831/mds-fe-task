<template>
  {{ search }}
  <button @click="queryParamsClient.setRole('Administrator')">set role</button>
  <button @click="queryParamsClient.removeRole()">remove role</button>
  <button @click="queryParamsClient.setCountry('Serbia')">set country</button>
  <button @click="queryParamsClient.removeCountry()">remove country</button>
  <AntModal :modalName="MODAL_NAMES.REMOVE_USER" :initialOpen="false">
    <template #modalContent="{ data, closeModal, modalName }">
      <RemoveUserModal
        :data="(data as IUser)"
        :closeModal="closeModal"
        :modalName="modalName"
      ></RemoveUserModal>
    </template>
  </AntModal>
  <AntTable
    :dataSource="data?.result ?? []"
    :loading="isLoading"
    :columns="[
        {
          title: 'First Name',
          dataIndex: 'firstName', 
          key: 'firstName',
        },
        {
          title: 'action',
          dataIndex: 'action',
          key: 'action',
          customRender: ({ record }: { record: IUser }) => {
            return h(Button, {
              danger: true,
              onClick: () => {
                modalObserver.openModal({
                  modalName: MODAL_NAMES.REMOVE_USER,
                  data: record,
                });
              },
            }, () => 'Remove');
          },
        },
      ]"
  />
</template>

<script setup lang="ts">
import type { IUserRepo } from "@/repositories/user/types";
import { useQuery } from "@tanstack/vue-query";
import { Button } from "ant-design-vue";
import { computed, h, inject } from "vue";
import AntModal from "../../components/AntModal.vue";
import AntTable from "../../components/AntTable.vue";
import type { RepositoryQueryType } from "../../plugins/apiClient";
import type { IModalObserver } from "../../plugins/modalObserver";
import type { IUser } from "../../repositories";
import { MODAL_NAMES, REACT_QUERY_KEYS } from "../../types";
import RemoveUserModal from "./RemoveUserModal.vue";
import type { IQueryParamsClient } from "@/plugins/queryParamsClient";
import { useRoute } from "vue-router";

const client = inject<RepositoryQueryType>("apiLayerProvider")!;
const modalObserver = inject<IModalObserver>("modalObserver")!;
const queryParamsClient = inject<IQueryParamsClient>("queryParamsClient")!;
const route = useRoute();
const search = computed(
  () => queryParamsClient.getQueryParams(route.query) ?? {}
);
const { data, isLoading } = useQuery({
  queryKey: [REACT_QUERY_KEYS.USERS, search],
  queryFn: () => {
    return client<IUserRepo>("apiClient/users").repository.getUsers(
      search.value
    );
  },
});
</script>
