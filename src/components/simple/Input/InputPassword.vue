<script lang="ts" setup>
import { ref } from "vue";
import Input from "./Input.vue";

const type = ref<string>("password");
const changeType = () => {
  if (type.value === "password") {
    type.value = "text";
    return;
  }
  type.value = "password";
};
</script>
<template>
  <Input :type="type" :hasAppend="true">
    <template #append>
      <s-icon
        :name="type === 'password' ? 'eye-slash' : 'eye'"
        class="!text-gray-500 cursor-pointer w-5 h-5"
        @click.prevent="changeType"
      ></s-icon>
    </template>
  </Input>
</template>
