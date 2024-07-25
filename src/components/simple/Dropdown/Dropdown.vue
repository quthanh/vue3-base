<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  onClickOutside,
  useElementBounding,
  useWindowSize,
} from "@vueuse/core";
import makeid from "@/utils/makeid";

const { height: windowHeight } = useWindowSize();
const emit = defineEmits(["isOpen"]);

type DropdownPlacement =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement;
    showIcon?: boolean;
    contentClasses?: string;
    disabled?: boolean;
    widthValue?: number;
  }>(),
  {
    placement: "bottom-left",
    showIcon: true,
    contentClasses: "w-48",
    disabled: false,
  }
);

const show = ref(false);
const dropdown = ref(null);
const dropdownContent = ref(null);
const defaultSpace = ref(8);
const randomKey = ref(makeid(8));

onClickOutside(dropdown, () => (show.value = false));

const { x, y, width, height } = useElementBounding(dropdown);
const { width: widthDropdownContent, height: heightDropdownContent } =
  useElementBounding(dropdownContent);

const positionLeft = computed(() => {
  let positionLeft = "auto";
  switch (props.placement) {
    case "bottom-right":
    case "top-right":
      positionLeft = x.value + width.value - widthDropdownContent.value + "px";
      break;
  }
  return positionLeft;
});

const positionTop = computed(() => {
  const placementBottom = y.value + height.value + defaultSpace.value;
  const placementTop =
    y.value - heightDropdownContent.value - defaultSpace.value;

  let positionTop = placementBottom + "px";
  switch (props.placement) {
    case "top-left":
    case "top-right":
      positionTop = placementTop + "px";
      break;
    case "bottom-left":
    case "bottom-right":
      if (
        placementBottom + heightDropdownContent.value > windowHeight.value &&
        placementTop > 0
      ) {
        positionTop = placementTop + "px";
      }
      break;
  }

  return positionTop;
});

const buildStyleContent = computed(() => {
  let style: { [index: string]: string } = {
    left: positionLeft.value,
    top: positionTop.value,
  };

  if (props.widthValue) {
    style = {
      ...style,
      width: `${props.widthValue.toString()}px`,
    };
  }

  return style;
});

const onClose = () => {
  show.value = false;
};

watch(
  () => show.value,
  () => {
    emit("isOpen", show.value);
    randomKey.value = makeid(8);
  }
);
</script>

<template>
  <div class="relative" ref="dropdown" :key="randomKey">
    <div
      @click.stop="show = !show"
      class="cursor-pointer"
      :disabled="disabled"
      :class="{ 'pointer-events-none': disabled }"
    >
      <div class="flex items-center">
        <slot name="title"> </slot>
        <div
          v-if="showIcon"
          class="w-5 h-5 flex items-center justify-center"
          :class="{ 'rotate-180': show }"
        >
          <s-icon class="!text-gray-500 svg-line" name="down"></s-icon>
        </div>
      </div>
    </div>
    <!-- Dropdown menu -->
    <div
      ref="dropdownContent"
      class="fixed z-20 bg-white rounded-lg overflow-hidden p-3 shadow-lg"
      :style="buildStyleContent"
      :class="[contentClasses]"
      v-if="show"
    >
      <slot name="content" :onClose="onClose"> </slot>
    </div>
  </div>
</template>
