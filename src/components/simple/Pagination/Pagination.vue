<script lang="ts" setup>
import { computed, watch, ref } from "vue";
const emit = defineEmits(["update:modelValue", "change", "changeLimit"]);

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    totalItems: number;
    sliceLength?: number;
    perPage?: number;
    totalPages?: number;
  }>(),
  {
    modelValue: 1,
    totalPages: 1,
    sliceLength: 2,
    perPage: 10,
  }
);

const newPerPage = ref<number>(props.perPage);

watch(
  () => props.perPage,
  () => {
    newPerPage.value = props.perPage;
  }
);

const setPage = (index: number) => {
  emit("update:modelValue", index);
};
const decreasePage = () => {
  emit("update:modelValue", props.modelValue - 1);
};
const increasePage = () => {
  emit("update:modelValue", props.modelValue + 1);
};
const computedTotalPages = computed(() => {
  if (!props.totalItems) return props.totalPages;
  if (!newPerPage.value) return props.totalPages;
  return Math.ceil(props.totalItems / newPerPage.value);
});
const isDecreaseDisabled = computed(() => props.modelValue <= 1);
const isIncreaseDisabled = computed(
  () => props.modelValue >= computedTotalPages.value
);
const isSetPageDisabled = (index: number) => index === props.modelValue;
const pagesToDisplay = computed(() => {
  if (!computedTotalPages.value) {
    return [1];
  }
  if (computedTotalPages.value <= props.sliceLength * 2 + 1) {
    const pages = [];
    for (let page = 1; page <= computedTotalPages.value; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (props.modelValue <= props.sliceLength) {
    const pages = [];
    const slicedLength =
      Math.abs(props.modelValue - props.sliceLength) +
      props.modelValue +
      props.sliceLength +
      1;
    for (let page = 1; page <= slicedLength; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (props.modelValue >= computedTotalPages.value - props.sliceLength) {
    const pages = [];
    for (
      let page = Math.abs(computedTotalPages.value - props.sliceLength * 2);
      page <= computedTotalPages.value;
      page++
    ) {
      pages.push(page);
    }
    return pages;
  }
  const pages = [];
  const startedPage =
    props.modelValue - props.sliceLength > 0
      ? props.modelValue - props.sliceLength
      : 1;
  for (
    let page = startedPage;
    page < props.modelValue + props.sliceLength + 1;
    page++
  ) {
    if (page >= computedTotalPages.value) break;
    pages.push(page);
  }
  return pages;
});

watch(
  () => props.modelValue,
  () => {
    emit("change", props.modelValue);
  }
);

interface PerPageItem {
  name: string;
  limit: number;
}

const perPages = ref<PerPageItem[]>([
  {
    name: "10/page",
    limit: 10,
  },
  {
    name: "20/page",
    limit: 20,
  },
  {
    name: "30/page",
    limit: 30,
  },
  {
    name: "40/page",
    limit: 40,
  },
  {
    name: "50/page",
    limit: 50,
  },
]);

const limit = ref<PerPageItem>(
  perPages.value.find((item) => item.limit === newPerPage.value) ||
    perPages.value[0]
);

const selectPerPage = () => {
  emit("changeLimit", limit.value.limit);
};
</script>

<template>
  <div class="flex justify-between flex-col xl:items-center xl:flex-row">
    <div class="text-gray-600 text-sm mb-2 xl:mb-0">
      Show
      {{
        $display.formatNumber(
          totalItems ? (modelValue - 1) * perPage + 1 : 0,
          0
        )
      }}-{{
        $display.formatNumber(
          modelValue * perPage > totalItems ? totalItems : modelValue * perPage,
          0
        )
      }}/{{ $display.formatNumber(totalItems, 0) }}
    </div>
    <div class="flex items-center space-x-5">
      <s-select
        v-model="limit"
        :options="perPages"
        name="value"
        label="name"
        :trackBy="'limit'"
        class="!w-32"
        :allowEmpty="false"
        placeholder="Per page"
        @onChange="selectPerPage"
        open-direction="top"
        :showSearch="false"
      ></s-select>
      <nav aria-label="Page navigation">
        <ul class="inline-flex space-x-2">
          <li class="hidden sm:block">
            <button
              @click="setPage(1)"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded-md text-gray-500 text-sm font-medium"
              :class="{
                'text-blue-600 border-blue-600': 1 === modelValue,
                'text-gray-900 border-gray-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500':
                  1 !== modelValue,
              }"
              :disabled="modelValue === 1"
            >
              <s-icon
                class="w-5 h-5 text-gray-600"
                name="arrow-double-left"
              ></s-icon>
            </button>
          </li>
          <li>
            <button
              :disabled="isDecreaseDisabled"
              @click="decreasePage"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded-md text-gray-500 text-sm font-medium"
              :class="{
                'hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500':
                  !isDecreaseDisabled,
              }"
            >
              <s-icon name="down" class="rotate-90 svg-line"></s-icon>
            </button>
          </li>
          <li
            v-for="index in pagesToDisplay"
            :key="index"
            class="hidden lg:block"
          >
            <button
              :disabled="isSetPageDisabled(index)"
              @click="setPage(index)"
              class="flex items-center justify-center min-w-[38px] h-[38px] px-1 ml-0 border text-sm font-medium rounded-md"
              :class="{
                'text-blue-500 bg-blue-50 border-blue-500':
                  index === modelValue,
                'text-gray-500 border-gray-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500':
                  index !== modelValue,
              }"
            >
              {{ $display.formatNumber(index, 0) }}
            </button>
          </li>
          <li>
            <button
              :disabled="isIncreaseDisabled"
              @click="increasePage"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded text-gray-500 text-sm font-medium"
              :class="{
                'hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500':
                  !isIncreaseDisabled,
              }"
            >
              <s-icon name="down" class="-rotate-90 svg-line"></s-icon>
            </button>
          </li>
          <li class="hidden sm:block">
            <button
              @click="setPage(computedTotalPages)"
              class="flex items-center justify-center w-[38px] h-[38px] ml-0 border border-gray-300 rounded-md text-gray-500 text-sm font-medium"
              :class="{
                'text-blue-600 border-blue-600':
                  computedTotalPages === modelValue,
                'text-gray-900 border-gray-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500':
                  computedTotalPages !== modelValue,
              }"
              :disabled="modelValue === computedTotalPages"
            >
              <s-icon
                class="rotate-180 w-5 h-5 text-gray-600"
                name="arrow-double-left"
              ></s-icon>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
