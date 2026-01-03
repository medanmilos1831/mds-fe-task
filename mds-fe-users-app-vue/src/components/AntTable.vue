<template>
  <Table :dataSource="dataSource" :columns="columns"></Table>
</template>
<script setup lang="ts">
import type { TableProps } from "ant-design-vue";
import { Table } from "ant-design-vue";

const props = defineProps<TableProps>();
</script>
