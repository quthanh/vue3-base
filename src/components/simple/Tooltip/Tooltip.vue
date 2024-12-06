<template>
  <div>
    <div
      v-if="visible && $slots.content"
      ref="tooltipContent"
      :class="contentClasses"
      :style="tooltipStyle"
      class="fixed z-50 bg-white rounded-lg overflow-hidden p-3 shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]"
    >
      <slot name="content"></slot>
    </div>
    <!-- :key=renderKey -->
    <div ref="tooltip" @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// import makeid from "@/utils/makeid";
import { useElementBounding } from "@vueuse/core";
import { ref, computed } from "vue";

type Placement = "top" | "bottom" | "left" | "right";

const props = withDefaults(
  defineProps<{
    placement?: Placement;
    contentClasses?: string;
  }>(),
  {
    placement: "top",
    contentClasses: "max-w-sm",
  }
);

const tooltip = ref();
const tooltipContent = ref();
// const renderKey = ref(makeid(8));
const defaultSpace = ref(8);

const { x, y, width, height } = useElementBounding(tooltip);
const { width: widthTooltipContent, height: heightTooltipContent } =
  useElementBounding(tooltipContent);

const positionLeft = computed(() => {
  let positionLeft = "auto";
  switch (props.placement) {
    case "top":
    case "bottom":
      positionLeft =
        x.value + width.value / 2 - widthTooltipContent.value / 2 + "px";
      break;

    case "right":
      positionLeft = x.value + width.value + defaultSpace.value + "px";
      break;

    case "left":
      positionLeft =
        x.value - widthTooltipContent.value - defaultSpace.value + "px";
      break;
  }
  return positionLeft;
});

const positionTop = computed(() => {
  let positionTop = "auto";

  switch (props.placement) {
    case "top":
      positionTop =
        y.value - heightTooltipContent.value - defaultSpace.value + "px";
      break;

    case "bottom":
      positionTop = y.value + height.value + defaultSpace.value + "px";
      break;

    case "left":
    case "right":
      positionTop =
        y.value + height.value / 2 - heightTooltipContent.value / 2 + "px";
      break;
  }

  return positionTop;
});

const visible = ref(false);

const tooltipStyle = computed(() => {
  return {
    left: positionLeft.value,
    top: positionTop.value,
  };
});

const showTooltip = () => {
  const {
    x: elX,
    y: elY,
    width: elW,
    height: elH,
  } = useElementBounding(tooltip);
  const { width: wElContent, height: hElContent } =
    useElementBounding(tooltipContent);

  x.value = elX.value;
  y.value = elY.value;
  width.value = elW.value;
  height.value = elH.value;
  widthTooltipContent.value = wElContent.value;
  heightTooltipContent.value = hElContent.value;

  visible.value = true;
};

const hideTooltip = () => {
  visible.value = false;
  // renderKey.value = makeid(8);
};
</script>
