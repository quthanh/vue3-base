<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { readAndResizeImageFile } from "@/utils/readFile.ts";

const props = withDefaults(
  defineProps<{
    error?: string;
    acceptFile?: string;
    parentClass?: string;
    itemClass?: string;
    modelValue: any[];
    hasRemove?: true;
    resizeFile?: {
      width: number; // 3000px
      type: "image/webp" | "image/jpeg" | "image/png";
      quality: number; // 0.8
    };
  }>(),
  {
    acceptFile: "image/png, image/gif, image/jpeg, image/webp",
    itemClass: "h-[150px]",
    parentClass:
      "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6",
    hasRemove: true,
  }
);

const newFiles = useVModel(props, "modelValue");

if (!newFiles.value) {
  newFiles.value = [];
}

const changeFile = async ($event: Event) => {
  const files = ($event.target as HTMLInputElement)?.files;
  if (!files) {
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      // Call the utility function for each file
      const { previewFile, newFile } = await readAndResizeImageFile(
        file,
        props?.resizeFile?.width,
        props?.resizeFile?.type,
        props?.resizeFile?.quality
      );

      // Push each processed file and its preview URL into newFiles array
      newFiles.value.push({
        is_new: true,
        url: previewFile, // The preview image in base64 format
        file: props?.resizeFile?.width ? newFile : file, // The resized WebP file
      });
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
    }
  }

  ($event.target as HTMLInputElement).value = "";
};

const removeFile = (index: number) => {
  newFiles.value.splice(index, 1);
};
</script>
<template>
  <div :class="parentClass">
    <div
      class="relative border border-blue-600 border-dashed rounded-lg"
      :class="[
        {
          'border-red-500': error,
        },
        itemClass,
      ]"
    >
      <s-input-file
        class="absolute w-full border-none opacity-0 !p-0 z-10 cursor-pointer"
        :class="itemClass"
        :accept="acceptFile"
        @change=" ($event: Event) => {
          changeFile($event);
        }"
        multiple
      ></s-input-file>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 w-full flex items-center justify-center px-2"
      >
        <s-icon
          :class="{
            '!text-red-500': error,
            '!text-blue-600': !error,
          }"
          class="w-6 h-6"
          name="plus"
        ></s-icon>
      </div>
    </div>

    <div
      v-for="(item, index) in newFiles"
      :key="index"
      :class="itemClass"
      class="p-1 border border-gray-300 rounded-md flex items-center justify-center relative"
    >
      <div
        class="w-6 h-6 cursor-pointer absolute top-2 right-2 z-[12] text-gray-500 hover:text-red-500 bg-white border border-gray-300 rounded-md flex items-center justify-center shadow-sm"
        @click="removeFile(index)"
      >
        <s-icon
          name="close"
          class="text-gray-500 hover:text-red-500 w-5 h-5"
        ></s-icon>
      </div>

      <s-image-loading class="p-1 max-h-full" alt="" :src="item.url" />
    </div>
  </div>
</template>
