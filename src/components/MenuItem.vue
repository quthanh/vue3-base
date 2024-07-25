<script lang="ts" setup>
import { storeToRefs } from "pinia";
import MenuSubItem from "@/components/MenuSubItem.vue";
import { computed } from "vue";
import type { SidebarRouter } from "@/configs/sidebar";
import { useRoute } from "vue-router";
import { useSystemStore } from "@/stores/system";

const props = defineProps<{
  menuItem: SidebarRouter;
}>();

const route = useRoute();

const routeNames = computed(() => {
  const menuItem = props.menuItem;
  if (!menuItem?.router) return [];
  let routeNames = [menuItem.router.name];
  if (menuItem.children) {
    routeNames = [
      ...routeNames,
      ...menuItem.children.map((item: SidebarRouter) => item.router.name),
    ];
  }
  if (menuItem.allowView) {
    routeNames = [...routeNames, ...menuItem.allowView];
  }
  return routeNames;
});

const routeNameActive = computed(() => {
  const routeName = route?.name ? route.name.toString() : "";
  if (!routeName) return "";
  return routeNames.value.includes(routeName) ? routeName : "";
});

const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);
</script>
<template>
  <template v-if="menuItem">
    <template v-if="menuItem.children?.length">
      <MenuSubItem
        :routeNameActive="routeNameActive"
        :menuItem="menuItem"
        :routeNames="routeNames"
      />
    </template>
    <li v-else class="" v-bind="$attrs">
      <router-link
        :id="'menu_' + menuItem.router.name"
        :to="{
          name: menuItem.router.name,
          query: menuItem.router?.query ? menuItem.router?.query : {},
          params: menuItem.router?.params ? menuItem.router?.params : {},
        }"
        class="text-gray-900 rounded-lg flex items-center p-3 group relative"
        :class="{
          'hover:bg-gray-100': !isSidebarCollapse,
          'justify-center': isSidebarCollapse,
          'bg-gray-200 hover:!bg-gray-200 !text-gray-900':
            routeNameActive && !isSidebarCollapse,
          'w-[calc(100%+20px)] pl-8 -ml-5 text-gray-500':
            menuItem.isChildren && !isSidebarCollapse,
        }"
      >
        <template v-if="menuItem.icon">
          <s-icon
            :name="menuItem.icon"
            width="24"
            height="24"
            class="min-w-[24px] w-6 h-6"
            :class="menuItem.iconClass"
          ></s-icon>
        </template>
        <span
          class="flex-1 text-left whitespace-nowrap pl-3"
          v-if="!isSidebarCollapse || menuItem.isChildren"
        >
          {{ menuItem.name }}
        </span>
      </router-link>
    </li>
  </template>
</template>
