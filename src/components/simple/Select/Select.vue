<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Dropdown from "./../Dropdown/Dropdown.vue";
import Input from "./../Input/Input.vue";
import { useVModel, useElementBounding } from "@vueuse/core";
import SelectItem from "./SelectItem.vue";

const props = withDefaults(
  defineProps<{
    inputClasses?: string;
    options: any[];
    label?: string;
    trackBy?: string;
    modelValue?: any;
    placeholder?: string;
    isMultiple?: boolean;
    contentClasses?: string;
    hasError?: boolean;
    allowEmpty?: boolean;
    showSearch?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    customLabel?: Function;
    disabled?: boolean;
    maxLength?: number;
    placeholderSearch?: string;
  }>(),
  {
    allowEmpty: true,
    inputClasses: "min-h-[38px]",
    label: "name",
    trackBy: "id",
    placeholder: "Select here",
    isMultiple: false,
    hasError: false,
    contentClasses: "max-h-[300px]",
    showSearch: true,
    maxLength: 100,
    placeholderSearch: "Type to search ...",
  }
);

const emit = defineEmits(["onChange"]);

const model = useVModel(props, "modelValue");

const isShowDropdown = ref<boolean>(false);
const keyword = ref<string>();
const select = ref();
const { width } = useElementBounding(select);

const isObject = (item: any) => {
  return typeof item === "object";
};

const removeHtmlTag = (val?: string) => {
  if (!val) return;
  return val.replace(/<\/?[^>]+>/gi, "");
};

const filterOptions = computed(() => {
  if (!props.options?.length) return [];

  if (!keyword?.value) {
    return props.options?.slice(0, props.maxLength);
  }

  return props.options
    .filter((option) => {
      const newOption = isObject(props.options[0])
        ? option[props.label]
        : option;

      if (props.customLabel) {
        return (
          keyword.value &&
          props
            .customLabel(newOption)
            .toLowerCase()
            .indexOf(keyword.value.toLowerCase()) > -1
        );
      }

      return (
        keyword.value &&
        newOption.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1
      );
    })
    ?.slice(0, props.maxLength);
});

const buildOptionName = (item: any) => {
  return isObject(item) ? item[props.label] : item;
};

const selectOption = (item: any) => {
  if (checkActiveOption(item) && props.allowEmpty) {
    if (props.isMultiple) {
      model.value.splice(
        model.value.findIndex((val: any) => {
          return isActive(item, val);
        }),
        1
      );

      return;
    }

    model.value = undefined;
    return;
  }

  model.value = props.isMultiple
    ? !Array.isArray(model.value)
      ? [item]
      : [...model.value, item]
    : item;
};

const checkActiveOption = (item: any) => {
  if (!model.value) return false;

  return props.isMultiple
    ? isObject(item)
      ? Boolean(model.value.find((val: any) => isActive(item, val)))
      : Boolean(model.value.includes(item))
    : isActive(item, model.value);
};

const isActive = (val: any, currentVal: any) => {
  return isObject(val)
    ? Boolean(JSON.stringify(val) === JSON.stringify(currentVal))
    : Boolean(val === currentVal);
};

const isOpen = (val: boolean) => {
  isShowDropdown.value = val;
};

watch(
  () => isShowDropdown.value,
  () => {
    searchFocus();

    if (isShowDropdown.value) return;

    keyword.value = "";
  }
);

watch(
  () => model.value,
  () => {
    emit("onChange", model.value);
  },
  { deep: true }
);

