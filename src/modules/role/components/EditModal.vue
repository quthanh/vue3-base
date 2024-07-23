<script lang="ts" setup>
import * as yup from "yup";
import { ref, computed, watch } from "vue";
import { update, details } from "@/api/role";
import axios from "axios";
import type { Role } from "@/modules/role/types";
import type { Permission } from "@/stores/account";
import PermissionList from "./PermissionList.vue";
import { fetchAll as fetchAllPermission } from "@/api/permission";
import { clone } from "ramda";
import $toast from "@/components/simple/Toast";
import validateForm from "@/utils/validateForm";

const emit = defineEmits(["onCancel", "onSubmit"]);
const props = defineProps<{
  item: Role;
}>();

const isLoading = ref(false);
const isLoadingDetails = ref(false);

const permissionNames = ref<string[]>();

const permissionState = ref<Permission[]>([]);
const currentPermissions = ref<Permission[]>([]);

const schema = yup.object({
  name: yup.string().required("The field is required."),
});

const setDefaultForm = () => {
  return {
    name: props?.item?.name ?? "",
  };
};

const form = ref(setDefaultForm());
const errors = ref<{ [key: string]: string }>({});

const hasChange = computed(() => {
  if (!permissionNames?.value?.length || !form.value?.name) {
    return false;
  }
  if (props.item.name !== form.value?.name) {
    return true;
  }

  const currentNames = currentPermissions.value?.map((item) => item.name);

  if (currentNames.length !== permissionNames.value.length) {
    return true;
  }

  for (let i = 0; i < permissionNames.value.length; i++) {
    if (!currentNames.includes(permissionNames.value[i])) {
      return true;
    }
  }

  return false;
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
    await update(props.item.id, params);
    $toast("Update role successfully");
    emit("onSubmit");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      $toast(e.response?.data?.error?.message ?? "Update role fails", "error");
    }
  } finally {
    isLoading.value = false;
  }
};

const onCancel = () => {
  emit("onCancel");
};

const fetchDetails = async () => {
  isLoadingDetails.value = true;
  const { data } = await details(props.item.id);

  currentPermissions.value = data?.data?.permissions || [];
  permissionNames.value = currentPermissions.value.map(
    (item: Permission) => item.name
  );

  await fetchListPermission();

  for (let i = 0; i < permissionState.value.length; i++) {
    setActiveByCurrentName(permissionState.value[i]);
  }

  isLoadingDetails.value = false;
};

const fetchListPermission = async () => {
  const { data } = await fetchAllPermission();
  permissionState.value = clone(data?.data) || [];
};

const setActiveByCurrentName = (node: Permission) => {
  if (node?.children?.length) {
    for (let j = 0; j < node.children.length; j++) {
      const item = node.children[j];
      if (permissionNames.value?.includes(item.name)) {
        item.active = true;
      }

      if (item?.children?.length) {
        setActiveByCurrentName(item);
      }
    }
  }
};

fetchDetails();
</script>
<template>
  <s-modal size="extra-large">
    <template #header>
      <h4 class="uppercase text-gray-900">Edit Role</h4>
    </template>
    <template #body>
      <div v-if="isLoadingDetails" class="animate-pulse space-y-5">
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
          v-if="!isLoadingDetails"
          :permissions="permissionState"
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
          :disabled="isLoading || !hasChange"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
