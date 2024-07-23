<template>
  <div class="range-slider">
    <input type="range" v-model="sliderMin" :min="minAngle" :max="maxAngle" />
    <input type="range" v-model="sliderMax" :min="minAngle" :max="maxAngle" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

const emit = defineEmits(['value']);

const props = withDefaults(
  defineProps<{
    minAngle: number;
    maxAngle: number;
    minVal: number;
    maxVal: number;
  }>(),
  {
    minAngle: 0,
    maxAngle: 100,
  }
);

const sliderMin = ref<number>(props.minVal || 0);
const sliderMax = ref<number>(props.maxVal || 0);

watchDebounced(
  sliderMin,
  () => {
    setValue();
  },
  { debounce: 600, maxWait: 1200 }
);

watchDebounced(
  sliderMax,
  () => {
    setValue();
  },
  { debounce: 600, maxWait: 1200 }
);

const setValue = () => {
  const min = Math.min(sliderMin.value, sliderMax.value);
  const max = Math.max(sliderMin.value, sliderMax.value);

  emit('value', { min, max });
};
</script>
<style lang="scss">
.range-slider {
  @apply relative text-center;

  input[type='range'] {
    @apply absolute left-0 bottom-0;
  }

  input[type='range'] {
    -webkit-appearance: none;
    @apply w-full;

    &:focus {
      @apply outline-none;
    }
  }

  input[type='range']:focus::-webkit-slider-runnable-track,
  input[type='range']:focus::-ms-fill-upper,
  input[type='range']:focus::-ms-fill-upper {
    @apply bg-blue-600;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    border-radius: 1px;
    box-shadow: none;
    border: 0;
    @apply bg-blue-600;
  }

  input[type='range']::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    box-shadow: 0px 0px 0px #000;
    border: 1px solid;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    // background: #a1d0ff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
    @apply border-blue-600 bg-blue-600;
  }
}
</style>
