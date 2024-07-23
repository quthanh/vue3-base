<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["file"]);

const props = withDefaults(
  defineProps<{
    error?: string;
    acceptFile?: string;
    itemClass?: string;
    previewFile?: string;
    hasRemove?: true;
  }>(),
  {
    acceptFile: "image/png, image/gif, image/jpeg, image/webp",
    itemClass: "h-[150px]",
    hasRemove: true,
  }
);

const previewFile = ref(props.previewFile);
const newFile = ref();

const changeFile = ($event: Event) => {
  const file = ($event.target as HTMLInputElement)?.files?.[0];
  if (!file) {
    previewFile.value = props.previewFile || "";
    return;
  }

  newFile.value = file;

  const URL = window.webkitURL || window.URL;
  previewFile.value = URL.createObjectURL(file);

  setFile();

  ($event.target as HTMLInputElement).value = "";
};

const removeFile = () => {
  previewFile.value = "";
  newFile.value = "";

  setFile();
};

const setFile = () => {
  emit("file", newFile.value);
};
</script>
<template>
  <div
    class="relative border border-blue-600 border-dashed rounded-lg"
    :class="[
      {
        'border-red-500': error,
      },
      itemClass,
    ]"
  >
    <div
      class="w-6 h-6 cursor-pointer absolute top-2 right-2 z-[12] text-gray-500 hover:text-red-500"
      v-if="hasRemove && newFile"
      @click.stop="removeFile"
    >
      <s-icon width="24" height="24" :src="$icon.render('iconClose')"></s-icon>
    </div>

    <s-input-file
      class="absolute w-full border-none opacity-0 !p-0 z-10 cursor-pointer"
      :class="itemClass"
      :accept="acceptFile"
      @change=" ($event: Event) => {
        changeFile($event);
    }"
    ></s-input-file>

    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 w-full flex items-center justify-center px-2"
    >
      <s-image-loading
        class="p-1"
        :class="itemClass"
        v-if="previewFile"
        alt=""
        :src="previewFile"
      />
      <div v-else>
        <s-icon
          width="24"
          height="24"
          :class="{
            '!text-red-500': error,
            '!text-blue-600': !error,
          }"
          :src="$icon.render('iconPlus')"
        ></s-icon>
      </div>
    </div>
  </div>
</template>
