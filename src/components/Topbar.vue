<script lang="ts" setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useAccountStore } from "@/stores/account";

const { logout, profile } = useAccountStore();
</script>

<template>
  <nav class="bg-white border-b border-gray-300 z-30 w-full sticky top-0">
    <div
      class="grid items-center justify-end h-[60px] px-6 lg:grid-cols-3 lg:justify-between"
    >
      <div class="col-span-2 hidden lg:block">
        <Breadcrumbs />
      </div>
      <div class="flex justify-end lg:col-span-1">
        <s-dropdown placement="bottom-right" contentClasses="w-64">
          <template #title>
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full"
                src="@/assets/images/avatar.png"
                :alt="profile?.name"
                loading="lazy"
              />
              <div class="ml-4 text-gray-900">
                {{ profile?.name }}
              </div>
            </div>
          </template>
          <template #content>
            <span
              @click="logout"
              class="cursor-pointer block p-3 text-gray-900 rounded-lg hover:bg-gray-50"
            >
              <s-icon
                class="!text-gray-500 mr-2 svg-line"
                name="logout"
              ></s-icon>
              Sign out
            </span>
          </template>
        </s-dropdown>
      </div>
    </div>
  </nav>
</template>
