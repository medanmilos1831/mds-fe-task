<template>
  <Modal
    :open="modal.open"
    :onCancel="handleCancel"
    :footer="null"
    v-bind="modalProps"
  >
    <slot
      name="modalContent"
      :data="modal.data"
      :closeModal="handleCancel"
      :modalName="eventName"
    >
    </slot>
  </Modal>
</template>

<script setup lang="ts" generic="D">
import type { IModalObserver } from "@/plugins/modalObserver";
import type { IModalEventPayload } from "@/types/observer.types";
import { Modal, type ModalProps } from "ant-design-vue";
import { inject, onUnmounted, reactive } from "vue";
const modalObserver = inject<IModalObserver>("modalObserver")!;

const {
  modalName: eventName,
  initialOpen,
  modalProps,
} = defineProps<{
  modalName: string;
  modalProps?: Omit<ModalProps, "open" | "onOk" | "footer">;
  initialOpen: boolean;
}>();

let modal = reactive<{ open: boolean; data: D | undefined }>({
  open: initialOpen,
  data: undefined,
});

const unsubscribe = modalObserver.subscribe(
  eventName,
  ({ open, data }: IModalEventPayload) => {
    modal.open = open;
    modal.data = data;
  }
);

function handleCancel() {
  modalObserver.closeModal({ modalName: eventName });
}

onUnmounted(() => {
  unsubscribe();
});
</script>
