<script setup lang="ts">
import { inject, ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import type { PermissionPlugin } from '@/plugins/permission';
import LayoutLoading from './LayoutLoading.vue';
import { storeToRefs } from 'pinia';

const accountStore = useAccountStore();

const permission = inject<PermissionPlugin>('permission');
const { userPermission } = storeToRefs(accountStore);

const isLoading = ref<boolean>(false);

const fetchData = async () => {
  isLoading.value = true;
  await accountStore.getProfile();

  permission?.setUserPermission(userPermission.value);

  isLoading.value = false;
};

fetchData();
</script>
<template>
  <LayoutLoading v-if="isLoading" />
  <div class="layout-product" v-else>
    <div class="p-6 lg:py-7 lg:px-8 bg-white min-h-screen shadow-sm">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
