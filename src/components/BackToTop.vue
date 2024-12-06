<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import scrollByClassName from "@/utils/scrollByClassName";

const isShow = ref(false);
const element = document.getElementById(`main`);

const backToTop = () => {
  scrollByClassName("main-container", "start");
};

const handleScroll = () => {
  const scrollTopPosition = element?.scrollTop || 0;

  isShow.value = false;

  if (scrollTopPosition > 200) {
    isShow.value = true;
  }
};

onMounted(async () => {
  await nextTick();

  if (element) {
    element?.addEventListener("scroll", handleScroll, false);
  }
});

onUnmounted(() => {
  if (element) {
    element?.removeEventListener("scroll", handleScroll);
  }
});
</script>
<template>
  <div
    v-if="isShow"
    class="text-white fixed z-[100] w-10 h-10 flex items-center justify-center rounded-md bg-blue-600 shadow-xs right-6 bottom-16 xl:bottom-6 cursor-pointer hover:opacity-80 transition-opacity duration-250"
    @click="backToTop"
  >
    <s-icon name="down" class="svg-line rotate-180 text-white w-6 h-6"></s-icon>
  </div>
</template>
