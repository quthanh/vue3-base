<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, watch, computed } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import { useAccountStore } from "@/stores/account";
import { useSystemStore } from "@/stores/system";
import { generate } from "@/utils/sidebar";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isTablet = computed(() => Boolean(width.value <= 1366));

const { userPermission, logout, profile } = useAccountStore();

const sidebar = ref(generate(userPermission));

const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);
const { toggleSidebar, setSidebarIsCollapse } = systemStore;

watch(
  () => isTablet.value,
  () => {
    setSidebarIsCollapse(isTablet.value);
  }
);

if (isTablet.value) {
  setSidebarIsCollapse(isTablet.value);
}
</script>
<template>
  <aside
    class="w-full overflow-y-auto flex lg:flex flex-shrink-0 flex-col transition-width duration-75 h-full bg-gray-50 py-5"
  >
    <div class="relative flex-1 flex flex-col min-h-0 pt-0">
      <div class="flex-1 flex flex-col">
        <div class="px-6 sticky top-0 z-10" :class="{ '': isSidebarCollapse }">
          <div
            class="flex items-center"
            :class="{
              'justify-center': isSidebarCollapse,
              'justify-between': !isSidebarCollapse,
            }"
          >
            <div class="flex items-center justify-center">
              <div
                v-if="!isSidebarCollapse"
                class="text-[#4193FC] font-extrabold ml-2"
              >
                Base Vue
              </div>
            </div>

            <span
              class="cursor-pointer flex items-center justify-center"
              :class="{ 'rotate-180': isSidebarCollapse }"
              @click="toggleSidebar"
              v-if="!isTablet"
            >
              <s-icon
                class="!text-gray-500 svg-line w-6 h-6"
                name="sidebar-left"
              ></s-icon
            ></span>
          </div>
        </div>
        <div
          class="max-h-[calc(100vh-160px)] overflow-y-auto px-6 mt-5 lg:mt-7"
        >
          <ul class="space-y-2">
            <MenuItem
              v-for="(item, index) in sidebar"
              :key="index"
              :menuItem="item"
            />
          </ul>
        </div>
      </div>
    </div>

    <div class="">
      <div
        class="flex items-center relative px-6"
        :class="{
          'justify-center': isSidebarCollapse,
          'justify-between': !isSidebarCollapse,
        }"
      >
        <div class="flex items-center mr-2" v-if="!isSidebarCollapse">
          <img
            class="w-8 h-8 rounded-full"
            src="@/assets/images/avatar.png"
            :alt="profile?.name"
            loading="lazy"
          />
          <div class="ml-2">
            <div class="text-sm text-gray-900 line-clamp-1 font-medium">
              {{ profile?.name }}
            </div>
            <!-- <div class="text-xs text-gray-500 line-clamp-1">
              {{ profile?.email }}
            </div> -->
          </div>
        </div>
        <s-dropdown :showIcon="false" contentClasses="w-[200px] !p-0">
          <template #content>
            <div>
              <span
                @click="logout"
                class="cursor-pointer px-4 py-3 block text-sm text-red-500"
              >
                Logout
              </span>
            </div>
          </template>
          <template #title>
            <div>
              <s-icon
                class="!text-gray-500 svg-line w-6 h-6"
                name="dots-horizontal"
              ></s-icon>
            </div>
          </template>
        </s-dropdown>
      </div>
    </div>
  </aside>
</template>