const searchFocus = () => {
  if (!props.showSearch || !filterOptions.value?.length) return;

  setTimeout(() => {
    const search = document.getElementById("select_search");
    if (!search) return;
    search.focus();
  });
};
</script>
<template>
  <div class="w-full" ref="select" :class="{ 'pointer-events-none': disabled }">
    <Dropdown
      :widthValue="width"
      placement="bottom-right"
      :showIcon="false"
      contentClasses="p-4"
      @isOpen="isOpen"
    >
      <template #title>
        <div
          class="p-2 border border-gray-300 rounded-md pr-8 relative w-full shadow-sm"
          :class="[
            inputClasses,
            {
              'border-blue-600': isShowDropdown,
              '!border-red-500 is-error': hasError,
              '!bg-gray-100': disabled,
            },
          ]"
        >
          <div
            v-if="isMultiple && Array.isArray(model) && model?.length"
            class="space-y-1"
          >
            <div class="text-sm line-clamp-1" v-if="model">
              <div>
                {{
                  model
                    ?.map((item) =>
                      customLabel
                        ? removeHtmlTag(customLabel(item))
                        : buildOptionName(item)
                    )
                    .join(", ")
                }}
              </div>
            </div>
            <!-- <template v-if="model">
              <div
                :key="indexModel"
                v-for="(item, indexModel) in model"
                class="typo-small py-1 px-2 inline-block border border-gray-300 rounded-md bg-background-link mr-1"
              >
                <div class="flex items-center">
                  <div class="line-clamp-1">
                    {{ customLabel ? customLabel(item) : buildOptionName(item) }}
                  </div>
                  <div class="ml-1">
                    <s-icon
                      @click.stop="model.splice(indexModel, 1)"
                      width="16"
                      height="16"
                      class="!text-gray-500 svg-line hover:!text-blue-600 cursor-pointer"
                      :src="$icon.render('iconClose')"
                    ></s-icon>
                  </div>
                </div>
              </div>
            </template> -->
          </div>

          <div class="flex items-center" v-else-if="!isMultiple && model">
            <div class="flex-1 text-sm">
              {{
                customLabel
                  ? removeHtmlTag(customLabel(model))
                  : buildOptionName(model)
              }}
            </div>
            <div
              class="flex-[0_0_20px] cursor-pointer"
              v-if="model && allowEmpty"
              @click.stop="model = undefined"
            >
              <s-icon
                width="20"
                height="20"
                class="!text-gray-500 svg-line hover:!text-blue-600"
                :src="$icon.render('iconClose')"
              ></s-icon>
            </div>
          </div>

          <div v-else class="text-gray-500 text-sm flex justify-between">
            {{ placeholder }}
          </div>

          <div class="w-6 absolute right-2 top-1/2 -translate-y-1/2">
            <s-icon
              :src="$icon.render('iconDown')"
              width="24"
              height="24"
              class="!text-gray-500 svg-line"
              :class="{ '-rotate-180': isShowDropdown }"
            ></s-icon>
          </div>
        </div>
      </template>

      <template v-slot:content="{ onClose }">
        <div>
          <div class="mb-3" v-if="showSearch">
            <Input
              id="select_search"
              class="pr-8 text-sm"
              type="text"
              :placeholder="placeholderSearch"
              v-model="keyword"
            >
              <template #append v-if="keyword">
                <s-icon
                  @click.stop="keyword = ''"
                  width="20"
                  height="20"
                  class="!text-gray-500 svg-line hover:!text-blue-600 cursor-pointer"
                  :src="$icon.render('iconClose')"
                ></s-icon>
              </template>
            </Input>
          </div>

          <div v-if="!options.length">No items.</div>
          <div v-else-if="!filterOptions.length">No item any.</div>

          <div class="space-y-2 overflow-y-auto" v-else :class="contentClasses">
            <SelectItem
              v-for="(option, index) in filterOptions"
              @click="
                selectOption(option);
                onClose();
              "
              :key="index"
              class="text-sm flex items-center gap-1"
              :class="{ '!text-blue-600': checkActiveOption(option) }"
            >
              <div
                class="flex-1"
                v-html="
                  customLabel ? customLabel(option) : buildOptionName(option)
                "
              ></div>
              <div
                v-if="checkActiveOption(option)"
                class="flex gap-1 justify-end"
                :class="{
                  'flex-[0_0_40px]': isMultiple,
                  'flex-[0_0_20px]': !isMultiple,
                }"
              >
                <s-icon
                  v-if="isMultiple"
                  @click.stop="
                    selectOption(option);
                    onClose();
                  "
                  width="16"
                  height="16"
                  class="!text-gray-500 svg-line hover:!text-blue-600 cursor-pointer"
                  :src="$icon.render('iconClose')"
                ></s-icon>

                <s-icon
                  @click.stop="
                    selectOption(option);
                    onClose();
                  "
                  width="16"
                  height="16"
                  class="!text-green-600 svg-line"
                  :src="$icon.render('iconCheckLine')"
                ></s-icon>
              </div>
            </SelectItem>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
