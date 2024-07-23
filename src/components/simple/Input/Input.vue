<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed, useSlots } from "vue";
import { SIZE, VARIANT } from "./const";

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    size?: string;
    variant?: string;
    modelValue?: string | number;
    classes?: string;
    disabled?: boolean;
    id?: string;
    parentClasses?: string;
  }>(),
  {
    type: "text",
    placeholder: "",
    size: "default",
    variant: "primary",
    modelValue: "",
    classes: "",
    disabled: false,
    id: "",
    parentClasses: "relative",
  }
);

const model = useVModel(props, "modelValue");

const buildClasses = computed(() => {
  const disabledClasses = props.disabled ? "!bg-gray-100 cursor-no-drop" : "";
  const prependAppendClass = {
    "!pl-10": slots.prepend,
    "!pr-10": slots.append,
  };
  if (props.classes)
    return [prependAppendClass, props.classes, disabledClasses];
  return [
    prependAppendClass,
    SIZE[props.size],
    VARIANT[props.variant],
    disabledClasses,
  ];
});
</script>
<template>
  <div :class="parentClasses">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm"
    >
      <slot name="prepend"> </slot>
    </div>
    <input
      v-bind="$attrs"
      v-model.trim="model"
      :type="type"
      class="border border-gray-300 rounded-md focus:outline-none block w-full pl-3 pr-3"
      :placeholder="props.placeholder"
      :class="buildClasses"
      :disabled="disabled"
      :autocomplete="type === 'password' ? 'new-password' : 'off'"
      :id="id"
    />
    <div
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm"
    >
      <slot name="append"> </slot>
    </div>
  </div>
</template>
