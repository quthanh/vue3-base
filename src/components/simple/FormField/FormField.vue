<script lang="ts" setup>
defineProps<{
  optional?: boolean;
  label: string;
  for?: string;
  error?: string;
}>();
</script>
<template>
  <div class="relative">
    <div class="flex mb-1">
      <label
        v-if="!$slots.label"
        :for
        class="text-sm font-medium text-gray-700 cursor-pointer"
      >
        {{ label }}
      </label>
      <slot name="label"> </slot>
      <div v-if="optional" class="ml-1 text-sm font-medium text-gray-700">
        (optional)
      </div>
    </div>

    <slot></slot>

    <div class="text-red-500 mt-1 text-sm capitalize-first" v-if="error">
      {{ error }}
    </div>
  </div>
</template>
