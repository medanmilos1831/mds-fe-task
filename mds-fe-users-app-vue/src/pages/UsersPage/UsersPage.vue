<template>
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
import { h, inject } from "vue";
import AntModal from "../../components/AntModal.vue";
import AntTable from "../../components/AntTable.vue";
import type { RepositoryQueryType } from "../../plugins/apiClient";
import type { IModalObserver } from "../../plugins/modalObserver";
import type { IUser } from "../../repositories";
import { MODAL_NAMES, REACT_QUERY_KEYS } from "../../types";
import RemoveUserModal from "./RemoveUserModal.vue";
const client = inject<RepositoryQueryType>("apiLayerProvider")!;
const modalObserver = inject<IModalObserver>("modalObserver")!;

const { data, isLoading } = useQuery({
  queryKey: [REACT_QUERY_KEYS.USERS],
  queryFn: () => {
    return client<IUserRepo>("apiClient/users").repository.getUsers();
  },
});
</script>
