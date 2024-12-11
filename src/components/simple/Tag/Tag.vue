<script lang="ts" setup>
import { computed } from "vue";
import { VARIANT } from "./const";
const props = withDefaults(
  defineProps<{
    variant?: string;
    href?: string;
    size?: string;
  }>(),
  {
    variant: "secondary",
    size: "default",
  }
);
const wrapperType = computed(() => (props.href ? "a" : "span"));
</script>
<template>
  <component
    :is="wrapperType"
    :class="VARIANT[variant]"
    :href="href"
    class="flex items-center justify-center border rounded font-medium"
  >
    <slot></slot>
  </component>
</template>
