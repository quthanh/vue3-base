<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { UseElementBounding } from "@vueuse/components";
import type { ModalSize, ModalPosition } from "./types";
import { SIZE, POSITION } from "./const";
import { useWindowSize } from "@vueuse/core";
import { onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    size?: ModalSize;
    position?: ModalPosition;
    closeOnEsc?: boolean;
    closeOnClickOutside?: boolean;
    iconClose?: boolean;
  }>(),
  {
    size: "default",
    position: "top-center",
    closeOnEsc: true,
    closeOnClickOutside: true,
    iconClose: true,
  }
);

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const { height: windowHeight } = useWindowSize();

const handleEscKey = (event: any) => {
  if (!props.closeOnEsc) return;

  if (event.key === "Escape" || event.keyCode == 27) {
    closeModal();
  }
};

window.addEventListener("keydown", handleEscKey);
document.body.classList.add("overflow-hidden");

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
  window.removeEventListener("keydown", handleEscKey);
});
</script>
<template>
  <div>
    <div
      class="bg-gray-900 bg-opacity-50 fixed inset-0 z-50"
      @click="closeOnClickOutside ? closeModal() : undefined"
    />
    <div
      class="overflow-y-auto overflow-x-hidden fixed z-[51] w-full"
      :class="[POSITION[position], SIZE[size]]"
      @click="closeOnClickOutside ? closeModal() : undefined"
    >
      <!-- <div @click.stop class="relative w-full h-auto" :class="`${SIZE[size]}`"> -->
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow m-6" @click.stop>
        <!-- Modal header -->
        <div
          class="pt-6 px-6 rounded-t-xl flex justify-between items-center"
          v-if="$slots.header"
        >
          <slot name="header" />
          <button
            v-if="iconClose"
            @click="closeModal"
            type="button"
            class="!text-gray-700 hover:!text-blue-600"
          >
            <slot name="close-icon">
              <s-icon class="svg-line w-5 h-5" name="close"></s-icon>
            </slot>
          </button>
        </div>
        <!-- Modal body -->
        <UseElementBounding v-slot="{ height }">
          <div
            class="p-6 break-word"
            :class="[
              $slots.footer
                ? 'max-h-[calc(100vh-162px)]'
                : 'max-h-[calc(100vh-100px)]',
              {
                'overflow-y-auto': height >= windowHeight - 230,
              },
            ]"
          >
            <slot name="body" />
          </div>
        </UseElementBounding>
        <!-- Modal footer -->
        <div v-if="$slots.footer" class="py-3 px-6 rounded-b-xl bg-gray-50">
          <slot name="footer" />
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
