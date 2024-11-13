<template>
  <div class="relative w-full max-w-md mx-auto" ref="autocompleteContainer">
    <Input
      type="text"
      v-model="searchTermModel"
      @blur="handleClose"
      @focus="handleShow"
      @input="handleShow"
      @pointerup="handleShow"
      @keyup.enter="handleShow"
      :placeholder="placeholder"
    />

    <div
      :style="dropdownStyle"
      v-if="isShow"
      class="max-h-60 overflow-auto z-10 mt-1"
    >
      <!-- Loading Spinner -->
      <div
        v-if="isLoading && hasShowLoading"
        class="p-2 text-gray-700 bg-white border border-gray-300 rounded-md"
      >
        Loading...
      </div>

      <div
        v-else-if="!filteredOptions.length && hasShowNoData"
        class="p-2 text-gray-700 bg-white border border-gray-300 rounded-md"
      >
        No data.
      </div>

      <!-- Dropdown with filtered options -->
      <ul
        v-else-if="filteredOptions?.length"
        class="bg-white border border-gray-300 rounded-md"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click.prevent="selectOption(option)"
          @mousedown.prevent="selectOption(option)"
          class="p-2 cursor-pointer rounded-md hover:bg-gray-100"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useVModel, useWindowScroll, useElementBounding } from "@vueuse/core";
import Input from "./Input.vue";
import { watchDebounced } from "@vueuse/core";

const emit = defineEmits(["onChange"]);

// Props to receive options and loading state
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  hasShowNoData: {
    type: Boolean,
    default: false,
  },
  hasShowLoading: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
});

// Two-way binding for search term
const searchTermModel = useVModel(props, "modelValue");

// Handle loading state from props
const isLoading = computed(() => props.isLoading);
const isShow = ref(false);

// Track autocomplete container and scroll position for dynamic dropdown styling
const autocompleteContainer = ref<any>(null);
const { top: containerTop } = useElementBounding(autocompleteContainer);
const { y: scrollY } = useWindowScroll();

// Dropdown position logic: `fixed` if user scrolls past the input field
const dropdownStyle: { [key: string]: any } = computed(() => {
  const shouldFix = scrollY.value >= containerTop.value;
  return {
    position: shouldFix ? "fixed" : "absolute",
    top: shouldFix ? "0px" : "auto",
    left: shouldFix
      ? `${autocompleteContainer.value?.getBoundingClientRect().left}px`
      : "auto",
    width: shouldFix ? `${autocompleteContainer.value?.offsetWidth}px` : "100%",
  };
});

// Filter options based on search term
const filteredOptions = computed(() => {
  if (!searchTermModel.value || isLoading.value) return [];
  return props.options.filter((option: any) =>
    option.toLowerCase().includes(searchTermModel.value.toLowerCase())
  );
});

watchDebounced(
  searchTermModel,
  () => {
    emit("onChange", searchTermModel.value);
  },
  { debounce: 600, maxWait: 1200 }
);

const handleShow = () => {
  isShow.value = true;
};

const handleClose = () => {
  isShow.value = false;
};

// Select an option (via mouse click)
const selectOption = (option: any) => {
  if (!option) return;

  searchTermModel.value = option;
  handleClose();
};
</script>
