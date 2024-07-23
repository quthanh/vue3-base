<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed, ref } from "vue";
import { SIZE, VARIANT } from "./const";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    size?: string;
    variant?: string;
    classes?: string;
    disabled?: boolean;
    id?: string;
    modelValue: string[];
  }>(),
  {
    placeholder: "Enter add new tag",
    size: "default",
    variant: "primary",
    classes: "",
    disabled: false,
    id: "",
  }
);
const tags = useVModel(props, "modelValue");

const tagElement = ref();

const buildClasses = computed(() => {
  const disabledClasses = props.disabled ? "!bg-gray-100 cursor-no-drop" : "";
  if (props.classes) return [props.classes, disabledClasses];
  return [SIZE[props.size], VARIANT[props.variant], disabledClasses];
});

const addTag = () => {
  const tag = tagElement.value.value;
  if (!tag || typeof tag !== "string") return;

  const convertTag = tag
    .split(",")
    .filter((item) => item)
    .map((item) => item.trim());

  if (!convertTag?.length) return;

  if (!tags.value) {
    tags.value = [];
  }

  tags.value.push(...convertTag);
  tags.value = [...new Set(tags.value)];

  tagElement.value.value = "";
  tagElement.value?.focus();
};
</script>
<template>
  <div>
    <input
      ref="tagElement"
      v-bind="$attrs"
      type="text"
      class="border border-gray-300 rounded-lg focus:outline-none block w-full pl-3 pr-3"
      :placeholder="placeholder"
      :class="buildClasses"
      :disabled="disabled"
      :id="id"
      @keyup.enter="addTag"
    />
    <div
      v-for="(item, index) in tags"
      class="typo-small py-1 px-2 inline-block border border-gray-300 rounded-lg bg-gray-100 mr-1 mt-2"
    >
      <div class="flex items-center">
        <div class="line-clamp-1">
          {{ item }}
        </div>
        <div class="ml-1">
          <s-icon
            @click.stop="tags.splice(index, 1)"
            width="16"
            height="16"
            class="text-gray-500 svg-line hover:text-red-600 cursor-pointer"
            :src="$icon.render('iconClose')"
          ></s-icon>
        </div>
      </div>
    </div>
  </div>
</template>
