<script setup lang="ts">
import { storeToRefs } from "pinia";
import { inject, ref, defineAsyncComponent } from "vue";
import { useAccountStore } from "@/stores/account";
import type { PermissionPlugin } from "@/plugins/permission";
// import LayoutLoading from "./LayoutLoading.vue";
// import Sidebar from "@/components/Sidebar.vue";
const Sidebar = defineAsyncComponent(() => import("@/components/Sidebar.vue"));
const LayoutLoading = defineAsyncComponent(
  () => import("@/layouts/LayoutLoading.vue")
);

import { useSystemStore } from "@/stores/system";

const accountStore = useAccountStore();

const permission = inject<PermissionPlugin>("permission");
const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);
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

  <div class="layout-default h-screen w-full" v-else>
    <div class="flex h-screen w-full">
      <div
        class="h-full"
        :class="{
          'w-[72px]': isSidebarCollapse,
          'w-[280px]': !isSidebarCollapse,
        }"
      >
        <Sidebar />
      </div>
      <div
        id="main"
        class="h-full overflow-y-auto overflow-x-hidden"
        :class="{
          'w-[calc(100%-72px)]': isSidebarCollapse,
          'w-[calc(100%-280px)]': !isSidebarCollapse,
        }"
      >
        <!-- <Topbar /> -->
        <div
          class="p-6 lg:py-7 lg:px-8 bg-white min-h-screen shadow-sm overflow-y-auto"
        >
          <router-view v-slot="{ Component }">
            <component :is="Component" class="" />
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
