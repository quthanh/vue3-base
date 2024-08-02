<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import type { DrawerPosition } from "./types";
import { POSITION } from "./const";
import { onUnmounted, computed } from "vue";

const props = withDefaults(
  defineProps<{
    position?: DrawerPosition;
    closeOnEsc?: boolean;
    closeOnClickOutside?: boolean;
    iconClose?: boolean;
    drawerClass?: string;
  }>(),
  {
    position: "left",
    closeOnEsc: true,
    closeOnClickOutside: true,
    iconClose: true,
  }
);

const emit = defineEmits(["close"]);

const closeDrawer = () => {
  emit("close");
};

const buildClasses = computed(() => {
  if (["left", "right"].includes(props.position)) {
    return [POSITION[props.position], props.drawerClass || "max-w-[300px]"];
  }

  return [POSITION[props.position], props.drawerClass || "max-h-[300px]"];
});

const handleEscKey = (event: any) => {
  if (!props.closeOnEsc) return;

  if (event.key === "Escape" || event.keyCode == 27) {
    closeDrawer();
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
      @click="closeOnClickOutside ? closeDrawer() : undefined"
    />
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed z-50 w-full flex"
      :class="[buildClasses]"
      @click="closeOnClickOutside ? closeDrawer() : undefined"
    >
      <div @click.stop class="relative w-full h-full">
        <!-- Drawer content -->
        <div class="relative bg-white shadow h-full">
          <!-- Drawer header -->
          <div
            class="pt-6 px-6 rounded-t-xl flex justify-between items-center"
            v-if="$slots.header"
          >
            <slot name="header" />
            <button
              v-if="iconClose"
              @click="closeDrawer"
              type="button"
              class="!text-gray-700 hover:!text-blue-600"
            >
              <slot name="close-icon">
                <s-icon class="svg-line w-5 h-5" name="close"></s-icon>
              </slot>
            </button>
          </div>
          <!-- Drawer body -->
          <div
            class="p-6 break-word overflow-y-auto"
            :class="[
              $slots.footer ? 'h-[calc(100%-110px)]' : 'h-[calc(100%-48px)]',
            ]"
          >
            <slot name="body" />
          </div>
          <!-- Drawer footer -->
          <div v-if="$slots.footer" class="py-3 px-6 rounded-b-xl bg-gray-50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
