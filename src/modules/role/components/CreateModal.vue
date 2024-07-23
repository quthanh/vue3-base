<script lang="ts" setup>
import * as yup from "yup";
import { ref, computed, watch } from "vue";
import { create } from "@/api/role";
import axios from "axios";
import type { Permission } from "@/stores/account";
import PermissionList from "./PermissionList.vue";
import { fetchAll as fetchAllPermission } from "@/api/permission";
import $toast from "@/components/simple/Toast";
import validateForm from "@/utils/validateForm";

const emit = defineEmits(["onCancel", "onSubmit"]);

const schema = yup.object({
  name: yup.string().required("The field is required."),
});

const setDefaultForm = () => {
  return {
    name: "",
  };
};

const form = ref(setDefaultForm());
const errors = ref<{ [key: string]: string }>({});

const isLoading = ref(false);
const isLoadingFetch = ref(false);
const permissions = ref<Permission[]>([]);
const permissionNames = ref<string[]>();
const isDisabled = computed(() => {
  return !permissionNames?.value?.length || !form.value?.name;
});

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const togglePermissionNames = (names: string[]) => {
  permissionNames.value = names;
};

const onSubmit = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  isLoading.value = true;
  try {
    const params = {
      ...form.value,
      permission_name: permissionNames.value,
    };
    await create(params);
    $toast("Created role successfully");
    emit("onSubmit");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(e.response?.data?.error?.message ?? "Created role fails", "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const onCancel = () => {
  emit("onCancel");
};

const fetchListPermission = async () => {
  isLoadingFetch.value = true;

  try {
    const { data } = await fetchAllPermission();
    permissions.value = data?.data || [];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(e.response?.data?.error?.message ?? "Fetch list fails", "error");
    }
  } finally {
    isLoadingFetch.value = false;
  }
};

fetchListPermission();
</script>
<template>
  <s-modal size="extra-large">
    <template #header>
      <h4 class="uppercase text-gray-900">Create Role</h4>
    </template>
    <template #body>
      <div v-if="isLoadingFetch" class="animate-pulse space-y-5">
        <div
          class="h-9 w-full bg-gray-100 rounded-lg"
          v-for="i in 5"
          :key="i"
        ></div>
      </div>
      <div v-else class="space-y-5">
        <div>
          <div class="flex justify-between mb-2">
            <label for="name" class="typo-small text-gray-900 cursor-pointer">
              Name
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input
            id="name"
            :variant="errors.name ? 'error' : 'primary'"
            v-model="form.name"
            class="w-full"
            placeholder="Name"
          >
          </s-input>
        </div>
        <PermissionList
          :permissions="permissions"
          @togglePermissionNames="togglePermissionNames"
        />
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
          :disabled="isLoading || isDisabled"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
