<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    variant?: string;
    modelValue?: number;
    disabled?: boolean;
    pill?: boolean;
  }>(),
  {
    placeholder: "",
    variant: "primary",
    disabled: false,
    pill: false,
  }
);

const model = useVModel(props, "modelValue");

const buildClasses = computed(() => {
  const classes: any = [];

  if (props.pill) {
    classes.push("rounded-full");
  }

  return classes;
});

// Prevent +, -, and e on keypress
const blockInvalidChars = (event: any) => {
  const invalidChars = ["+", "-", "e"];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
};
// Optionally, block +, -, e from pasting or typing with arrow keys
const blockInvalidKeys = (event: any) => {
  const invalidKeys = ["e", "E", "+", "-"];
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
};
// Further sanitize input if needed
const blockInvalidInput = (event: any) => {
  event.target.value = event.target.value.replace(/[eE+-]/g, "");
  model.value = event.target.value;
};

const minus = () => {
  if (!model.value) return (model.value = 0);

  if (model.value <= model.value - 1) return;

  model.value--;
};

const plus = () => {
  if (!model.value) return (model.value = 1);

  model.value++;
};
</script>
<template>
  <div
    class="border border-color1 h-[38px] flex items-center rounded-md select-none"
    :class="buildClasses"
  >
    <div
      class="flex-[0_0_38px] w-10 h-10 flex items-center justify-center"
      @click="minus"
    >
      <s-icon
        name="minus"
        class="text-gray-900 w-4 h-4 cursor-pointer"
      ></s-icon>
    </div>

    <div class="w-full h-full">
      <input
        v-model.number="model"
        type="number"
        class="border-none outline-none w-full h-full text-gray-600 text-sm font-medium text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        @keypress="blockInvalidChars"
        @keydown="blockInvalidKeys"
        @input="blockInvalidInput"
      />
    </div>

    <div
      class="flex-[0_0_38px] w-10 h-10 flex items-center justify-center"
      @click="plus"
    >
      <s-icon name="plus" class="text-gray-900 w-4 h-4 cursor-pointer"></s-icon>
    </div>
  </div>
</template>
