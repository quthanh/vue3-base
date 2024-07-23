<script setup lang="ts">
withDefaults(
  defineProps<{
    hoverOnBackground?: boolean;
  }>(),
  {
    hoverOnBackground: true,
  }
);
</script>
<template>
  <tr
    class="border-b border-gray-200 last:border-none"
    :class="{
      'hover:bg-gray-50 group': hoverOnBackground,
    }"
  >
    <slot></slot>
  </tr>
</template>
