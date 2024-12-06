<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { UseElementBounding } from "@vueuse/components";
import type { ModalSize, ModalPosition } from "./types";
import { SIZE, POSITION, POSITION_CONTENT } from "./const";
import { useWindowSize } from "@vueuse/core";
import { onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    size?: ModalSize;
    position?: ModalPosition;
    closeOnEsc?: boolean;
    closeOnClickOutside?: boolean;
    iconClose?: boolean;
    footerClass?: string;
    bodyClass?: string;
    iconClass?: string;
  }>(),
  {
    size: "default",
    position: "top-center",
    closeOnEsc: true,
    closeOnClickOutside: false,
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
      class="bg-gray-900 bg-opacity-50 fixed inset-0 z-[51]"
      @click="closeOnClickOutside ? closeModal() : undefined"
    />
    <div
      class="overflow-y-auto overflow-x-hidden fixed z-[51] w-full h-full flex"
      :class="[POSITION_CONTENT[position], POSITION[position]]"
      @click="closeOnClickOutside ? closeModal() : undefined"
    >
      <!-- <div @click.stop class="relative w-full h-auto" :class="`${SIZE[size]}`"> -->
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow m-6 overflow-hidden w-full"
        @click.stop
        :class="[SIZE[size]]"
      >
        <!-- Modal header -->
        <div
          class="pt-6 px-6 rounded-t-xl flex justify-between items-start relative"
          v-if="$slots.header"
        >
          <slot name="header" />
          <button
            v-if="iconClose"
            @click="closeModal"
            type="button"
            class="!text-gray-700 hover:!text-blue-600"
            :class="[iconClass, { 'flex-[0_0_24px]': !iconClass }]"
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
              bodyClass,
              $slots.footer
                ? 'max-h-[calc(100vh-182px)]'
                : 'max-h-[calc(100vh-120px)]',
              {
                'overflow-y-auto': height >= windowHeight - 230,
                '!pt-0': !$slots.body,
              },
            ]"
          >
            <slot name="body" />
          </div>
        </UseElementBounding>
        <!-- Modal footer -->
        <div
          v-if="$slots.footer"
          class="p-6 rounded-b-xl border-t border-gray-200"
          :class="footerClass"
        >
          <slot name="footer" />
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
