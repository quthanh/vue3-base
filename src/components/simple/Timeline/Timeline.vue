<script lang="ts" setup>
withDefaults(
  defineProps<{
    borderColor?: string;
  }>(),
  {
    borderColor: "border-gray-300",
  }
);
</script>
<template>
  <ol class="relative border-l" :class="borderColor">
    <slot></slot>
  </ol>
</template>
