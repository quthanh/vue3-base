<script lang="ts" setup>
const SIZE: Record<string, string> = {
  default: "w-20 h-20",
  small: "w-10 h-10",
  large: "w-20 h-20",
};

// const SIZE_IMAGE: Record<string, string> = {
//   default: "w-[26px] h-[26px]",
//   small: "w-[14px]  h-[14px]",
//   large: "w-[26px]  h-[26px]",
// };

withDefaults(
  defineProps<{
    size?: "small" | "default" | "large";
  }>(),
  {
    size: "default",
  }
);
</script>

<template>
  <div class="flex relative flex-col items-center overflow-hidden">
    <div
      class="rounded-full animate-spin border border-solid border-blue-600 border-t-transparent"
      :class="SIZE[size]"
    ></div>
    <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <!-- <img
        :class="SIZE_IMAGE[size]"
        src="@/assets/images/logo.png"
        alt="Logo"
        loading="lazy"
      /> -->
    </div>
  </div>
</template>
