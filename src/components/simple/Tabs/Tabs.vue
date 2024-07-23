<!-- eslint-disable no-dupe-else-if -->
<script lang="ts" setup>
import { useSlots, ref, provide, watch } from 'vue';
import type { Tab } from './type';

const props = withDefaults(
  defineProps<{
    tabDefault?: string;
    variant?: string;
  }>(),
  {
    variant: 'line',
  }
);
const emit = defineEmits(['setActiveTab']);

const slots = useSlots();
const defaultSlots = slots.default && slots.default();

const tabs = ref<Tab[]>(
  (defaultSlots?.length &&
    defaultSlots.map((tab) => {
      return {
        title: tab?.props?.title || '',
        name: tab?.props?.name || '',
        disabled: Boolean(tab?.props?.disabled),
      };
    })) ||
    []
);

const active = ref(props.tabDefault || tabs.value?.[0]?.name);

const getTabActive = () => {
  if (!active.value) return;
  return tabs.value.find((tab) => tab.name === active.value);
};

const tabActive = ref(getTabActive());

const setTabActive = (tab: Tab) => {
  if (tab.disabled || tab.name === tabActive.value?.name) return;
  active.value = tab.name;
  tabActive.value = getTabActive();
};

watch(
  () => tabActive.value,
  () => {
    if (!tabActive.value?.name) return;
    emit('setActiveTab', tabActive.value?.name);
  }
);

watch(
  () => props.tabDefault,
  () => {
    if (!props.tabDefault) return;
    active.value = props.tabDefault;
    tabActive.value = getTabActive();
  }
);

provide('tabActive', tabActive);

const buildClasses = (tab: Tab) => {
  let classes = '';

  if (props.variant === 'line') {
    classes =
      'p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 ';

    if (tab.name === tabActive.value?.name && !tab.disabled) {
      classes += '!border-blue-600 text-blue-600 ';
    }

    if (tab.disabled) {
      classes +=
        'text-gray-500 border-gray-300 cursor-no-drop hover:text-gray-500 hover:border-gray-300 ';
    }
    return classes;
  }

  classes = 'mb-3 py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 ';

  if (tab.name === tabActive.value?.name && !tab.disabled) {
    classes += 'bg-blue-100 text-blue-700 ';
  }

  if (tab.disabled) {
    classes +=
      '!bg-gray-100 !border-gray-100 focus:!bg-gray-100 !text-gray-500 hover:!text-gray-500 cursor-no-drop ';
  }

  return classes;
};
</script>
<template>
  <div>
    <div
      class="text-center text-gray-500 font-medium"
      :class="{ 'border-b border-gray-300': variant === 'line' }"
    >
      <ul class="flex flex-wrap -mb-px space-x-4">
        <template v-for="(tab, index) in tabs">
          <li :key="index" @click="setTabActive(tab)" v-if="tab.title">
            <span
              :disabled="tab.disabled"
              class="cursor-pointer inline-block"
              :class="buildClasses(tab)"
            >
              {{ tab.title }}
            </span>
          </li>
        </template>
      </ul>
    </div>
    <div class="mt-3">
      <slot></slot>
    </div>
  </div>
</template>
