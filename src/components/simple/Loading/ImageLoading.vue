<script lang="ts" setup>
import { ref, watch } from "vue";
import Loading from "../Loading/Loading.vue";

const SIZE_ICON: Record<string, string> = {
  default: "w-12 h-12",
  small: "w-6 h-6",
  large: "w-12 h-12",
};

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    size?: "small" | "default" | "large";
  }>(),
  {
    size: "default",
  }
);

const image = ref();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

const onLoad = () => {
  isLoading.value = true;
  image.value = new Image();
  image.value.src = props.src;
  isError.value = false;

  image.value.onload = () => {
    isLoading.value = false;
  };

  image.value.onerror = () => {
    isLoading.value = false;
    isError.value = true;
  };
};

watch(
  () => props.src,
  () => {
    onLoad();
  }
);

onLoad();
</script>
<template>
  <div v-if="isLoading">
    <Loading :size="size" />
  </div>

  <div v-else-if="!isLoading && isError">
    <s-icon
      name="gallery"
      :class="SIZE_ICON[size]"
      class="!text-gray-500"
    ></s-icon>
  </div>

  <img
    v-else
    :src="src"
    loading="lazy"
    :alt="alt"
    class="max-h-full max-w-full"
  />
</template>
