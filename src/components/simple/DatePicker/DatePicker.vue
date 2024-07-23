<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
</script>
<template><VueDatePicker /></template>
<style lang="scss">
@import "@vuepic/vue-datepicker/dist/main.css";
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #0c0d0e;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #0c0d0e;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #2563eb;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #515961;
  --dp-border-color: #dbdbdb;
  --dp-menu-border-color: #dbdbdb;
  --dp-border-color-hover: #dbdbdb;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #2563eb;
  --dp-success-color-disabled: #2563eb;
  --dp-primary-disabled-color: #60a5fa; //
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
.dp__input {
  height: 38px;
  line-height: 24px;
  @apply text-sm rounded-lg border border-gray-300 text-gray-900;

  &::placeholder {
    @apply text-gray-900;
  }
}
.dp__action_button {
  @apply p-4 flex items-center justify-center;
}
</style>
