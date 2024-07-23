<script lang="ts" setup>
defineProps<{
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
}>();
</script>
<template>
  <th
    scope="col"
    class="px-6 py-3 font-medium whitespace-nowrap text-xs text-gray-500"
    :class="{
      'first:sticky first:z-[1] first:left-0 first:bg-gray-50':
        stickyFirstColumn,
      'last:sticky last:z-[1] last:right-0 last:bg-gray-50': stickyLastColumn,
    }"
  >
    <slot></slot>
  </th>
</template>
