<script lang="ts" setup>
import { reactive } from "vue";
import logoEbay from "@/assets/images/ebay-square.png";
import logoWalmart from "@/assets/images/walmart-square.png";
import logoEtsy from "@/assets/images/etsy-square.png";
import logoShopify from "@/assets/images/shopify-square.png";

defineProps<{
  channelName: string;
  classImg: string;
}>();

const logo = reactive<{ [index: string]: string }>({
  ebay: logoEbay,
  walmart: logoWalmart,
  etsy: logoEtsy,
  shopify: logoShopify,
});
</script>
<template v-if="channelName">
  <s-image-loading
    :class="classImg"
    class="rounded-md"
    :src="logo[channelName.toLowerCase()]"
    :alt="channelName"
    size="small"
  />
</template>
