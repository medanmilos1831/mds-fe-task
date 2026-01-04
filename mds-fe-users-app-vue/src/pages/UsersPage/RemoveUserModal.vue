<template>
  <RemoveConfirmationCommands
    :onClose="closeModal"
    :onRemove="onRemoveHandler"
    :isLoading="isLoading"
  >
    <h1>Remove User</h1>
    <p>
      Are you sure you want to remove this user {{ data?.result?.firstName }}
      {{ data?.result?.lastName }} ?
    </p>
  </RemoveConfirmationCommands>
</template>

<script setup lang="ts">
import RemoveConfirmationCommands from "@/components/RemoveConfirmationCommands.vue";
import type { RepositoryQueryType } from "@/plugins/apiClient";
import type { IUser } from "@/repositories";
import type { IUserRepo } from "@/repositories/user/types";
import { REACT_QUERY_KEYS } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { inject, onUnmounted } from "vue";

const client = inject<RepositoryQueryType>("apiLayerProvider")!;
const queryClient = useQueryClient();
const { repository, disconnect } = client<IUserRepo>("apiClient/users");
const { mutate } = useMutation({
  mutationFn: (id: number) => {
    return repository.removeUser(id);
  },
  onSuccess: () => {
    closeModal();
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.USERS],
    });
  },
  onError: (error) => {
    console.error(error);
  },
});
const {
  data: user,
  closeModal,
  modalName,
} = defineProps<{
  data: IUser;
  closeModal: () => void;
  modalName: string;
}>();
onUnmounted(disconnect);

const { data, isLoading } = useQuery({
  queryKey: [modalName, user.id],
  queryFn: () => {
    return repository.getUser(user.id);
  },
});

function onRemoveHandler() {
  mutate(data.value?.result.id!);
}
</script>
