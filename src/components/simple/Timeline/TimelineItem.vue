<script lang="ts" setup>
withDefaults(
  defineProps<{
    iconBox?: string;
  }>(),
  {
    iconBox: "w-8 h-8 -left-4 bg-blue-100",
  }
);
</script>

<template>
  <li class="mb-10 ml-6">
    <span
      class="absolute flex items-center justify-center rounded-full ring-8 ring-white"
      :class="iconBox"
    >
      <slot name="icon"> </slot>
    </span>
    <slot> </slot>
  </li>
</template>
