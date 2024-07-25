<script lang="ts" setup>
import * as yup from "yup";
import { ref, watch } from "vue";
import { changePassword } from "@/api/user";
import axios from "axios";
import type { User } from "@/modules/user/types";
import $toast from "@/components/simple/Toast";
import validateForm from "@/utils/validateForm";

const emit = defineEmits(["onCancel", "onSubmit"]);
const props = defineProps<{
  item: User;
}>();

const schema = yup.object({
  new_password: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters"),
  new_password_confirmation: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters")
    .oneOf([yup.ref("new_password")], "Confirm password same New password"),
});

const setDefaultForm = () => {
  return {
    new_password: "",
    new_password_confirmation: "",
  };
};

const form = ref(setDefaultForm());
const errors = ref<{ [key: string]: string }>({});

const isLoading = ref(false);

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const onSubmit = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;
  try {
    await changePassword(props.item.id, form.value);
    $toast("Change password successfully");
    emit("onSubmit");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(
        e.response?.data?.error?.message ?? "Change password fails",
        "error"
      );
    }
  } finally {
    isLoading.value = false;
  }
};

const onCancel = () => {
  emit("onCancel");
};
</script>
<template>
  <s-modal v-if="item">
    <template #header>
      <h4 class="uppercase text-gray-900">Change password</h4>
    </template>
    <template #body>
      <div class="space-y-5">
        <div>
          <div class="flex justify-between mb-2">
            <label
              for="new_password"
              class="typo-small text-gray-900 cursor-pointer"
            >
              New password
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input-password
            id="new_password"
            :variant="errors.new_password ? 'error' : 'primary'"
            v-model="form.new_password"
            class="w-full"
            placeholder="New password"
          >
          </s-input-password>

          <div class="mt-2">
            <div class="flex items-center">
              <s-icon
                class="mr-2 !text-gray-500"
                :class="{
                  '!text-green-600': form.new_password && !errors.new_password,
                }"
                name="check"
              >
              </s-icon>
              <span
                class="text-gray-400 typo-small"
                :class="{
                  'text-green-600': form.new_password && !errors.new_password,
                }"
              >
                at least 6 characters
              </span>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <label
              for="confirm_password"
              class="typo-small text-gray-900 cursor-pointer"
            >
              Confirm password
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input-password
            id="confirm_password"
            :variant="errors.new_password_confirmation ? 'error' : 'primary'"
            v-model="form.new_password_confirmation"
            class="w-full"
            placeholder="New password"
          >
          </s-input-password>

          <div class="mt-2">
            <div class="flex items-center">
              <s-icon
                name="check"
                class="mr-2 !text-gray-500"
                :class="{
                  '!text-green-600':
                    form.new_password &&
                    form.new_password === form.new_password_confirmation,
                }"
              >
              </s-icon>
              <span
                class="text-gray-400 typo-small"
                :class="{
                  'text-green-600':
                    form.new_password &&
                    form.new_password === form.new_password_confirmation,
                }"
              >
                same characters as the "New password"
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 justify-end">
        <s-button variant="secondary" class="min-w-[120px]" @click="onCancel">
          Cancel
        </s-button>
        <s-button
          class="min-w-[120px]"
          @click="onSubmit"
          :disabled="isLoading"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
