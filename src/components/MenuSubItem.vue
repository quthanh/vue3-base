<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, computed, watch, reactive } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import { useSystemStore } from "@/stores/system";
import type { SidebarRouter } from "@/configs/sidebar";
import { onClickOutside } from "@vueuse/core";

const systemStore = useSystemStore();

const { isSidebarCollapse } = storeToRefs(systemStore);
const submenu = ref(null);

const props = defineProps<{
  menuItem: SidebarRouter;
  routeNameActive: string;
  routeNames: string[];
}>();

const isActive = computed(() => {
  if (isSidebarCollapse.value) {
    return false;
  }
  return props.routeNames?.includes(props.routeNameActive);
});

const show = ref(isActive.value);
const style = reactive<{ top: string; bottom: string }>({
  top: "auto",
  bottom: "auto",
});

onClickOutside(submenu, () => {
  if (!isSidebarCollapse.value) return;

  return (show.value = false);
});

const onClickMenu = ($event: MouseEvent) => {
  if (isActive.value) {
    show.value = true;
    return;
  }

  if (!isSidebarCollapse.value || !$event.target) return;

  const currentItem = ($event.target as HTMLElement).closest(".has-children");

  const { top } = (currentItem as HTMLElement).getBoundingClientRect();

  if (top > window.innerHeight - 300) {
    style.top = "auto";
    style.bottom = window.innerHeight - top - 48 + "px";
  } else {
    style.top = top + "px";
    style.bottom = "auto";
  }

  show.value = !show.value;
};

watch(
  () => isActive.value,
  () => {
    show.value = isActive.value;
  }
);

const wrapperType = computed(() =>
  isSidebarCollapse.value ? "span" : "router-link"
);
</script>
<template>
  <li
    v-if="menuItem"
    @click="($event) => onClickMenu($event)"
    class="has-children"
    :ref="'hasSubmenu' + menuItem.id"
  >
    <component
      :is="wrapperType"
      :to="{
        name: menuItem.router.name,
        query: menuItem.router?.query ? menuItem.router?.query : {},
        params: menuItem.router?.params ? menuItem.router?.params : {},
      }"
      class="text-gray-900 rounded-lg flex items-center p-3 group cursor-pointer relative hover:bg-gray-100"
      :class="{
        'justify-center !bg-transparent hover:!bg-transparent':
          isSidebarCollapse,
        'bg-gray-200 hover:!bg-gray-200':
          routeNames?.includes(routeNameActive) && isSidebarCollapse,
      }"
    >
      <template v-if="menuItem.icon">
        <s-icon
          :name="menuItem.icon"
          class="min-w-[24px] w-6 h-6"
          :class="[menuItem.iconClass]"
        ></s-icon>
      </template>
      <template v-if="!isSidebarCollapse">
        <span class="flex-1 text-left whitespace-nowrap ml-3">
          {{ menuItem.name }}
        </span>
        <s-icon
          :class="[
            {
              'rotate-180': show,
            },
            menuItem.iconClass,
          ]"
          class="!text-gray-500 svg-line min-w-[16px]"
          name="down"
        ></s-icon>
      </template>
    </component>
    <ul
      ref="submenu"
      v-show="show"
      :class="{
        'z-50 p-3 fixed left-[72px] w-[250px] bg-white rounded-lg max-h-[300px] overflow-y-auto shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]':
          isSidebarCollapse,
        'space-y-2 ml-6': !isSidebarCollapse,
      }"
      :style="style"
    >
      <MenuItem
        v-for="(item, index) in menuItem.children"
        class="relative before:content-[''] after:content-['']"
        :class="[]"
        :key="index"
        :menuItem="item"
      />
    </ul>
  </li>
</template>
