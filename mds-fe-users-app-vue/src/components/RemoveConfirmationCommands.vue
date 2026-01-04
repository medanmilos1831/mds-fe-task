<template>
  <slot></slot>
  <Row justify="end">
    <Space>
      <Button type="primary" @click="onClose"> Close </Button>
      <Button danger type="primary" @click="onRemove" :loading="isLoading"
        >Remove
      </Button>
    </Space>
  </Row>
</template>

<script setup lang="ts">
import { Row, Space, Button } from "ant-design-vue";
const { onClose, onRemove, isLoading } = defineProps<{
  onClose: () => void;
  onRemove: () => void;
  isLoading: boolean;
}>();
</script>
