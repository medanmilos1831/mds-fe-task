<template>
  <div>Remove User Modal {{ props.data?.id }}</div>
</template>

<script setup lang="ts">
import type { IUser } from "@/repositories";
import { REACT_QUERY_KEYS } from "@/types";
import { useQuery } from "@tanstack/vue-query";
const props = defineProps<{
  data: any;
  closeModal: () => void;
}>();
// console.log(props.data);
console.log("RENDER");

// const { data, isLoading } = useQuery({
//   queryKey: [REACT_QUERY_KEYS.USERS],
//   queryFn: () => {
//     return client<IUserRepo>("apiClient/users").repository.getUsers();
//   },
// });
</script>
