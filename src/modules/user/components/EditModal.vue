<script lang="ts" setup>
import * as yup from "yup";
import { ref, computed, watch } from "vue";
import { update } from "@/api/user";
import type { UserParams } from "@/api/user";
import axios from "axios";
import type { Role } from "@/modules/role/types";
import type { User } from "../types";
import { useAccountStore } from "@/stores/account";
import { fetchAll as fetchAllRole } from "@/api/role";
import $toast from "@/components/simple/Toast";
import validateForm from "@/utils/validateForm";

const emit = defineEmits(["onCancel", "onSubmit"]);
const props = defineProps<{
  item: User;
}>();
const account = useAccountStore();
const roles = ref<Role[]>([]);

const schema = yup.object({
  first_name: yup.string().required("The field is required."),
  last_name: yup.string().required("The field is required."),
  username: yup.string().required("The field is required."),
  role: yup.object().required("The field is required."),
  is_active: yup.boolean().required("The field is required."),
});

const setDefaultForm = () => {
  return {
    first_name: props?.item?.first_name ?? "",
    last_name: props?.item?.last_name ?? "",
    username: props?.item?.username ?? "",
    is_active: props?.item?.is_active ?? false,
    role: undefined,
  };
};

const form = ref<UserParams>(setDefaultForm());
const errors = ref<{ [key: string]: string }>({});

const hasChange = computed(() => {
  if (
    props.item.first_name !== form.value?.first_name ||
    props.item.last_name !== form.value?.last_name ||
    props.item.username !== form.value?.username ||
    props.item.is_active !== form.value?.is_active ||
    props.item?.roles?.[0]?.id !== form.value?.role?.id
  ) {
    return true;
  }
  return false;
});

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
    await update(props.item.id, form.value);
    $toast("Update user successfully");
    emit("onSubmit");
    if (props.item.id === account?.profile?.id) {
      account.getProfile();
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(e.response?.data?.error?.message ?? "Update user fails", "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const onCancel = () => {
  emit("onCancel");
};

const fetchListRole = async () => {
  const { data } = await fetchAllRole({});
  roles.value = data?.data || [];
  form.value.role =
    (props?.item?.roles?.length &&
      roles.value.find((item) => item.id === props.item?.roles?.[0]?.id)) ||
    undefined;
};

fetchListRole();
</script>
<template>
  <s-modal>
    <template #header>
      <h4 class="uppercase text-gray-900">Edit User</h4>
    </template>
    <template #body>
      <div class="mb-4 pb-6 border-b border-gray-300">
        <h3 class="text-gray-500 mb-3">Profile Info</h3>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between mb-2">
              <label
                for="first_name"
                class="typo-small text-gray-900 cursor-pointer"
              >
                First name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="first_name"
              :variant="errors.first_name ? 'error' : 'primary'"
              v-model="form.first_name"
              class="w-full"
              placeholder="First name"
            >
            </s-input>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label
                for="last_name"
                class="typo-small text-gray-900 cursor-pointer"
              >
                Last name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="last_name"
              :variant="errors.last_name ? 'error' : 'primary'"
              v-model="form.last_name"
              class="w-full"
              placeholder="Last name"
            >
            </s-input>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-gray-500 mb-3">User account</h3>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between mb-2">
              <label
                for="username"
                class="typo-small text-gray-900 cursor-pointer"
              >
                User name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="username"
              :variant="errors.username ? 'error' : 'primary'"
              v-model="form.username"
              class="w-full"
              placeholder="User name"
            >
            </s-input>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-gray-900 cursor-pointer">
                Role
                <span class="text-danger">*</span>
              </label>
            </div>
            <s-select
              label="name"
              track-by="id"
              v-model="form.role"
              :options="roles"
              placeholder="Select role"
              :class="{ 'is-error': errors.role }"
            ></s-select>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-gray-900 cursor-pointer">
                Status
                <span class="text-danger">*</span>
              </label>
            </div>
            <div class="flex space-x-8 items-center">
              <s-radio name="status" v-model="form.is_active" :value="true">
                Active
              </s-radio>
              <s-radio name="status" v-model="form.is_active" :value="false">
                Inactive
              </s-radio>
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
          :disabled="isLoading || !hasChange"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
