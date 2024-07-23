<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
import { INPUT_SIZE, LABEL_SIZE, VARIANT } from './const';
import makeid from '@/utils/makeid';

const props = withDefaults(
  defineProps<{
    size?: string;
    variant?: string;
    modelValue?: boolean | number | string | object;
    inputClasses?: string;
    labelClasses?: string;
    disabled?: boolean;
  }>(),
  {
    size: 'small',
    variant: 'primary',
    inputClasses: '',
    labelClasses: '',
    disabled: false,
  }
);

const model = useVModel(props, 'modelValue');

const buildInputClasses = computed(() => {
  const disabledClasses = props.disabled ? 'cursor-no-drop' : 'cursor-pointer';
  if (props.inputClasses) return [props.inputClasses, disabledClasses];
  return [INPUT_SIZE[props.size], VARIANT[props.variant], disabledClasses];
});

const buildLabelClasses = computed(() => {
  const disabledClasses = props.disabled
    ? 'text-gray-400 cursor-no-drop'
    : 'cursor-pointer';
  if (props.labelClasses) return [props.labelClasses, disabledClasses];
  return [LABEL_SIZE[props.size], disabledClasses];
});

const id = 's' + makeid(8);
</script>
<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="focus:outline-none relative"
      :disabled="disabled"
      v-model="model"
      v-bind="$attrs"
      :class="[buildInputClasses]"
    />
    <label :for="id" :class="buildLabelClasses" class="ml-2 relative">
      <slot></slot>
    </label>
  </div>
</template>
