<script lang="ts" setup>
import { computed } from "vue";
import { VARIANT, ICON, ICON_NAME } from "./const";

const props = withDefaults(
  defineProps<{
    variant?: string;
  }>(),
  {
    variant: "primary",
  }
);

const buildClasses = computed(() => {
  return [VARIANT[props.variant]];
});
</script>
<template>
  <div
    :class="buildClasses"
    v-bind="$attrs"
    class="break-word flex p-5 rounded-lg text-gray-900 alert"
  >
    <div class="flex-[0_0_20px] mr-4">
      <s-icon
        :name="ICON_NAME[props.variant]"
        class="w-6 h-6"
        :class="ICON[props.variant]"
      ></s-icon>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.alert {
  a {
    @apply text-blue-600;
    &:hover {
      @apply opacity-80;
    }
  }
}
</style>
