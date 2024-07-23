<script lang="ts" setup>
import { remove } from "@/api/user";
import type { User } from "@/modules/user/types";
import axios from "axios";
import { ref } from "vue";
import $toast from "@/components/simple/Toast";

const emit = defineEmits(["onCancel", "onSubmit"]);
const props = defineProps<{
  item: User;
}>();

const onCancel = () => {
  emit("onCancel");
};
const isLoading = ref<boolean>(false);

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await remove(props.item.id);
    $toast("Delete user successfully");
    emit("onSubmit");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(e.response?.data?.error?.message ?? "Delete user fails", "error");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <s-modal v-if="item">
    <template #header>
      <h4 class="uppercase text-gray-900">Delete confirmation</h4>
    </template>
    <template #body>
      <div class="text-gray-500">
        Do you really want to delete
        <span class="text-gray-900 font-semibold">
          {{ item.first_name }} {{ item.last_name }}
        </span>
        user? This process cannot be undone.
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 justify-end">
        <s-button variant="secondary" class="min-w-[120px]" @click="onCancel">
          Cancel
        </s-button>
        <s-button
          class="min-w-[120px]"
          variant="danger"
          @click="onSubmit"
          :disabled="isLoading"
          :isLoading="isLoading"
        >
          Confirm
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
