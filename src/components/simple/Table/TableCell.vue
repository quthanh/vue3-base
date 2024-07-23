<script lang="ts" setup>
defineProps<{
  maxWidthClass?: string;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
}>();
</script>

<template>
  <td
    class="py-4 px-6 whitespace-nowrap text-sm"
    :class="{
      'first:sticky first:left-0 first:bg-white first:z-[1] first:group-hover:bg-gray-50':
        stickyFirstColumn,
      'last:sticky last:right-0 last:bg-white first:z-[1] last:group-hover:bg-gray-50':
        stickyLastColumn,
    }"
  >
    <div :class="[maxWidthClass, { 'line-clamp-1': maxWidthClass }]">
      <slot></slot>
    </div>
  </td>
</template>
