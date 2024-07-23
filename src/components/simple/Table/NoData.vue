<script lang="ts" setup>
withDefaults(
  defineProps<{
    isShowCreate?: boolean;
  }>(),
  {
    isShowCreate: true,
  }
);

const emit = defineEmits(['createNew']);
const createNew = () => {
  emit('createNew');
};
</script>
<template>
  <div class="flex w-full flex-col justify-center items-center">
    <div>
      <img
        class="max-w-md w-full"
        src="@/assets/images/no-data.png"
        alt="No data"
        loading="lazy"
      />
    </div>
    <div class="text-gray-500 flex items-center">
      <span>There is no data yet</span>
      <template v-if="isShowCreate">
        <span class="mx-1">-</span>
        <span class="text-blue-600 cursor-pointer" @click="createNew">
          Create new
        </span>
      </template>
      <slot></slot>
    </div>
  </div>
</template>
