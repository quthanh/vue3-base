<script lang="ts" setup>
import type { Router } from "@/configs/sidebar";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSystemStore } from "@/stores/system";

interface CustomRouter extends Router {
  label?: string;
}
const systemStore = useSystemStore();

const { width } = useWindowSize();
const isTablet = computed(() => Boolean(width.value <= 1366));
const { isSidebarCollapse } = storeToRefs(systemStore);

withDefaults(
  defineProps<{
    title?: string;
    router?: CustomRouter;
    isFixed?: boolean;
  }>(),
  {
    title: "",
  }
);
</script>

<template>
  <div
    class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between border-b border-gray-200 pb-6 mb-6"
    :class="{
      'pt-6 bg-white fixed top-0 left-[312px] w-[calc(100%-344px)] z-[1] mb-0':
        isFixed && !isTablet && !isSidebarCollapse,
      'pt-6 bg-white fixed top-0 left-[104px] w-[calc(100%-136px)] z-[1] mb-0':
        isFixed && !isTablet && isSidebarCollapse,
    }"
  >
    <div>
      <router-link
        class="text-sm font-medium text-gray-700 flex items-center mb-2"
        v-if="router?.name"
        :to="{
          name: router.name,
          query: router?.query ? router?.query : {},
          params: router?.params ? router?.params : {},
        }"
      >
        <s-icon
          class="svg-line text-gray-700 mr-1 w-6 h-6"
          name="arrow-left"
        ></s-icon>
        {{ router.label }}
      </router-link>

      <slot name="title"></slot>

      <h3
        v-if="title && !$slots.title"
        class="font-bold text-xl lg:text-2xl capitalize-first"
      >
        {{ title }}
      </h3>
    </div>

    <div>
      <slot> </slot>
    </div>
  </div>
</template>
