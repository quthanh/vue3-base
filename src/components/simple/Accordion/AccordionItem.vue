<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
  titleClass?: string;
  contentClass?: string;
  isFirst?: boolean;
  isLast?: boolean;
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <div
      @click="toggle"
      class="cursor-pointer flex items-center justify-between w-full p-5 border border-gray-300 border-b-0"
      :class="[
        {
          'text-gray-500': !isOpen,
          'text-gray-900': isOpen,
          'rounded-t-xl': isFirst,
          '!border-b rounded-b-xl': isLast && !isOpen,
        },
        titleClass,
      ]"
    >
      <slot name="title"></slot>
      <s-icon
        :src="$icon.render('iconDown')"
        class="svg-line transform transition-transform duration-300"
        :class="{
          'rotate-180': isOpen,
        }"
      ></s-icon>
    </div>

    <div
      v-if="isOpen"
      class="p-5 border border-gray-300"
      :class="[contentClass, { 'rounded-b-xl': isLast, 'border-b-0': !isLast }]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
