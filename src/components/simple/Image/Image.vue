<template>
  <div :style="backgroundStyle" ref="backgroundRef" class="w-full h-full">
    <img
      v-if="imgSrc"
      :src="loaded ? imgSrc : undefined"
      ref="imageRef"
      @load="onImageLoad"
      :class="imgClass"
      loading="lazy"
    />

    <Loading v-if="!loaded" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Loading from "../Loading/Loading.vue";

// Props
const props = defineProps({
  imgSrc: {
    type: String,
    required: false,
  },
  bgSrc: {
    type: String,
    required: false,
  },
  alt: {
    type: String,
    default: "",
  },
  imgClass: {
    type: String,
    default: "w-full h-full",
  },
});

// State
const loaded = ref(false);
const imageRef = ref(null);
const backgroundRef = ref(null);
let imgObserver, bgObserver;

// Computed Styles
const backgroundStyle = ref({});

// Methods
const onImageLoad = () => {
  loaded.value = true;
};

const loadBackgroundImage = () => {
  if (props.bgSrc) {
    backgroundStyle.value = {
      backgroundImage: "url('" + props.bgSrc + "')",
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
    };
    loaded.value = true;
  }
};

// Lifecycle Hooks
onMounted(() => {
  // Image Observer
  imgObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && props.imgSrc) {
      loaded.value = true;
      imgObserver.disconnect();
    }
  });

  if (imageRef.value) {
    imgObserver.observe(imageRef.value);
  }

  // Background Observer
  bgObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && props.bgSrc) {
      loadBackgroundImage();
      bgObserver.disconnect();
    }
  });

  if (backgroundRef.value) {
    bgObserver.observe(backgroundRef.value);
  }
});

onBeforeUnmount(() => {
  if (imgObserver && imgObserver.disconnect) {
    imgObserver.disconnect();
  }
  if (bgObserver && bgObserver.disconnect) {
    bgObserver.disconnect();
  }
});
</script>
