<script lang="ts" setup>
defineProps<{
  maxHeight?: number;
}>();
</script>
<template>
  <div
    class="overflow-auto border border-gray-200 rounded-md shadow-sm"
    :style="{ 'max-height': maxHeight ? maxHeight + 'px' : 'auto' }"
  >
    <table class="w-full text-left text-gray-500">
      <slot></slot>
    </table>
  </div>
</template>
